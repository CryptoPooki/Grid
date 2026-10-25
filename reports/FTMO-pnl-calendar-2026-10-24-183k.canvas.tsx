import { Divider, Grid, H1, H2, LineChart, Stack, Stat, Table, Text, useHostTheme } from "cursor/canvas";

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
    "2026.09.24": 323.08,
    "2026.09.25": 1180.7,
    "2026.09.26": 36.15,
    "2026.09.27": 93.52,
    "2026.09.28": 51.1,
    "2026.09.29": 73.42,
    "2026.09.30": 500.43,
    "2026.10.01": 416.8,
    "2026.10.02": 330.53,
    "2026.10.03": 96.96,
    "2026.10.04": 125.95,
    "2026.10.05": 524.74,
    "2026.10.06": 1509.34,
    "2026.10.07": 328.83,
    "2026.10.08": 246.34,
    "2026.10.09": 1750.2,
    "2026.10.10": 20,
    "2026.10.11": 16.83,
    "2026.10.12": 1215.63,
    "2026.10.13": 1088.73,
    "2026.10.14": 889.2,
    "2026.10.15": 145.15,
    "2026.10.16": 908.36,
    "2026.10.17": 147.09,
    "2026.10.18": 141.32,
    "2026.10.19": 329.5,
    "2026.10.20": 866.08,
    "2026.10.21": 474.48,
    "2026.10.22": 448.41,
    "2026.10.23": 1621.19,
    "2026.10.24": 459.22,
  },
  sets: [
    {
      id: "EURUSD_250p",
      symbol: "EURUSD",
      net: 7466.97,
      green: 6,
      red: 9,
      trades: 100,
      equity: 1321.43,
      days: [
        { date: "2026.09.24", pnl: -3.83 },
        { date: "2026.09.25", pnl: -5.28 },
        { date: "2026.09.29", pnl: 1458.3 },
        { date: "2026.09.30", pnl: -8.78 },
        { date: "2026.10.01", pnl: 1976.13 },
        { date: "2026.10.02", pnl: -5.6 },
        { date: "2026.10.05", pnl: 1251.09 },
        { date: "2026.10.06", pnl: -10.21 },
        { date: "2026.10.07", pnl: 2436.46 },
        { date: "2026.10.08", pnl: -6.33 },
        { date: "2026.10.12", pnl: 291.09 },
        { date: "2026.10.13", pnl: -3.9 },
        { date: "2026.10.14", pnl: 2281.93 },
        { date: "2026.10.15", pnl: -1.15 },
        { date: "2026.10.23", pnl: -2182.95 }
      ],
    },
    {
      id: "XAU_200p",
      symbol: "XAUUSD",
      net: 6492.95,
      green: 12,
      red: 1,
      trades: 447,
      equity: 1335.98,
      days: [
        { date: "2026.09.24", pnl: 545.16 },
        { date: "2026.09.28", pnl: 1197.37 },
        { date: "2026.09.29", pnl: 683.67 },
        { date: "2026.09.30", pnl: 666.67 },
        { date: "2026.10.02", pnl: 304.36 },
        { date: "2026.10.06", pnl: 948.63 },
        { date: "2026.10.07", pnl: 788.28 },
        { date: "2026.10.08", pnl: 494.48 },
        { date: "2026.10.09", pnl: 176.45 },
        { date: "2026.10.12", pnl: 72.01 },
        { date: "2026.10.14", pnl: 619.01 },
        { date: "2026.10.22", pnl: 1847.41 },
        { date: "2026.10.23", pnl: -1850.55 }
      ],
    },
    {
      id: "BTC_50p",
      symbol: "BTCUSD",
      net: 1353.33,
      green: 23,
      red: 1,
      trades: 217,
      equity: 545.67,
      days: [
        { date: "2026.09.24", pnl: 55.37 },
        { date: "2026.09.25", pnl: 26.95 },
        { date: "2026.09.28", pnl: 66.99 },
        { date: "2026.09.29", pnl: 28.25 },
        { date: "2026.09.30", pnl: 18.93 },
        { date: "2026.10.01", pnl: 8.61 },
        { date: "2026.10.02", pnl: 39.41 },
        { date: "2026.10.05", pnl: 29.55 },
        { date: "2026.10.07", pnl: 28.78 },
        { date: "2026.10.08", pnl: 84.44 },
        { date: "2026.10.09", pnl: 97.86 },
        { date: "2026.10.11", pnl: 39.3 },
        { date: "2026.10.12", pnl: 82.45 },
        { date: "2026.10.13", pnl: 206.92 },
        { date: "2026.10.14", pnl: 96 },
        { date: "2026.10.15", pnl: 209.49 },
        { date: "2026.10.16", pnl: 31.89 },
        { date: "2026.10.18", pnl: 29.15 },
        { date: "2026.10.19", pnl: 81.28 },
        { date: "2026.10.20", pnl: 51.79 },
        { date: "2026.10.21", pnl: 34.01 },
        { date: "2026.10.22", pnl: 172.81 },
        { date: "2026.10.23", pnl: 17.54 },
        { date: "2026.10.24", pnl: -184.44 }
      ],
    },
    {
      id: "US500_200p",
      symbol: "US500.cash",
      net: 3703.63,
      green: 15,
      red: 1,
      trades: 136,
      equity: 2640.84,
      days: [
        { date: "2026.09.24", pnl: 0 },
        { date: "2026.09.25", pnl: 388.85 },
        { date: "2026.09.28", pnl: 92.97 },
        { date: "2026.09.29", pnl: 123.79 },
        { date: "2026.09.30", pnl: 62.59 },
        { date: "2026.10.01", pnl: 234.34 },
        { date: "2026.10.02", pnl: 1037.59 },
        { date: "2026.10.05", pnl: 43.54 },
        { date: "2026.10.06", pnl: 0 },
        { date: "2026.10.08", pnl: 81.29 },
        { date: "2026.10.14", pnl: 332.22 },
        { date: "2026.10.15", pnl: 363.61 },
        { date: "2026.10.16", pnl: 766 },
        { date: "2026.10.19", pnl: 549.16 },
        { date: "2026.10.20", pnl: 534.6 },
        { date: "2026.10.21", pnl: 597.98 },
        { date: "2026.10.22", pnl: 242.23 },
        { date: "2026.10.23", pnl: -1747.13 }
      ],
    }
  ],
};

