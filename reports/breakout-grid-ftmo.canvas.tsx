import {
  BarChart,
  Callout,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

const DAYS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31",
];

const EQUITY_CLOSE = [
  202505, 220426, 220373, 220259, 235007, 238474, 255235, 262519, 256642, 256634,
  256476, 261058, 263382, 302941, 311484, 326689, 326660, 327018, 335029, 341393,
  344641, 364985, 363742, 363627, 363620, 370812, 370060, 376333, 381267, 397147, 397184,
];

const EQUITY_LOW = [
  198447, 201144, 220347, 220250, 218853, 234186, 237971, 254210, 254637, 256625,
  255838, 252971, 258328, 261597, 302068, 305554, 326689, 326474, 327018, 332254,
  340950, 344035, 363831, 363742, 363627, 359739, 368767, 368898, 374242, 376987, 397147,
];

const DAILY_LOSS = [
  1553, 1361, 78, 123, 1407, 822, 504, 1025, 7883, 17,
  796, 3505, 2730, 1785, 873, 5930, 0, 186, 0, 2775,
  443, 606, 1154, 0, 0, 3881, 2046, 1162, 2091, 4279, 0,
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type BookDay = { date: string; pnl: number; dd: number; legs: number[] };

const BOOK_DAYS: BookDay[] = [
  { date: "2026.10.01", pnl: 3364.29, dd: 1552.61, legs: [620, -863.16, 3393, 160.54, -0.32, 54.23] },
  { date: "2026.10.02", pnl: 17434.95, dd: 1360.48, legs: [2160, 10774.88, 2177, 798.95, 1305.7, 218.42] },
  { date: "2026.10.03", pnl: 0.77, dd: 78.31, legs: [0, 0, 0, -1.25, -1.7, 3.72] },
  { date: "2026.10.04", pnl: 0.43, dd: 123.33, legs: [0, 0, 0, -2.7, -3.67, 6.8] },
  { date: "2026.10.05", pnl: 16264.88, dd: 1406.46, legs: [9420, 3601.31, 1220.2, 727.92, 871.62, 423.83] },
  { date: "2026.10.06", pnl: 4343.78, dd: 821.85, legs: [2880, -616.44, -600, 1048.24, 1385.6, 246.38] },
  { date: "2026.10.07", pnl: 19399.5, dd: 503.9, legs: [520, 10947.12, -237.8, 1491.31, 6407.58, 271.29] },
  { date: "2026.10.08", pnl: 6497.16, dd: 1025.19, legs: [-1800, 624.47, 4892.2, 2174.9, 467.49, 138.1] },
  { date: "2026.10.09", pnl: 1224.28, dd: 7882.47, legs: [-1280, -493.78, -800, -184.5, 3978.62, 3.94] },
  { date: "2026.10.10", pnl: -5.77, dd: 17.09, legs: [0, 0, 0, -0.62, -1.44, -3.71] },
  { date: "2026.10.11", pnl: -15.6, dd: 796.45, legs: [0, 0, 0, -12.86, -29.82, 27.08] },
  { date: "2026.10.12", pnl: 722.72, dd: 3504.98, legs: [-480, 828.04, 1494, 1467.82, -3045.86, 458.72] },
  { date: "2026.10.13", pnl: -1062.76, dd: 2730.18, legs: [-80, -616.86, 238, 124.35, -990.34, 262.09] },
  { date: "2026.10.14", pnl: 42362.34, dd: 1784.81, legs: [11000, 14664.05, 3179.2, 5280.85, 6871.67, 1366.57] },
  { date: "2026.10.15", pnl: 9304.82, dd: 873.06, legs: [0, 3914.79, 1172, 670.81, 3319.6, 227.62] },
  { date: "2026.10.16", pnl: 15002.48, dd: 5929.85, legs: [1980, 1630.61, 7001, 3325.82, 342.19, 722.86] },
  { date: "2026.10.17", pnl: 0.95, dd: 0, legs: [0, 0, 0, -3.37, -4.13, 8.45] },
  { date: "2026.10.18", pnl: 441.58, dd: 185.64, legs: [0, 0, 0, 41.69, 50.98, 348.91] },
  { date: "2026.10.19", pnl: 591.13, dd: 0, legs: [4180, -658.8, -1170, 519.11, -2795.93, 516.75] },
  { date: "2026.10.20", pnl: 6285.99, dd: 2774.59, legs: [3400, -369.53, -700, 2150.65, 1047.05, 757.82] },
  { date: "2026.10.21", pnl: 9079.23, dd: 442.99, legs: [-560, -615.69, 3797.03, 1590.79, 3635.47, 1231.63] },
  { date: "2026.10.22", pnl: 25427, dd: 606.21, legs: [2360, 5917.06, 789.2, 3853.93, 12466.56, 40.25] },
  { date: "2026.10.23", pnl: -549.72, dd: 1154.27, legs: [0, -490.23, -600, -96.55, 656.2, -19.14] },
  { date: "2026.10.24", pnl: 8.96, dd: 0, legs: [0, 0, 0, -15.65, -22.38, 46.99] },
  { date: "2026.10.25", pnl: 0.58, dd: 0, legs: [0, 0, 0, -1.01, -1.44, 3.03] },
  { date: "2026.10.26", pnl: 6903.62, dd: 3880.81, legs: [-2160, 3048.64, 2851, 1844.05, 807.8, 512.13] },
  { date: "2026.10.27", pnl: 2375.8, dd: 2045.57, legs: [660, -490.15, 606, 2796.03, -1260.14, 64.06] },
  { date: "2026.10.28", pnl: 3807.45, dd: 1161.55, legs: [1360, -490.59, -500, 1398.28, 1302.14, 737.62] },
  { date: "2026.10.29", pnl: 3000.79, dd: 2090.69, legs: [-1380, -490.01, 4517.14, 6240.49, -6744.47, 857.64] },
  { date: "2026.10.30", pnl: 6871.89, dd: 4279.37, legs: [2760, 3223.3, 1127, -9600.45, 8487.94, 874.1] },
  { date: "2026.10.31", pnl: -1175.2, dd: 0, legs: [0, 0, 0, 4.75, 6.58, -1186.53] },
];

const LEG_NAMES = [
  "EURUSD breakout",
  "XAUUSD breakout",
  "US100 breakout",
  "EURUSD grid",
  "XAUUSD grid",
  "BTCUSD grid",
];

function rounded(n: number): number {
  const whole = Math.round(n);
  return whole === 0 ? 0 : whole;
}

function usd(n: number): string {
  const whole = rounded(n);
  const sign = whole > 0 ? "+" : whole < 0 ? "−" : "";
  return `${sign}$${Math.abs(whole).toLocaleString("en-US")}`;
}

function buildWeeks(): string[][] {
  const start = new Date(Date.UTC(2026, 9, 1));
  const end = new Date(Date.UTC(2026, 9, 31));
  const startDow = start.getUTCDay();
  const mondayOffset = startDow === 0 ? 6 : startDow - 1;
  let cursor = new Date(start.getTime() - mondayOffset * 86400000);
  const weeks: string[][] = [];
  while (cursor <= end) {
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      const inRange = cursor >= start && cursor <= end;
      const y = cursor.getUTCFullYear();
      const m = String(cursor.getUTCMonth() + 1).padStart(2, "0");
      const d = String(cursor.getUTCDate()).padStart(2, "0");
      week.push(inRange ? `${y}.${m}.${d}` : "");
      cursor = new Date(cursor.getTime() + 86400000);
    }
    weeks.push(week);
  }
  return weeks;
}

