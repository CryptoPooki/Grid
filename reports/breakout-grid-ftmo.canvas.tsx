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

const SAVED_CLOSE = [202947, 208221, 208221, 208221, 213709, 215649, 220333, 225325, 222455, 222455, 222455, 223358, 224390, 233820, 236892, 241263, 241263, 241263, 243245, 249356, 251793, 255697, 256165, 256165, 256165, 258721, 258774, 259311, 263034, 265093, 265093];

const SAVED_LOW = [199698, 201816, 208221, 208221, 206278, 213159, 214863, 220179, 221471, 222455, 222455, 220599, 221721, 223265, 233515, 234065, 241263, 241263, 240736, 242711, 248920, 251530, 253468, 256165, 256165, 254197, 256646, 257487, 258578, 262146, 265093];

const SAVED_LOSS = [302, 1131, 0, 0, 1943, 549, 786, 153, 3854, 0, 0, 1856, 1636, 1125, 305, 2827, 0, 0, 527, 534, 437, 263, 2229, 0, 0, 1968, 2075, 1287, 733, 888, 0];

const SAVED_NAMES = ["EURUSD breakout", "US100 breakout", "US500 breakout", "XAUUSD breakout", "EURUSD grid", "XAUUSD grid"];

const SAVED_DAYS: BookDay[] = [{"date": "2026.10.01", "pnl": 4255.68, "dd": 301.77, "legs": [666.69, 938.55, 1935.5, 357.51, 357.94, -0.51]}, {"date": "2026.10.02", "pnl": 2625.76, "dd": 1130.94, "legs": [0.0, 93.93, -975.62, 1760.48, -301.4, 2048.37]}, {"date": "2026.10.03", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 7802.37, "dd": 1942.76, "legs": [2005.48, 345.18, 1123.51, 2580.75, 415.14, 1332.31]}, {"date": "2026.10.06", "pnl": 812.44, "dd": 549.22, "legs": [761.19, -614.83, -332.5, 217.2, 40.04, 741.34]}, {"date": "2026.10.07", "pnl": 8125.68, "dd": 786.08, "legs": [335.98, 76.85, 192.5, -379.15, 1186.46, 6713.04]}, {"date": "2026.10.08", "pnl": 834.49, "dd": 153.33, "legs": [162.74, 1209.22, 253.75, 744.91, 336.82, -1872.95]}, {"date": "2026.10.09", "pnl": 591.95, "dd": 3854.17, "legs": [62.98, -155.23, -621.25, 0.0, 504.68, 800.77]}, {"date": "2026.10.10", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": -2338.86, "dd": 1856.14, "legs": [-414.81, 574.88, -48.99, -217.24, -63.03, -2169.67]}, {"date": "2026.10.13", "pnl": 225.13, "dd": 1636.5, "legs": [-635.27, -92.85, -866.25, 539.0, -465.63, 1746.13]}, {"date": "2026.10.14", "pnl": 11214.49, "dd": 1124.92, "legs": [2367.71, 812.66, -148.75, 311.75, 1379.62, 6491.5]}, {"date": "2026.10.15", "pnl": 3312.37, "dd": 305.14, "legs": [0.0, 588.38, 1496.25, 457.17, -439.56, 1210.13]}, {"date": "2026.10.16", "pnl": 3510.5, "dd": 2826.5, "legs": [68.22, 1488.49, 691.26, 1035.4, 1284.36, -1057.23]}, {"date": "2026.10.17", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": 350.19, "dd": 527.02, "legs": [204.74, -1072.63, 1575.89, -688.2, -526.68, 857.07]}, {"date": "2026.10.20", "pnl": 7064.47, "dd": 534.3, "legs": [488.21, 595.68, 2161.25, 405.74, 868.78, 2544.81]}, {"date": "2026.10.21", "pnl": 4100.03, "dd": 436.73, "legs": [-194.26, 615.13, 1898.75, -383.96, 863.06, 1301.31]}, {"date": "2026.10.22", "pnl": 6951.14, "dd": 263.35, "legs": [367.45, 298.64, 306.25, 762.47, 947.76, 4268.57]}, {"date": "2026.10.23", "pnl": -2151.45, "dd": 2229.37, "legs": [0.0, 671.47, -511.87, 1293.29, 53.9, -3658.24]}, {"date": "2026.10.24", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": 1375.17, "dd": 1968.04, "legs": [-493.55, 677.06, 747.26, 701.15, 847.66, -1104.41]}, {"date": "2026.10.27", "pnl": 27.42, "dd": 2075.23, "legs": [70.85, 184.99, -196.87, -353.82, -232.21, 554.48]}, {"date": "2026.10.28", "pnl": 386.53, "dd": 1287.08, "legs": [-195.39, -300.86, -157.5, -228.17, -50.93, 1319.38]}, {"date": "2026.10.29", "pnl": 4048.26, "dd": 733.36, "legs": [-367.53, 1514.52, 533.76, 498.88, 1702.36, 166.27]}, {"date": "2026.10.30", "pnl": 1969.57, "dd": 888.3, "legs": [0.0, 1495.53, 1211.88, 788.06, -84.48, -1441.42]}, {"date": "2026.10.31", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

const FITTED_CLOSE = [202947, 208221, 208221, 208221, 213709, 215649, 220333, 225325, 222455, 222455, 222455, 223358, 224390, 233820, 236892, 241263, 241263, 241263, 243245, 249356, 251793, 255697, 256165, 256165, 256165, 258721, 258774, 259311, 263034, 265093, 265093];

const FITTED_LOW = [199698, 201816, 208221, 208221, 206278, 213159, 214863, 220179, 221471, 222455, 222455, 220599, 221721, 223265, 233515, 234065, 241263, 241263, 240736, 242711, 248920, 251530, 253468, 256165, 256165, 254197, 256646, 257487, 258578, 262146, 265093];

const FITTED_LOSS = [302, 1131, 0, 0, 1943, 549, 786, 153, 3854, 0, 0, 1856, 1636, 1125, 305, 2827, 0, 0, 527, 534, 437, 263, 2229, 0, 0, 1968, 2075, 1287, 733, 888, 0];

const FITTED_NAMES = ["EURUSD breakout", "US100 breakout", "US500 breakout", "XAUUSD breakout", "EURUSD grid", "XAUUSD grid"];

const FITTED_DAYS: BookDay[] = [{"date": "2026.10.01", "pnl": 4255.68, "dd": 301.77, "legs": [666.69, 938.55, 1935.5, 357.51, 357.94, -0.51]}, {"date": "2026.10.02", "pnl": 2625.76, "dd": 1130.94, "legs": [0.0, 93.93, -975.62, 1760.48, -301.4, 2048.37]}, {"date": "2026.10.03", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 7802.37, "dd": 1942.76, "legs": [2005.48, 345.18, 1123.51, 2580.75, 415.14, 1332.31]}, {"date": "2026.10.06", "pnl": 812.44, "dd": 549.22, "legs": [761.19, -614.83, -332.5, 217.2, 40.04, 741.34]}, {"date": "2026.10.07", "pnl": 8125.68, "dd": 786.08, "legs": [335.98, 76.85, 192.5, -379.15, 1186.46, 6713.04]}, {"date": "2026.10.08", "pnl": 834.49, "dd": 153.33, "legs": [162.74, 1209.22, 253.75, 744.91, 336.82, -1872.95]}, {"date": "2026.10.09", "pnl": 591.95, "dd": 3854.17, "legs": [62.98, -155.23, -621.25, 0.0, 504.68, 800.77]}, {"date": "2026.10.10", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": -2338.86, "dd": 1856.14, "legs": [-414.81, 574.88, -48.99, -217.24, -63.03, -2169.67]}, {"date": "2026.10.13", "pnl": 225.13, "dd": 1636.5, "legs": [-635.27, -92.85, -866.25, 539.0, -465.63, 1746.13]}, {"date": "2026.10.14", "pnl": 11214.49, "dd": 1124.92, "legs": [2367.71, 812.66, -148.75, 311.75, 1379.62, 6491.5]}, {"date": "2026.10.15", "pnl": 3312.37, "dd": 305.14, "legs": [0.0, 588.38, 1496.25, 457.17, -439.56, 1210.13]}, {"date": "2026.10.16", "pnl": 3510.5, "dd": 2826.5, "legs": [68.22, 1488.49, 691.26, 1035.4, 1284.36, -1057.23]}, {"date": "2026.10.17", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": 350.19, "dd": 527.02, "legs": [204.74, -1072.63, 1575.89, -688.2, -526.68, 857.07]}, {"date": "2026.10.20", "pnl": 7064.47, "dd": 534.3, "legs": [488.21, 595.68, 2161.25, 405.74, 868.78, 2544.81]}, {"date": "2026.10.21", "pnl": 4100.03, "dd": 436.73, "legs": [-194.26, 615.13, 1898.75, -383.96, 863.06, 1301.31]}, {"date": "2026.10.22", "pnl": 6951.14, "dd": 263.35, "legs": [367.45, 298.64, 306.25, 762.47, 947.76, 4268.57]}, {"date": "2026.10.23", "pnl": -2151.45, "dd": 2229.37, "legs": [0.0, 671.47, -511.87, 1293.29, 53.9, -3658.24]}, {"date": "2026.10.24", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": 1375.17, "dd": 1968.04, "legs": [-493.55, 677.06, 747.26, 701.15, 847.66, -1104.41]}, {"date": "2026.10.27", "pnl": 27.42, "dd": 2075.23, "legs": [70.85, 184.99, -196.87, -353.82, -232.21, 554.48]}, {"date": "2026.10.28", "pnl": 386.53, "dd": 1287.08, "legs": [-195.39, -300.86, -157.5, -228.17, -50.93, 1319.38]}, {"date": "2026.10.29", "pnl": 4048.26, "dd": 733.36, "legs": [-367.53, 1514.52, 533.76, 498.88, 1702.36, 166.27]}, {"date": "2026.10.30", "pnl": 1969.57, "dd": 888.3, "legs": [0.0, 1495.53, 1211.88, 788.06, -84.48, -1441.42]}, {"date": "2026.10.31", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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

export default function BreakoutGridFtmo() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>October book for the $200k FTMO account</H1>
        <Text tone="secondary">Real ticks, 1–31 October 2026, deposit $200,000. Breakout sizing uses equity capped at $190,000, and grid margin stops at $10,000. Both grids flatten outside the symbol session. The saved inputs already stay inside the $9,000 day, so the finetuned book is the same book: $65,093 of profit and a $3,854 day.</Text>
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
            ["EURUSD breakout", "$5,261", "59", "3,358%", "Saved inputs."],
            ["US100 breakout", "$9,945", "125", "4,466%", "Saved inputs."],
            ["US500 breakout", "$10,268", "81", "1,466%", "Saved inputs."],
            ["XAUUSD breakout", "$10,203", "52", "1,524%", "Saved inputs."],
            ["EURUSD grid", "$8,625", "765", "1,518%", "Session flatten on."],
            ["XAUUSD grid", "$20,791", "691", "1,682%", "Session flatten on."],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Stack gap={8}>
        <H2>Saved inputs</H2>
        <Text>Lot inputs and divisors stay as they are in the set files. Session flatten is on for both grids. This account opens above both caps, so each leg trades at the capped size for the whole month and the combined profit is the sum of the solo tests.</Text>
      </Stack>
      <Grid columns={4} gap={16}>
        <Stat value="$65,093" label="Net profit, October" tone="success" />
        <Stat value="$3,854" label="Worst day, 9 Oct" tone="warning" />
        <Stat value="$199,698" label="Lowest equity" tone="success" />
        <Stat value="$137,386" label="Free margin, lower bound" tone="info" />
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
            yMax={280000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">Day of October 2026. Equity in USD. The danger line is the $180,000 floor. Source: real-tick solo tests, deposit $200,000, grids with session flatten and a $10,000 margin cap.</Text>
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
        <Text>Breakout lots follow 0.35 times the cushion above $180,000, divided by $6,000, using equity capped at $190,000. They lock at the set's reset hour. The gold breakout is short only. Grid margin is the cushion, stopped at $10,000. Divisors stay 40/20 and 60/20.</Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EURUSD breakout", "sets/EUR_2500", "Saved lot input 9. M15, 100 bars, both ways, 3 entries, reset 14:00. Opens near 5.25 lots.", "$5,261"],
            ["US100 breakout", "sets/US100_4200", "Saved lot input 12.3. M15, 20 bars, both ways, 5 entries, reset 17:00. Opens near 7.18 lots.", "$9,945"],
            ["US500 breakout", "sets/US500_3000", "Saved lot input 150. M10, 10 bars, both ways, 3 entries, reset 17:00. Opens near 87.5 lots.", "$10,268"],
            ["XAUUSD breakout", "sets/XAU_3000", "Saved lot input 2.7. M5, 20 bars, short only, 2 entries, reset 16:00. Opens near 1.58 lots.", "$10,203"],
            ["EURUSD grid", "EURUSD_99p_220p_1p7", "Saved divisors, buy 40 and sell 20. Session flatten on. Margin cap $10,000.", "$8,625"],
            ["XAUUSD grid", "XAU_96p_400p_2p", "Saved divisors, buy 60 and sell 20. Session flatten on. Margin cap $10,000.", "$20,791"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 120. The book ends near $265,093.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {SAVED_NAMES.map((name, index) => (
          <LegCalendar key={`${name}-saved`} index={index} days={SAVED_DAYS} names={SAVED_NAMES} />
        ))}
      </Grid>
      <Callout tone="info" title="Saved inputs already fit the $9,000 day">9 Oct closed +$592, while equity gave back $3,854 from midnight. There is $5,146 of room under the $9,000 limit. Lowest equity is $199,698. Free margin stayed above $137,386.</Callout>
<Divider />
      <Stack gap={8}>
        <H2>Inputs sized for the $9,000 day</H2>
        <Text>
          The saved inputs already keep the worst day at $3,854, equity at $199,698, and free margin above $137,386.
          The search leaves every leg at full weight, so the finetuned book is this same book.
        </Text>
      </Stack>
      <Grid columns={4} gap={16}>
        <Stat value="$65,093" label="Net profit, October" tone="success" />
        <Stat value="$3,854" label="Worst day, 9 Oct" tone="warning" />
        <Stat value="$199,698" label="Lowest equity" tone="success" />
        <Stat value="$137,386" label="Free margin, lower bound" tone="info" />
      </Grid>
      <Callout tone="success" title="No input change">
        Breakout sizing is already capped at $190,000 of equity, and grid margin is already capped at $10,000. Cutting the lot inputs would only give up profit. Order cap is at most 120.
      </Callout>
      <Text tone="tertiary" size="small">Tests are single-strategy MT5 runs, every tick based on real ticks, 100% real ticks, FTMO symbols, leverage 1:100, from 1 Oct 2026 to 1 Nov 2026. Grid profiles set session flatten on and a $10,000 margin cap; the set files in the repo stay unchanged. Breakout sizing uses equity capped at $190,000. Grid margin is equity minus $180,000, stopped at $10,000. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level. The sized book is the highest October profit, in steps of one tenth, with daily loss at or under $9,000, equity at or above $180,000, free margin at or above $50,000, and at most 200 orders. Deposit $200,000.</Text>
    </Stack>
  );
}
