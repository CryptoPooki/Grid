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

const EQUITY_CLOSE = [192089, 197397, 206086, 207989, 207971, 208294, 207466, 208865, 208687, 211572, 215703, 215657, 215079, 210504, 217338, 211393, 218612, 221843, 221424, 221415, 227225, 229166, 230035, 230953, 230241, 229725, 230086, 232019, 235545, 236796, 238319, 237234, 237260, 237276, 239575, 239635, 239275, 243320, 245985, 245967, 246594, 249757, 249741, 258767, 257235, 258190, 258159, 259055, 258463, 258345, 259847, 259395, 259952, 261607, 261622, 263434, 266089, 265946, 268928, 271752, 271723, 271640, 273306, 272504, 282111, 280677, 281599, 281665, 282750, 290205, 294701, 300189, 302537, 302881, 302881];

const EQUITY_LOW = [190323, 188542, 196538, 205134, 207810, 207662, 205920, 205347, 208205, 207554, 209056, 215407, 215024, 209248, 210381, 207636, 210755, 217801, 221346, 219508, 220599, 226330, 227447, 229157, 229330, 229395, 229725, 229594, 230082, 232244, 235930, 234673, 237206, 237032, 236558, 238213, 237559, 238518, 242923, 245915, 245795, 244985, 247754, 247230, 257160, 255726, 258075, 256869, 256817, 257727, 257260, 258542, 258626, 259168, 261588, 259514, 262037, 263392, 265451, 268510, 271656, 271321, 270720, 270966, 268153, 280156, 280353, 281581, 281523, 282707, 288417, 294409, 299540, 301818, 302881];

const DAILY_LOSS = [9677, 3547, 859, 952, 179, 309, 2374, 2119, 660, 1133, 2516, 296, 634, 5831, 123, 9702, 638, 812, 497, 1916, 816, 896, 1719, 878, 1623, 846, 0, 492, 1937, 3301, 866, 3646, 27, 228, 718, 1362, 2077, 757, 397, 70, 171, 1609, 2003, 2511, 1607, 1509, 116, 1290, 2238, 736, 1084, 1305, 768, 784, 19, 2107, 1397, 2697, 495, 418, 96, 402, 920, 2340, 4351, 1955, 324, 18, 141, 43, 1788, 292, 649, 719, 0];

const LEG_NAMES = ["EUR v3 breakout", "BTC v3 breakout", "ETH v3 breakout", "US100 v3 breakout", "US500 v3 breakout", "XAU v3 breakout", "EUR grid", "US500 grid", "XAU grid"];

