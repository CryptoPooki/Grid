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

const EQUITY_CLOSE = [180477, 182121, 183992, 185413, 185403, 185576, 185086, 186021, 185721, 187774, 191593, 191594, 191024, 186370, 193126, 186594, 194331, 197527, 197108, 197491, 203896, 205815, 206364, 207927, 207532, 206822, 207496, 209538, 213096, 214445, 215884, 214943, 214969, 214985, 217215, 217383, 216901, 221701, 225516, 225498, 226122, 229348, 229398, 238698, 237158, 238153, 238123, 239139, 238509, 238585, 240042, 239415, 239740, 241391, 241405, 243324, 245936, 245785, 249103, 251975, 251947, 251869, 253946, 253156, 262738, 261291, 261916, 261980, 263065, 271125, 275572, 281037, 283342, 283736, 283736];

const EQUITY_LOW = [180113, 179761, 181853, 183440, 185317, 185238, 184047, 183778, 185260, 184973, 185857, 191337, 190968, 185032, 186230, 182745, 185908, 193517, 197030, 195200, 196512, 203016, 203985, 205235, 205901, 206369, 206822, 207008, 207548, 209839, 213586, 212376, 214916, 214743, 214231, 215793, 214114, 215976, 221253, 225447, 225329, 224462, 227399, 226840, 237092, 235591, 238042, 236838, 236841, 237814, 237442, 238693, 238473, 238958, 241373, 239396, 241884, 243159, 245191, 248687, 251882, 251545, 250957, 251631, 248816, 260809, 260862, 261898, 261839, 263013, 269300, 275280, 280400, 282628, 283736];

const DAILY_LOSS = [2387, 716, 269, 552, 96, 165, 1529, 1308, 761, 747, 1917, 256, 626, 5992, 140, 10382, 686, 814, 497, 1907, 980, 880, 1830, 1129, 2026, 1163, 0, 487, 1990, 3257, 859, 3508, 27, 227, 754, 1422, 3269, 925, 448, 69, 169, 1660, 1950, 2558, 1606, 1567, 111, 1284, 2297, 695, 1143, 1349, 942, 782, 19, 2010, 1440, 2777, 594, 416, 93, 402, 912, 2315, 4340, 1929, 429, 18, 142, 53, 1825, 291, 637, 714, 0];

const LEG_NAMES = ["EUR v3 breakout", "BTC v3 breakout", "ETH v3 breakout", "US100 v3 breakout", "US500 v3 breakout", "XAU v3 breakout", "EUR grid", "US500 grid", "XAU grid"];

