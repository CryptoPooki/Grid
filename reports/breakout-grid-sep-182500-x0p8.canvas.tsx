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

const DAYS = ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13", "9/14", "9/15", "9/16", "9/17", "9/18", "9/19", "9/20", "9/21", "9/22", "9/23", "9/24", "9/25", "9/26", "9/27", "9/28", "9/29", "9/30", "10/1", "10/2", "10/3", "10/4", "10/5", "10/6", "10/7", "10/8", "10/9", "10/10", "10/11", "10/12", "10/13", "10/14", "10/15", "10/16", "10/17", "10/18", "10/19", "10/20", "10/21", "10/22", "10/23", "10/24", "10/25", "10/26", "10/27", "10/28", "10/29", "10/30", "10/31", "11/1", "11/2", "11/3", "11/4", "11/5", "11/6", "11/7", "11/8", "11/9", "11/10", "11/11", "11/12", "11/13", "11/14"];

const EQUITY_CLOSE = [180839, 182221, 183500, 184827, 184820, 184944, 184585, 185363, 185089, 186746, 189766, 189774, 189296, 186173, 190941, 186215, 192342, 194763, 194427, 194660, 199778, 201321, 202398, 203581, 203132, 202605, 203068, 204698, 207609, 208748, 210059, 209487, 209508, 209520, 211454, 211406, 211465, 215176, 217865, 217850, 218347, 221139, 221106, 228996, 227606, 228317, 228292, 229081, 228499, 228460, 229608, 229267, 229647, 230962, 230973, 232636, 234877, 234642, 237207, 239695, 239672, 239613, 240976, 240446, 248038, 246110, 247218, 247268, 248135, 254382, 258408, 263289, 265356, 265755, 265755];

const EQUITY_LOW = [180473, 180206, 181992, 183024, 184760, 184701, 183733, 183549, 184628, 184519, 185521, 189581, 189252, 185276, 186080, 183044, 185688, 191667, 194365, 192896, 193903, 199043, 200175, 201671, 202061, 202269, 202605, 202656, 203105, 204838, 208040, 207221, 209466, 209329, 208922, 210310, 209522, 210718, 214794, 217810, 217716, 216800, 219388, 219029, 227548, 226210, 228228, 227264, 227123, 227903, 227614, 228727, 228554, 229024, 230947, 229511, 231477, 232574, 234181, 236875, 239621, 239351, 238795, 239066, 236429, 245746, 245815, 247204, 247154, 248095, 252986, 258148, 262779, 264789, 265755];

const DAILY_LOSS = [2027, 633, 228, 475, 67, 119, 1212, 1036, 735, 570, 1225, 185, 522, 4020, 93, 7897, 527, 674, 399, 1531, 757, 735, 1146, 728, 1520, 863, 0, 412, 1593, 2771, 709, 2838, 22, 179, 598, 1144, 1884, 747, 382, 55, 134, 1547, 1752, 2076, 1448, 1396, 89, 1028, 1958, 596, 846, 881, 713, 623, 15, 1462, 1160, 2304, 461, 332, 73, 321, 818, 1909, 4017, 2292, 295, 14, 114, 40, 1395, 260, 510, 567, 0];

const LEG_NAMES = ["EUR v3 breakout", "BTC v3 breakout", "ETH v3 breakout", "US100 v3 breakout", "US500 v3 breakout", "XAU v3 breakout", "EUR grid", "US500 grid", "XAU grid"];

