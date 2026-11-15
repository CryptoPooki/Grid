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

const EQUITY_CLOSE = [193764, 198060, 204833, 206581, 206567, 206825, 206153, 207355, 207163, 209614, 213155, 213118, 212655, 209157, 214638, 210069, 216072, 218532, 218196, 218190, 222996, 224563, 225853, 226701, 226017, 225604, 225893, 227550, 230445, 231489, 232854, 232269, 232290, 232303, 234289, 234151, 234307, 237564, 239554, 239540, 240041, 242804, 242754, 250432, 249011, 249709, 249683, 250401, 249857, 249701, 250863, 250724, 251257, 252583, 252595, 254207, 256468, 256239, 258612, 261072, 261049, 260983, 262093, 261583, 269124, 267211, 268506, 268559, 269427, 275336, 279391, 284281, 286377, 286745, 286745];

const EQUITY_LOW = [192328, 190950, 197379, 204014, 206438, 206319, 204838, 204391, 206682, 206225, 207681, 212918, 212611, 208156, 209059, 206908, 209555, 215398, 218134, 216663, 217533, 222243, 223450, 225276, 225223, 225340, 225604, 225480, 225997, 227643, 230770, 229960, 232247, 232108, 231722, 233115, 233024, 233651, 237212, 239498, 239403, 238518, 241018, 240710, 248950, 247626, 249616, 248652, 248471, 249145, 248899, 250082, 250141, 250630, 252568, 251042, 253075, 254206, 255826, 258277, 260995, 260727, 260168, 260196, 257509, 266832, 266925, 268492, 268446, 269393, 273972, 279131, 283771, 285809, 286745];

const DAILY_LOSS = [7672, 2815, 680, 818, 143, 247, 1987, 1762, 673, 938, 1933, 237, 507, 4499, 98, 7729, 514, 675, 398, 1533, 656, 753, 1112, 577, 1478, 677, 0, 413, 1553, 2801, 719, 2894, 22, 183, 581, 1174, 1127, 656, 352, 56, 137, 1523, 1786, 2044, 1482, 1385, 92, 1032, 1930, 711, 802, 781, 583, 627, 15, 1552, 1132, 2262, 413, 335, 77, 322, 815, 1897, 4074, 2292, 286, 14, 113, 35, 1365, 260, 510, 569, 0];

const LEG_NAMES = ["EUR v3 breakout", "BTC v3 breakout", "ETH v3 breakout", "US100 v3 breakout", "US500 v3 breakout", "XAU v3 breakout", "EUR grid", "US500 grid", "XAU grid"];