const WEEKS = buildWeeks();

function mixOf(legs: number[]): { green: number; red: number; grey: number } {
  let green = 0;
  let red = 0;
  let grey = 0;
  for (const leg of legs) {
    const whole = rounded(leg);
    if (whole > 0) green += 1;
    else if (whole < 0) red += 1;
    else grey += 1;
  }
  return { green, red, grey };
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
  const whole = pnl === undefined ? undefined : rounded(pnl);
  const positive = whole !== undefined && whole > 0;
  const negative = whole !== undefined && whole < 0;
  const background = positive ? theme.diff.insertedLine : negative ? theme.diff.removedLine : theme.fill.tertiary;
  const valueColor = positive ? theme.diff.stripAdded : negative ? theme.diff.stripRemoved : theme.text.tertiary;
  return (
    <div
      style={{
        background,
        minHeight: large ? 108 : 64,
        padding: large ? "8px 8px" : "6px 6px",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <span style={{ color: theme.text.tertiary, fontSize: 11 }}>{Number(date.slice(8))}</span>
      {pnl !== undefined ? (
        <span style={{ color: valueColor, fontSize: large ? 16 : 13, fontWeight: 590, lineHeight: "20px" }}>
          {usd(pnl)}
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
          DD {usd(-drawdown)}
        </span>
      ) : null}
    </div>
  );
}

function weekLabel(dates: string[]): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const first = dates[0];
  const last = dates[dates.length - 1];
  const lastLabel = `${Number(last.slice(8))} ${months[Number(last.slice(5, 7)) - 1]}`;
  if (first.slice(5, 7) === last.slice(5, 7)) return `${Number(first.slice(8))}–${lastLabel}`;
  const firstLabel = `${Number(first.slice(8))} ${months[Number(first.slice(5, 7)) - 1]}`;
  return `${firstLabel} – ${lastLabel}`;
}

function WeekCell({ week }: { week: string[] }) {
  const theme = useHostTheme();
  const dates = week.filter((date) => date !== "");
  if (dates.length === 0) return <div />;
  const byDate = new Map(BOOK_DAYS.map((day) => [day.date, day]));
  let pnl = 0;
  let up = 0;
  let down = 0;
  for (const date of dates) {
    const day = byDate.get(date);
    if (!day) continue;
    pnl += day.pnl;
    const whole = rounded(day.pnl);
    if (whole > 0) up += 1;
    else if (whole < 0) down += 1;
  }
  const whole = rounded(pnl);
  const positive = whole > 0;
  const negative = whole < 0;
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
      <span style={{ color: valueColor, fontSize: 16, fontWeight: 590, lineHeight: "20px" }}>{usd(pnl)}</span>
      <span style={{ color: theme.text.secondary, fontSize: 11, lineHeight: "14px" }}>
        {up} up · {down} down
      </span>
    </div>
  );
}

