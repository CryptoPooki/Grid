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

type BookDay = { date: string; pnl: number; dd: number; legs: number[] };

const EQUITY_CLOSE = [181037.0, 182432.0, 182432.0, 182432.0, 182649.0, 182254.0, 183055.0, 184406.0, 183911.0, 183911.0, 183911.0, 183909.0, 184277.0, 186323.0, 187477.0, 188250.0, 188250.0, 188250.0, 190445.0, 192080.0, 194592.0, 195784.0, 194439.0, 194439.0, 194439.0, 196913.0, 196915.0, 201032.0, 202167.0, 202106.0, 202106.0];

const EQUITY_LOW = [180281.0, 181008.0, 182432.0, 182432.0, 182317.0, 182186.0, 182254.0, 182894.0, 183457.0, 183643.0, 183643.0, 183500.0, 183571.0, 183275.0, 185220.0, 184988.0, 187164.0, 187164.0, 187035.0, 188367.0, 190607.0, 191897.0, 191954.0, 193101.0, 193101.0, 192188.0, 193869.0, 194250.0, 198523.0, 194370.0, 200052.0];

const DAILY_LOSS = [119.0, 30.0, 0.0, 0.0, 115.0, 463.0, 0.0, 160.0, 950.0, 268.0, 268.0, 411.0, 338.0, 1001.0, 1103.0, 2489.0, 1086.0, 1086.0, 1215.0, 2078.0, 1473.0, 2696.0, 3830.0, 1338.0, 1338.0, 2251.0, 3044.0, 2666.0, 2510.0, 7797.0, 2055.0];

const LEG_NAMES = [
  "EURUSD breakout",
  "XAUUSD breakout",
  "US500 breakout",
  "US100 breakout",
  "EURUSD grid",
  "US500 grid"
];

