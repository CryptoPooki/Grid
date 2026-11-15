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

const EQUITY_CLOSE = [180484, 182092, 184024, 185526, 185517, 185693, 185151, 186141, 185866, 187906, 191764, 191762, 191192, 186355, 193143, 186683, 194536, 197792, 197373, 197756, 204182, 205939, 206531, 208206, 207751, 207041, 207714, 210200, 213817, 215256, 216686, 215443, 215469, 215485, 216630, 216656, 216078, 220941, 224396, 224378, 225001, 228625, 228285, 238891, 237395, 239678, 239648, 240664, 240423, 240558, 241692, 242143, 242268, 243919, 243934, 244985, 246899, 247179, 250962, 254564, 254536, 254458, 257064, 256043, 266140, 264997, 265160, 265224, 266310, 274511, 278659, 284592, 286978, 286801, 286801];

const EQUITY_LOW = [180113, 179740, 181902, 183527, 185428, 185348, 184088, 183871, 185407, 185061, 185973, 191505, 191137, 185015, 186112, 182827, 185901, 193735, 197295, 195466, 196722, 203109, 204045, 205606, 206163, 206588, 207041, 207424, 208268, 210634, 214392, 213420, 215416, 215243, 214530, 215169, 213361, 215146, 220538, 224327, 224208, 223525, 226226, 225555, 237367, 235851, 239567, 238363, 238601, 240011, 239282, 240700, 241202, 241486, 243901, 241165, 243560, 244035, 246532, 250537, 254471, 254134, 253792, 254516, 251727, 264202, 264165, 265142, 265083, 266063, 272405, 278218, 283358, 286195, 286801];

const DAILY_LOSS = [2387, 744, 190, 498, 98, 169, 1605, 1280, 734, 805, 1933, 259, 626, 6177, 242, 10316, 782, 801, 497, 1907, 1035, 1073, 1894, 925, 2043, 1163, 0, 290, 1931, 3184, 864, 3266, 27, 227, 955, 1461, 3295, 932, 403, 69, 169, 1476, 2399, 2730, 1524, 1544, 111, 1284, 2063, 412, 1277, 992, 940, 782, 19, 2769, 1425, 2864, 647, 425, 93, 402, 666, 2548, 4316, 1938, 832, 18, 142, 246, 2107, 441, 1234, 782, 0];

const LEG_NAMES = ["EUR v3 breakout", "BTC v3 breakout", "ETH v3 breakout", "US100 v3 breakout", "US500 v3 breakout", "XAU v3 breakout", "EUR grid", "US500 grid", "XAU grid"];