const SETS: SetResult[] = DATA.sets;
const DAILY_DRAWDOWN = DATA.drawdown;

const SET_DAILY: Record<string, Record<string, number>> = {
  EURUSD_250p: {
    "2026.09.24": 144.02, "2026.09.25": 219.8, "2026.09.28": 47.39, "2026.09.29": 70.8, "2026.09.30": 237.96,
    "2026.10.01": 293.81, "2026.10.02": 151.61, "2026.10.05": 161.37, "2026.10.06": 274.2, "2026.10.07": 185.7,
    "2026.10.08": 377.08, "2026.10.09": 659.79, "2026.10.12": 325.69, "2026.10.13": 1059.75, "2026.10.14": 418.6,
    "2026.10.15": 61.6, "2026.10.16": 44.68, "2026.10.19": 329.04, "2026.10.20": 46.46, "2026.10.21": 128.38,
    "2026.10.22": 267.77, "2026.10.23": 171.04,
  },
  XAU_200p: {
    "2026.09.24": 312.32, "2026.09.25": 940.4, "2026.09.28": 15, "2026.09.29": 70.08, "2026.09.30": 129.8,
    "2026.10.01": 38.6, "2026.10.02": 366.4, "2026.10.05": 13.6, "2026.10.06": 269.96, "2026.10.07": 135.4,
    "2026.10.08": 97.25, "2026.10.09": 915.18, "2026.10.12": 606.5, "2026.10.13": 379.84, "2026.10.14": 157.4,
    "2026.10.15": 192.95, "2026.10.16": 69.14, "2026.10.19": 56.68, "2026.10.20": 46.16, "2026.10.21": 52.1,
    "2026.10.22": 52.35, "2026.10.23": 110.1,
  },
  BTC_50p: {
    "2026.09.24": 56.42, "2026.09.25": 69.6, "2026.09.26": 36.15, "2026.09.27": 93.52, "2026.09.28": 38.63,
    "2026.09.29": 103.81, "2026.09.30": 208.64, "2026.10.01": 161.26, "2026.10.02": 322.74, "2026.10.03": 96.96,
    "2026.10.04": 125.95, "2026.10.05": 134.29, "2026.10.06": 102.62, "2026.10.07": 12.05, "2026.10.08": 152.67,
    "2026.10.09": 30.09, "2026.10.10": 20, "2026.10.11": 16.83, "2026.10.12": 55.37, "2026.10.13": 231.42,
    "2026.10.14": 77.94, "2026.10.15": 398.98, "2026.10.16": 222.52, "2026.10.17": 147.09, "2026.10.18": 141.32,
    "2026.10.19": 13.28, "2026.10.20": 92.83, "2026.10.21": 173.61, "2026.10.22": 40.14, "2026.10.23": 23.07,
    "2026.10.24": 459.22,
  },
  US500_200p: {
    "2026.09.24": 0.94, "2026.09.25": 214.05, "2026.09.28": 0, "2026.09.29": 62.42, "2026.09.30": 58.54,
    "2026.10.01": 232.75, "2026.10.02": 41.43, "2026.10.05": 978.98, "2026.10.06": 1303.81, "2026.10.07": 136.5,
    "2026.10.08": 163.77, "2026.10.09": 983.88, "2026.10.12": 395.29, "2026.10.13": 166.14, "2026.10.14": 460.97,
    "2026.10.15": 44.45, "2026.10.16": 862.26, "2026.10.19": 6.09, "2026.10.20": 810.19, "2026.10.21": 400.83,
    "2026.10.22": 1477.18, "2026.10.23": 2081.59,
  },
};

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
  EURUSD_250p: { amount: 1295.48, date: "2026.10.14", daily: 1059.75, dailyDate: "2026.10.13" },
  XAU_200p: { amount: 1306.68, date: "2026.10.12", daily: 940.40, dailyDate: "2026.09.25" },
  BTC_50p: { amount: 538.27, date: "2026.10.24", daily: 459.22, dailyDate: "2026.10.24" },
  US500_200p: { amount: 2624.37, date: "2026.10.23", daily: 2081.59, dailyDate: "2026.10.23" }
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
  const curve = SET_DAILY[result.id] ?? {};
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
            ? ` · curve drawdown ${usd(-dd.amount, 0)} on ${shortDate(dd.date)} · deepest day ${usd(-dd.daily, 0)} on ${shortDate(dd.dailyDate)} · tester equity drawdown ${usd(-result.equity, 0)}`
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
            <DayCell
              key={`${result.id}-${wi}-${di}`}
              date={date}
              pnl={date ? byDate.get(date) : undefined}
              drawdown={date && curve[date] !== undefined ? curve[date] : undefined}
            />
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
                drawdown={date && drawdown[date] !== undefined ? drawdown[date] : undefined}
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