const BOOK_DAYS: BookDay[] = [{"date": "2026.09.01", "pnl": 239.17, "dd": 2387.43, "legs": [21.92, -3.23, 79.01, 40.67, 111.55, 62.46, 211.5, -284.71, 0.0]}, {"date": "2026.09.02", "pnl": 543.76, "dd": 715.88, "legs": [0.0, -0.39, 0.0, 17.36, 37.77, 0.0, 37.14, 451.88, 0.0]}, {"date": "2026.09.03", "pnl": 319.58, "dd": 268.6, "legs": [56.07, 23.54, 378.99, 117.76, 131.77, 164.93, -683.14, 289.6, -159.94]}, {"date": "2026.09.04", "pnl": 1843.05, "dd": 551.53, "legs": [63.92, 108.81, 0.0, 28.03, 221.62, 372.93, 143.5, 300.72, 603.52]}, {"date": "2026.09.05", "pnl": -9.67, "dd": 96.22, "legs": [0.0, -9.67, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.06", "pnl": 172.36, "dd": 165.44, "legs": [0.0, -19.85, 192.21, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.07", "pnl": 64.73, "dd": 1529.26, "legs": [130.84, -18.64, 117.04, 0.0, 29.09, 0.0, -193.48, 0.0, -0.12]}, {"date": "2026.09.08", "pnl": 899.46, "dd": 1307.95, "legs": [153.65, 81.02, 0.0, 9.57, 131.05, -69.17, -41.42, 372.47, 262.29]}, {"date": "2026.09.09", "pnl": 433.03, "dd": 760.87, "legs": [214.5, 3.72, 0.0, 71.19, 267.31, 162.95, -184.18, -17.31, -85.15]}, {"date": "2026.09.10", "pnl": 2272.59, "dd": 747.39, "legs": [318.18, 111.93, 0.0, 0.0, 229.21, 890.28, 363.7, -273.31, 632.6]}, {"date": "2026.09.11", "pnl": 2527.67, "dd": 1917.21, "legs": [124.51, -13.54, 507.51, 0.0, 775.65, -0.28, 182.58, 772.79, 178.45]}, {"date": "2026.09.12", "pnl": 0.0, "dd": 256.14, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.13", "pnl": 263.41, "dd": 625.54, "legs": [0.0, -145.67, 409.08, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.14", "pnl": 1552.2, "dd": 5991.61, "legs": [0.0, -16.57, 0.0, 0.0, 287.22, 303.75, 692.58, 98.31, 186.91]}, {"date": "2026.09.15", "pnl": 2111.35, "dd": 140.1, "legs": [0.0, 131.34, 1298.4, 0.0, 159.1, 556.96, 73.08, -107.53, 0.0]}, {"date": "2026.09.16", "pnl": 1181.62, "dd": 10381.51, "legs": [0.0, -2.76, 30.76, 0.0, 132.95, 77.74, 591.94, -278.48, 629.47]}, {"date": "2026.09.17", "pnl": -3349.75, "dd": 685.97, "legs": [-6035.2, 81.31, 314.82, 0.0, 563.71, 564.49, 134.02, 1105.82, -78.72]}, {"date": "2026.09.18", "pnl": 1807.42, "dd": 814.3, "legs": [0.0, 522.46, 953.09, 263.39, 41.5, 687.86, -57.6, -29.39, -573.89]}, {"date": "2026.09.19", "pnl": 43.73, "dd": 496.96, "legs": [0.0, 71.17, -27.44, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.20", "pnl": 33.16, "dd": 1907.13, "legs": [0.0, 33.16, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.21", "pnl": 4266.19, "dd": 979.53, "legs": [0.0, 16.82, 2036.63, 591.14, 664.45, 126.08, 269.34, 42.57, 519.16]}, {"date": "2026.09.22", "pnl": 2275.85, "dd": 880.2, "legs": [0.0, 59.29, 0.0, 242.42, 19.13, 1818.34, 246.08, 35.15, -144.56]}, {"date": "2026.09.23", "pnl": 2666.81, "dd": 1829.99, "legs": [-2102.72, -6.16, -24.42, 560.45, 878.36, 372.47, 1138.98, 707.15, 1142.7]}, {"date": "2026.09.24", "pnl": 1219.2, "dd": 1129.09, "legs": [159.68, 288.76, 0.0, 255.48, 0.0, -0.46, 138.22, 73.19, 304.33]}, {"date": "2026.09.25", "pnl": 171.02, "dd": 2026.14, "legs": [0.0, 44.8, 0.0, 434.55, 92.11, 89.9, -203.44, -217.32, -69.58]}, {"date": "2026.09.26", "pnl": 54.49, "dd": 1162.74, "legs": [0.0, 54.49, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.27", "pnl": -3954.24, "dd": 0.0, "legs": [0.0, -18.64, -3935.6, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.28", "pnl": 3434.5, "dd": 487.46, "legs": [36.38, 0.0, 484.7, 439.69, -1349.61, 3265.9, 129.34, 216.53, 211.57]}, {"date": "2026.09.29", "pnl": 1794.6, "dd": 1989.54, "legs": [675.17, 0.0, 213.26, 0.0, 48.92, 478.6, 390.8, -12.15, 0.0]}, {"date": "2026.09.30", "pnl": 884.67, "dd": 3257.34, "legs": [114.09, 61.34, 0.0, 487.15, 6.46, -0.88, 72.66, 57.3, 86.55]}, {"date": "2026.10.01", "pnl": 2711.01, "dd": 858.87, "legs": [1578.48, 27.5, 0.0, 236.86, 129.25, 0.0, 747.52, 25.42, -34.02]}, {"date": "2026.10.02", "pnl": 2018.46, "dd": 3508.37, "legs": [0.0, 83.52, 587.28, 0.0, 0.0, 202.67, 363.77, 53.83, 727.39]}, {"date": "2026.10.03", "pnl": 26.17, "dd": 27.3, "legs": [0.0, 26.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 15.88, "dd": 226.72, "legs": [0.0, 12.92, 2.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 1124.91, "dd": 754.05, "legs": [667.46, 67.95, 434.39, 0.0, -797.35, 0.0, 847.23, -143.58, 48.81]}, {"date": "2026.10.06", "pnl": -1198.46, "dd": 1421.68, "legs": [556.48, -8.12, 3.98, 0.0, 592.59, -1514.07, -651.36, -433.9, 255.94]}, {"date": "2026.10.07", "pnl": 4589.96, "dd": 3268.63, "legs": [0.0, -30.19, 2018.44, 0.0, 322.89, 0.0, 1027.74, 629.68, 621.4]}, {"date": "2026.10.08", "pnl": 546.28, "dd": 925.08, "legs": [0.0, 9.99, 427.67, 0.0, 21.24, 0.0, -371.76, 431.63, 27.51]}, {"date": "2026.10.09", "pnl": 1192.62, "dd": 447.75, "legs": [0.0, 5.24, 0.0, 0.0, 188.86, 1734.92, 41.66, -274.18, -503.88]}, {"date": "2026.10.10", "pnl": -18.18, "dd": 69.29, "legs": [0.0, -18.18, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 623.36, "dd": 169.46, "legs": [0.0, 14.52, 608.84, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": 294.41, "dd": 1659.75, "legs": [-1520.12, 33.97, 0.0, 0.0, 308.92, 351.54, 577.96, 137.33, 404.81]}, {"date": "2026.10.13", "pnl": 1743.09, "dd": 1949.71, "legs": [-7.58, 24.53, 1183.91, 0.0, 0.0, 718.0, -484.88, 21.15, 287.96]}, {"date": "2026.10.14", "pnl": 6434.16, "dd": 2557.95, "legs": [499.29, 81.98, 1612.68, 160.49, 557.01, 1188.32, 923.02, 149.0, 1262.37]}, {"date": "2026.10.15", "pnl": 173.91, "dd": 1605.73, "legs": [1160.56, -17.09, -21.51, 8.39, 65.78, -0.7, -590.94, -28.25, -402.33]}, {"date": "2026.10.16", "pnl": 1010.03, "dd": 1567.21, "legs": [554.37, 131.44, -30.53, 317.83, 361.94, 0.0, -368.53, 5.65, 37.86]}, {"date": "2026.10.17", "pnl": -30.55, "dd": 111.43, "legs": [0.0, -30.55, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 909.13, "dd": 1284.47, "legs": [0.0, 180.59, 728.54, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": -123.04, "dd": 2297.4, "legs": [0.0, 102.22, 0.0, 447.69, 0.0, -316.36, -549.31, -28.81, 221.53]}, {"date": "2026.10.20", "pnl": 412.07, "dd": 695.33, "legs": [0.0, 214.0, 209.02, 188.23, 177.97, -0.62, -480.5, -28.13, 132.1]}, {"date": "2026.10.21", "pnl": 677.67, "dd": 1143.13, "legs": [0.0, -13.89, 637.99, 0.0, 202.43, 0.0, -38.26, -22.76, -87.84]}, {"date": "2026.10.22", "pnl": 217.08, "dd": 1348.99, "legs": [-1215.13, -22.3, 162.64, 407.87, 128.63, 0.0, 270.68, 1.13, 483.56]}, {"date": "2026.10.23", "pnl": 1416.87, "dd": 941.94, "legs": [453.87, 215.54, 0.0, 103.8, 300.03, 0.0, 350.57, -6.94, 0.0]}, {"date": "2026.10.24", "pnl": 1649.32, "dd": 782.26, "legs": [0.0, 180.62, 1468.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 14.27, "dd": 18.53, "legs": [0.0, 14.27, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": -2602.56, "dd": 2009.68, "legs": [221.71, 6.09, -64.4, 606.72, 448.63, -4631.3, 820.5, -10.51, 0.0]}, {"date": "2026.10.27", "pnl": 3045.23, "dd": 1440.25, "legs": [648.78, 24.87, 0.0, 150.95, 371.8, 1115.04, 872.62, -39.59, -99.24]}, {"date": "2026.10.28", "pnl": 473.31, "dd": 2776.96, "legs": [455.21, 7.54, 0.0, 308.49, 140.31, 128.22, -476.08, -30.5, -59.88]}, {"date": "2026.10.29", "pnl": 666.68, "dd": 594.26, "legs": [245.25, 7.86, -226.79, 375.89, 92.17, 233.5, -348.94, -3.13, 290.87]}, {"date": "2026.10.30", "pnl": 4495.07, "dd": 416.42, "legs": [568.43, -31.98, 926.98, 290.92, 962.28, 771.58, 133.68, 468.64, 404.54]}, {"date": "2026.10.31", "pnl": -28.22, "dd": 93.41, "legs": [0.0, -28.22, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.01", "pnl": 93.91, "dd": 401.93, "legs": [0.0, -17.29, 111.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.02", "pnl": 2291.97, "dd": 912.02, "legs": [538.09, 29.83, 329.96, 235.82, 338.81, 2005.3, -677.85, -526.3, 18.31]}, {"date": "2026.11.03", "pnl": 1698.81, "dd": 2314.9, "legs": [0.0, 83.75, 0.0, 204.83, 0.0, 846.85, -92.68, 609.58, 46.48]}, {"date": "2026.11.04", "pnl": 6056.74, "dd": 4340.2, "legs": [392.05, 520.82, 2941.17, 230.49, 1781.59, 762.15, -777.64, 943.05, -736.94]}, {"date": "2026.11.05", "pnl": -1120.16, "dd": 1928.68, "legs": [0.0, 33.88, 572.6, 655.75, 1134.53, 316.03, 97.43, -3629.24, -301.14]}, {"date": "2026.11.06", "pnl": 2884.92, "dd": 429.19, "legs": [0.0, 47.1, 0.0, 3.37, 11.26, 65.4, 1345.29, 1150.36, 262.14]}, {"date": "2026.11.07", "pnl": 64.29, "dd": 17.72, "legs": [0.0, 64.29, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.08", "pnl": 10.28, "dd": 141.73, "legs": [0.0, 29.77, -19.49, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.09", "pnl": 6451.71, "dd": 52.64, "legs": [0.0, 56.05, 2511.26, 943.98, 1029.09, 2141.69, -1612.29, 2098.26, -716.33]}, {"date": "2026.11.10", "pnl": 3682.79, "dd": 1824.93, "legs": [-372.58, -20.39, 278.5, 748.23, 164.16, 610.76, 969.73, -140.23, 1444.61]}, {"date": "2026.11.11", "pnl": 5098.04, "dd": 291.38, "legs": [1117.85, 31.6, 0.0, 304.38, 580.07, 559.89, 1308.1, 671.93, 524.22]}, {"date": "2026.11.12", "pnl": 3897.74, "dd": 636.69, "legs": [466.41, 59.27, 629.27, 598.8, 301.28, 755.02, 327.43, 3.45, 756.81]}, {"date": "2026.11.13", "pnl": -1302.05, "dd": 713.65, "legs": [-1024.45, -851.2, 325.02, 401.84, -697.78, 67.6, 499.86, -22.94, 0.0]}, {"date": "2026.11.14", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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

export default function BreakoutGridSep182500Full() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Breakout and grid book, saved v3 lots, session flatten</H1>
        <Text tone="secondary">
          Real ticks, deposit $182,500, 1 Sep–14 Nov 2026. Breakout lot inputs are the saved v3 sets. Grid sets are EUR_2500, US500_2500 and XAU_2500, and they flatten outside the symbol session.
          The nine solo tests sum to $65,055. Read together, with breakout size following the shared equity, the book reaches $88,051 and drops $10,382 on 16 Sep.
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
            ["EUR v3 breakout", "$530", "214", "17,080%", "Equity sizing, floor $180,000, cap $190,000."],
            ["BTC v3 breakout", "$884", "73", "3,080%", "Equity sizing, floor $180,000, cap $190,000."],
            ["ETH v3 breakout", "$15,390", "91", "1,008%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US100 v3 breakout", "$5,860", "172", "9,802%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US500 v3 breakout", "$8,267", "107", "3,145%", "Equity sizing, floor $180,000, cap $190,000."],
            ["XAU v3 breakout", "$12,371", "89", "1,703%", "Equity sizing, floor $180,000, cap $190,000."],
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
            ["1", "XAU v3 breakout", "$5,323", "2.83%", "$2,784", "$12,371"],
            ["2", "US500 grid", "$3,846", "2.05%", "$667", "$5,334"],
            ["3", "US500 v3 breakout", "$3,422", "1.83%", "$186", "$8,267"],
            ["4", "EUR grid", "$3,341", "1.76%", "$1,031", "$7,456"],
            ["5", "ETH v3 breakout", "$2,600", "1.37%", "$455", "$15,390"],
            ["6", "XAU grid", "$1,725", "0.91%", "$505", "$8,963"],
            ["7", "EUR v3 breakout", "$1,672", "0.91%", "$1,023", "$530"],
            ["8", "US100 v3 breakout", "$959", "0.52%", "$385", "$5,860"],
            ["9", "BTC v3 breakout", "$575", "0.31%", "$367", "$884"],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Grid columns={4} gap={16}>
        <Stat value="$88,051" label="Combined profit" tone="success" />
        <Stat value="$10,382" label="Worst day, 16 Sep" tone="danger" />
        <Stat value="$180,112" label="Lowest equity" tone="success" />
        <Stat value="$35,290" label="Free margin, lower bound" tone="danger" />
      </Grid>
      <BookCalendar days={BOOK_DAYS} heading="P&L, saved v3 lots and session-flatten grids" caption="DD is the drop from equity at the start of the day." />
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
            yMax={290000}
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
          Breakout lots are the saved v3 input times the cushion above $180,000 divided by $10,000, with equity capped at $190,000. At the open the cushion is $2,500, so the factor is 0.25. At the cap the factor is 1. Lots lock at 15:00. Grid margin stays at $2,500, and the grids flatten outside the symbol session.
        </Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EUR v3 breakout", "sets/v3/EUR_V3", "M6, 80 bars, both ways, lots 3.1, no stop, 144 hour hold, reset 15:00. Opens near 0.78 lots.", "\u2212$85"],
            ["BTC v3 breakout", "sets/v3/BTC_V3", "M5, 70 bars, both ways, lots 0.7, no stop, 264 hour hold, reset 15:00. Opens near 0.18 lots.", "$2,779"],
            ["ETH v3 breakout", "sets/v3/ETH_V3", "M20, 90 bars, both ways, lots 2.7, no stop, 96 hour hold, reset 15:00. Opens near 0.68 lots.", "$21,378"],
            ["US100 v3 breakout", "sets/v3/US100_V3", "M3, 100 bars, both ways, lots 4.5, no stop, 410 hour hold, reset 15:00. Opens near 1.13 lots.", "$11,490"],
            ["US500 v3 breakout", "sets/v3/US500_V3", "M20, 60 bars, both ways, lots 40, no stop, 72 hour hold, reset 15:00. Opens near 10 lots.", "$12,698"],
            ["XAU v3 breakout", "sets/v3/XAU_V3", "M15, 40 bars, both ways, lots 1.4, no stop, 96 hour hold, reset 15:00. Opens near 0.35 lots.", "$18,036"],
            ["EUR grid", "EUR_2500", "Margin $2,500, divisors 90/20, M30, 20 levels, 5 pending a side. Session flatten on.", "$7,456"],
            ["US500 grid", "US500_2500", "Margin $2,500, divisors 20/20, H1, 20 levels, 5 pending a side. Session flatten on.", "$5,334"],
            ["XAU grid", "XAU_2500", "Margin $2,500, divisors 100/20, H12, 20 levels, 5 pending a side. Session flatten on.", "$8,963"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 144. The book ends near $283,736.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {LEG_NAMES.map((name, index) => (
          <LegCalendar key={name} index={index} days={BOOK_DAYS} names={LEG_NAMES} />
        ))}
      </Grid>
      <Callout tone="danger" title="The shared book breaks the $9,000 day and the $50,000 free-margin floor">
        Equity stayed at $180,112. 16 Sep dropped $10,382 from the equity at the start of the day. The first day through $9,000 is 16 Sep, at $10,382. Each expert has a $9,000 flatten, so a live account would have stopped there. This projection keeps the later trades, which is why profit reaches $88,051. The free-margin lower bound is $35,290.
      </Callout>
      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs, every tick based on real ticks, FTMO symbols, leverage 1:100, login 531454261, from 1 Sep 2026 to 14 Nov 2026. Set files in the repos were not changed. Grid session flatten and equity logging were set on the tester copies only. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level, scaled by the breakout size ratio. Grids stay at ratio 1.
      </Text>
    </Stack>
  );
}
