import { Divider, Grid, H1, H2, Stack, Stat, Table, Text, useHostTheme } from "cursor/canvas";

type DayPnl = { date: string; pnl: number };
type SetResult = {
  id: string;
  symbol: string;
  net: number;
  green: number;
  red: number;
  trades: number;
  equity: number;
  days: DayPnl[];
};

const DATA: { sets: SetResult[]; drawdown: Record<string, number> } = {
  drawdown: {
    "2026.09.24": 13.96,
    "2026.09.25": 24.46,
    "2026.09.28": 1.92,
    "2026.09.29": 4.6,
    "2026.09.30": 60.98,
    "2026.10.02": 7.83,
    "2026.10.05": 3.95,
    "2026.10.08": 4.3,
    "2026.10.11": 2.43,
    "2026.10.12": 2.47,
    "2026.10.13": 8.02,
    "2026.10.14": 5.46,
    "2026.10.15": 31.27,
    "2026.10.21": 9.76,
    "2026.10.23": 26323.47,
    "2026.10.24": 2074.15,
  },
  sets: [
    {
      id: "EURUSD_250p",
      symbol: "EURUSD",
      net: 26550.79,
      green: 5,
      red: 9,
      trades: 80,
      equity: 6663.96,
      days: [
        { date: "2026.09.24", pnl: -26.01 },
        { date: "2026.09.25", pnl: -35.51 },
        { date: "2026.09.29", pnl: 10014.72 },
        { date: "2026.09.30", pnl: -63.19 },
        { date: "2026.10.01", pnl: 14295.18 },
        { date: "2026.10.02", pnl: -19.35 },
        { date: "2026.10.05", pnl: 4337.39 },
        { date: "2026.10.06", pnl: -4.05 },
        { date: "2026.10.08", pnl: -32.04 },
        { date: "2026.10.12", pnl: 2728.95 },
        { date: "2026.10.13", pnl: -17.33 },
        { date: "2026.10.14", pnl: 10097.93 },
        { date: "2026.10.15", pnl: -5.05 },
        { date: "2026.10.23", pnl: -14720.85 },
      ],
    },
    {
      id: "XAU_200p",
      symbol: "XAUUSD",
      net: 24145.18,
      green: 7,
      red: 2,
      trades: 290,
      equity: 12632.92,
      days: [
        { date: "2026.09.24", pnl: 2522.99 },
        { date: "2026.09.25", pnl: 1321.72 },
        { date: "2026.09.28", pnl: 6995.5 },
        { date: "2026.09.29", pnl: -4.6 },
        { date: "2026.10.06", pnl: 5398.96 },
        { date: "2026.10.07", pnl: 4006.88 },
        { date: "2026.10.14", pnl: 1420.2 },
        { date: "2026.10.22", pnl: 8190.52 },
        { date: "2026.10.23", pnl: -5706.99 },
      ],
    },
    {
      id: "BTC_50p",
      symbol: "BTCUSD",
      net: 12104.69,
      green: 23,
      red: 1,
      trades: 215,
      equity: 6352.14,
      days: [
        { date: "2026.09.24", pnl: 386.85 },
        { date: "2026.09.25", pnl: 188.01 },
        { date: "2026.09.28", pnl: 468.57 },
        { date: "2026.09.29", pnl: 216.93 },
        { date: "2026.09.30", pnl: 151.36 },
        { date: "2026.10.01", pnl: 68.85 },
        { date: "2026.10.02", pnl: 275.88 },
        { date: "2026.10.05", pnl: 206.83 },
        { date: "2026.10.07", pnl: 212.55 },
        { date: "2026.10.08", pnl: 637.99 },
        { date: "2026.10.09", pnl: 782.83 },
        { date: "2026.10.11", pnl: 299.32 },
        { date: "2026.10.12", pnl: 729.45 },
        { date: "2026.10.13", pnl: 1975.54 },
        { date: "2026.10.14", pnl: 878.49 },
        { date: "2026.10.15", pnl: 2003.69 },
        { date: "2026.10.16", pnl: 325.94 },
        { date: "2026.10.18", pnl: 320.67 },
        { date: "2026.10.19", pnl: 872.4 },
        { date: "2026.10.20", pnl: 560.77 },
        { date: "2026.10.21", pnl: 327.52 },
        { date: "2026.10.22", pnl: 2077.78 },
        { date: "2026.10.23", pnl: 210.62 },
        { date: "2026.10.24", pnl: -2074.15 },
      ],
    },
    {
      id: "US500_200p",
      symbol: "US500.cash",
      net: 17591.24,
      green: 11,
      red: 1,
      trades: 91,
      equity: 9960.97,
      days: [
        { date: "2026.09.24", pnl: 0 },
        { date: "2026.09.25", pnl: 2599.74 },
        { date: "2026.09.28", pnl: 0 },
        { date: "2026.09.29", pnl: 843.92 },
        { date: "2026.09.30", pnl: 421.79 },
        { date: "2026.10.01", pnl: 1596.59 },
        { date: "2026.10.02", pnl: 6413.17 },
        { date: "2026.10.05", pnl: 291.99 },
        { date: "2026.10.14", pnl: 0 },
        { date: "2026.10.15", pnl: 527.14 },
        { date: "2026.10.16", pnl: 4792.59 },
        { date: "2026.10.20", pnl: 1013.32 },
        { date: "2026.10.21", pnl: 3414 },
        { date: "2026.10.22", pnl: 1232.81 },
        { date: "2026.10.23", pnl: -5555.82 },
      ],
    },
  ],
};