function BookCalendar() {
  const theme = useHostTheme();
  const byDate = new Map(BOOK_DAYS.map((day) => [day.date, day]));
  const green = BOOK_DAYS.filter((day) => rounded(day.pnl) > 0).length;
  const red = BOOK_DAYS.filter((day) => rounded(day.pnl) < 0).length;
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <H2>October P&L calendar</H2>
        <Text size="small" tone="secondary">
          {usd(BOOK_DAYS.reduce((sum, day) => sum + day.pnl, 0))} closed · {green} green days · {red} red days.
          The three numbers are legs that closed up, down, or flat. DD is that day's drop from midnight equity.
          The Week column is Monday–Sunday closed P&L.
        </Text>
      </Stack>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr)) minmax(108px, 132px)", gap: 6 }}>
        {WEEKDAYS.map((label) => (
          <div key={label} style={{ color: theme.text.tertiary, fontSize: 11, padding: "0 4px" }}>
            {label}
          </div>
        ))}
        <div style={{ color: theme.text.tertiary, fontSize: 11, padding: "0 4px" }}>Week</div>
        {WEEKS.flatMap((week, weekIndex) => [
          ...week.map((date, dayIndex) => {
            const day = date ? byDate.get(date) : undefined;
            return (
              <DayCell
                key={`${weekIndex}-${dayIndex}`}
                date={date}
                pnl={day?.pnl}
                mix={day ? mixOf(day.legs) : undefined}
                drawdown={day?.dd}
                large
              />
            );
          }),
          <WeekCell key={`week-${weekIndex}`} week={week} />,
        ])}
      </div>
    </Stack>
  );
}

function LegCalendar({ index }: { index: number }) {
  const theme = useHostTheme();
  const name = LEG_NAMES[index];
  const byDate = new Map(BOOK_DAYS.map((day) => [day.date, day.legs[index]]));
  const values = BOOK_DAYS.map((day) => day.legs[index]);
  const net = values.reduce((sum, value) => sum + value, 0);
  const green = values.filter((value) => rounded(value) > 0).length;
  const red = values.filter((value) => rounded(value) < 0).length;
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <H3>{name}</H3>
        <Text size="small" tone="secondary">
          {usd(net)} closed · {green} green days · {red} red days
        </Text>
      </Stack>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4 }}>
        {WEEKDAYS.map((label) => (
          <div key={`${name}-${label}`} style={{ color: theme.text.tertiary, fontSize: 11, padding: "0 4px" }}>
            {label}
          </div>
        ))}
        {WEEKS.flatMap((week, weekIndex) =>
          week.map((date, dayIndex) => (
            <DayCell key={`${name}-${weekIndex}-${dayIndex}`} date={date} pnl={date ? byDate.get(date) : undefined} />
          )),
        )}
      </div>
    </Stack>
  );
}

