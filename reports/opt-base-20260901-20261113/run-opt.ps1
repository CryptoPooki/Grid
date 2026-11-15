# Fast genetic optimization of DynamicGridBB from base.set.
# 2026.09.01 to 2026.11.13, deposit 18250, six symbols.
$ErrorActionPreference = "Stop"

$term = "C:\Users\peyre\AppData\Local\DayScalpTester\terminal64.exe"
$termDir = "C:\Users\peyre\AppData\Local\DayScalpTester"
$data = "C:\Users\peyre\AppData\Roaming\MetaQuotes\Terminal\26CADD140C1B23E1FEFB091ED54DF0DD"
$tester = Join-Path $data "MQL5\Profiles\Tester"
$setSrc = "C:\Users\peyre\Documents\GitHub\Grid\base.set"
$ex5 = Join-Path $data "MQL5\Experts\DynamicGridBB.ex5"
$outDir = "C:\Users\peyre\Documents\GitHub\Grid\reports\opt-base-20260901-20261113"
$log = Join-Path $outDir "run.log"
$py = "C:\Users\peyre\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\python.exe"
$convert = "C:\Users\peyre\AppData\Local\DayScalpTester\ob-runs\xml_to_xlsx.py"
$setName = "opt_grid_base.set"

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class StayAwake {
  [DllImport("kernel32.dll")]
  public static extern uint SetThreadExecutionState(uint esFlags);
}
"@

function Stay-Awake {
  $flags = [uint32]2147483648 -bor [uint32]1 -bor [uint32]64
  [StayAwake]::SetThreadExecutionState([uint32]$flags) | Out-Null
}

function Log([string]$message) {
  $line = "{0} {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $message
  Add-Content -Path $log -Value $line -Encoding utf8
  Write-Output $line
}

function Get-Tester {
  @(Get-CimInstance Win32_Process -Filter "Name = 'terminal64.exe'" | Where-Object { $_.ExecutablePath -eq $term })
}

function Wait-TesterFree {
  while ($true) {
    Stay-Awake
    $alive = Get-Tester
    if ($alive.Count -eq 0) { return }
    Log "waiting terminal pid=$($alive[0].ProcessId)"
    Start-Sleep -Seconds 30
  }
}

function Convert-Report([string]$reportName, [string]$xlsx, [string]$label) {
  $xml = $null
  $why = "missing"
  for ($i = 0; $i -lt 90; $i++) {
    foreach ($folder in @($data, $termDir)) {
      $candidate = Join-Path $folder "$reportName.xml"
      if (Test-Path $candidate) {
        $item = Get-Item $candidate
        $why = "$candidate bytes=$($item.Length)"
        if ($item.Length -gt 2000) { $xml = $candidate; break }
      }
    }
    if ($xml) { break }
    Start-Sleep -Seconds 2
  }
  if (-not $xml) { throw "report not ready $why" }
  Log "CONVERT $label $xml -> $xlsx"
  & $py $convert $xml $xlsx
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $xlsx) -or ((Get-Item $xlsx).Length -lt 2000)) {
    throw "excel was not saved for $label"
  }
  Log "EXCEL $label $xlsx bytes=$((Get-Item $xlsx).Length)"
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$ex5Item = Get-Item $ex5
Log "runner start deposit=18250 from=2026.09.01 to=2026.11.13 ex5=$($ex5Item.Length) written=$($ex5Item.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))"
Wait-TesterFree

Copy-Item $setSrc (Join-Path $tester $setName) -Force
$copied = [IO.File]::ReadAllText((Join-Path $tester $setName), [Text.Encoding]::Unicode)
$flags = @($copied -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -match "\|\|Y\s*$" })
if ($flags.Count -lt 1) { throw "no optimized inputs in $setName" }
Log ("SET " + ($flags -join " | "))

$symbols = @(
  @{ key = "US100"; symbol = "US100.cash"; excel = "US100.xlsx" },
  @{ key = "US500"; symbol = "US500.cash"; excel = "US500.xlsx" },
  @{ key = "EUR"; symbol = "EURUSD"; excel = "EUR.xlsx" },
  @{ key = "XAU"; symbol = "XAUUSD"; excel = "XAU.xlsx" },
  @{ key = "BTC"; symbol = "BTCUSD"; excel = "BTC.xlsx" },
  @{ key = "ETH"; symbol = "ETHUSD"; excel = "ETH.xlsx" }
)

foreach ($job in $symbols) {
  Stay-Awake
  $xlsx = Join-Path $outDir $job.excel
  if ((Test-Path $xlsx) -and ((Get-Item $xlsx).Length -gt 2000)) {
    Log "SKIP $($job.key) excel already saved $xlsx"
    continue
  }
  try {
    Wait-TesterFree
    $reportName = "opt_grid_base_$($job.key)_20260901_20261113"
    $iniPath = Join-Path $outDir "$reportName.ini"
    $ini = @"
[Tester]
Expert=DynamicGridBB.ex5
ExpertParameters=$setName
Symbol=$($job.symbol)
Period=M1
Optimization=2
Model=1
FromDate=2026.09.01
ToDate=2026.11.13
ForwardMode=0
Login=531454261
Deposit=18250
Currency=USD
ProfitInPips=0
Leverage=100
ExecutionMode=20
OptimizationCriterion=7
Visual=0
Report=$reportName
ReplaceReport=1
ShutdownTerminal=1
"@
    [IO.File]::WriteAllText($iniPath, $ini.Trim() + "`r`n", [Text.UTF8Encoding]::new($false))
    foreach ($folder in @($data, $termDir)) {
      $oldXml = Join-Path $folder "$reportName.xml"
      if (Test-Path $oldXml) { Remove-Item $oldXml -Force }
    }
    Log "START $($job.key) symbol=$($job.symbol) report=$reportName"
    $proc = Start-Process -FilePath $term -ArgumentList "/config:`"$iniPath`"" -WorkingDirectory $termDir -PassThru
    Log "PID $($proc.Id) $($job.key)"
    $proc.WaitForExit()
    Log "EXIT $($job.key) code=$($proc.ExitCode)"
    Convert-Report $reportName $xlsx $job.key
  } catch {
    Log "FAIL $($job.key) $($_.Exception.Message)"
    continue
  }
}

Stay-Awake
Log "ALL DONE"
[StayAwake]::SetThreadExecutionState([uint32]2147483648) | Out-Null