const BOOK_DAYS: BookDay[] = [{"date": "2026.09.01", "pnl": 1921.27, "dd": 9677.44, "legs": [88.35, 9.66, 876.72, 254.65, 511.1, 254.0, 211.5, -284.71, 0.0]}, {"date": "2026.09.02", "pnl": 1409.01, "dd": 3546.99, "legs": [0.0, -6.67, 0.0, 293.04, 633.62, 0.0, 37.14, 451.88, 0.0]}, {"date": "2026.09.03", "pnl": 2755.38, "dd": 859.3, "legs": [213.07, 91.56, 1438.2, 450.45, 497.6, 617.98, -683.14, 289.6, -159.94]}, {"date": "2026.09.04", "pnl": 3140.6, "dd": 951.93, "legs": [184.09, 285.3, 0.0, 71.84, 559.7, 991.93, 143.5, 300.72, 603.52]}, {"date": "2026.09.05", "pnl": -18.02, "dd": 179.21, "legs": [0.0, -18.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.06", "pnl": 323.09, "dd": 308.83, "legs": [0.0, -35.7, 358.79, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.07", "pnl": 271.01, "dd": 2373.92, "legs": [235.42, -34.03, 211.22, 0.0, 52.0, 0.0, -193.48, 0.0, -0.12]}, {"date": "2026.09.08", "pnl": 1044.55, "dd": 2118.53, "legs": [286.5, 165.46, 0.0, 17.65, 245.28, -263.68, -41.42, 372.47, 262.29]}, {"date": "2026.09.09", "pnl": 1057.38, "dd": 660.35, "legs": [411.03, 6.4, 0.0, 133.88, 495.73, 296.98, -184.18, -17.31, -85.15]}, {"date": "2026.09.10", "pnl": 3206.68, "dd": 1133.37, "legs": [517.01, 182.2, 0.0, 0.0, 368.17, 1416.31, 363.7, -273.31, 632.6]}, {"date": "2026.09.11", "pnl": 2733.92, "dd": 2516.22, "legs": [164.96, -17.45, 485.5, 0.0, 967.51, -0.42, 182.58, 772.79, 178.45]}, {"date": "2026.09.12", "pnl": 0.0, "dd": 296.14, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.13", "pnl": 269.35, "dd": 633.59, "legs": [0.0, -142.28, 411.63, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.14", "pnl": 1597.4, "dd": 5831.48, "legs": [0.0, -17.64, 0.0, 0.0, 287.27, 349.97, 692.58, 98.31, 186.91]}, {"date": "2026.09.15", "pnl": 2114.3, "dd": 122.77, "legs": [0.0, 129.58, 1280.47, 0.0, 167.03, 571.67, 73.08, -107.53, 0.0]}, {"date": "2026.09.16", "pnl": 1187.43, "dd": 9702.06, "legs": [0.0, -2.82, 33.48, 0.0, 134.12, 79.72, 591.94, -278.48, 629.47]}, {"date": "2026.09.17", "pnl": -1033.86, "dd": 638.1, "legs": [-3703.56, 83.64, 317.62, 0.0, 564.48, 542.84, 134.02, 1105.82, -78.72]}, {"date": "2026.09.18", "pnl": 1856.25, "dd": 811.78, "legs": [0.0, 541.85, 961.89, 276.53, 41.53, 695.33, -57.6, -29.39, -573.89]}, {"date": "2026.09.19", "pnl": 46.04, "dd": 497.2, "legs": [0.0, 73.61, -27.57, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.20", "pnl": 34.52, "dd": 1916.19, "legs": [0.0, 34.52, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.21", "pnl": 4034.34, "dd": 816.17, "legs": [0.0, 17.56, 1811.03, 593.44, 664.74, 116.5, 269.34, 42.57, 519.16]}, {"date": "2026.09.22", "pnl": 2307.98, "dd": 895.83, "legs": [0.0, 62.04, 0.0, 244.56, 19.15, 1845.56, 246.08, 35.15, -144.56]}, {"date": "2026.09.23", "pnl": 2914.64, "dd": 1718.87, "legs": [-1863.64, -6.52, -24.46, 561.1, 882.79, 376.54, 1138.98, 707.15, 1142.7]}, {"date": "2026.09.24", "pnl": 1236.1, "dd": 878.11, "legs": [159.92, 303.77, 0.0, 257.18, 0.0, -0.51, 138.22, 73.19, 304.33]}, {"date": "2026.09.25", "pnl": 176.67, "dd": 1622.85, "legs": [0.0, 46.06, 0.0, 436.94, 92.15, 91.86, -203.44, -217.32, -69.58]}, {"date": "2026.09.26", "pnl": 56.3, "dd": 846.11, "legs": [0.0, 56.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.27", "pnl": -2656.59, "dd": 0.0, "legs": [0.0, -19.36, -2637.23, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.09.28", "pnl": 3536.67, "dd": 491.71, "legs": [36.61, 0.0, 487.44, 440.52, -1230.62, 3245.28, 129.34, 216.53, 211.57]}, {"date": "2026.09.29", "pnl": 1810.62, "dd": 1937.17, "legs": [689.63, 0.0, 213.61, 0.0, 48.58, 480.15, 390.8, -12.15, 0.0]}, {"date": "2026.09.30", "pnl": 899.67, "dd": 3300.56, "legs": [113.98, 77.12, 0.0, 486.63, 6.31, -0.88, 72.66, 57.3, 86.55]}, {"date": "2026.10.01", "pnl": 2733.01, "dd": 866.12, "legs": [1596.08, 28.66, 0.0, 239.58, 129.77, 0.0, 747.52, 25.42, -34.02]}, {"date": "2026.10.02", "pnl": 2012.32, "dd": 3645.72, "legs": [0.0, 87.3, 590.0, 0.0, 0.0, 190.03, 363.77, 53.83, 727.39]}, {"date": "2026.10.03", "pnl": 26.26, "dd": 27.41, "legs": [0.0, 26.26, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.04", "pnl": 16.0, "dd": 228.18, "legs": [0.0, 13.02, 2.98, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.05", "pnl": 1263.62, "dd": 718.44, "legs": [696.06, 68.48, 436.58, 0.0, -689.96, 0.0, 847.23, -143.58, 48.81]}, {"date": "2026.10.06", "pnl": -1191.1, "dd": 1361.83, "legs": [563.6, -8.24, 3.68, 0.0, 585.64, -1506.46, -651.36, -433.9, 255.94]}, {"date": "2026.10.07", "pnl": 4587.85, "dd": 2076.93, "legs": [0.0, -30.6, 2016.55, 0.0, 323.08, 0.0, 1027.74, 629.68, 621.4]}, {"date": "2026.10.08", "pnl": 546.68, "dd": 757.26, "legs": [0.0, 10.12, 427.92, 0.0, 21.26, 0.0, -371.76, 431.63, 27.51]}, {"date": "2026.10.09", "pnl": 1200.28, "dd": 397.35, "legs": [0.0, 5.28, 0.0, 0.0, 188.72, 1742.68, 41.66, -274.18, -503.88]}, {"date": "2026.10.10", "pnl": -18.41, "dd": 70.12, "legs": [0.0, -18.41, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.11", "pnl": 626.96, "dd": 171.19, "legs": [0.0, 14.67, 612.29, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.12", "pnl": 573.36, "dd": 1608.61, "legs": [-1238.21, 34.34, 0.0, 0.0, 309.02, 348.11, 577.96, 137.33, 404.81]}, {"date": "2026.10.13", "pnl": 1742.48, "dd": 2002.63, "legs": [-7.75, 24.87, 1187.35, 0.0, 0.0, 713.78, -484.88, 21.15, 287.96]}, {"date": "2026.10.14", "pnl": 6414.66, "dd": 2510.73, "legs": [483.06, 83.42, 1593.42, 158.54, 545.66, 1216.17, 923.02, 149.0, 1262.37]}, {"date": "2026.10.15", "pnl": 183.05, "dd": 1606.97, "legs": [1170.17, -17.52, -21.61, 8.4, 65.82, -0.69, -590.94, -28.25, -402.33]}, {"date": "2026.10.16", "pnl": 1022.11, "dd": 1508.88, "legs": [561.86, 134.63, -30.47, 318.73, 362.38, 0.0, -368.53, 5.65, 37.86]}, {"date": "2026.10.17", "pnl": -31.68, "dd": 115.62, "legs": [0.0, -31.68, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.18", "pnl": 896.4, "dd": 1289.64, "legs": [0.0, 186.84, 709.56, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.19", "pnl": -46.06, "dd": 2237.94, "legs": [0.0, 102.77, 0.0, 448.75, 0.0, -240.99, -549.31, -28.81, 221.53]}, {"date": "2026.10.20", "pnl": 401.86, "dd": 735.57, "legs": [0.0, 217.37, 209.78, 189.47, 162.41, -0.64, -480.5, -28.13, 132.1]}, {"date": "2026.10.21", "pnl": 684.28, "dd": 1084.14, "legs": [0.0, -14.42, 642.1, 0.0, 205.46, 0.0, -38.26, -22.76, -87.84]}, {"date": "2026.10.22", "pnl": 293.17, "dd": 1304.68, "legs": [-1139.01, -23.12, 163.26, 407.97, 128.7, 0.0, 270.68, 1.13, 483.56]}, {"date": "2026.10.23", "pnl": 1429.6, "dd": 768.47, "legs": [459.06, 222.79, 0.0, 104.0, 300.12, 0.0, 350.57, -6.94, 0.0]}, {"date": "2026.10.24", "pnl": 1654.76, "dd": 784.16, "legs": [0.0, 182.43, 1472.33, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.25", "pnl": 14.69, "dd": 19.04, "legs": [0.0, 14.69, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.10.26", "pnl": -985.0, "dd": 2107.26, "legs": [225.02, 6.27, -64.46, 608.78, 448.68, -3019.28, 820.5, -10.51, 0.0]}, {"date": "2026.10.27", "pnl": 3054.42, "dd": 1397.17, "legs": [652.0, 25.63, 0.0, 150.95, 371.99, 1120.06, 872.62, -39.59, -99.24]}, {"date": "2026.10.28", "pnl": 482.56, "dd": 2697.09, "legs": [460.0, 7.81, 0.0, 309.91, 140.34, 130.96, -476.08, -30.5, -59.88]}, {"date": "2026.10.29", "pnl": 711.18, "dd": 494.51, "legs": [247.14, 8.13, -187.9, 375.96, 92.25, 236.8, -348.94, -3.13, 290.87]}, {"date": "2026.10.30", "pnl": 4515.07, "dd": 418.0, "legs": [574.21, -33.08, 926.23, 292.71, 962.59, 785.55, 133.68, 468.64, 404.54]}, {"date": "2026.10.31", "pnl": -29.12, "dd": 96.33, "legs": [0.0, -29.12, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.01", "pnl": 93.43, "dd": 401.93, "legs": [0.0, -17.77, 111.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.02", "pnl": 2114.99, "dd": 919.96, "legs": [560.02, 30.7, 329.96, 236.43, 338.92, 1804.8, -677.85, -526.3, 18.31]}, {"date": "2026.11.03", "pnl": 1718.21, "dd": 2340.03, "legs": [0.0, 86.21, 0.0, 205.48, 0.0, 863.14, -92.68, 609.58, 46.48]}, {"date": "2026.11.04", "pnl": 6101.37, "dd": 4351.06, "legs": [404.47, 540.74, 2947.0, 230.48, 1781.72, 768.49, -777.64, 943.05, -736.94]}, {"date": "2026.11.05", "pnl": -1118.85, "dd": 1954.63, "legs": [0.0, 34.06, 572.6, 656.55, 1134.86, 316.03, 97.43, -3629.24, -301.14]}, {"date": "2026.11.06", "pnl": 2885.34, "dd": 323.78, "legs": [0.0, 47.49, 0.0, 3.4, 11.26, 65.4, 1345.29, 1150.36, 262.14]}, {"date": "2026.11.07", "pnl": 65.13, "dd": 17.94, "legs": [0.0, 65.13, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.08", "pnl": 10.86, "dd": 141.15, "legs": [0.0, 30.35, -19.49, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"date": "2026.11.09", "pnl": 6459.46, "dd": 43.38, "legs": [0.0, 57.29, 2511.26, 946.83, 1032.75, 2141.69, -1612.29, 2098.26, -716.33]}, {"date": "2026.11.10", "pnl": 3874.13, "dd": 1788.1, "legs": [-182.47, -20.97, 278.5, 750.04, 164.16, 610.76, 969.73, -140.23, 1444.61]}, {"date": "2026.11.11", "pnl": 5121.62, "dd": 292.18, "legs": [1139.75, 32.42, 0.0, 305.24, 580.07, 559.89, 1308.1, 671.93, 524.22]}, {"date": "2026.11.12", "pnl": 3915.45, "dd": 648.69, "legs": [481.13, 61.02, 629.27, 600.04, 301.28, 755.02, 327.43, 3.45, 756.81]}, {"date": "2026.11.13", "pnl": -1378.14, "dd": 719.04, "legs": [-1073.4, -881.45, 325.02, 404.95, -697.78, 67.6, 499.86, -22.94, 0.0]}, {"date": "2026.11.14", "pnl": 0.0, "dd": 0.0, "legs": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}];

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

export default function BreakoutGridSep200000Full() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Breakout and grid book, saved v3 lots, session flatten, $200,000</H1>
        <Text tone="secondary">
          Real ticks, deposit $200,000, 1 Sep–14 Nov 2026. Breakout lot inputs are the saved v3 sets. Grid sets are EUR_2500, US500_2500 and XAU_2500, and they flatten outside the symbol session.
          The nine solo tests sum to $102,881. Read together, with breakout size following the shared equity, the book reaches $102,881 and drops $9,702 on 16 Sep.
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
            ["EUR v3 breakout", "$4,166", "214", "5,503%", "Equity sizing, floor $180,000, cap $190,000."],
            ["BTC v3 breakout", "$3,231", "73", "1,106%", "Equity sizing, floor $180,000, cap $190,000."],
            ["ETH v3 breakout", "$24,573", "91", "903%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US100 v3 breakout", "$12,472", "172", "7,368%", "Equity sizing, floor $180,000, cap $190,000."],
            ["US500 v3 breakout", "$15,309", "107", "3,263%", "Equity sizing, floor $180,000, cap $190,000."],
            ["XAU v3 breakout", "$21,376", "89", "1,789%", "Equity sizing, floor $180,000, cap $190,000."],
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
            ["1", "XAU v3 breakout", "$11,764", "5.87%", "$11,487", "$21,376"],
            ["2", "EUR v3 breakout", "$6,737", "3.33%", "$4,333", "$4,166"],
            ["3", "US500 v3 breakout", "$4,801", "2.27%", "$701", "$15,309"],
            ["4", "ETH v3 breakout", "$4,549", "2.22%", "$919", "$24,573"],
            ["5", "US500 grid", "$3,846", "1.87%", "$667", "$5,334"],
            ["6", "EUR grid", "$3,341", "1.61%", "$1,031", "$7,456"],
            ["7", "US100 v3 breakout", "$2,615", "1.30%", "$1,324", "$12,472"],
            ["8", "BTC v3 breakout", "$2,238", "1.11%", "$1,397", "$3,231"],
            ["9", "XAU grid", "$1,725", "0.83%", "$505", "$8,963"],
          ]}
          striped
        />
      </Stack>
      <Divider />
      <Grid columns={4} gap={16}>
        <Stat value="$102,881" label="Combined profit" tone="success" />
        <Stat value="$9,702" label="Worst day, 16 Sep" tone="danger" />
        <Stat value="$188,542" label="Lowest equity" tone="success" />
        <Stat value="$115,756" label="Free margin, lower bound" tone="success" />
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
            yMin={175000}
            yMax={310000}
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
          Breakout lots are the saved v3 input times the cushion above $180,000 divided by $10,000, with equity capped at $190,000. The $200,000 open is already above that cap, so the factor is 1 from the first bar and the lots open at the saved inputs. Lots lock at 15:00. Grid margin stays at $2,500, and the grids flatten outside the symbol session.
        </Text>
        <Table
          headers={["Leg", "Set", "Run it as", "Profit in the mix"]}
          columnAlign={["left", "left", "left", "right"]}
          rows={[
            ["EUR v3 breakout", "sets/v3/EUR_V3", "M6, 80 bars, both ways, lots 3.1, no stop, 144 hour hold, reset 15:00. Opens at 3.1 lots.", "$4,166"],
            ["BTC v3 breakout", "sets/v3/BTC_V3", "M5, 70 bars, both ways, lots 0.7, no stop, 264 hour hold, reset 15:00. Opens at 0.7 lots.", "$3,231"],
            ["ETH v3 breakout", "sets/v3/ETH_V3", "M20, 90 bars, both ways, lots 2.7, no stop, 96 hour hold, reset 15:00. Opens at 2.7 lots.", "$24,573"],
            ["US100 v3 breakout", "sets/v3/US100_V3", "M3, 100 bars, both ways, lots 4.5, no stop, 410 hour hold, reset 15:00. Opens at 4.5 lots.", "$12,472"],
            ["US500 v3 breakout", "sets/v3/US500_V3", "M20, 60 bars, both ways, lots 40, no stop, 72 hour hold, reset 15:00. Opens at 40 lots.", "$15,309"],
            ["XAU v3 breakout", "sets/v3/XAU_V3", "M15, 40 bars, both ways, lots 1.4, no stop, 96 hour hold, reset 15:00. Opens at 1.4 lots.", "$21,376"],
            ["EUR grid", "EUR_2500", "Margin $2,500, divisors 90/20, M30, 20 levels, 5 pending a side. Session flatten on.", "$7,456"],
            ["US500 grid", "US500_2500", "Margin $2,500, divisors 20/20, H1, 20 levels, 5 pending a side. Session flatten on.", "$5,334"],
            ["XAU grid", "XAU_2500", "Margin $2,500, divisors 100/20, H12, 20 levels, 5 pending a side. Session flatten on.", "$8,963"],
          ]}
          striped
        />
        <Text tone="secondary">Order cap is at most 144. The book ends near $302,881.</Text>
      </Stack>
      <H2>Each leg</H2>
      <Grid columns={2} gap={28}>
        {LEG_NAMES.map((name, index) => (
          <LegCalendar key={name} index={index} days={BOOK_DAYS} names={LEG_NAMES} />
        ))}
      </Grid>
      <Callout tone="danger" title="The shared book breaks the $9,000 day">
        Equity stayed at $188,542. 16 Sep dropped $9,702 from the equity at the start of the day. The first day through $9,000 is 1 Sep, at $9,677. Each expert has a $9,000 flatten, so a live account would have stopped there. This projection keeps the later trades, which is why profit reaches $102,881. The free-margin lower bound is $115,756.
      </Callout>
      <Text tone="tertiary" size="small">
        Tests are single-strategy MT5 runs, every tick based on real ticks, FTMO symbols, leverage 1:100, login 531454261, from 1 Sep 2026 to 14 Nov 2026. Set files in the repos were not changed. Grid session flatten and equity logging were set on the tester copies only. Daily loss allows each strategy's worst tick inside a 5-minute bucket to land together. Free margin is a lower bound from each test's minimum margin level, scaled by the breakout size ratio. Grids stay at ratio 1.
      </Text>
    </Stack>
  );
}