const BOOK_DAYS: BookDay[] = [{"date": "2026.09.01", "pnl": 377.8, "dd": 2387.43, "legs": [21.92, -3.23, 79.01, 40.67, 111.55, 62.46, -3.35, 68.77, 0.0]}, {"date": "2026.09.02", "pnl": 50.15, "dd": 744.2, "legs": [0.0, -0.37, 0.0, 16.75, 36.42, 0.0, -2.65, 0.0, 0.0]}, {"date": "2026.09.03", "pnl": 1667.91, "dd": 190.08, "legs": [56.18, 23.59, 379.77, 118.0, 132.04, 165.28, 0.0, 793.32, -0.27]}, {"date": "2026.09.04", "pnl": 1267.08, "dd": 497.86, "legs": [65.07, 111.35, 0.0, 28.68, 226.8, 381.65, 0.0, 0.0, 453.53]}, {"date": "2026.09.05", "pnl": -9.87, "dd": 98.24, "legs": [0.0, -9.87, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.06", "pnl": 175.96, "dd": 168.9, "legs": [0.0, -20.27, 196.23, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.07", "pnl": 263.93, "dd": 1604.85, "legs": [133.58, -18.84, 119.49, 0.0, 29.7, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.08", "pnl": 310.63, "dd": 1280.48, "legs": [155.73, 82.61, 0.0, 9.75, 133.07, -70.53, 0.0, 0.0, 0.0]}, {"date": "2026.09.09", "pnl": 1295.03, "dd": 734.35, "legs": [218.87, 3.83, 0.0, 72.78, 273.2, 167.36, 0.0, 468.09, 90.9]}, {"date": "2026.09.10", "pnl": 2891.17, "dd": 805.34, "legs": [324.04, 113.8, 0.0, 0.0, 233.09, 905.29, 0.0, 602.91, 712.04]}, {"date": "2026.09.11", "pnl": 1423.99, "dd": 1933.03, "legs": [126.84, -13.8, 521.14, 0.0, 790.25, -0.29, 0.0, 0.0, -0.15]}, {"date": "2026.09.12", "pnl": 0.0, "dd": 258.92, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.13", "pnl": 263.41, "dd": 625.54, "legs": [0.0, -145.67, 409.08, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.14", "pnl": 1015.23, "dd": 6177.13, "legs": [0.0, -16.52, 0.0, 0.0, 287.22, 303.17, 0.0, 0.0, 441.36]}, {"date": "2026.09.15", "pnl": 2614.38, "dd": 242.4, "legs": [0.0, 131.54, 1298.4, 0.0, 158.54, 556.66, 0.0, 469.24, 0.0]}, {"date": "2026.09.16", "pnl": 3766.28, "dd": 10316.02, "legs": [0.0, -2.76, 30.76, 0.0, 132.95, 77.74, 2329.7, 672.68, 525.21]}, {"date": "2026.09.17", "pnl": -4513.51, "dd": 781.84, "legs": [-6035.2, 81.31, 314.82, 0.0, 563.71, 564.49, -2.25, 0.0, -0.39]}, {"date": "2026.09.18", "pnl": 2466.8, "dd": 801.11, "legs": [0.0, 522.46, 953.09, 263.39, 41.5, 687.86, -1.5, 0.0, 0.0]}, {"date": "2026.09.19", "pnl": 43.73, "dd": 496.96, "legs": [0.0, 71.17, -27.44, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.20", "pnl": 33.16, "dd": 1907.13, "legs": [0.0, 33.16, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.21", "pnl": 4389.73, "dd": 1034.88, "legs": [0.0, 16.82, 2036.63, 591.14, 664.45, 126.08, -1.25, 955.86, 0.0]}, {"date": "2026.09.22", "pnl": 2139.18, "dd": 1072.94, "legs": [0.0, 59.29, 0.0, 242.42, 19.13, 1818.34, 0.0, 0.0, 0.0]}, {"date": "2026.09.23", "pnl": 1982.79, "dd": 1894.27, "legs": [-2102.72, -6.16, -24.42, 560.45, 878.36, 372.47, 1954.31, 0.0, 350.5]}, {"date": "2026.09.24", "pnl": 1566.82, "dd": 924.78, "legs": [159.68, 288.76, 0.0, 255.48, 0.0, -0.46, 342.16, 0.0, 521.2]}, {"date": "2026.09.25", "pnl": 728.33, "dd": 2042.71, "legs": [0.0, 44.8, 0.0, 434.55, 92.11, 89.9, -2.25, 69.22, 0.0]}, {"date": "2026.09.26", "pnl": 54.49, "dd": 1162.74, "legs": [0.0, 54.49, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.27", "pnl": -3954.24, "dd": 0.0, "legs": [0.0, -18.64, -3935.6, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.28", "pnl": 3316.13, "dd": 290.2, "legs": [36.38, 0.0, 484.7, 439.69, -1349.61, 3265.9, 0.0, 0.0, 439.07]}, {"date": "2026.09.29", "pnl": 1415.95, "dd": 1931.34, "legs": [675.17, 0.0, 213.26, 0.0, 48.92, 478.6, 0.0, 0.0, 0.0]}, {"date": "2026.09.30", "pnl": 668.1, "dd": 3183.55, "legs": [114.09, 61.34, 0.0, 487.15, 6.46, -0.88, 0.0, 0.0, -0.06]}, {"date": "2026.10.01", "pnl": 4251.92, "dd": 864.0, "legs": [1578.48, 27.5, 0.0, 236.86, 129.25, 0.0, 2279.83, 0.0, 0.0]}, {"date": "2026.10.02", "pnl": 1486.06, "dd": 3266.29, "legs": [0.0, 83.52, 587.28, 0.0, 0.0, 202.67, -1.4, 358.48, 255.51]}, {"date": "2026.10.03", "pnl": 26.17, "dd": 27.3, "legs": [0.0, 26.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 15.88, "dd": 226.72, "legs": [0.0, 12.92, 2.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 1198.15, "dd": 955.06, "legs": [667.46, 67.95, 434.39, 0.0, -797.35, 0.0, 0.0, 655.99, 169.71]}, {"date": "2026.10.06", "pnl": 323.49, "dd": 1460.67, "legs": [556.48, -8.12, 3.98, 0.0, 592.59, -1514.07, -4.2, 158.3, 538.53]}, {"date": "2026.10.07", "pnl": 2980.27, "dd": 3294.96, "legs": [0.0, -30.19, 2018.44, 0.0, 322.89, 0.0, 0.0, 0.0, 669.13]}, {"date": "2026.10.08", "pnl": 458.81, "dd": 931.57, "legs": [0.0, 9.99, 427.67, 0.0, 21.24, 0.0, 0.0, 0.0, -0.09]}, {"date": "2026.10.09", "pnl": 1928.51, "dd": 403.33, "legs": [0.0, 5.24, 0.0, 0.0, 188.86, 1734.92, 0.0, 0.0, -0.51]}, {"date": "2026.10.10", "pnl": -18.18, "dd": 69.29, "legs": [0.0, -18.18, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 623.36, "dd": 169.46, "legs": [0.0, 14.52, 608.84, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": -825.69, "dd": 1476.42, "legs": [-1520.12, 33.97, 0.0, 0.0, 308.92, 351.54, 0.0, 0.0, 0.0]}, {"date": "2026.10.13", "pnl": 1918.86, "dd": 2399.06, "legs": [-7.58, 24.53, 1183.91, 0.0, 0.0, 718.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.14", "pnl": 7383.86, "dd": 2730.14, "legs": [499.29, 81.98, 1612.68, 160.49, 557.01, 1188.32, 2109.83, 0.0, 1174.26]}, {"date": "2026.10.15", "pnl": 1194.03, "dd": 1524.2, "legs": [1160.56, -17.09, -21.51, 8.39, 65.78, -0.7, -1.4, 0.0, 0.0]}, {"date": "2026.10.16", "pnl": 1335.02, "dd": 1543.77, "legs": [554.37, 131.44, -30.53, 317.83, 361.94, 0.0, 0.0, 0.0, -0.03]}, {"date": "2026.10.17", "pnl": -30.55, "dd": 111.43, "legs": [0.0, -30.55, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 909.13, "dd": 1284.47, "legs": [0.0, 180.59, 728.54, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": 298.49, "dd": 2062.86, "legs": [0.0, 102.22, 0.0, 447.69, 0.0, -316.36, 0.0, 64.94, 0.0]}, {"date": "2026.10.20", "pnl": 1106.99, "dd": 411.96, "legs": [0.0, 214.0, 209.02, 188.23, 177.97, -0.62, 0.0, 318.39, 0.0]}, {"date": "2026.10.21", "pnl": 826.53, "dd": 1276.65, "legs": [0.0, -13.89, 637.99, 0.0, 202.43, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.22", "pnl": 42.51, "dd": 991.74, "legs": [-1215.13, -22.3, 162.64, 407.87, 128.63, 0.0, 0.0, 0.0, 580.8]}, {"date": "2026.10.23", "pnl": 1073.24, "dd": 940.49, "legs": [453.87, 215.54, 0.0, 103.8, 300.03, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.24", "pnl": 1649.32, "dd": 782.26, "legs": [0.0, 180.62, 1468.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 14.27, "dd": 18.53, "legs": [0.0, 14.27, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": -3412.55, "dd": 2768.86, "legs": [221.71, 6.09, -64.4, 606.72, 448.63, -4631.3, 0.0, 0.0, 0.0]}, {"date": "2026.10.27", "pnl": 2499.95, "dd": 1424.91, "legs": [648.78, 24.87, 0.0, 150.95, 371.8, 1115.04, 0.0, 188.72, -0.21]}, {"date": "2026.10.28", "pnl": 1590.96, "dd": 2864.45, "legs": [455.21, 7.54, 0.0, 308.49, 140.31, 128.22, -3.36, 554.55, 0.0]}, {"date": "2026.10.29", "pnl": 1100.22, "dd": 647.1, "legs": [245.25, 7.86, -226.79, 375.89, 92.17, 233.5, 372.34, 0.0, 0.0]}, {"date": "2026.10.30", "pnl": 5148.13, "dd": 425.02, "legs": [568.43, -31.98, 926.98, 290.92, 962.28, 771.58, 0.0, 1089.35, 570.57]}, {"date": "2026.10.31", "pnl": -28.22, "dd": 93.41, "legs": [0.0, -28.22, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.01", "pnl": 93.91, "dd": 401.93, "legs": [0.0, -17.29, 111.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.02", "pnl": 3683.36, "dd": 665.97, "legs": [538.09, 29.83, 329.96, 235.82, 338.81, 2005.3, 0.0, 205.58, -0.03]}, {"date": "2026.11.03", "pnl": 1135.4, "dd": 2547.85, "legs": [0.0, 83.75, 0.0, 204.83, 0.0, 846.85, 0.0, 0.0, -0.03]}, {"date": "2026.11.04", "pnl": 6813.28, "dd": 4315.89, "legs": [392.05, 520.82, 2941.17, 230.49, 1781.59, 762.15, 0.0, 185.28, -0.27]}, {"date": "2026.11.05", "pnl": 3875.41, "dd": 1937.56, "legs": [0.0, 33.88, 572.6, 655.75, 1134.53, 316.03, 0.0, 1162.62, 0.0]}, {"date": "2026.11.06", "pnl": 127.13, "dd": 832.11, "legs": [0.0, 47.1, 0.0, 3.37, 11.26, 65.4, 0.0, 0.0, 0.0]}, {"date": "2026.11.07", "pnl": 64.29, "dd": 17.72, "legs": [0.0, 64.29, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.08", "pnl": 10.28, "dd": 141.73, "legs": [0.0, 29.77, -19.49, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.09", "pnl": 6682.07, "dd": 246.44, "legs": [0.0, 56.05, 2511.26, 943.98, 1029.09, 2141.69, 0.0, 0.0, 0.0]}, {"date": "2026.11.10", "pnl": 1408.68, "dd": 2106.55, "legs": [-372.58, -20.39, 278.5, 748.23, 164.16, 610.76, 0.0, 0.0, 0.0]}, {"date": "2026.11.11", "pnl": 2593.79, "dd": 440.51, "legs": [1117.85, 31.6, 0.0, 304.38, 580.07, 559.89, 0.0, 0.0, 0.0]}, {"date": "2026.11.12", "pnl": 4882.18, "dd": 1234.42, "legs": [466.41, 59.27, 629.27, 598.8, 301.28, 755.02, 990.1, 203.82, 878.21]}, {"date": "2026.11.13", "pnl": -4930.49, "dd": 782.41, "legs": [-1024.45, -851.2, 325.02, 401.84, -697.78, 67.6, -808.87, -2342.65, 0.0]}, {"date": "2026.11.14", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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

export default function BreakoutGridSep182500() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Breakout and grid book, 1 Sep–14 Nov 2026</H1>
        <Text tone="secondary">
          Real ticks, deposit $182,500. Breakout sets are Onlybreakout v3. Grid sets are EUR_2500, US500_2500 and XAU_2500.
          The nine solo tests sum to $68,120. Read together, with breakout size following the shared equity, the book reaches $91,219 and drops $10,316 on 16 Sep.
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
            ["EUR grid", "$9,546", "125", "6,395%", "Fixed margin $2,500."],
            ["US500 grid", "$6,903", "172", "3,711%", "Fixed margin $2,500."],
            ["XAU grid", "$8,368", "98", "11,194%", "Fixed margin $2,500."],
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
            ["2", "US500 grid", "$3,987", "2.10%", "$713", "$6,903"],
            ["3", "US500 v3 breakout", "$3,422", "1.83%", "$186", "$8,267"],
            ["4", "EUR grid", "$2,848", "1.49%", "$735", "$9,546"],
            ["5", "ETH v3 breakout", "$2,600", "1.37%", "$455", "$15,390"],
            ["6", "XAU grid", "$1,756", "0.92%", "$505", "$8,368"],
            ["7", "EUR v3 breakout", "$1,672", "0.91%", "$1,023", "$530"],
            ["8", "US100 v3 breakout", "$959", "0.52%", "$385", "$5,860"],
            ["9", "BTC v3 breakout", "$575", "0.31%", "$367", "$884"],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Grid columns={4} gap={16}>
        <Stat value="$91,219" label="Combined profit" tone="success" />
        <Stat value="$10,316" label="Worst day, 16 Sep" tone="danger" />
        <Stat value="$180,151" label="Lowest equity" tone="success" />
        <Stat value="$35,920" label="Free margin, lower bound" tone="danger" />
      </Grid>
      <BookCalendar days={BOOK_DAYS} heading="P&L, saved v3 and grid sets" caption="DD is the drop from equity at the start of the day." />
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
          Breakout lots are the saved input times the cushion above $180,000 divided by $10,000, with equity capped at $190,000. At the open the cushion is $2,500, so the factor is 0.25. At the cap the factor is 1. Lots lock at 15:00. Grid margin does not grow with equity.
        </Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EUR v3 breakout", "sets/v3/EUR_V3", "M6, 80 bars, both ways, lots 3.1, no stop, 144 hour hold, reset 15:00. Opens near 0.78 lots.", "\u2212$66"],
            ["BTC v3 breakout", "sets/v3/BTC_V3", "M5, 70 bars, both ways, lots 0.7, no stop, 264 hour hold, reset 15:00. Opens near 0.18 lots.", "$2,784"],
            ["ETH v3 breakout", "sets/v3/ETH_V3", "M20, 90 bars, both ways, lots 2.7, no stop, 96 hour hold, reset 15:00. Opens near 0.68 lots.", "$21,399"],
            ["US100 v3 breakout", "sets/v3/US100_V3", "M3, 100 bars, both ways, lots 4.5, no stop, 410 hour hold, reset 15:00. Opens near 1.13 lots.", "$11,493"],
            ["US500 v3 breakout", "sets/v3/US500_V3", "M20, 60 bars, both ways, lots 40, no stop, 72 hour hold, reset 15:00. Opens near 10 lots.", "$12,728"],
            ["XAU v3 breakout", "sets/v3/XAU_V3", "M15, 40 bars, both ways, lots 1.4, no stop, 96 hour hold, reset 15:00. Opens near 0.35 lots.", "$18,063"],
            ["EUR grid", "EUR_2500", "Margin $2,500, divisors 90/20, M30, 20 levels, 5 pending a side. Session flatten off.", "$9,546"],
            ["US500 grid", "US500_2500", "Margin $2,500, divisors 20/20, H1, 20 levels, 5 pending a side. Session flatten off.", "$6,903"],
            ["XAU grid", "XAU_2500", "Margin $2,500, divisors 100/20, H12, 20 levels, 5 pending a side. Session flatten off.", "$8,368"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 144. The book ends near $286,801.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {LEG_NAMES.map((name, index) => (
          <LegCalendar key={name} index={index} days={BOOK_DAYS} names={LEG_NAMES} />
        ))}
      </Grid>
      <Callout tone="danger" title="The shared book breaks the $9,000 day and the $50,000 free-margin floor">
        Equity stayed at $180,151. 16 Sep dropped $10,316 from the equity at the start of the day. The first day through $9,000 is 16 Sep, at $10,316. Each expert has a $9,000 flatten, so a live account would have stopped there. This projection keeps the later trades, which is why profit reaches $91,219. The free-margin lower bound is $35,920.
      </Callout>
      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs, every tick based on real ticks, FTMO symbols, leverage 1:100, login 531454261, from 1 Sep 2026 to 14 Nov 2026. Set files in the repos were not changed. Grid equity logging was turned on in the tester copy only. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level, scaled by the breakout size ratio. Grids stay at ratio 1.
      </Text>
    </Stack>
  );
}