const CURVE_CATEGORIES = [
  "24 Sep", "", "", "", "", "", "", "", "", "", "", "", "", "", "1 Oct", "", "", "", "", "", "", "", "", "", "", "", "", "", "8 Oct", "", "", "", "", "", "", "", "", "", "", "", "", "", "15 Oct", "", "", "", "", "", "", "", "", "", "", "", "", "", "22 Oct", "", "", "", "24 Oct", "", "",
];
const CURVE_COMBINED = [0, 493, 609, 91, 246, 219, 245, 178, 194, 1808, 2372, 2953, 3227, 3476, 4778, 5201, 5047, 5332, 6674, 6623, 6609, 6569, 6490, 6874, 6341, 6433, 5629, 8943, 9825, 10998, 11099, 10096, 9928, 9932, 9946, 9944, 9985, 10324, 11424, 10936, 10879, 10914, 14589, 15020, 15529, 15647, 15547, 15507, 15490, 15515, 15397, 16681, 16700, 16513, 17829, 17464, 18025, 18711, 18363, 18695, 19118, 18985, 19017];
const CURVE_EURUSD = [0, -21, 22, 45, 103, 103, 103, 103, 103, 361, 439, 792, 989, 1094, 2017, 2483, 2024, 2110, 2520, 2520, 2520, 2520, 2520, 2910, 2981, 3094, 3037, 5299, 5292, 5236, 5163, 5018, 5358, 5358, 5358, 5358, 5358, 5522, 6266, 5861, 5397, 5505, 7248, 7621, 7616, 7773, 7729, 7729, 7729, 7729, 7729, 7590, 7582, 7627, 7706, 7615, 7683, 7662, 7557, 7414, 7467, 7467, 7467];
const CURVE_XAUUSD = [0, 342, 392, -101, 51, 51, 51, 51, 51, 884, 1092, 1292, 1316, 1428, 1783, 1747, 1745, 1734, 2151, 2151, 2151, 2151, 2151, 2140, 2139, 2449, 2276, 3070, 3418, 4047, 4121, 3722, 3513, 3513, 3513, 3513, 3513, 3697, 3742, 3533, 3871, 4039, 4067, 3927, 3888, 3839, 3879, 3879, 3879, 3879, 3879, 3862, 3926, 3950, 3947, 3939, 3911, 4757, 4578, 5120, 6493, 6493, 6493];
const CURVE_BTCUSD = [0, 15, 11, 9, 41, 14, 40, -27, -11, 136, 121, 86, 122, 169, 141, 146, 55, -129, 112, 61, 47, 8, -72, -97, -44, -71, -28, 152, 235, 310, 323, 429, 464, 469, 482, 480, 522, 551, 630, 806, 832, 840, 786, 809, 1081, 1062, 1049, 1008, 991, 1017, 898, 1207, 1159, 1105, 1278, 1295, 1141, 1479, 1415, 1495, 1454, 1321, 1353];
const CURVE_US500 = [0, 158, 183, 138, 51, 51, 51, 51, 51, 428, 720, 783, 800, 785, 838, 825, 1223, 1617, 1890, 1890, 1890, 1890, 1890, 1921, 1266, 960, 344, 422, 880, 1404, 1493, 927, 592, 592, 592, 592, 592, 554, 786, 737, 778, 530, 2488, 2664, 2944, 2974, 2891, 2891, 2891, 2891, 2891, 4022, 4033, 3831, 4898, 4614, 5289, 4814, 4813, 4666, 3704, 3704, 3704];
const BALANCE_COMBINED = [0, 348, 597, 690, 1007, 1007, 1007, 1007, 1007, 1388, 2216, 2687, 4659, 4987, 5398, 7383, 7617, 7863, 8993, 8993, 8993, 8993, 8993, 10264, 10317, 11265, 11255, 13702, 14509, 15036, 15163, 15383, 15437, 15437, 15437, 15437, 15476, 15554, 15922, 16107, 16125, 16133, 19454, 19705, 20026, 20292, 20824, 20824, 20824, 20839, 20853, 21363, 21484, 21502, 22070, 22084, 22702, 23443, 24964, 25983, 19201, 19201, 19017];
const BALANCE_EURUSD = [0, -2, -4, -7, -9, -9, -9, -9, -9, -9, -9, 212, 1449, 1444, 1440, 3417, 3417, 3416, 3411, 3411, 3411, 3411, 3411, 4663, 4662, 4661, 4652, 7088, 7088, 7088, 7082, 7082, 7082, 7082, 7082, 7082, 7082, 7082, 7373, 7370, 7369, 7369, 9651, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 9650, 7467, 7467, 7467];
const BALANCE_XAUUSD = [0, 342, 545, 545, 545, 545, 545, 545, 545, 884, 1594, 1742, 2426, 2759, 3093, 3093, 3093, 3093, 3397, 3397, 3397, 3397, 3397, 3397, 3397, 4346, 4346, 4346, 5134, 5629, 5629, 5805, 5805, 5805, 5805, 5805, 5805, 5877, 5877, 5877, 5877, 5877, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6496, 6844, 8344, 9353, 6493, 6493, 6493];
const BALANCE_BTCUSD = [0, 8, 55, 55, 82, 82, 82, 82, 82, 124, 149, 158, 178, 178, 196, 206, 205, 205, 245, 245, 245, 245, 245, 264, 274, 274, 274, 285, 303, 335, 387, 431, 485, 485, 485, 485, 524, 530, 607, 794, 814, 822, 910, 972, 1119, 1119, 1151, 1151, 1151, 1166, 1180, 1233, 1262, 1280, 1313, 1327, 1347, 1498, 1520, 1529, 1538, 1537, 1353];
const BALANCE_US500 = [0, 0, 0, 97, 389, 389, 389, 389, 389, 389, 482, 575, 606, 606, 668, 668, 903, 1150, 1940, 1940, 1940, 1940, 1940, 1940, 1984, 1984, 1984, 1984, 1984, 1984, 2065, 2065, 2065, 2065, 2065, 2065, 2065, 2065, 2065, 2065, 2065, 2065, 2397, 2587, 2761, 3026, 3527, 3527, 3527, 3527, 3527, 3984, 4076, 4076, 4611, 4611, 5209, 5451, 5451, 5451, 3704, 3704, 3704];
const gap = (balance: number[], equity: number[]) => balance.map((value, i) => value - equity[i]);
const GAP_COMBINED = gap(BALANCE_COMBINED, CURVE_COMBINED);
const GAP_EURUSD = gap(BALANCE_EURUSD, CURVE_EURUSD);
const GAP_XAUUSD = gap(BALANCE_XAUUSD, CURVE_XAUUSD);
const GAP_BTCUSD = gap(BALANCE_BTCUSD, CURVE_BTCUSD);
const GAP_US500 = gap(BALANCE_US500, CURVE_US500);