const BOOK_DAYS: BookDay[] = [
  {
    "date": "2026.10.01",
    "pnl": 616.13,
    "dd": 119.43,
    "legs": [
      84.58,
      -74.62,
      395.76,
      162.61,
      0.0,
      47.8
    ]
  },
  {
    "date": "2026.10.02",
    "pnl": 1444.28,
    "dd": 29.57,
    "legs": [
      7.43,
      463.78,
      761.18,
      -15.98,
      69.6,
      158.27
    ]
  },
  {
    "date": "2026.10.03",
    "pnl": 0.0,
    "dd": 0.0,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.04",
    "pnl": 0.0,
    "dd": 0.0,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.05",
    "pnl": 475.76,
    "dd": 114.98,
    "legs": [
      346.47,
      66.26,
      53.04,
      -11.08,
      21.07,
      0.0
    ]
  },
  {
    "date": "2026.10.06",
    "pnl": 82.46,
    "dd": 462.52,
    "legs": [
      42.44,
      46.18,
      -38.76,
      -30.0,
      62.6,
      0.0
    ]
  },
  {
    "date": "2026.10.07",
    "pnl": 427.87,
    "dd": 0.0,
    "legs": [
      -28.24,
      314.49,
      -58.14,
      4.67,
      120.64,
      74.45
    ]
  },
  {
    "date": "2026.10.08",
    "pnl": 1095.64,
    "dd": 160.49,
    "legs": [
      -15.0,
      42.1,
      -48.45,
      330.91,
      786.08,
      0.0
    ]
  },
  {
    "date": "2026.10.09",
    "pnl": -49.93,
    "dd": 949.69,
    "legs": [
      -56.48,
      -42.64,
      -48.45,
      -22.5,
      120.14,
      0.0
    ]
  },
  {
    "date": "2026.10.10",
    "pnl": 0.0,
    "dd": 267.61,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.11",
    "pnl": 0.0,
    "dd": 267.61,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.12",
    "pnl": 303.89,
    "dd": 411.04,
    "legs": [
      12.4,
      -16.9,
      36.98,
      149.56,
      121.85,
      0.0
    ]
  },
  {
    "date": "2026.10.13",
    "pnl": 118.79,
    "dd": 337.95,
    "legs": [
      -42.36,
      -53.3,
      16.07,
      47.85,
      150.53,
      0.0
    ]
  },
  {
    "date": "2026.10.14",
    "pnl": 1328.16,
    "dd": 1001.39,
    "legs": [
      425.74,
      419.05,
      -48.45,
      16.97,
      186.04,
      328.81
    ]
  },
  {
    "date": "2026.10.15",
    "pnl": 1008.72,
    "dd": 1102.97,
    "legs": [
      0.0,
      96.56,
      -48.45,
      102.9,
      397.61,
      460.1
    ]
  },
  {
    "date": "2026.10.16",
    "pnl": 1615.14,
    "dd": 2488.73,
    "legs": [
      180.89,
      35.0,
      175.44,
      267.76,
      437.26,
      518.79
    ]
  },
  {
    "date": "2026.10.17",
    "pnl": 0.0,
    "dd": 1086.3,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.18",
    "pnl": 0.0,
    "dd": 1086.3,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.19",
    "pnl": 1271.6,
    "dd": 1214.96,
    "legs": [
      210.81,
      47.56,
      -96.9,
      -50.25,
      508.23,
      652.15
    ]
  },
  {
    "date": "2026.10.20",
    "pnl": 1419.02,
    "dd": 2078.17,
    "legs": [
      105.34,
      -31.98,
      -38.76,
      -22.5,
      1069.94,
      336.98
    ]
  },
  {
    "date": "2026.10.21",
    "pnl": 2627.42,
    "dd": 1472.9,
    "legs": [
      -56.48,
      -53.3,
      480.74,
      299.78,
      1578.28,
      378.4
    ]
  },
  {
    "date": "2026.10.22",
    "pnl": 2123.26,
    "dd": 2695.55,
    "legs": [
      126.94,
      156.64,
      -48.45,
      26.4,
      1418.68,
      443.05
    ]
  },
  {
    "date": "2026.10.23",
    "pnl": 405.95,
    "dd": 3830.25,
    "legs": [
      0.0,
      -42.56,
      -48.45,
      -15.0,
      202.59,
      309.37
    ]
  },
  {
    "date": "2026.10.24",
    "pnl": 0.0,
    "dd": 1337.69,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.25",
    "pnl": 0.0,
    "dd": 1337.69,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.26",
    "pnl": 1216.3,
    "dd": 2250.92,
    "legs": [
      -76.44,
      49.66,
      -96.9,
      155.63,
      900.45,
      283.9
    ]
  },
  {
    "date": "2026.10.27",
    "pnl": 1351.17,
    "dd": 3044.04,
    "legs": [
      25.29,
      -42.56,
      -48.45,
      75.46,
      267.11,
      1074.32
    ]
  },
  {
    "date": "2026.10.28",
    "pnl": 2688.39,
    "dd": 2665.54,
    "legs": [
      -16.81,
      -42.56,
      -48.45,
      -15.0,
      1985.34,
      825.87
    ]
  },
  {
    "date": "2026.10.29",
    "pnl": 3888.42,
    "dd": 2509.57,
    "legs": [
      -56.48,
      -42.56,
      -38.76,
      353.79,
      2369.13,
      1303.3
    ]
  },
  {
    "date": "2026.10.30",
    "pnl": -5806.86,
    "dd": 7797.37,
    "legs": [
      -17.47,
      138.6,
      154.28,
      122.03,
      -1581.33,
      -4622.97
    ]
  },
  {
    "date": "2026.10.31",
    "pnl": 0.0,
    "dd": 2054.68,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  }
];

const DAYS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31",
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function rounded(n: number): number {
  const whole = Math.round(n);
  return whole === 0 ? 0 : whole;
}

