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

const SAVED_CLOSE = [186364, 190025, 190025, 190025, 195884, 197751, 202367, 207033, 203842, 203842, 203842, 205776, 207054, 217429, 219597, 224201, 224201, 224201, 226380, 232604, 234950, 239982, 240824, 240824, 240824, 243391, 243483, 243781, 247528, 251293, 251293];

const SAVED_LOW = [184770, 185569, 190025, 190025, 188413, 195103, 196498, 201430, 200373, 202179, 202179, 198735, 200888, 203112, 213258, 212465, 220899, 220899, 220141, 222540, 228805, 231281, 234726, 237337, 237337, 235481, 238293, 238274, 239447, 242525, 247384];

const SAVED_LOSS = [230, 795, 0, 0, 1612, 782, 1254, 937, 6660, 1663, 1663, 5107, 4888, 3942, 4170, 7132, 3302, 3302, 4061, 3840, 3799, 3668, 5255, 3487, 3487, 5343, 5098, 5208, 4334, 5003, 3909];

const SAVED_NAMES = ["EURUSD breakout", "US100 breakout", "US500 breakout", "XAUUSD breakout", "EURUSD grid", "XAUUSD grid"];

const SAVED_DAYS: BookDay[] = [{"date": "2026.10.01", "pnl": 2311.82, "dd": 229.73, "legs": [375.76, 485.0, 1071.52, 188.42, 191.47, -0.35]}, {"date": "2026.10.02", "pnl": 2152.7, "dd": 795.1, "legs": [0.0, 106.73, -755.88, 1239.95, -171.76, 1733.66]}, {"date": "2026.10.03", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 7299.82, "dd": 1611.91, "legs": [2003.24, 343.17, 1123.35, 2573.03, 391.85, 865.18]}, {"date": "2026.10.06", "pnl": 616.8, "dd": 781.57, "legs": [760.02, -613.85, -330.57, 217.64, 24.9, 558.66]}, {"date": "2026.10.07", "pnl": 6706.82, "dd": 1253.64, "legs": [335.77, 76.65, 192.46, -377.95, 979.45, 5500.44]}, {"date": "2026.10.08", "pnl": 1540.72, "dd": 936.63, "legs": [162.59, 1209.75, 253.72, 746.82, 338.29, -1170.45]}, {"date": "2026.10.09", "pnl": 238.61, "dd": 6659.98, "legs": [62.91, -154.74, -621.24, 0.0, 426.25, 525.43]}, {"date": "2026.10.10", "pnl": 0.0, "dd": 1663.29, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 0.0, "dd": 1663.29, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": -3460.71, "dd": 5107.32, "legs": [-406.37, 577.97, -48.94, -219.14, -1.09, -3363.14]}, {"date": "2026.10.13", "pnl": 540.87, "dd": 4887.86, "legs": [-634.77, -91.77, -866.08, 550.35, -356.55, 1939.69]}, {"date": "2026.10.14", "pnl": 11147.69, "dd": 3941.68, "legs": [2365.03, 812.19, -148.74, 332.36, 1153.59, 6633.26]}, {"date": "2026.10.15", "pnl": 4032.99, "dd": 4170.21, "legs": [0.0, 588.7, 1496.15, 455.72, -291.59, 1784.01]}, {"date": "2026.10.16", "pnl": 2514.78, "dd": 7132.33, "legs": [68.11, 1488.25, 691.23, 1031.33, 887.91, -1652.05]}, {"date": "2026.10.17", "pnl": 0.0, "dd": 3301.92, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 0.0, "dd": 3301.92, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": 307.9, "dd": 4060.65, "legs": [204.52, -1072.45, 1575.62, -687.72, -599.99, 887.92]}, {"date": "2026.10.20", "pnl": 7196.37, "dd": 3840.14, "legs": [487.24, 590.21, 2116.67, 406.92, 752.97, 2842.36]}, {"date": "2026.10.21", "pnl": 4159.19, "dd": 3799.25, "legs": [-193.93, 608.04, 1898.65, -385.11, 752.25, 1479.29]}, {"date": "2026.10.22", "pnl": 6835.29, "dd": 3668.47, "legs": [367.0, 297.06, 306.25, 764.2, 939.2, 4161.58]}, {"date": "2026.10.23", "pnl": -1057.28, "dd": 5255.23, "legs": [0.0, 671.04, -511.87, 1293.29, 120.86, -2630.6]}, {"date": "2026.10.24", "pnl": 0.0, "dd": 3486.98, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 0.0, "dd": 3486.98, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": 1639.43, "dd": 5342.68, "legs": [-493.37, 676.34, 747.18, 701.15, 801.97, -793.84]}, {"date": "2026.10.27", "pnl": 74.43, "dd": 5098.17, "legs": [70.78, 185.09, -196.87, -353.82, -29.11, 398.36]}, {"date": "2026.10.28", "pnl": 386.49, "dd": 5208.44, "legs": [-195.15, -301.0, -157.5, -228.17, 336.71, 931.6]}, {"date": "2026.10.29", "pnl": 3650.56, "dd": 4333.85, "legs": [-366.7, 1514.56, 533.76, 498.88, 1390.49, 79.57]}, {"date": "2026.10.30", "pnl": 3548.5, "dd": 5002.96, "legs": [0.0, 1495.49, 1211.88, 788.06, -242.31, 295.38]}, {"date": "2026.10.31", "pnl": 0.0, "dd": 3909.07, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

const FITTED_CLOSE = [186364, 190025, 190025, 190025, 195884, 197751, 202367, 207033, 203842, 203842, 203842, 205776, 207054, 217429, 219597, 224201, 224201, 224201, 226380, 232604, 234950, 239982, 240824, 240824, 240824, 243391, 243483, 243781, 247528, 251293, 251293];

const FITTED_LOW = [184770, 185569, 190025, 190025, 188413, 195103, 196498, 201430, 200373, 202179, 202179, 198735, 200888, 203112, 213258, 212465, 220899, 220899, 220141, 222540, 228805, 231281, 234726, 237337, 237337, 235481, 238293, 238274, 239447, 242525, 247384];

const FITTED_LOSS = [230, 795, 0, 0, 1612, 782, 1254, 937, 6660, 1663, 1663, 5107, 4888, 3942, 4170, 7132, 3302, 3302, 4061, 3840, 3799, 3668, 5255, 3487, 3487, 5343, 5098, 5208, 4334, 5003, 3909];

const FITTED_NAMES = ["EURUSD breakout", "US100 breakout", "US500 breakout", "XAUUSD breakout", "EURUSD grid", "XAUUSD grid"];

const FITTED_DAYS: BookDay[] = [{"date": "2026.10.01", "pnl": 2311.82, "dd": 229.73, "legs": [375.76, 485.0, 1071.52, 188.42, 191.47, -0.35]}, {"date": "2026.10.02", "pnl": 2152.7, "dd": 795.1, "legs": [0.0, 106.73, -755.88, 1239.95, -171.76, 1733.66]}, {"date": "2026.10.03", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 7299.82, "dd": 1611.91, "legs": [2003.24, 343.17, 1123.35, 2573.03, 391.85, 865.18]}, {"date": "2026.10.06", "pnl": 616.8, "dd": 781.57, "legs": [760.02, -613.85, -330.57, 217.64, 24.9, 558.66]}, {"date": "2026.10.07", "pnl": 6706.82, "dd": 1253.64, "legs": [335.77, 76.65, 192.46, -377.95, 979.45, 5500.44]}, {"date": "2026.10.08", "pnl": 1540.72, "dd": 936.63, "legs": [162.59, 1209.75, 253.72, 746.82, 338.29, -1170.45]}, {"date": "2026.10.09", "pnl": 238.61, "dd": 6659.98, "legs": [62.91, -154.74, -621.24, 0.0, 426.25, 525.43]}, {"date": "2026.10.10", "pnl": 0.0, "dd": 1663.29, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 0.0, "dd": 1663.29, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": -3460.71, "dd": 5107.32, "legs": [-406.37, 577.97, -48.94, -219.14, -1.09, -3363.14]}, {"date": "2026.10.13", "pnl": 540.87, "dd": 4887.86, "legs": [-634.77, -91.77, -866.08, 550.35, -356.55, 1939.69]}, {"date": "2026.10.14", "pnl": 11147.69, "dd": 3941.68, "legs": [2365.03, 812.19, -148.74, 332.36, 1153.59, 6633.26]}, {"date": "2026.10.15", "pnl": 4032.99, "dd": 4170.21, "legs": [0.0, 588.7, 1496.15, 455.72, -291.59, 1784.01]}, {"date": "2026.10.16", "pnl": 2514.78, "dd": 7132.33, "legs": [68.11, 1488.25, 691.23, 1031.33, 887.91, -1652.05]}, {"date": "2026.10.17", "pnl": 0.0, "dd": 3301.92, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 0.0, "dd": 3301.92, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": 307.9, "dd": 4060.65, "legs": [204.52, -1072.45, 1575.62, -687.72, -599.99, 887.92]}, {"date": "2026.10.20", "pnl": 7196.37, "dd": 3840.14, "legs": [487.24, 590.21, 2116.67, 406.92, 752.97, 2842.36]}, {"date": "2026.10.21", "pnl": 4159.19, "dd": 3799.25, "legs": [-193.93, 608.04, 1898.65, -385.11, 752.25, 1479.29]}, {"date": "2026.10.22", "pnl": 6835.29, "dd": 3668.47, "legs": [367.0, 297.06, 306.25, 764.2, 939.2, 4161.58]}, {"date": "2026.10.23", "pnl": -1057.28, "dd": 5255.23, "legs": [0.0, 671.04, -511.87, 1293.29, 120.86, -2630.6]}, {"date": "2026.10.24", "pnl": 0.0, "dd": 3486.98, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 0.0, "dd": 3486.98, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": 1639.43, "dd": 5342.68, "legs": [-493.37, 676.34, 747.18, 701.15, 801.97, -793.84]}, {"date": "2026.10.27", "pnl": 74.43, "dd": 5098.17, "legs": [70.78, 185.09, -196.87, -353.82, -29.11, 398.36]}, {"date": "2026.10.28", "pnl": 386.49, "dd": 5208.44, "legs": [-195.15, -301.0, -157.5, -228.17, 336.71, 931.6]}, {"date": "2026.10.29", "pnl": 3650.56, "dd": 4333.85, "legs": [-366.7, 1514.56, 533.76, 498.88, 1390.49, 79.57]}, {"date": "2026.10.30", "pnl": 3548.5, "dd": 5002.96, "legs": [0.0, 1495.49, 1211.88, 788.06, -242.31, 295.38]}, {"date": "2026.10.31", "pnl": 0.0, "dd": 3909.07, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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

function WeekCell({ week, days }: { week: string[]; days: BookDay[] }) {
  const theme = useHostTheme();
  const dates = week.filter((date) => date !== "");
  if (dates.length === 0) return <div />;
  const byDate = new Map(days.map((day) => [day.date, day]));
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

function BookCalendar({ days, heading, caption }: { days: BookDay[]; heading: string; caption: string }) {
  const theme = useHostTheme();
  const byDate = new Map(days.map((day) => [day.date, day]));
  const green = days.filter((day) => rounded(day.pnl) > 0).length;
  const red = days.filter((day) => rounded(day.pnl) < 0).length;
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <H2>{heading}</H2>
        <Text size="small" tone="secondary">
          {usd(days.reduce((sum, day) => sum + day.pnl, 0))} closed · {green} green days · {red} red days.
          The three numbers are legs that closed up, down, or flat. DD is that day's drop from midnight equity.
          The Week column is Monday–Sunday closed P&L. {caption}
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
                key={`${heading}-${weekIndex}-${dayIndex}`}
                date={date}
                pnl={day?.pnl}
                mix={day ? mixOf(day.legs) : undefined}
                drawdown={day?.dd}
                large
              />
            );
          }),
          <WeekCell key={`${heading}-week-${weekIndex}`} week={week} days={days} />,
        ])}
      </div>
    </Stack>
  );
}