export default function BreakoutGridFtmo() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>October book for the $200k FTMO account</H1>
        <Text tone="secondary">
          Run the three 10k breakout sets as saved, and three grids at a fraction of
          the prepared lot. From 1 Oct to 1 Nov 2026 that mix made $197,908. The
          worst day gave back $7,883, equity stayed at $198,447 or better, and the
          order book stayed under the 200 cap.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="$197,908" label="Net profit, October" tone="success" />
        <Stat value="$7,883" label="Worst day, 9 Oct" tone="warning" />
        <Stat value="$198,447" label="Lowest equity" tone="success" />
        <Stat value="$68,323" label="Free margin, lower bound" />
      </Grid>

      <BookCalendar />

      <Grid columns={2} gap={20}>
        <Stack gap={8}>
          <H3>Account equity through October</H3>
          <LineChart
            categories={DAYS}
            series={[
              { name: "Equity at day close", data: EQUITY_CLOSE, tone: "success" },
              { name: "Lowest equity that day", data: EQUITY_LOW, tone: "warning" },
            ]}
            beginAtZero={false}
            yMin={175000}
            yMax={420000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day of October 2026 on the horizontal axis. Equity in USD. The danger
            line is the $180,000 maximum-loss floor. Source: MT5 tests on FTMO
            symbols, 1-minute OHLC, 1:100, deposit $200,000.
          </Text>
        </Stack>
        <Stack gap={8}>
          <H3>Daily equity loss against the $9,000 limit</H3>
          <BarChart
            categories={DAYS}
            series={[{ name: "Loss from midnight equity", data: DAILY_LOSS, tone: "warning" }]}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 9000, label: "$9,000 limit", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day of October 2026. Loss is midnight equity minus the lowest equity
            that server day, in USD. 9 Oct used $7,883 of the $9,000 daily limit.
          </Text>
        </Stack>
      </Grid>

      <Stack gap={8}>
        <H2>What to run</H2>
        <Text>
          Breakouts keep the saved lots. Grids keep the $180,000 reserve, the band
          settings, and the level count. Only the margin divisors change, which
          cuts the lot to the share below. On EURUSD and XAUUSD both faces run
          together. US100 has no grid in this book. BTCUSD has no breakout set.
        </Text>
        <Table
          headers={["Leg", "Prepared set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EURUSD breakout", "10k / EURUSD_90p_325p_2p4", "Saved. 20 lots, 40-bar channel, $800 stop, 2 entries", "$35,560"],
            ["XAUUSD breakout", "10k / XAU_84p_500p_3p6", "Saved. 4 lots, 10-bar channel, $100 stop, 4 entries", "$52,979"],
            ["US100 breakout", "10k / US100_84p_300p_1p6", "Saved. 20 lots, 10-bar channel, $100 stop, 8 entries", "$33,846"],
            ["EURUSD grid", "EURUSD_99p_220p_1p7", "Buy divisor 200, sell divisor 100. One fifth of the prepared lot", "$27,792"],
            ["XAUUSD grid", "XAU_96p_400p_2p", "Buy divisor 300, sell divisor 100. One fifth of the prepared lot", "$38,509"],
            ["BTCUSD grid", "BTCUSD_99p_100p_1p", "Buy divisor 500, sell divisor 50. One tenth of the prepared lot", "$9,222"],
          ]}
          striped
        />
        <Text tone="secondary">
          The three breakouts alone made $122,385, with a worst day of $2,683.
          The three scaled grids add $75,523. Together the peak of orders plus
          positions is at most 162, under the 200 cap.
        </Text>
      </Stack>

      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {LEG_NAMES.map((name, index) => (
          <LegCalendar key={name} index={index} />
        ))}
      </Grid>

      <Divider />

      <Stack gap={8}>
        <H2>Left off</H2>
        <Text>
          Each of these made money on its own. Each one also breaks a limit once
          it shares the account with the book above.
        </Text>
        <Table
          headers={["Set", "Alone in October", "Why it stays off"]}
          columnAlign={["left", "right", "left"]}
          rows={[
            ["US500 breakout, 5k set, 300 lots", "$17,392", "Margin level 432%. About $50k of margin, which lands free margin on the $50k line."],
            ["US500 grid, prepared divisors", "$14,754", "Worst day $17,499. That is the daily limit twice, before any other leg."],
            ["XAUUSD grid at the prepared size", "$156,296", "Worst day $22,118. The book keeps one fifth of that size."],
            ["EURUSD grid at the prepared size", "$35,530", "Worst day $8,771. Little room left for gold or bitcoin."],
            ["ETHUSD weekend grid", "$28,727", "Margin level 94%. Margin exceeded equity."],
            ["BTCUSD weekend grid", "$24,299", "Margin level 96%, and a $10,415 day."],
            ["0.5k and 5k breakout tiers", "Less than the 10k sets", "Same symbols as the 10k breakouts. The larger saved lots already fit."],
          ]}
          striped
        />
      </Stack>

      <Callout tone="warning" title="9 Oct is the day that sizes the book">
        The day closed +$1,224, so the calendar cell is green, while equity
        gave back $7,883 from midnight. Equity opened near $262,500 and the
        low was about $254,600. There is $1,117 of room under the daily limit.
        That room is the model's margin, not unused capacity to size up.
      </Callout>

      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs from 1 Oct 2026 to 1 Nov 2026, model
        1-minute OHLC, 100% history quality, FTMO-Server symbols, leverage 1:100.
        Grid lots are resized from account equity minus the $180,000 reserve, so
        the mix lets those grids grow as the breakouts add equity. Daily loss is
        midnight server equity versus the lowest equity in the next 24 hours,
        with each strategy's worst tick inside a 5-minute bucket allowed to land
        together. Free margin is a lower bound from each test's minimum margin
        level. This is not a single test with all six experts on one chart.
      </Text>
    </Stack>
  );
}