const BOOK_DAYS: BookDay[] = [{"date": "2026.09.01", "pnl": 1523.14, "dd": 7671.95, "legs": [70.68, 7.73, 701.39, 203.7, 408.79, 204.06, 211.5, -284.71, 0.0]}, {"date": "2026.09.02", "pnl": 1224.74, "dd": 2814.91, "legs": [0.0, -5.35, 0.0, 234.28, 506.79, 0.0, 37.14, 451.88, 0.0]}, {"date": "2026.09.03", "pnl": 2084.63, "dd": 680.28, "legs": [170.43, 73.24, 1150.57, 359.84, 398.14, 485.89, -683.14, 289.6, -159.94]}, {"date": "2026.09.04", "pnl": 2716.71, "dd": 818.43, "legs": [147.28, 228.24, 0.0, 57.25, 447.73, 788.47, 143.5, 300.72, 603.52]}, {"date": "2026.09.05", "pnl": -14.41, "dd": 143.37, "legs": [0.0, -14.41, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.06", "pnl": 258.47, "dd": 247.07, "legs": [0.0, -28.57, 287.04, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.07", "pnl": 178.15, "dd": 1987.23, "legs": [188.4, -27.23, 168.98, 0.0, 41.6, 0.0, -193.48, 0.0, -0.12]}, {"date": "2026.09.08", "pnl": 968.66, "dd": 1762.17, "legs": [229.09, 132.37, 0.0, 14.11, 196.2, -196.45, -41.42, 372.47, 262.29]}, {"date": "2026.09.09", "pnl": 791.7, "dd": 672.89, "legs": [328.82, 5.12, 0.0, 107.13, 396.47, 240.8, -184.18, -17.31, -85.15]}, {"date": "2026.09.10", "pnl": 2711.68, "dd": 938.2, "legs": [413.61, 145.75, 0.0, 0.0, 294.49, 1134.84, 363.7, -273.31, 632.6]}, {"date": "2026.09.11", "pnl": 2414.0, "dd": 1933.18, "legs": [132.0, -13.96, 388.48, 0.0, 773.99, -0.33, 182.58, 772.79, 178.45]}, {"date": "2026.09.12", "pnl": 0.0, "dd": 236.91, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.13", "pnl": 215.47, "dd": 506.89, "legs": [0.0, -113.84, 329.31, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.14", "pnl": 1467.86, "dd": 4499.38, "legs": [0.0, -14.12, 0.0, 0.0, 229.83, 274.35, 692.58, 98.31, 186.91]}, {"date": "2026.09.15", "pnl": 1684.26, "dd": 98.31, "legs": [0.0, 103.66, 1024.38, 0.0, 133.63, 457.04, 73.08, -107.53, 0.0]}, {"date": "2026.09.16", "pnl": 1138.51, "dd": 7729.2, "legs": [0.0, -2.25, 26.75, 0.0, 107.29, 63.79, 591.94, -278.48, 629.47]}, {"date": "2026.09.17", "pnl": -597.63, "dd": 513.61, "legs": [-2965.48, 66.91, 254.07, 0.0, 451.48, 434.27, 134.02, 1105.82, -78.72]}, {"date": "2026.09.18", "pnl": 1352.63, "dd": 674.61, "legs": [0.0, 433.47, 769.57, 221.54, 33.23, 555.7, -57.6, -29.39, -573.89]}, {"date": "2026.09.19", "pnl": 36.83, "dd": 397.76, "legs": [0.0, 58.89, -22.06, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.20", "pnl": 27.62, "dd": 1532.96, "legs": [0.0, 27.62, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.21", "pnl": 3392.28, "dd": 656.28, "legs": [0.0, 14.05, 1447.57, 475.04, 531.82, 92.73, 269.34, 42.57, 519.16]}, {"date": "2026.09.22", "pnl": 1860.18, "dd": 753.21, "legs": [0.0, 49.62, 0.0, 195.31, 15.31, 1463.27, 246.08, 35.15, -144.56]}, {"date": "2026.09.23", "pnl": 2928.49, "dd": 1112.47, "legs": [-1489.31, -5.2, -19.57, 448.79, 706.14, 298.81, 1138.98, 707.15, 1142.7]}, {"date": "2026.09.24", "pnl": 1092.06, "dd": 576.96, "legs": [127.86, 243.02, 0.0, 205.83, 0.0, -0.39, 138.22, 73.19, 304.33]}, {"date": "2026.09.25", "pnl": 42.27, "dd": 1477.64, "legs": [0.0, 36.83, 0.0, 349.57, 73.72, 72.49, -203.44, -217.32, -69.58]}, {"date": "2026.09.26", "pnl": 45.03, "dd": 676.9, "legs": [0.0, 45.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.27", "pnl": -2125.28, "dd": 0.0, "legs": [0.0, -15.49, -2109.79, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.28", "pnl": 2935.33, "dd": 412.92, "legs": [29.26, 0.0, 389.95, 352.18, -984.63, 2591.13, 129.34, 216.53, 211.57]}, {"date": "2026.09.29", "pnl": 1521.87, "dd": 1553.25, "legs": [551.76, 0.0, 170.9, 0.0, 38.86, 381.7, 390.8, -12.15, 0.0]}, {"date": "2026.09.30", "pnl": 762.77, "dd": 2801.31, "legs": [91.17, 61.71, 0.0, 389.04, 5.05, -0.71, 72.66, 57.3, 86.55]}, {"date": "2026.10.01", "pnl": 2332.62, "dd": 718.66, "legs": [1276.2, 22.93, 0.0, 190.82, 103.75, 0.0, 747.52, 25.42, -34.02]}, {"date": "2026.10.02", "pnl": 1838.87, "dd": 2894.34, "legs": [0.0, 69.84, 472.0, 0.0, 0.0, 152.04, 363.77, 53.83, 727.39]}, {"date": "2026.10.03", "pnl": 21.0, "dd": 21.93, "legs": [0.0, 21.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 12.8, "dd": 182.54, "legs": [0.0, 10.42, 2.38, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 1161.45, "dd": 580.87, "legs": [556.81, 54.79, 349.27, 0.0, -551.88, 0.0, 847.23, -143.58, 48.81]}, {"date": "2026.10.06", "pnl": -1085.78, "dd": 1173.99, "legs": [450.4, -6.58, 2.95, 0.0, 468.51, -1171.74, -651.36, -433.9, 255.94]}, {"date": "2026.10.07", "pnl": 4126.01, "dd": 1126.79, "legs": [0.0, -24.48, 1613.23, 0.0, 258.44, 0.0, 1027.74, 629.68, 621.4]}, {"date": "2026.10.08", "pnl": 454.82, "dd": 656.02, "legs": [0.0, 8.11, 342.33, 0.0, 17.0, 0.0, -371.76, 431.63, 27.51]}, {"date": "2026.10.09", "pnl": 818.13, "dd": 352.03, "legs": [0.0, 4.23, 0.0, 0.0, 150.97, 1399.33, 41.66, -274.18, -503.88]}, {"date": "2026.10.10", "pnl": -14.73, "dd": 56.1, "legs": [0.0, -14.73, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 501.58, "dd": 136.95, "legs": [0.0, 11.73, 489.85, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": 680.32, "dd": 1523.32, "legs": [-992.51, 27.47, 0.0, 0.0, 247.23, 278.03, 577.96, 137.33, 404.81]}, {"date": "2026.10.13", "pnl": 1357.03, "dd": 1785.5, "legs": [-6.2, 19.9, 949.88, 0.0, 0.0, 569.22, -484.88, 21.15, 287.96]}, {"date": "2026.10.14", "pnl": 5589.71, "dd": 2043.99, "legs": [386.06, 66.74, 1274.72, 126.89, 436.43, 964.48, 923.02, 149.0, 1262.37]}, {"date": "2026.10.15", "pnl": -57.64, "dd": 1481.69, "legs": [936.35, -14.01, -17.28, 6.74, 52.63, -0.55, -590.94, -28.25, -402.33]}, {"date": "2026.10.16", "pnl": 752.43, "dd": 1385.34, "legs": [449.23, 107.71, -24.38, 255.02, 289.87, 0.0, -368.53, 5.65, 37.86]}, {"date": "2026.10.17", "pnl": -25.33, "dd": 92.49, "legs": [0.0, -25.33, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 717.11, "dd": 1031.71, "legs": [0.0, 149.47, 567.64, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": -99.58, "dd": 1929.8, "legs": [0.0, 82.21, 0.0, 359.08, 0.0, -184.28, -549.31, -28.81, 221.53]}, {"date": "2026.10.20", "pnl": 246.57, "dd": 711.3, "legs": [0.0, 173.9, 168.08, 151.68, 129.93, -0.49, -480.5, -28.13, 132.1]}, {"date": "2026.10.21", "pnl": 517.62, "dd": 802.38, "legs": [0.0, -11.53, 513.68, 0.0, 164.33, 0.0, -38.26, -22.76, -87.84]}, {"date": "2026.10.22", "pnl": 385.5, "dd": 780.88, "legs": [-911.18, -18.5, 130.61, 326.24, 102.96, 0.0, 270.68, 1.13, 483.56]}, {"date": "2026.10.23", "pnl": 1212.07, "dd": 583.05, "legs": [367.08, 178.23, 0.0, 83.07, 240.06, 0.0, 350.57, -6.94, 0.0]}, {"date": "2026.10.24", "pnl": 1325.69, "dd": 627.32, "legs": [0.0, 145.94, 1179.75, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 11.75, "dd": 15.23, "legs": [0.0, 11.75, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": -533.09, "dd": 1552.49, "legs": [180.08, 5.01, -51.56, 486.9, 358.93, -2322.44, 820.5, -10.51, 0.0]}, {"date": "2026.10.27", "pnl": 2583.01, "dd": 1132.28, "legs": [521.6, 20.5, 0.0, 120.76, 297.62, 888.74, 872.62, -39.59, -99.24]}, {"date": "2026.10.28", "pnl": 270.58, "dd": 2262.45, "legs": [367.31, 6.23, 0.0, 248.18, 112.26, 103.06, -476.08, -30.5, -59.88]}, {"date": "2026.10.29", "pnl": 555.07, "dd": 413.26, "legs": [197.68, 6.5, -150.35, 300.41, 73.76, 188.27, -348.94, -3.13, 290.87]}, {"date": "2026.10.30", "pnl": 3814.72, "dd": 334.7, "legs": [458.86, -26.46, 742.43, 234.05, 769.99, 628.99, 133.68, 468.64, 404.54]}, {"date": "2026.10.31", "pnl": -23.3, "dd": 77.07, "legs": [0.0, -23.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.01", "pnl": 74.74, "dd": 321.54, "legs": [0.0, -14.22, 88.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.02", "pnl": 1469.17, "dd": 814.66, "legs": [448.01, 24.56, 263.98, 189.13, 271.13, 1458.2, -677.85, -526.3, 18.31]}, {"date": "2026.11.03", "pnl": 1482.86, "dd": 1897.15, "legs": [0.0, 68.97, 0.0, 164.41, 0.0, 686.1, -92.68, 609.58, 46.48]}, {"date": "2026.11.04", "pnl": 4756.26, "dd": 4074.37, "legs": [322.81, 432.59, 2357.6, 184.19, 1425.35, 605.25, -777.64, 943.05, -736.94]}, {"date": "2026.11.05", "pnl": -1661.11, "dd": 2291.91, "legs": [0.0, 27.24, 458.69, 525.23, 908.42, 252.26, 97.43, -3629.24, -301.14]}, {"date": "2026.11.06", "pnl": 2858.35, "dd": 286.06, "legs": [0.0, 37.99, 0.0, 2.71, 9.0, 50.86, 1345.29, 1150.36, 262.14]}, {"date": "2026.11.07", "pnl": 52.11, "dd": 14.35, "legs": [0.0, 52.11, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.08", "pnl": 8.69, "dd": 112.92, "legs": [0.0, 24.28, -15.59, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.09", "pnl": 5120.21, "dd": 34.63, "legs": [0.0, 45.84, 2008.91, 755.53, 825.84, 1714.45, -1612.29, 2098.26, -716.33]}, {"date": "2026.11.10", "pnl": 3561.04, "dd": 1364.62, "legs": [-140.92, -16.77, 223.18, 599.84, 131.21, 490.39, 969.73, -140.23, 1444.61]}, {"date": "2026.11.11", "pnl": 4597.8, "dd": 260.14, "legs": [911.58, 25.94, 0.0, 244.03, 464.09, 447.91, 1308.1, 671.93, 524.22]}, {"date": "2026.11.12", "pnl": 3347.16, "dd": 510.44, "legs": [384.61, 48.81, 503.4, 480.0, 241.02, 601.63, 327.43, 3.45, 756.81]}, {"date": "2026.11.13", "pnl": -1006.87, "dd": 568.81, "legs": [-854.92, -705.16, 260.01, 323.22, -558.44, 51.5, 499.86, -22.94, 0.0]}, {"date": "2026.11.14", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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

export default function BreakoutGridSep200000X08() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Breakout and grid book, 0.8 lots, session flatten, $200,000</H1>
        <Text tone="secondary">
          Real ticks, deposit $200,000, 1 Sep–14 Nov 2026. Breakout lot inputs are 0.8 times the saved v3 sets. Grid sets are EUR_2500, US500_2500 and XAU_2500, and they flatten outside the symbol session.
          The nine solo tests sum to $86,745. Read together, with breakout size following the shared equity, the book reaches $86,745 and drops $7,729 on 16 Sep.
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
            ["EUR v3 breakout", "$3,335", "214", "6,890%", "Equity sizing, floor $180,000, cap $190,000."],
            ["BTC v3 breakout", "$2,585", "73", "1,382%", "Equity sizing, floor $180,000, cap $190,000."],
            ["ETH v3 breakout", "$19,662", "91", "1,124%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US100 v3 breakout", "$9,972", "172", "9,188%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US500 v3 breakout", "$12,246", "107", "4,074%", "Equity sizing, floor $180,000, cap $190,000."],
            ["XAU v3 breakout", "$17,193", "89", "2,216%", "Equity sizing, floor $180,000, cap $190,000."],
            ["EUR grid", "$7,456", "2110", "6,963%", "Fixed margin $2,500."],
            ["US500 grid", "$5,334", "1891", "4,046%", "Fixed margin $2,500."],
            ["XAU grid", "$8,963", "437", "12,186%", "Fixed margin $2,500."],
          ]}
          striped
        />
      </Stack>
      <Stack gap={8}>
        <H2>Maximum drawdown, each strategy alone</H2>
        <Text>
          Ranked by the deepest peak-to-trough equity drop on that strategy's own test. The deposit column is the deepest point below the $200,000 start.
        </Text>
        <Table
          headers={["Rank", "Strategy", "Maximum drawdown", "Share of the peak", "Below the deposit", "Own result"]}
          columnAlign={["right", "left", "right", "right", "right", "right"]}
          rows={[
            ["1", "XAU v3 breakout", "$9,269", "4.63%", "$9,047", "$17,193"],
            ["2", "EUR v3 breakout", "$5,390", "2.67%", "$3,468", "$3,335"],
            ["3", "US500 grid", "$3,846", "1.87%", "$667", "$5,334"],
            ["4", "US500 v3 breakout", "$3,841", "1.84%", "$561", "$12,246"],
            ["5", "ETH v3 breakout", "$3,639", "1.79%", "$735", "$19,662"],
            ["6", "EUR grid", "$3,341", "1.61%", "$1,031", "$7,456"],
            ["7", "US100 v3 breakout", "$2,087", "1.04%", "$1,055", "$9,972"],
            ["8", "BTC v3 breakout", "$1,790", "0.89%", "$1,118", "$2,585"],
            ["9", "XAU grid", "$1,725", "0.83%", "$505", "$8,963"],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Grid columns={4} gap={16}>
        <Stat value="$86,745" label="Combined profit" tone="success" />
        <Stat value="$7,729" label="Worst day, 16 Sep" tone="success" />
        <Stat value="$190,950" label="Lowest equity" tone="success" />
        <Stat value="$130,574" label="Free margin, lower bound" tone="success" />
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
            yMin={175000}
            yMax={290000}
            valuePrefix="$"
            height={260}
            referenceLines={[{ value: 180000, label: "$180k floor", tone: "danger" }]}
          />
          <Text tone="tertiary" size="small">
            Day from 1 Sep 2026 to 14 Nov 2026. Equity in USD. Source: real-tick solo tests, deposit $200,000, breakouts resized from the shared equity up to $190,000.
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
          Breakout lots are 0.8 times the saved input, times the cushion above $180,000 divided by $10,000, with equity capped at $190,000. The $200,000 open is already above that cap, so the factor is 1 from the first bar and the lots open at the 0.8 inputs. Lots lock at 15:00. Grid margin stays at $2,500, and the grids flatten outside the symbol session.
        </Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EUR v3 breakout", "sets/v3/EUR_V3", "M6, 80 bars, both ways, lots 2.48, no stop, 144 hour hold, reset 15:00. Opens at 2.48 lots.", "$3,335"],
            ["BTC v3 breakout", "sets/v3/BTC_V3", "M5, 70 bars, both ways, lots 0.56, no stop, 264 hour hold, reset 15:00. Opens at 0.56 lots.", "$2,585"],
            ["ETH v3 breakout", "sets/v3/ETH_V3", "M20, 90 bars, both ways, lots 2.16, no stop, 96 hour hold, reset 15:00. Opens at 2.16 lots.", "$19,662"],
            ["US100 v3 breakout", "sets/v3/US100_V3", "M3, 100 bars, both ways, lots 3.6, no stop, 410 hour hold, reset 15:00. Opens at 3.6 lots.", "$9,972"],
            ["US500 v3 breakout", "sets/v3/US500_V3", "M20, 60 bars, both ways, lots 32, no stop, 72 hour hold, reset 15:00. Opens at 32 lots.", "$12,246"],
            ["XAU v3 breakout", "sets/v3/XAU_V3", "M15, 40 bars, both ways, lots 1.12, no stop, 96 hour hold, reset 15:00. Opens at 1.12 lots.", "$17,193"],
            ["EUR grid", "EUR_2500", "Margin $2,500, divisors 90/20, M30, 20 levels, 5 pending a side. Session flatten on.", "$7,456"],
            ["US500 grid", "US500_2500", "Margin $2,500, divisors 20/20, H1, 20 levels, 5 pending a side. Session flatten on.", "$5,334"],
            ["XAU grid", "XAU_2500", "Margin $2,500, divisors 100/20, H12, 20 levels, 5 pending a side. Session flatten on.", "$8,963"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 144. The book ends near $286,745.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {LEG_NAMES.map((name, index) => (
          <LegCalendar key={name} index={index} days={BOOK_DAYS} names={LEG_NAMES} />
        ))}
      </Grid>
      <Callout tone="success" title="The shared book stays inside the FTMO limits">
        Equity stayed at $190,950 or above. The largest day is 16 Sep, a $7,729 drop from the equity at the start of the day. The free-margin lower bound is $130,574. Profit is $86,745.
      </Callout>
      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs, every tick based on real ticks, FTMO symbols, leverage 1:100, login 531454261, from 1 Sep 2026 to 14 Nov 2026. Set files in the repos were not changed. The 0.8 lot inputs, the grid session flatten, and grid equity logging were set on the tester copies only. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level, scaled by the breakout size ratio. Grids stay at ratio 1.
      </Text>
    </Stack>
  );
}