function LegCalendar({ index, days, names }: { index: number; days: BookDay[]; names: string[] }) {
  const theme = useHostTheme();
  const name = names[index];
  const byDate = new Map(days.map((day) => [day.date, day.legs[index]]));
  const values = days.map((day) => day.legs[index]);
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
        <Text tone="secondary">Real ticks, 1–31 October 2026, deposit $185,000. Breakout sizing uses equity capped at $190,000, and grid margin stops at $10,000. Both grids flatten outside the symbol session. The saved inputs already stay inside the $9,000 day, so the finetuned book is the same book: $62,384 of profit and a $7,132 day.</Text>
      </Stack>
      <Stack gap={8}>
        <H2>Each strategy on its own</H2>
        <Text>
          These are the MT5 results, one expert at a time, every tick based on real ticks.
          The combined figures below let every expert read the shared equity, so a gain in one leg increases the lots of the others.
          Grid tests flatten outside the symbol session.
        </Text>
        <Table
          headers={["Strategy", "Own October", "Trades", "Minimum margin level", "Test"]}
          columnAlign={["left", "right", "right", "right", "left"]}
          rows={[
            ["EURUSD breakout", "$2,944", "59", "3,642%", "Saved inputs."],
            ["US100 breakout", "$7,385", "125", "4,526%", "Saved inputs."],
            ["US500 breakout", "$7,361", "81", "1,400%", "Saved inputs."],
            ["XAUUSD breakout", "$7,755", "52", "1,444%", "Saved inputs."],
            ["EURUSD grid", "$6,098", "764", "1,938%", "Session flatten on."],
            ["XAUUSD grid", "$20,168", "691", "1,664%", "Session flatten on."],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Stack gap={8}>
        <H2>Saved inputs</H2>
        <Text>The cushion at the open is $5,000, under both caps. Session flatten is on for both grids. Size grows until breakout equity reaches $190,000 and grid margin reaches $10,000, so the combined book is larger than the sum of the solo tests. The worst day is $7,132.</Text>
      </Stack>
      <Grid columns={4} gap={16}>
        <Stat value="$62,384" label="Net profit, October" tone="success" />
        <Stat value="$7,132" label="Worst day, 16 Oct" tone="warning" />
        <Stat value="$184,770" label="Lowest equity" tone="success" />
        <Stat value="$82,879" label="Free margin, lower bound" tone="info" />
      </Grid>
      <BookCalendar days={SAVED_DAYS} heading="October P&L, saved inputs" caption="This calendar is also the finetuned book. The worst day stays under $9,000." />
      <Grid columns={2} gap={20}>
        <Stack gap={8}>
          <H3>Equity, saved inputs</H3>
          <LineChart
            categories={DAYS}
            series={[
              { name: "Equity at day close", data: SAVED_CLOSE, tone: "success" },
              { name: "Lowest equity that day", data: SAVED_LOW, tone: "warning" },
            ]}
            beginAtZero={false}
            yMin={175000}
            yMax={270000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">Day of October 2026. Equity in USD. The danger line is the $180,000 floor. Source: real-tick solo tests, deposit $185,000, grids with session flatten and a $10,000 margin cap.</Text>
        </Stack>
        <Stack gap={8}>
          <H3>Daily equity loss, saved inputs</H3>
          <BarChart
            categories={DAYS}
            series={[{ name: "Loss from midnight equity", data: SAVED_LOSS, tone: "warning" }]}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 9000, label: "$9,000 limit", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day of October 2026. Loss is midnight equity minus the lowest equity that server day, in USD.
          </Text>
        </Stack>
      </Grid>
      <Stack gap={8}>
        <H2>What to run</H2>
        <Text>Breakout lots lock at the set's reset hour. Sizing equity stops at $190,000. The gold breakout is short only. Grid divisors stay 40/20 and 60/20, and grid margin stops at $10,000.</Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EURUSD breakout", "sets/EUR_2500", "Saved lot input 9. M15, 100 bars, both ways, 3 entries, reset 14:00. Opens near 2.63 lots.", "$4,973"],
            ["US100 breakout", "sets/US100_4200", "Saved lot input 12.3. M15, 20 bars, both ways, 5 entries, reset 17:00. Opens near 3.59 lots.", "$9,492"],
            ["US500 breakout", "sets/US500_3000", "Saved lot input 150. M10, 10 bars, both ways, 3 entries, reset 17:00. Opens near 43.75 lots.", "$9,581"],
            ["XAUUSD breakout", "sets/XAU_3000", "Saved lot input 2.7. M5, 20 bars, short only, 2 entries, reset 16:00. Opens near 0.79 lots.", "$9,536"],
            ["EURUSD grid", "EURUSD_99p_220p_1p7", "Saved divisors, buy 40 and sell 20. Session flatten on. Margin cap $10,000.", "$7,796"],
            ["XAUUSD grid", "XAU_96p_400p_2p", "Saved divisors, buy 60 and sell 20. Session flatten on. Margin cap $10,000.", "$21,006"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 120. The book ends near $251,293.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {SAVED_NAMES.map((name, index) => (
          <LegCalendar key={`${name}-saved`} index={index} days={SAVED_DAYS} names={SAVED_NAMES} />
        ))}
      </Grid>
      <Callout tone="info" title="Saved inputs already fit the $9,000 day">16 Oct closed +$2,515, while equity gave back $7,132 from midnight. There is $1,868 of room under the $9,000 limit. Lowest equity is $184,770. Free margin stayed above $82,879.</Callout>
<Divider />
      <Stack gap={8}>
        <H2>Inputs sized for the $9,000 day</H2>
        <Text>
          The saved inputs already keep the worst day at $7,132, equity at $184,770, and free margin above $82,879.
          The search leaves every leg at full weight, so the finetuned book is this same book.
        </Text>
      </Stack>
      <Grid columns={4} gap={16}>
        <Stat value="$62,384" label="Net profit, October" tone="success" />
        <Stat value="$7,132" label="Worst day, 16 Oct" tone="warning" />
        <Stat value="$184,770" label="Lowest equity" tone="success" />
        <Stat value="$82,879" label="Free margin, lower bound" tone="info" />
      </Grid>
      <Callout tone="success" title="No input change">
        The open is under the caps, and the book grows into them. The saved inputs still keep the day at $7,132. Cutting the lot inputs would only give up profit. Order cap is at most 120.
      </Callout>
      <Text tone="tertiary" size="small">Tests are single-strategy MT5 runs, every tick based on real ticks, 100% real ticks, FTMO symbols, leverage 1:100, from 1 Oct 2026 to 1 Nov 2026. Grid profiles set session flatten on and a $10,000 margin cap; the set files in the repo stay unchanged. Breakout sizing uses equity capped at $190,000. Grid margin is equity minus $180,000, stopped at $10,000. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level. The sized book is the highest October profit, in steps of one tenth, with daily loss at or under $9,000, equity at or above $180,000, free margin at or above $50,000, and at most 200 orders. Deposit $185,000.</Text>
    </Stack>
  );
}
