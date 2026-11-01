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

const EQUITY_CLOSE = [187410.0, 196303.0, 196303.0, 196303.0, 203852.0, 207639.0, 216912.0, 220366.0, 213459.0, 213459.0, 213459.0, 220175.0, 219492.0, 248533.0, 247697.0, 252573.0, 252573.0, 252573.0, 260821.0, 270649.0, 268988.0, 279787.0, 277444.0, 277444.0, 277444.0, 279017.0, 282402.0, 282091.0, 295111.0, 298925.0, 298925.0];

const EQUITY_LOW = [183749.0, 186934.0, 196303.0, 196303.0, 196303.0, 203669.0, 207639.0, 216912.0, 211995.0, 213459.0, 213459.0, 209479.0, 215541.0, 219492.0, 248275.0, 247290.0, 252573.0, 252573.0, 252436.0, 260821.0, 270649.0, 268988.0, 279787.0, 277444.0, 277444.0, 277444.0, 279017.0, 282402.0, 282091.0, 295111.0, 298925.0];

const DAILY_LOSS = [1251.0, 476.0, 0.0, 0.0, 0.0, 183.0, 0.0, 0.0, 8371.0, 0.0, 0.0, 3980.0, 4634.0, 0.0, 258.0, 407.0, 0.0, 0.0, 136.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

const LEG_NAMES = [
  "EURUSD breakout",
  "XAUUSD breakout",
  "US100 breakout",
  "GBPUSD breakout",
  "XAUUSD grid"
];

const BOOK_DAYS: BookDay[] = [
  {
    "date": "2026.10.01",
    "pnl": 2346.51,
    "dd": 1251.01,
    "legs": [
      2612.5,
      -781.58,
      585.75,
      -70.0,
      -0.16
    ]
  },
  {
    "date": "2026.10.02",
    "pnl": 8599.11,
    "dd": 476.48,
    "legs": [
      0.0,
      7861.47,
      -300.0,
      -300.0,
      1337.64
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
      0.0
    ]
  },
  {
    "date": "2026.10.05",
    "pnl": 7913.7,
    "dd": 0.0,
    "legs": [
      4322.5,
      1500.65,
      48.75,
      1620.0,
      421.8
    ]
  },
  {
    "date": "2026.10.06",
    "pnl": 3251.1,
    "dd": 183.19,
    "legs": [
      389.5,
      1033.78,
      -248.25,
      140.0,
      1936.07
    ]
  },
  {
    "date": "2026.10.07",
    "pnl": 12588.55,
    "dd": 0.0,
    "legs": [
      -304.0,
      5373.58,
      -271.5,
      -300.0,
      8090.47
    ]
  },
  {
    "date": "2026.10.08",
    "pnl": 2591.95,
    "dd": 0.0,
    "legs": [
      -304.0,
      112.24,
      3084.0,
      -300.0,
      -0.29
    ]
  },
  {
    "date": "2026.10.09",
    "pnl": -388.19,
    "dd": 8371.21,
    "legs": [
      294.5,
      -446.9,
      -300.0,
      70.0,
      -5.79
    ]
  },
  {
    "date": "2026.10.10",
    "pnl": 0.0,
    "dd": 0.0,
    "legs": [
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
    "dd": 0.0,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.12",
    "pnl": 3143.93,
    "dd": 3979.97,
    "legs": [
      19.0,
      114.02,
      2242.5,
      240.0,
      528.41
    ]
  },
  {
    "date": "2026.10.13",
    "pnl": -1927.94,
    "dd": 4633.99,
    "legs": [
      -456.0,
      -558.44,
      -613.5,
      -300.0,
      0.0
    ]
  },
  {
    "date": "2026.10.14",
    "pnl": 27194.94,
    "dd": 0.0,
    "legs": [
      4512.5,
      7182.02,
      -776.85,
      5550.0,
      10727.27
    ]
  },
  {
    "date": "2026.10.15",
    "pnl": 2386.46,
    "dd": 257.92,
    "legs": [
      -152.0,
      1807.38,
      1032.75,
      -300.0,
      -1.67
    ]
  },
  {
    "date": "2026.10.16",
    "pnl": 2141.12,
    "dd": 407.32,
    "legs": [
      769.5,
      715.31,
      960.75,
      -300.0,
      -4.44
    ]
  },
  {
    "date": "2026.10.17",
    "pnl": 0.0,
    "dd": 0.0,
    "legs": [
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
    "dd": 0.0,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.19",
    "pnl": 1741.59,
    "dd": 136.14,
    "legs": [
      1643.5,
      300.59,
      97.5,
      -300.0,
      0.0
    ]
  },
  {
    "date": "2026.10.20",
    "pnl": 8894.11,
    "dd": 0.0,
    "legs": [
      1472.5,
      -334.77,
      3160.5,
      2090.0,
      2505.88
    ]
  },
  {
    "date": "2026.10.21",
    "pnl": 3913.32,
    "dd": 0.0,
    "legs": [
      -152.0,
      -557.84,
      1586.43,
      240.0,
      2796.73
    ]
  },
  {
    "date": "2026.10.22",
    "pnl": 21150.98,
    "dd": 0.0,
    "legs": [
      1786.0,
      2808.52,
      -36.0,
      -300.0,
      16892.46
    ]
  },
  {
    "date": "2026.10.23",
    "pnl": -1060.83,
    "dd": 0.0,
    "legs": [
      -152.0,
      -445.08,
      -273.75,
      -190.0,
      0.0
    ]
  },
  {
    "date": "2026.10.24",
    "pnl": 0.0,
    "dd": 0.0,
    "legs": [
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
    "dd": 0.0,
    "legs": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.26",
    "pnl": 793.54,
    "dd": 0.0,
    "legs": [
      -503.5,
      1224.29,
      672.75,
      -600.0,
      0.0
    ]
  },
  {
    "date": "2026.10.27",
    "pnl": 1216.92,
    "dd": 0.0,
    "legs": [
      -166.25,
      -445.06,
      2131.5,
      -300.0,
      -3.27
    ]
  },
  {
    "date": "2026.10.28",
    "pnl": -566.08,
    "dd": 0.0,
    "legs": [
      -125.3,
      -445.3,
      -600.0,
      610.0,
      -5.48
    ]
  },
  {
    "date": "2026.10.29",
    "pnl": 2763.13,
    "dd": 0.0,
    "legs": [
      -479.75,
      -444.98,
      3687.86,
      0.0,
      0.0
    ]
  },
  {
    "date": "2026.10.30",
    "pnl": 10341.36,
    "dd": 0.0,
    "legs": [
      -368.6,
      1461.66,
      -1032.0,
      -300.0,
      10580.3
    ]
  },
  {
    "date": "2026.10.31",
    "pnl": 0.0,
    "dd": 0.0,
    "legs": [
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

export default function BreakoutGridFtmo185k() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>October book for the $185k FTMO account</H1>
        <Text tone="secondary">
          Run four of the 5k breakout sets as saved, and the gold grid at half
          the prepared lot. From 1 Oct to 1 Nov 2026 that mix made $119,029.
          The worst day gave back $8,371, equity stayed at $183,749 or better,
          and the order book stayed under the 200 cap.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="$119,029" label="Net profit, October" tone="success" />
        <Stat value="$8,371" label="Worst day, 9 Oct" tone="warning" />
        <Stat value="$183,749" label="Lowest equity" tone="success" />
        <Stat value="$116,129" label="Free margin, lower bound" />
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
            yMax={320000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day of October 2026 on the horizontal axis. Equity in USD. The danger
            line is the $180,000 maximum-loss floor. Source: MT5 tests on FTMO
            symbols, 1-minute OHLC, 1:100, deposit $185,000.
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
            that server day, in USD. 9 Oct used $8,371 of the $9,000 daily limit.
          </Text>
        </Stack>
      </Grid>

      <Stack gap={8}>
        <H2>What to run</H2>
        <Text>
          Breakouts keep the saved 5k lots. The gold grid keeps the $180,000
          reserve, the band settings, and the level count. Only its margin
          divisors change. EURUSD, US100, and GBPUSD have no grid in this book.
          XAUUSD runs both faces.
        </Text>
        <Table
          headers={["Leg", "Prepared set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EURUSD breakout", "5k / EURUSD_84p_300p_1p", "Saved. 9.5 lots, 50-bar channel, $100 stop, 5 entries", "$14,659"],
            ["XAUUSD breakout", "5k / XAU_84p_550p_2p", "Saved. 2 lots, 10-bar channel, $100 stop, 4 entries", "$27,036"],
            ["US100 breakout", "5k / US100_93p_150p_1p", "Saved. 15 lots, 10-bar channel, $300 stop, 3 entries", "$14,839"],
            ["GBPUSD breakout", "5k / GBPUSD_83p_200p_1p", "Saved. 10 lots, 20-bar channel, $100 stop, 2 entries", "$6,700"],
            ["XAUUSD grid", "XAU_96p_400p_2p", "Buy divisor 120, sell divisor 40. Half the prepared lot. Reserve stays $180,000", "$55,796"],
          ]}
          striped
        />
        <Text tone="secondary">
          The four breakouts alone made $63,233, with a worst day of $1,928 on
          13 Oct. The half-size gold grid adds $55,796. Together the peak of
          orders plus positions is at most 56, under the 200 cap.
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
          Quarter, half, and full grid size were all in the search. The book
          above is the highest October profit that keeps the worst day at
          $8,500 or under, equity above $180,000, free margin above $50,000,
          and the order count at 200 or under.
        </Text>
        <Table
          headers={["Set", "Alone in October", "Why it stays off"]}
          columnAlign={["left", "right", "left"]}
          rows={[
            ["US500 breakout, 5k set, 300 lots", "$17,392", "Adding it makes 9 Oct a $13,069 day."],
            ["ETHUSD breakout, 5k set, 5 lots", "$8,548", "Stop is $700. Adding it makes 9 Oct a $9,685 day."],
            ["EURUSD grid, prepared divisors", "$8,739", "It trades at this deposit. On the grown account the same divisors size it off the larger cushion, and 30 Oct runs through the daily limit."],
            ["US500 grid, prepared divisors", "$3,678", "Same sizing problem once the cushion has grown. The daily limit and the free-margin line both break."],
            ["BTCUSD grid, prepared divisors", "$3,701", "Same sizing problem once the cushion has grown. Margin on the larger account exceeds the free-margin line."],
            ["ETHUSD weekend grid", "$7,226", "Margin level 294% on the $185k test. On the grown account the margin and the daily loss both break the rules."],
            ["BTCUSD weekend grid", "$6,273", "Margin level 218% on the $185k test. On the grown account the margin and the daily loss both break the rules."],
          ]}
          striped
        />
      </Stack>

      <Callout tone="warning" title="9 Oct is the day that sizes the book">
        The day closed −$388, so the calendar cell is red, while equity gave
        back $8,371 from midnight. There is $629 of room under the daily limit.
        That room is the model's margin, not unused capacity to size up.
      </Callout>

      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs from 1 Oct 2026 to 1 Nov 2026, model
        1-minute OHLC, FTMO-Server symbols, leverage 1:100, deposit $185,000.
        Grid lots follow equity minus the $180,000 reserve, trade by trade, so
        the gold grid grows only after the breakouts have added equity. Daily
        loss is midnight server equity versus the lowest equity in the next 24
        hours, with each strategy's worst tick inside a 5-minute bucket allowed
        to land together. Free margin is a lower bound from each test's minimum
        margin level. This is not a single test with all five experts on one chart.
      </Text>
    </Stack>
  );
}