const SETS: SetResult[] = DATA.sets;
const DAILY_DRAWDOWN = DATA.drawdown;

const RANGE_START = "2026.09.24";
const RANGE_END = "2026.10.24";
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseDay(s: string): Date {
  const [y, m, d] = s.split(".").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatDay(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function buildWeeks(): string[][] {
  const start = parseDay(RANGE_START);
  const end = parseDay(RANGE_END);
  const startDow = start.getUTCDay();
  const mondayOffset = startDow === 0 ? 6 : startDow - 1;
  let cursor = new Date(start.getTime() - mondayOffset * 86400000);
  const weeks: string[][] = [];
  while (cursor <= end) {
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      const inRange = cursor >= start && cursor <= end;
      week.push(inRange ? formatDay(cursor) : "");
      cursor = new Date(cursor.getTime() + 86400000);
    }
    weeks.push(week);
  }
  return weeks;
}

const WEEKS = buildWeeks();

type StackedDay = { date: string; pnl: number; green: number; red: number; grey: number };

function stackSets(sets: SetResult[]): StackedDay[] {
  const dates = new Set<string>();
  for (const set of sets) {
    for (const day of set.days) dates.add(day.date);
  }
  return [...dates].sort().map((date) => {
    let pnl = 0;
    let green = 0;
    let red = 0;
    let grey = 0;
    for (const set of sets) {
      const day = set.days.find((item) => item.date === date);
      if (!day || day.pnl === 0) {
        grey += 1;
      } else if (day.pnl > 0) {
        green += 1;
        pnl += day.pnl;
      } else {
        red += 1;
        pnl += day.pnl;
      }
    }
    return { date, pnl: Math.round(pnl * 100) / 100, green, red, grey };
  });
}

const STACKED = stackSets(SETS);

function summarise(days: StackedDay[]) {
  return {
    net: Math.round(days.reduce((sum, day) => sum + day.pnl, 0) * 100) / 100,
    green: days.filter((day) => day.pnl > 0).length,
    red: days.filter((day) => day.pnl < 0).length,
  };
}

const STACKED_SUMMARY = summarise(STACKED);

const MAX_DRAWDOWN: Record<string, { amount: number; date: string; daily: number; dailyDate: string }> = {
  EURUSD_250p: { amount: 14725.9, date: "2026.10.23", daily: 14720.85, dailyDate: "2026.10.23" },
  XAU_200p: { amount: 18113.98, date: "2026.10.23", daily: 5706.99, dailyDate: "2026.10.23" },
  BTC_50p: { amount: 2712.16, date: "2026.10.24", daily: 2074.15, dailyDate: "2026.10.24" },
  US500_200p: { amount: 7245.64, date: "2026.10.23", daily: 6106.25, dailyDate: "2026.10.23" },
};

function shortDate(date: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [, month, day] = date.split(".");
  return `${Number(day)} ${months[Number(month) - 1]}`;
}

function usd(n: number, digits: number): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  const body = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${sign}$${body}`;
}

function DayCell({
  date,
  pnl,
  mix,
  drawdown,
  large,
}: {
  date: string;
  pnl: number | undefined;
  mix?: { green: number; red: number; grey: number };
  drawdown?: number;
  large?: boolean;
}) {
  const theme = useHostTheme();
  if (!date) return <div />;
  const dayNum = Number(date.slice(8));
  const positive = pnl !== undefined && pnl > 0;
  const negative = pnl !== undefined && pnl < 0;
  const background = positive ? theme.diff.insertedLine : negative ? theme.diff.removedLine : theme.fill.tertiary;
  const valueColor = positive ? theme.diff.stripAdded : negative ? theme.diff.stripRemoved : theme.text.tertiary;
  return (
    <div
      style={{
        background,
        minHeight: large ? 108 : 52,
        padding: large ? "8px 8px" : "4px 6px",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <span style={{ color: theme.text.tertiary, fontSize: 11 }}>{dayNum}</span>
      {pnl !== undefined ? (
        <span style={{ color: valueColor, fontSize: large ? 16 : 12, fontWeight: 590, lineHeight: "20px" }}>
          {usd(pnl, 0)}
        </span>
      ) : null}
      {mix ? (
        <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 590 }}>
          <span style={{ color: theme.diff.stripAdded }}>{mix.green}</span>
          <span style={{ color: theme.text.quaternary }}> · </span>
          <span style={{ color: theme.diff.stripRemoved }}>{mix.red}</span>
          <span style={{ color: theme.text.quaternary }}> · </span>
          <span style={{ color: theme.text.tertiary }}>{mix.grey}</span>
        </span>
      ) : null}
      {drawdown !== undefined ? (
        <span style={{ color: theme.text.secondary, fontSize: 11, lineHeight: "14px" }}>
          DD {drawdown > 0 ? usd(-drawdown, 0) : usd(0, 0)}
        </span>
      ) : null}
    </div>
  );
}

function weekLabel(dates: string[]): string {
  const first = dates[0];
  const last = dates[dates.length - 1];
  if (first.slice(5, 7) === last.slice(5, 7)) {
    return `${Number(first.slice(8))}–${shortDate(last)}`;
  }
  return `${shortDate(first)} – ${shortDate(last)}`;
}

function WeekCell({ week, byDate }: { week: string[]; byDate: Map<string, StackedDay> }) {
  const theme = useHostTheme();
  const dates = week.filter((date) => date !== "");
  if (dates.length === 0) return <div />;
  let pnl = 0;
  let green = 0;
  let red = 0;
  let traded = false;
  for (const date of dates) {
    const day = byDate.get(date);
    if (!day) continue;
    traded = true;
    pnl += day.pnl;
    if (day.pnl > 0) green += 1;
    else if (day.pnl < 0) red += 1;
  }
  pnl = Math.round(pnl * 100) / 100;
  const positive = traded && pnl > 0;
  const negative = traded && pnl < 0;
  const background = positive ? theme.diff.insertedLine : negative ? theme.diff.removedLine : theme.fill.tertiary;
  const valueColor = positive ? theme.diff.stripAdded : negative ? theme.diff.stripRemoved : theme.text.tertiary;
  return (
    <div
      style={{
        background,
        minHeight: 108,
        padding: "8px 8px",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <span style={{ color: theme.text.tertiary, fontSize: 11 }}>{weekLabel(dates)}</span>
      <span style={{ color: valueColor, fontSize: 16, fontWeight: 590, lineHeight: "20px" }}>
        {traded ? usd(pnl, 0) : "—"}
      </span>
      {traded ? (
        <span style={{ color: theme.text.secondary, fontSize: 11, lineHeight: "14px" }}>
          {green} up · {red} down
        </span>
      ) : null}
    </div>
  );
}

function SetCalendar({ result }: { result: SetResult }) {
  const theme = useHostTheme();
  const byDate = new Map(result.days.map((d) => [d.date, d.pnl]));
  const dd = MAX_DRAWDOWN[result.id];
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <H2>
          {result.symbol} · {result.id}
        </H2>
        <Text size="small" tone="secondary">
          {usd(result.net, 2)} net · {result.green} green days · {result.red} red days · {result.trades} closed trades
          {dd
            ? ` · maximum drawdown ${usd(-dd.amount, 0)} on ${shortDate(dd.date)} · maximum daily drawdown ${usd(-dd.daily, 0)} on ${shortDate(dd.dailyDate)} · equity drawdown ${usd(-result.equity, 0)}`
            : ""}
        </Text>
      </Stack>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4 }}>
        {WEEKDAYS.map((label) => (
          <div key={label} style={{ color: theme.text.tertiary, fontSize: 11, padding: "0 4px" }}>
            {label}
          </div>
        ))}
        {WEEKS.flatMap((week, wi) =>
          week.map((date, di) => (
            <DayCell key={`${result.id}-${wi}-${di}`} date={date} pnl={date ? byDate.get(date) : undefined} />
          )),
        )}
      </div>
    </Stack>
  );
}

function StackedCalendar({
  title,
  days,
  summary,
  drawdown,
  detail,
}: {
  title: string;
  days: StackedDay[];
  summary: { net: number; green: number; red: number };
  drawdown: Record<string, number>;
  detail: string;
}) {
  const theme = useHostTheme();
  const byDate = new Map(days.map((day) => [day.date, day]));
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <H2>{title}</H2>
        <Text size="small" tone="secondary">
          {usd(summary.net, 2)} combined net · {summary.green} green days · {summary.red} red days. {detail} The column on the right is that week's combined closed P&L.
        </Text>
      </Stack>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr)) minmax(108px, 132px)", gap: 6 }}>
        {WEEKDAYS.map((label) => (
          <div key={`${title}-${label}`} style={{ color: theme.text.tertiary, fontSize: 11, padding: "0 4px" }}>
            {label}
          </div>
        ))}
        <div style={{ color: theme.text.tertiary, fontSize: 11, padding: "0 4px" }}>Week</div>
        {WEEKS.flatMap((week, weekIndex) => [
          ...week.map((date, dayIndex) => {
            const day = date ? byDate.get(date) : undefined;
            return (
              <DayCell
                key={`${title}-${weekIndex}-${dayIndex}`}
                date={date}
                pnl={day?.pnl}
                mix={day ? { green: day.green, red: day.red, grey: day.grey } : undefined}
                drawdown={day ? (drawdown[day.date] ?? 0) : undefined}
                large
              />
            );
          }),
          <WeekCell key={`${title}-week-${weekIndex}`} week={week} byDate={byDate} />,
        ])}
      </div>
    </Stack>
  );
}

export default function FtmoPnlCalendarGridOct24() {
  return (
    <Stack gap={24}>
      <Stack gap={6}>
        <H1>FTMO PnL Calendar · DynamicGridBB</H1>
        <Text tone="secondary">
          The four set files in the Grid folder, each run on its own 200,000 USD account from 24 Sep 2026 through 24 Oct 2026. The equity reserve is 180,000, so each grid trades the equity above that reserve. A day is green when closed profit, commission, and swap are above zero, and red when they are below zero.
        </Text>
        <Text size="small" tone="tertiary">
          Source: FTMO-Server3, DynamicGridBB, 1-minute OHLC, 24 Sep 2026 through 24 Oct 2026. 24 Oct is a Saturday, so only BTCUSD books a deal that day. A blank day had no deals. Maximum drawdown is the deepest drop from a closed-balance high, and it matches the tester balance drawdown. Maximum daily drawdown is the deepest drop from that day's starting balance. The DD in each cell is that day's drop. Equity drawdown is the tester's floating-equity figure. The Week column is that Monday–Sunday row's combined closed P&L. The four accounts are summed; they do not share one 200,000 balance.
        </Text>
      </Stack>
      <StackedCalendar
        title="All four sets together"
        days={STACKED}
        summary={STACKED_SUMMARY}
        drawdown={DAILY_DRAWDOWN}
        detail="The three numbers are sets that closed up, down, or flat. DD is the deepest drop in combined balance from that day's start."
      />
      <Grid columns={5} gap={16}>
        <Stat value={usd(STACKED_SUMMARY.net, 0)} label="Combined net, four sets" tone="success" />
        <Stat value={String(STACKED_SUMMARY.green)} label="Green days, stacked" tone="success" />
        <Stat value={String(STACKED_SUMMARY.red)} label="Red days, stacked" tone="danger" />
        <Stat value={usd(-38573.59, 0)} label="Maximum drawdown · 24 Oct" tone="danger" />
        <Stat value={usd(-26323.47, 0)} label="Maximum daily drawdown · 23 Oct" tone="danger" />
      </Grid>
      <Table
        headers={[
          "Set",
          "Symbol",
          "Net P&L",
          "Maximum drawdown",
          "Maximum daily drawdown",
          "Equity drawdown",
          "Green days",
          "Red days",
          "Closed trades",
        ]}
        columnAlign={["left", "left", "right", "right", "right", "right", "right", "right", "right"]}
        rowTone={SETS.map((set) => (set.net >= 0 ? "success" : "danger"))}
        rows={SETS.map((s) => [
          s.id,
          s.symbol,
          usd(s.net, 2),
          MAX_DRAWDOWN[s.id] ? usd(-MAX_DRAWDOWN[s.id].amount, 2) : "",
          MAX_DRAWDOWN[s.id] ? usd(-MAX_DRAWDOWN[s.id].daily, 2) : "",
          usd(-s.equity, 2),
          String(s.green),
          String(s.red),
          String(s.trades),
        ])}
      />
      <Divider />
      <Grid columns={2} gap={28}>
        {SETS.map((result) => (
          <SetCalendar key={result.id} result={result} />
        ))}
      </Grid>
    </Stack>
  );
}
