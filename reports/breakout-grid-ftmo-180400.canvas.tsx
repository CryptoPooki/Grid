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

const SAVED_CLOSE = [180558, 180633, 180633, 180633, 181080, 180978, 181175, 181732, 181646, 181646, 181646, 181529, 181457, 181983, 182773, 183609, 183609, 183609, 183491, 185273, 187059, 189063, 190353, 190353, 190353, 192069, 191416, 191252, 193330, 198327, 198327];

const SAVED_LOW = [180389, 180520, 180633, 180633, 180624, 180918, 180941, 181175, 181583, 181646, 181646, 181378, 181450, 181249, 181875, 182005, 183399, 183399, 182961, 183089, 184810, 185127, 187892, 190002, 190002, 188203, 190244, 189258, 189989, 190690, 197337];

const SAVED_LOSS = [11, 38, 0, 0, 10, 162, 38, 0, 149, 0, 0, 268, 78, 209, 108, 768, 210, 210, 648, 402, 463, 1932, 1171, 351, 351, 2150, 1825, 2157, 1263, 2639, 990];

const SAVED_NAMES = ["EURUSD breakout", "US100 breakout", "US500 breakout", "XAUUSD breakout", "EURUSD grid"];

const SAVED_DAYS: BookDay[] = [{"date": "2026.10.01", "pnl": 168.88, "dd": 11.22, "legs": [29.45, 38.01, 86.96, 14.46, 0.0]}, {"date": "2026.10.02", "pnl": 72.93, "dd": 38.4, "legs": [0.0, 6.04, -53.55, 90.61, 29.83]}, {"date": "2026.10.03", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 452.07, "dd": 9.71, "legs": [125.29, 29.24, 109.47, 177.49, 10.58]}, {"date": "2026.10.06", "pnl": 15.19, "dd": 162.33, "legs": [69.8, -68.03, -37.31, 21.95, 28.78]}, {"date": "2026.10.07", "pnl": 87.08, "dd": 37.5, "legs": [37.68, 7.74, 22.81, -41.2, 60.05]}, {"date": "2026.10.08", "pnl": 597.75, "dd": 0.0, "legs": [19.4, 150.78, 32.64, 89.74, 305.19]}, {"date": "2026.10.09", "pnl": -130.25, "dd": 149.38, "legs": [7.47, -40.01, -111.95, 0.0, 14.24]}, {"date": "2026.10.10", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": 35.53, "dd": 267.83, "legs": [-63.4, 95.07, -9.89, -38.8, 52.55]}, {"date": "2026.10.13", "pnl": -207.5, "dd": 78.45, "legs": [-105.24, -17.11, -149.14, 84.02, -20.03]}, {"date": "2026.10.14", "pnl": 632.72, "dd": 208.69, "legs": [350.56, 120.33, -23.18, 49.57, 135.44]}, {"date": "2026.10.15", "pnl": 740.8, "dd": 108.07, "legs": [0.0, 130.1, 332.64, 97.04, 181.02]}, {"date": "2026.10.16", "pnl": 771.98, "dd": 767.73, "legs": [14.67, 363.83, 170.69, 243.03, -20.24]}, {"date": "2026.10.17", "pnl": 0.0, "dd": 209.61, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 0.0, "dd": 209.61, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": -138.19, "dd": 648.15, "legs": [72.12, -410.95, 572.89, -251.55, -120.7]}, {"date": "2026.10.20", "pnl": 1619.95, "dd": 402.14, "legs": [166.91, 216.07, 782.71, 144.6, 309.66]}, {"date": "2026.10.21", "pnl": 1609.68, "dd": 463.01, "legs": [-110.49, 200.79, 1097.35, -206.93, 628.96]}, {"date": "2026.10.22", "pnl": 2014.14, "dd": 1931.84, "legs": [284.59, 235.47, 244.72, 579.04, 670.32]}, {"date": "2026.10.23", "pnl": 1335.01, "dd": 1171.04, "legs": [0.0, 605.27, -469.09, 1163.75, 35.08]}, {"date": "2026.10.24", "pnl": 0.0, "dd": 350.93, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 0.0, "dd": 350.93, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": 1890.14, "dd": 2149.8, "legs": [-480.89, 612.94, 665.49, 650.73, 441.87]}, {"date": "2026.10.27", "pnl": -380.57, "dd": 1825.37, "legs": [69.12, 211.83, -198.53, -339.42, -123.57]}, {"date": "2026.10.28", "pnl": -672.97, "dd": 2157.41, "legs": [-194.72, -299.14, -157.32, -226.66, 204.87]}, {"date": "2026.10.29", "pnl": 3381.43, "dd": 1263.23, "legs": [-363.12, 1495.36, 533.18, 470.55, 1245.46]}, {"date": "2026.10.30", "pnl": 3041.27, "dd": 2639.42, "legs": [0.0, 1478.2, 1211.7, 724.59, -373.22]}, {"date": "2026.10.31", "pnl": 0.0, "dd": 990.27, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}];

const FITTED_CLOSE = [180558, 180633, 180633, 180633, 181080, 180978, 181175, 181732, 181646, 181646, 181646, 181529, 181457, 181983, 182773, 183609, 183609, 183609, 183491, 185273, 187059, 189063, 190353, 190353, 190353, 192069, 191416, 191252, 193330, 198327, 198327];

const FITTED_LOW = [180389, 180520, 180633, 180633, 180624, 180918, 180941, 181175, 181583, 181646, 181646, 181378, 181450, 181249, 181875, 182005, 183399, 183399, 182961, 183089, 184810, 185127, 187892, 190002, 190002, 188203, 190244, 189258, 189989, 190690, 197337];

const FITTED_LOSS = [11, 38, 0, 0, 10, 162, 38, 0, 149, 0, 0, 268, 78, 209, 108, 768, 210, 210, 648, 402, 463, 1932, 1171, 351, 351, 2150, 1825, 2157, 1263, 2639, 990];

const FITTED_NAMES = ["EURUSD breakout", "US100 breakout", "US500 breakout", "XAUUSD breakout", "EURUSD grid"];

const FITTED_DAYS: BookDay[] = [{"date": "2026.10.01", "pnl": 168.88, "dd": 11.22, "legs": [29.45, 38.01, 86.96, 14.46, 0.0]}, {"date": "2026.10.02", "pnl": 72.93, "dd": 38.4, "legs": [0.0, 6.04, -53.55, 90.61, 29.83]}, {"date": "2026.10.03", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 452.07, "dd": 9.71, "legs": [125.29, 29.24, 109.47, 177.49, 10.58]}, {"date": "2026.10.06", "pnl": 15.19, "dd": 162.33, "legs": [69.8, -68.03, -37.31, 21.95, 28.78]}, {"date": "2026.10.07", "pnl": 87.08, "dd": 37.5, "legs": [37.68, 7.74, 22.81, -41.2, 60.05]}, {"date": "2026.10.08", "pnl": 597.75, "dd": 0.0, "legs": [19.4, 150.78, 32.64, 89.74, 305.19]}, {"date": "2026.10.09", "pnl": -130.25, "dd": 149.38, "legs": [7.47, -40.01, -111.95, 0.0, 14.24]}, {"date": "2026.10.10", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": 35.53, "dd": 267.83, "legs": [-63.4, 95.07, -9.89, -38.8, 52.55]}, {"date": "2026.10.13", "pnl": -207.5, "dd": 78.45, "legs": [-105.24, -17.11, -149.14, 84.02, -20.03]}, {"date": "2026.10.14", "pnl": 632.72, "dd": 208.69, "legs": [350.56, 120.33, -23.18, 49.57, 135.44]}, {"date": "2026.10.15", "pnl": 740.8, "dd": 108.07, "legs": [0.0, 130.1, 332.64, 97.04, 181.02]}, {"date": "2026.10.16", "pnl": 771.98, "dd": 767.73, "legs": [14.67, 363.83, 170.69, 243.03, -20.24]}, {"date": "2026.10.17", "pnl": 0.0, "dd": 209.61, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 0.0, "dd": 209.61, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": -138.19, "dd": 648.15, "legs": [72.12, -410.95, 572.89, -251.55, -120.7]}, {"date": "2026.10.20", "pnl": 1619.95, "dd": 402.14, "legs": [166.91, 216.07, 782.71, 144.6, 309.66]}, {"date": "2026.10.21", "pnl": 1609.68, "dd": 463.01, "legs": [-110.49, 200.79, 1097.35, -206.93, 628.96]}, {"date": "2026.10.22", "pnl": 2014.14, "dd": 1931.84, "legs": [284.59, 235.47, 244.72, 579.04, 670.32]}, {"date": "2026.10.23", "pnl": 1335.01, "dd": 1171.04, "legs": [0.0, 605.27, -469.09, 1163.75, 35.08]}, {"date": "2026.10.24", "pnl": 0.0, "dd": 350.93, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 0.0, "dd": 350.93, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": 1890.14, "dd": 2149.8, "legs": [-480.89, 612.94, 665.49, 650.73, 441.87]}, {"date": "2026.10.27", "pnl": -380.57, "dd": 1825.37, "legs": [69.12, 211.83, -198.53, -339.42, -123.57]}, {"date": "2026.10.28", "pnl": -672.97, "dd": 2157.41, "legs": [-194.72, -299.14, -157.32, -226.66, 204.87]}, {"date": "2026.10.29", "pnl": 3381.43, "dd": 1263.23, "legs": [-363.12, 1495.36, 533.18, 470.55, 1245.46]}, {"date": "2026.10.30", "pnl": 3041.27, "dd": 2639.42, "legs": [0.0, 1478.2, 1211.7, 724.59, -373.22]}, {"date": "2026.10.31", "pnl": 0.0, "dd": 990.27, "legs": [0.0, 0.0, 0.0, 0.0, 0.0]}];

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

export default function BreakoutGridFtmo180400() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>October book for the $180,400 FTMO account</H1>
        <Text tone="secondary">Real ticks, 1–31 October 2026, deposit $180,400. The EURUSD grid flattens outside the symbol session. Breakout sizing caps at $190,000 of equity, and grid margin caps at $10,000. Saved inputs already respect the $9,000 day, so the finetuned result is the same book: $16,937 of profit, a $2,639 day, with equity down to $180,389.</Text>
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
            ["EURUSD breakout", "$232", "59", "44,590%", "Saved inputs."],
            ["US100 breakout", "$584", "125", "48,041%", "Saved inputs."],
            ["US500 breakout", "$594", "81", "15,301%", "Saved inputs."],
            ["XAUUSD breakout", "$589", "52", "15,928%", "Saved inputs."],
            ["EURUSD grid", "$589", "744", "21,914%", "Session flatten on."],
            ["XAUUSD grid", "$0", "0", "n/a", "0 trades. The minimum gold volume does not clear."],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Stack gap={8}>
        <H2>Saved inputs</H2>
        <Text>The cushion at the open is $400, under the $190,000 breakout sizing cap and the $10,000 grid cap. Breakout lots are the saved input times 0.35 times that cushion divided by $6,000, so they open far below the input and grow after the account has made money. The EURUSD grid uses the prepared divisors. The gold grid placed no trades, so that leg stays out of the book.</Text>
      </Stack>
      <Grid columns={4} gap={16}>
        <Stat value="$16,937" label="Net profit, October" tone="success" />
        <Stat value="$2,639" label="Worst day, 30 Oct" tone="warning" />
        <Stat value="$180,389" label="Lowest equity" tone="warning" />
        <Stat value="$140,465" label="Free margin, lower bound" tone="info" />
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
            yMin={178000}
            yMax={210000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">Day of October 2026. Equity in USD. The danger line is the $180,000 floor. The month's low, $180,389, is $389 above that line. Source: real-tick MT5 tests, deposit $180,400, EURUSD grid with session flatten.</Text>
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
        <Text>Session flatten is on for the EURUSD grid. The gold grid stays out.</Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EURUSD breakout", "sets/EUR_2500", "Saved input 9. Opens near 0.21 lots. M15, 100 bars, both ways, reset 14:00.", "\u2212$71"],
            ["US100 breakout", "sets/US100_4200", "Saved input 12.3. Opens near 0.29 lots. M15, 20 bars, both ways, reset 17:00.", "$5,162"],
            ["US500 breakout", "sets/US500_3000", "Saved input 150. Opens near 3.5 lots. M10, 10 bars, both ways, reset 17:00.", "$4,653"],
            ["XAUUSD breakout", "sets/XAU_3000", "Saved input 2.7. Opens near 0.06 lots. M5, 20 bars, short only, reset 16:00.", "$3,497"],
            ["EURUSD grid", "EURUSD_99p_220p_1p7", "Prepared divisors, buy 40 and sell 20. Session flatten on. Margin cap $10,000.", "$3,696"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 70.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {SAVED_NAMES.map((name, index) => (
          <LegCalendar key={`${name}-saved`} index={index} days={SAVED_DAYS} names={SAVED_NAMES} />
        ))}
      </Grid>
      <Callout tone="info" title="Saved inputs already fit the $9,000 day">The worst day is 30 Oct, closed +$3,041, with $2,639 given back from midnight. Free margin stayed above $140,465.</Callout>
<Divider />
      <Stack gap={8}>
        <H2>Inputs sized for the $9,000 day</H2>
        <Text>
          The saved inputs already keep the worst day at $2,639, equity at $180,389, and free margin above $140,465.
          The search leaves every executable leg at full weight, so the finetuned book is this same book.
          The gold grid stays out. Its own test is 0 trades.
        </Text>
      </Stack>
      <Grid columns={4} gap={16}>
        <Stat value="$16,937" label="Net profit, October" tone="success" />
        <Stat value="$2,639" label="Worst day, 30 Oct" tone="warning" />
        <Stat value="$180,389" label="Lowest equity" tone="warning" />
        <Stat value="$140,465" label="Free margin, lower bound" tone="info" />
      </Grid>
      <Callout tone="warning" title="The binding constraint is the $180,000 floor">
        Equity reached $180,389, $389 above $180,000. 30 Oct closed +$3,041 and gave back $2,639 from midnight, leaving $6,361 under the $9,000 limit. The book grows into the $190,000 sizing cap. A $400 cushion cannot place the minimum gold volume.
      </Callout>
      <Text tone="tertiary" size="small">Tests are single-strategy MT5 runs, every tick based on real ticks, 100% real ticks, FTMO symbols, leverage 1:100, from 1 Oct 2026 to 1 Nov 2026. Grid profiles set session flatten on and a $10,000 margin cap; the set files in the repo stay unchanged. Breakout sizing uses equity capped at $190,000. Grid margin is equity minus $180,000, stopped at $10,000. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level. The sized book is the highest October profit, in steps of one tenth, with daily loss at or under $9,000, equity at or above $180,000, free margin at or above $50,000, and at most 200 orders. Deposit $180,400.</Text>
    </Stack>
  );
}