function usd(n: number): string {
  const whole = rounded(n);
  const sign = whole > 0 ? "+" : whole < 0 ? "\u2212" : "";
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

export default function BreakoutGridFtmo180400() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>October book for the $180,400 FTMO account</H1>
        <Text tone="secondary">
          Run four of the 0.5k breakout sets as saved, plus the EURUSD and
          US500 grids at their prepared divisors. From 1 Oct to 1 Nov 2026
          that mix made $19,652. The worst day gave back $7,797. Equity's low
          was $180,281, $281 above the $180,000 floor. The order book stayed
          under the 200 cap.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="$19,652" label="Net profit, October" tone="success" />
        <Stat value="$7,797" label="Worst day, 30 Oct" tone="warning" />
        <Stat value="$180,281" label="Lowest equity, 1 Oct" tone="warning" />
        <Stat value="$154,750" label="Free margin, lower bound" />
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
            yMin={178000}
            yMax={210000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day of October 2026 on the horizontal axis. Equity in USD. The danger
            line is the $180,000 maximum-loss floor. The month's low, $180,281,
            is on 1 Oct. Source: MT5 tests on FTMO symbols, 1-minute OHLC, 1:100,
            deposit $180,400.
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
            that server day, in USD. 30 Oct used $7,797 of the $9,000 daily limit.
          </Text>
        </Stack>
      </Grid>

      <Stack gap={8}>
        <H2>What to run</H2>
        <Text>
          Breakouts keep the saved 0.5k lots. Both grids keep the prepared
          divisors, the $180,000 reserve, the band settings, and the level
          count. At the open the cushion is $400, so those grids start small
          and grow only as the breakouts add equity. Gold and bitcoin grids
          cannot place their minimum volume on that open, so they stay off.
        </Text>
        <Table
          headers={["Leg", "Prepared set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EURUSD breakout", "05k / eurusd_84p_350p_0p09", "Saved. 0.83 lots, 30-bar channel, $10 stop, 4 entries", "$1,203"],
            ["XAUUSD breakout", "05k / XAU_83p_120p_0p11", "Saved. 0.12 lots, 10-bar channel, $10 stop, 4 entries", "$1,433"],
            ["US500 breakout", "05k / US500_80p_220p_0p32", "Saved. 25.5 lots, 10-bar channel, $10 stop, 5 entries", "$1,318"],
            ["US100 breakout", "05k / US100_83p_300p_0p16", "Saved. 1.5 lots, 10-bar channel, $10 stop, 5 entries", "$1,934"],
            ["EURUSD grid", "EURUSD_99p_220p_1p7", "Prepared divisors, buy 40 and sell 20. Reserve stays $180,000", "$11,192"],
            ["US500 grid", "US500_99p_150p_1p5", "Prepared divisors, buy 20 and sell 25. Reserve stays $180,000", "$2,573"],
          ]}
          striped
        />
        <Text tone="secondary">
          The four breakouts alone made $5,887, with a worst day of $177 on
          28 Oct. The two grids add $13,765. Together the peak of orders plus
          positions is at most 108, under the 200 cap.
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
          The gold, bitcoin, and bitcoin-weekend grids never opened a trade on
          the $180,400 test. The other two made money on their own and still
          break a limit once they share the account.
        </Text>
        <Table
          headers={["Set", "Alone in October", "Why it stays off"]}
          columnAlign={["left", "right", "left"]}
          rows={[
            ["GBPUSD breakout, 05k set, 1 lot", "$670", "Adding it puts 30 Oct at $8,796, $204 under the $9,000 cap. Left off so the worst day stays at $7,797."],
            ["XAUUSD grid", "$0", "0 trades. A $400 cushion cannot place the minimum gold volume."],
            ["BTCUSD grid", "$0", "0 trades. A $400 cushion cannot place the minimum bitcoin volume."],
            ["BTCUSD weekend grid", "$0", "0 trades. The tester reports each level needs $80 of margin, which this cushion does not have."],
            ["ETHUSD weekend grid", "$297", "140 trades, so the minimum volume does clear. Adding it makes 30 Oct a $15,688 day and pushes free margin through $50,000."],
          ]}
          striped
        />
      </Stack>

      <Callout tone="warning" title="The floor binds on the first day">
        On 1 Oct equity reached $180,281, which is $281 above $180,000, before
        the month's profits had built a cushion. 30 Oct is the daily-limit day:
        it closed −$5,807 and equity gave back $7,797 from midnight. There is
        $1,203 of room under the $9,000 limit. GBPUSD's extra $670 would spend
        that room down to $204, so it stays off.
      </Callout>

      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs from 1 Oct 2026 to 1 Nov 2026, model
        1-minute OHLC, FTMO-Server symbols, leverage 1:100, deposit $180,400.
        Grid lots follow equity minus the $180,000 reserve, trade by trade, so
        a grid that cannot meet the minimum volume at the open is left off even
        if a larger account would trade it. Daily loss is midnight server equity
        versus the lowest equity in the next 24 hours, with each strategy's worst
        tick inside a 5-minute bucket allowed to land together. Free margin is a
        lower bound from each test's minimum margin level. This is not a single
        test with all six experts on one chart.
      </Text>
    </Stack>
  );
}