export default function FtmoPnlCalendarGridOct24Deposit183k() {
  return (
    <Stack gap={24}>
      <Stack gap={6}>
        <H1>FTMO PnL Calendar · DynamicGridBB · 183k</H1>
        <Text tone="secondary">
          The four set files in the Grid folder, each run on its own 183,000 USD account from 24 Sep 2026 through 24 Oct 2026. The equity reserve is 180,000, so each grid starts with 3,000 of working margin and trades the equity above that reserve. A day is green when closed profit, commission, and swap are above zero, and red when they are below zero.
        </Text>
        <Text size="small" tone="tertiary">
          Source: FTMO-Server3, DynamicGridBB, 1-minute OHLC, 24 Sep 2026 through 24 Oct 2026. Drawdown comes from the equity curve. EURUSD is sampled every 30 minutes, XAUUSD and BTCUSD every 10 minutes, and US500.cash every minute. Each sample stores the lowest equity since the previous sample. A cell's DD is the drop from that day's starting equity to that low. When several books print at the same time, their lows are added and a book without a sample keeps its last equity. The curve drawdown is the deepest drop from a sampled equity high. The tester equity drawdown is a little deeper, because a high between samples is not stored. Closed profit still colors the day. A grey day had no closed deal. 24 Oct is a Saturday, so only BTCUSD closes a trade. The Week column is that Monday–Sunday row's combined closed P&L. The four accounts are summed; they do not share one 183,000 balance.
        </Text>
      </Stack>
      <Stack gap={8}>
        <H2>Combined P&L</H2>
        <Text size="small" tone="secondary">
          Equity includes open trades. Balance is closed profit only. Both are the sum of the four books, in USD, above four deposits of 183,000. Each point is a 12-hour mark from 24 Sep through 24 Oct 2026. A book with no new sample keeps its last value.
        </Text>
        <LineChart
          categories={CURVE_CATEGORIES}
          series={[
            { name: "Equity", data: CURVE_COMBINED },
            { name: "Balance", data: BALANCE_COMBINED },
          ]}
          height={280}
          beginAtZero
          valuePrefix="$"
        />
      </Stack>
      <Stack gap={8}>
        <H2>Equity by set</H2>
        <Text size="small" tone="secondary">
          Each line is that set's equity minus its own 183,000 deposit, on the same 12-hour grid.
        </Text>
        <LineChart
          categories={CURVE_CATEGORIES}
          series={[
            { name: "EURUSD", data: CURVE_EURUSD },
            { name: "XAUUSD", data: CURVE_XAUUSD },
            { name: "US500", data: CURVE_US500 },
            { name: "BTCUSD", data: CURVE_BTCUSD },
          ]}
          height={240}
          beginAtZero
          valuePrefix="$"
        />
      </Stack>
      <Stack gap={8}>
        <H2>Balance minus equity</H2>
        <Text size="small" tone="secondary">
          Open gap in USD. Above zero, closed balance is higher than equity, so open trades are losing. Below zero, open trades are ahead. The zero line is a flat book.
        </Text>
        <LineChart
          categories={CURVE_CATEGORIES}
          series={[{ name: "Combined gap", data: GAP_COMBINED }]}
          height={260}
          fill
          beginAtZero={false}
          valuePrefix="$"
          referenceLines={[{ value: 0, label: "Flat" }]}
        />
      </Stack>
      <Stack gap={8}>
        <H2>Gap by set</H2>
        <Text size="small" tone="secondary">
          Balance minus equity for each book, on the same 12-hour grid.
        </Text>
        <LineChart
          categories={CURVE_CATEGORIES}
          series={[
            { name: "EURUSD", data: GAP_EURUSD },
            { name: "XAUUSD", data: GAP_XAUUSD },
            { name: "US500", data: GAP_US500 },
            { name: "BTCUSD", data: GAP_BTCUSD },
          ]}
          height={240}
          beginAtZero={false}
          valuePrefix="$"
          referenceLines={[{ value: 0, label: "Flat" }]}
        />
      </Stack>
      <StackedCalendar
        title="All four sets together"
        days={STACKED}
        summary={STACKED_SUMMARY}
        drawdown={DAILY_DRAWDOWN}
        detail="The three numbers are sets that closed up, down, or flat. DD is that day's drop in combined equity."
      />
      <Grid columns={5} gap={16}>
        <Stat value={usd(STACKED_SUMMARY.net, 0)} label="Combined net, four sets" tone="success" />
        <Stat value={String(STACKED_SUMMARY.green)} label="Green days, stacked" tone="success" />
        <Stat value={String(STACKED_SUMMARY.red)} label="Red days, stacked" tone="danger" />
        <Stat value={usd(-3162.03, 0)} label="Curve drawdown · 12 Oct" tone="danger" />
        <Stat value={usd(-1750.2, 0)} label="Deepest day · 9 Oct" tone="danger" />
      </Grid>
      <Table
        headers={[
          "Set",
          "Symbol",
          "Net P&L",
          "Curve drawdown",
          "Deepest day",
          "Tester equity drawdown",
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