const BOOK_DAYS: BookDay[] = [{"date": "2026.09.01", "pnl": 202.82, "dd": 2026.75, "legs": [17.67, -2.1, 83.25, 35.79, 91.45, 49.97, 211.5, -284.71, 0.0]}, {"date": "2026.09.02", "pnl": 558.35, "dd": 633.4, "legs": [0.0, -0.5, 0.0, 21.85, 47.98, 0.0, 37.14, 451.88, 0.0]}, {"date": "2026.09.03", "pnl": 100.42, "dd": 228.4, "legs": [42.51, 18.31, 283.67, 88.41, 99.47, 121.53, -683.14, 289.6, -159.94]}, {"date": "2026.09.04", "pnl": 1611.43, "dd": 475.42, "legs": [45.31, 78.53, 0.0, 19.8, 155.03, 265.02, 143.5, 300.72, 603.52]}, {"date": "2026.09.05", "pnl": -6.77, "dd": 67.17, "legs": [0.0, -6.77, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.06", "pnl": 124.03, "dd": 118.61, "legs": [0.0, -13.78, 137.81, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.07", "pnl": -10.05, "dd": 1211.62, "legs": [92.35, -12.97, 83.54, 0.0, 20.63, 0.0, -193.48, 0.0, -0.12]}, {"date": "2026.09.08", "pnl": 813.51, "dd": 1036.15, "legs": [109.49, 60.8, 0.0, 6.85, 94.28, -51.25, -41.42, 372.47, 262.29]}, {"date": "2026.09.09", "pnl": 228.71, "dd": 735.29, "legs": [154.74, 2.51, 0.0, 50.94, 191.07, 116.09, -184.18, -17.31, -85.15]}, {"date": "2026.09.10", "pnl": 1812.62, "dd": 569.61, "legs": [224.58, 78.49, 0.0, 0.0, 163.97, 622.59, 363.7, -273.31, 632.6]}, {"date": "2026.09.11", "pnl": 2153.06, "dd": 1225.0, "legs": [88.81, -9.46, 388.97, 0.0, 551.12, -0.2, 182.58, 772.79, 178.45]}, {"date": "2026.09.12", "pnl": 0.0, "dd": 184.56, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.13", "pnl": 207.72, "dd": 521.7, "legs": [0.0, -109.49, 317.21, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.14", "pnl": 1414.63, "dd": 4020.0, "legs": [0.0, -11.33, 0.0, 0.0, 229.65, 218.51, 692.58, 98.31, 186.91]}, {"date": "2026.09.15", "pnl": 1656.52, "dd": 92.65, "legs": [0.0, 108.3, 1030.7, 0.0, 111.06, 440.91, 73.08, -107.53, 0.0]}, {"date": "2026.09.16", "pnl": 1134.79, "dd": 7896.73, "legs": [0.0, -2.18, 24.45, 0.0, 106.45, 63.14, 591.94, -278.48, 629.47]}, {"date": "2026.09.17", "pnl": -1858.78, "dd": 526.95, "legs": [-4204.9, 63.89, 252.42, 0.0, 450.8, 417.89, 134.02, 1105.82, -78.72]}, {"date": "2026.09.18", "pnl": 1297.38, "dd": 674.31, "legs": [0.0, 411.23, 765.7, 214.66, 33.22, 533.45, -57.6, -29.39, -573.89]}, {"date": "2026.09.19", "pnl": 35.47, "dd": 398.58, "legs": [0.0, 57.48, -22.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.20", "pnl": 26.82, "dd": 1530.97, "legs": [0.0, 26.82, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.21", "pnl": 3525.58, "dd": 757.31, "legs": [0.0, 13.63, 1585.21, 468.64, 531.4, 95.63, 269.34, 42.57, 519.16]}, {"date": "2026.09.22", "pnl": 1829.2, "dd": 735.43, "legs": [0.0, 47.97, 0.0, 192.41, 15.3, 1436.85, 246.08, 35.15, -144.56]}, {"date": "2026.09.23", "pnl": 2755.9, "dd": 1145.77, "legs": [-1635.92, -4.99, -19.53, 444.63, 703.56, 279.32, 1138.98, 707.15, 1142.7]}, {"date": "2026.09.24", "pnl": 1079.25, "dd": 727.54, "legs": [125.47, 233.93, 0.0, 204.51, 0.0, -0.4, 138.22, 73.19, 304.33]}, {"date": "2026.09.25", "pnl": 34.36, "dd": 1520.16, "legs": [0.0, 34.66, 0.0, 346.28, 73.68, 70.08, -203.44, -217.32, -69.58]}, {"date": "2026.09.26", "pnl": 45.04, "dd": 863.29, "legs": [0.0, 45.04, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.27", "pnl": -2881.74, "dd": 0.0, "legs": [0.0, -15.43, -2866.31, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.28", "pnl": 2838.44, "dd": 412.06, "legs": [28.67, 0.0, 384.92, 351.47, -1058.51, 2574.45, 129.34, 216.53, 211.57]}, {"date": "2026.09.29", "pnl": 1510.67, "dd": 1592.66, "legs": [543.12, 0.0, 169.15, 0.0, 39.08, 380.67, 390.8, -12.15, 0.0]}, {"date": "2026.09.30", "pnl": 746.94, "dd": 2771.03, "legs": [90.47, 45.62, 0.0, 389.89, 5.14, -0.69, 72.66, 57.3, 86.55]}, {"date": "2026.10.01", "pnl": 2307.06, "dd": 708.64, "legs": [1251.47, 22.76, 0.0, 190.47, 103.44, 0.0, 747.52, 25.42, -34.02]}, {"date": "2026.10.02", "pnl": 1843.58, "dd": 2838.15, "legs": [0.0, 69.2, 471.51, 0.0, 0.0, 157.88, 363.77, 53.83, 727.39]}, {"date": "2026.10.03", "pnl": 20.66, "dd": 21.55, "legs": [0.0, 20.66, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 12.59, "dd": 179.17, "legs": [0.0, 10.24, 2.35, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 1065.88, "dd": 598.31, "legs": [533.67, 53.72, 345.69, 0.0, -619.66, 0.0, 847.23, -143.58, 48.81]}, {"date": "2026.10.06", "pnl": -1149.35, "dd": 1143.63, "legs": [442.4, -6.42, 3.12, 0.0, 472.86, -1231.99, -651.36, -433.9, 255.94]}, {"date": "2026.10.07", "pnl": 4112.5, "dd": 1884.09, "legs": [0.0, -23.91, 1599.27, 0.0, 258.32, 0.0, 1027.74, 629.68, 621.4]}, {"date": "2026.10.08", "pnl": 454.71, "dd": 746.87, "legs": [0.0, 7.94, 342.43, 0.0, 16.96, 0.0, -371.76, 431.63, 27.51]}, {"date": "2026.10.09", "pnl": 793.6, "dd": 381.83, "legs": [0.0, 4.14, 0.0, 0.0, 151.09, 1374.77, 41.66, -274.18, -503.88]}, {"date": "2026.10.10", "pnl": -14.37, "dd": 54.83, "legs": [0.0, -14.37, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 496.94, "dd": 134.03, "legs": [0.0, 11.47, 485.47, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": 513.56, "dd": 1547.19, "legs": [-1159.43, 26.86, 0.0, 0.0, 247.2, 278.83, 577.96, 137.33, 404.81]}, {"date": "2026.10.13", "pnl": 1345.48, "dd": 1751.56, "legs": [-6.17, 19.41, 942.71, 0.0, 0.0, 565.3, -484.88, 21.15, 287.96]}, {"date": "2026.10.14", "pnl": 5635.13, "dd": 2076.5, "legs": [398.44, 64.94, 1288.75, 127.38, 443.18, 978.05, 923.02, 149.0, 1262.37]}, {"date": "2026.10.15", "pnl": -62.25, "dd": 1448.25, "legs": [931.26, -13.53, -17.15, 6.62, 52.61, -0.54, -590.94, -28.25, -402.33]}, {"date": "2026.10.16", "pnl": 741.06, "dd": 1396.01, "legs": [442.84, 104.29, -24.3, 253.54, 289.71, 0.0, -368.53, 5.65, 37.86]}, {"date": "2026.10.17", "pnl": -24.24, "dd": 88.59, "legs": [0.0, -24.24, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 721.71, "dd": 1028.08, "legs": [0.0, 143.56, 578.15, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": -131.73, "dd": 1957.96, "legs": [0.0, 77.81, 0.0, 356.8, 0.0, -209.75, -549.31, -28.81, 221.53]}, {"date": "2026.10.20", "pnl": 252.54, "dd": 595.91, "legs": [0.0, 173.55, 166.06, 150.47, 139.5, -0.51, -480.5, -28.13, 132.1]}, {"date": "2026.10.21", "pnl": 512.82, "dd": 845.75, "legs": [0.0, -11.34, 510.64, 0.0, 162.38, 0.0, -38.26, -22.76, -87.84]}, {"date": "2026.10.22", "pnl": 333.32, "dd": 880.97, "legs": [-961.73, -18.18, 130.09, 324.83, 102.94, 0.0, 270.68, 1.13, 483.56]}, {"date": "2026.10.23", "pnl": 1208.46, "dd": 713.19, "legs": [366.84, 175.4, 0.0, 82.71, 239.88, 0.0, 350.57, -6.94, 0.0]}, {"date": "2026.10.24", "pnl": 1313.1, "dd": 623.48, "legs": [0.0, 141.13, 1171.97, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 11.21, "dd": 14.51, "legs": [0.0, 11.21, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": -1590.0, "dd": 1462.0, "legs": [175.11, 4.77, -51.39, 484.7, 358.74, -3371.92, 820.5, -10.51, 0.0]}, {"date": "2026.10.27", "pnl": 2579.39, "dd": 1159.52, "legs": [516.9, 19.51, 0.0, 120.23, 297.33, 891.63, 872.62, -39.59, -99.24]}, {"date": "2026.10.28", "pnl": 264.37, "dd": 2303.68, "legs": [361.93, 5.95, 0.0, 246.39, 112.19, 104.37, -476.08, -30.5, -59.88]}, {"date": "2026.10.29", "pnl": 522.48, "dd": 460.97, "legs": [196.0, 6.19, -173.56, 295.42, 73.73, 185.9, -348.94, -3.13, 290.87]}, {"date": "2026.10.30", "pnl": 3799.77, "dd": 332.27, "legs": [454.85, -25.07, 736.88, 233.27, 769.81, 623.17, 133.68, 468.64, 404.54]}, {"date": "2026.10.31", "pnl": -22.19, "dd": 73.34, "legs": [0.0, -22.19, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.01", "pnl": 75.33, "dd": 321.28, "legs": [0.0, -13.57, 88.9, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.02", "pnl": 1566.1, "dd": 818.12, "legs": [433.73, 23.4, 262.83, 188.54, 270.98, 1572.46, -677.85, -526.3, 18.31]}, {"date": "2026.11.03", "pnl": 1479.82, "dd": 1909.32, "legs": [0.0, 65.71, 0.0, 163.19, 0.0, 687.54, -92.68, 609.58, 46.48]}, {"date": "2026.11.04", "pnl": 4712.6, "dd": 4017.06, "legs": [312.52, 409.42, 2341.01, 184.02, 1424.67, 612.49, -777.64, 943.05, -736.94]}, {"date": "2026.11.05", "pnl": -1669.7, "dd": 2291.64, "legs": [0.0, 26.24, 458.69, 523.87, 907.02, 247.43, 97.43, -3629.24, -301.14]}, {"date": "2026.11.06", "pnl": 2854.54, "dd": 294.9, "legs": [0.0, 36.44, 0.0, 2.72, 8.97, 48.62, 1345.29, 1150.36, 262.14]}, {"date": "2026.11.07", "pnl": 49.85, "dd": 13.72, "legs": [0.0, 49.85, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.08", "pnl": 7.51, "dd": 114.1, "legs": [0.0, 23.1, -15.59, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.09", "pnl": 5091.7, "dd": 40.13, "legs": [0.0, 43.55, 2008.91, 750.8, 823.3, 1695.5, -1612.29, 2098.26, -716.33]}, {"date": "2026.11.10", "pnl": 3443.43, "dd": 1395.02, "legs": [-260.29, -16.74, 223.18, 599.31, 131.16, 492.7, 969.73, -140.23, 1444.61]}, {"date": "2026.11.11", "pnl": 4588.18, "dd": 259.58, "legs": [902.3, 25.93, 0.0, 243.81, 463.98, 447.91, 1308.1, 671.93, 524.22]}, {"date": "2026.11.12", "pnl": 3335.84, "dd": 509.83, "legs": [374.42, 48.67, 503.4, 479.16, 240.87, 601.63, 327.43, 3.45, 756.81]}, {"date": "2026.11.13", "pnl": -959.79, "dd": 566.91, "legs": [-816.54, -699.82, 260.01, 322.49, -554.35, 51.5, 499.86, -22.94, 0.0]}, {"date": "2026.11.14", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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
  const start = new Date(Date.UTC(2026, 8, 1));
  const end = new Date(Date.UTC(2026, 10, 14));
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
          The three numbers are legs that closed up, down, or flat.
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

export default function BreakoutGridSep182500X08() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Breakout and grid book, 0.8 lots, session flatten</H1>
        <Text tone="secondary">
          Real ticks, deposit $182,500, 1 Sep–14 Nov 2026. Breakout lot inputs are 0.8 times the saved v3 sets. Grid sets are EUR_2500, US500_2500 and XAU_2500, and they flatten outside the symbol session.
          The nine solo tests sum to $52,666. Read together, with breakout size following the shared equity, the book reaches $75,429 and drops $7,897 on 16 Sep.
        </Text>
      </Stack>
      <Stack gap={8}>
        <H2>Each strategy on its own</H2>
        <Text>
          These are the MT5 results, one expert at a time, every tick based on real ticks, from 1 Sep 2026 through 14 Nov 2026.
          The combined book below lets every breakout read the shared equity. Grid margin stays at the saved $2,500.
        </Text>
        <Table
          headers={["Strategy", "Own result", "Trades", "Minimum margin level", "Test"]}
          columnAlign={["left", "right", "right", "right", "left"]}
          rows={[
            ["EUR v3 breakout", "$539", "214", "21,511%", "Equity sizing, floor $180,000, cap $190,000."],
            ["BTC v3 breakout", "$679", "73", "4,272%", "Equity sizing, floor $180,000, cap $190,000."],
            ["ETH v3 breakout", "$11,205", "91", "1,324%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US100 v3 breakout", "$4,086", "172", "15,141%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US500 v3 breakout", "$5,623", "107", "4,845%", "Equity sizing, floor $180,000, cap $190,000."],
            ["XAU v3 breakout", "$8,780", "89", "2,094%", "Equity sizing, floor $180,000, cap $190,000."],
            ["EUR grid", "$7,456", "2110", "6,365%", "Fixed margin $2,500."],
            ["US500 grid", "$5,334", "1891", "3,699%", "Fixed margin $2,500."],
            ["XAU grid", "$8,963", "437", "11,143%", "Fixed margin $2,500."],
          ]}
          striped
        />
      </Stack>
      <Stack gap={8}>
        <H2>Maximum drawdown, each strategy alone</H2>
        <Text>
          Ranked by the deepest peak-to-trough equity drop on that strategy's own test. The deposit column is the deepest point below the $182,500 start.
        </Text>
        <Table
          headers={["Rank", "Strategy", "Maximum drawdown", "Share of the peak", "Below the deposit", "Own result"]}
          columnAlign={["right", "left", "right", "right", "right", "right"]}
          rows={[
            ["1", "US500 grid", "$3,846", "2.05%", "$667", "$5,334"],
            ["2", "XAU v3 breakout", "$3,540", "1.90%", "$2,263", "$8,780"],
            ["3", "EUR grid", "$3,341", "1.76%", "$1,031", "$7,456"],
            ["4", "US500 v3 breakout", "$2,236", "1.20%", "$148", "$5,623"],
            ["5", "XAU grid", "$1,725", "0.91%", "$505", "$8,963"],
            ["6", "ETH v3 breakout", "$1,647", "0.88%", "$296", "$11,205"],
            ["7", "EUR v3 breakout", "$1,328", "0.73%", "$819", "$539"],
            ["8", "US100 v3 breakout", "$698", "0.38%", "$299", "$4,086"],
            ["9", "BTC v3 breakout", "$448", "0.25%", "$280", "$679"],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Grid columns={4} gap={16}>
        <Stat value="$75,429" label="Combined profit" tone="success" />
        <Stat value="$7,897" label="Worst day, 16 Sep" tone="success" />
        <Stat value="$180,459" label="Lowest equity" tone="success" />
        <Stat value="$69,561" label="Free margin, lower bound" tone="success" />
      </Grid>
      <BookCalendar days={BOOK_DAYS} heading="P&L, 0.8 breakout lots and session-flatten grids" caption="DD is the drop from equity at the start of the day." />
      <Grid columns={2} gap={20}>
        <Stack gap={8}>
          <H3>Equity, shared account</H3>
          <LineChart
            categories={DAYS}
            series={[
              { name: "Equity at day close", data: EQUITY_CLOSE, tone: "success" },
              { name: "Lowest equity that day", data: EQUITY_LOW, tone: "warning" },
            ]}
            beginAtZero={false}
            yMin={170000}
            yMax={270000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day from 1 Sep 2026 to 14 Nov 2026. Equity in USD. Source: real-tick solo tests, deposit $182,500, breakouts resized from the shared equity up to $190,000.
          </Text>
        </Stack>
        <Stack gap={8}>
          <H3>Daily equity loss</H3>
          <BarChart
            categories={DAYS}
            series={[{ name: "Drop from the start of the day", data: DAILY_LOSS, tone: "warning" }]}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 9000, label: "$9,000 limit", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day from 1 Sep 2026 to 14 Nov 2026. DD is the drop from equity at the start of the day, in USD.
          </Text>
        </Stack>
      </Grid>
      <Stack gap={8}>
        <H2>What was run</H2>
        <Text>
          Breakout lots are 0.8 times the saved input, times the cushion above $180,000 divided by $10,000, with equity capped at $190,000. At the open the cushion is $2,500, so the factor is 0.25. At the cap the factor is 1. Lots lock at 15:00. Grid margin stays at $2,500, and the grids flatten outside the symbol session.
        </Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EUR v3 breakout", "sets/v3/EUR_V3", "M6, 80 bars, both ways, lots 2.48, no stop, 144 hour hold, reset 15:00. Opens near 0.62 lots.", "$613"],
            ["BTC v3 breakout", "sets/v3/BTC_V3", "M5, 70 bars, both ways, lots 0.56, no stop, 264 hour hold, reset 15:00. Opens near 0.14 lots.", "$2,176"],
            ["ETH v3 breakout", "sets/v3/ETH_V3", "M20, 90 bars, both ways, lots 2.16, no stop, 96 hour hold, reset 15:00. Opens near 0.54 lots.", "$17,239"],
            ["US100 v3 breakout", "sets/v3/US100_V3", "M3, 100 bars, both ways, lots 3.6, no stop, 410 hour hold, reset 15:00. Opens near 0.90 lots.", "$9,167"],
            ["US500 v3 breakout", "sets/v3/US500_V3", "M20, 60 bars, both ways, lots 32, no stop, 72 hour hold, reset 15:00. Opens near 8 lots.", "$10,045"],
            ["XAU v3 breakout", "sets/v3/XAU_V3", "M15, 40 bars, both ways, lots 1.12, no stop, 96 hour hold, reset 15:00. Opens near 0.28 lots.", "$14,437"],
            ["EUR grid", "EUR_2500", "Margin $2,500, divisors 90/20, M30, 20 levels, 5 pending a side. Session flatten on.", "$7,456"],
            ["US500 grid", "US500_2500", "Margin $2,500, divisors 20/20, H1, 20 levels, 5 pending a side. Session flatten on.", "$5,334"],
            ["XAU grid", "XAU_2500", "Margin $2,500, divisors 100/20, H12, 20 levels, 5 pending a side. Session flatten on.", "$8,963"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 144. The book ends near $265,755.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {LEG_NAMES.map((name, index) => (
          <LegCalendar key={name} index={index} days={BOOK_DAYS} names={LEG_NAMES} />
        ))}
      </Grid>
      <Callout tone="success" title="The shared book stays inside the FTMO limits">
        Equity stayed at $180,459 or above. The largest day is 16 Sep, a $7,897 drop from the equity at the start of the day. The free-margin lower bound is $69,561. Profit is $75,429.
      </Callout>
      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs, every tick based on real ticks, FTMO symbols, leverage 1:100, login 531454261, from 1 Sep 2026 to 14 Nov 2026. Set files in the repos were not changed. The 0.8 lot inputs, the grid session flatten, and grid equity logging were set on the tester copies only. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level, scaled by the breakout size ratio. Grids stay at ratio 1.
      </Text>
    </Stack>
  );
}
