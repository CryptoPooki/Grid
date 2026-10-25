//+------------------------------------------------------------------+
//|                                                DynamicGridBB.mq5 |
//|                                         Dynamic Bollinger grid   |
//+------------------------------------------------------------------+
#property copyright "Grid"
#property version   "1.08"
#property description "Writes balance, equity, and floating profit on a chosen timeframe."
#property description "Dynamic grid on 4H EMA Bollinger Bands (length 21, 3 standard deviations)."
#property description "Limit orders only. Buy levels above the ask are skipped. Sell levels below the bid are skipped."
#property description "Flattens the book around high-impact EUR and USD calendar events."

#include <Trade/Trade.mqh>

enum ENUM_NEWS_CURRENCIES
{
   NEWS_USD_ONLY    = 0, // USD only
   NEWS_USD_AND_EUR = 1  // USD and EUR
};

input group "Budget"
input double InpEquityReserve     = 180000.0; // Equity reserve (margin = equity - reserve)
input double InpBuyMarginDivisor  = 40.0;     // Buy margin divisor
input double InpSellMarginDivisor = 80.0;     // Sell margin divisor

input group "Bollinger bands"
input ENUM_TIMEFRAMES InpTimeframe = PERIOD_H4; // Band timeframe
input int             InpBandsPeriod = 21;      // EMA and deviation length
input double          InpBandsDeviation = 3.0;  // Standard deviations

input group "Grid"
input int    InpGridLevels        = 20;   // Orders on each side
input double InpTakeProfitPercent = 0.1;  // Take profit, percent of entry

input group "Open loss"
input double InpReduceOnlyGap = 0.0; // Reduce-only gap, account currency (0 = off)
input double InpFlattenGap    = 0.0; // Flatten gap, account currency (0 = off)

input group "News blackout"
input bool                 InpNewsBlackout      = true;             // Flatten around high-impact news
input ENUM_NEWS_CURRENCIES InpNewsCurrencies    = NEWS_USD_AND_EUR; // News currencies
input int                  InpNewsMinutesBefore = 5;                // Minutes before the event
input int                  InpNewsMinutesAfter  = 5;                // Minutes after the event
input bool InpNewsWholeAccount   = true; // Clear every order and position on the account

input group "Equity record"
input bool            InpEquityLog       = true;      // Save the equity curve to a file
input ENUM_TIMEFRAMES InpEquityTimeframe = PERIOD_M1; // Equity sample timeframe

input group "Execution"
input int  InpMagic                  = 260014; // Magic number
input int  InpSlippagePoints         = 20;     // Slippage, points
input int  InpMaintainSeconds        = 2;      // How often to check the grid, seconds
input bool InpDrawGrid               = true;   // Draw bands and order levels
input bool InpDeletePendingOnRemove  = false;  // Delete pending orders when the EA is removed

#define OBJ_PREFIX          "BBG."
#define MAX_REQUESTS_PER_PASS 10

CTrade   g_trade;
int      g_maHandle = INVALID_HANDLE;
ENUM_ORDER_TYPE_FILLING g_filling = ORDER_FILLING_RETURN;

bool     g_busy = false;
bool     g_ready = false;
datetime g_barTime = 0;
datetime g_lastMaintain = 0;
datetime g_pauseTradingUntil = 0;
bool     g_realign = false;
bool     g_reduceBuy = false;
bool     g_reduceSell = false;
datetime g_flattenHoldBuyBar = 0;
datetime g_flattenHoldSellBar = 0;
double   g_openLoss = 0.0;
double   g_buyFloating = 0.0;
double   g_sellFloating = 0.0;
double   g_margin = 0.0;
double   g_equityAtRefresh = 0.0;
double   g_upper = 0.0;
double   g_middle = 0.0;
double   g_lower = 0.0;
double   g_buyLots[];
double   g_sellLots[];
int      g_requestsLeft = 0;
string   g_lastError;
bool     g_newsCalendarOk = true;
bool     g_inNews = false;
datetime g_newsFrom = 0;
datetime g_newsTo = 0;
datetime g_newsEventTime = 0;
string   g_newsName;
string   g_newsCurrency;
datetime g_nextNewsTime = 0;
string   g_nextNewsName;
string   g_nextNewsCurrency;
int      g_equityHandle = INVALID_HANDLE;
string   g_equityFile;
datetime g_equitySampleBar = 0;
datetime g_lastEquityWrite = 0;
double   g_equityLow = 0.0;
bool     g_equityTracking = false;
datetime g_eqTime[];
double   g_eqBalance[];
double   g_eqEquity[];
double   g_eqLow[];
int      g_eqCount = 0;

struct SyncStats
{
   int placed;
   int modified;
   int deleted;
};

//+------------------------------------------------------------------+
//| Small helpers                                                    |
//+------------------------------------------------------------------+
double TickSize()
{
   const double tick = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(tick > 0.0)
      return tick;
   return SymbolInfoDouble(_Symbol, SYMBOL_POINT);
}

double NormalizePrice(const double price)
{
   const double tick = TickSize();
   const int digits = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);
   if(tick <= 0.0)
      return NormalizeDouble(price, digits);
   return NormalizeDouble(MathRound(price / tick) * tick, digits);
}

double StopsDistance()
{
   const long points = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_STOPS_LEVEL);
   if(points <= 0)
      return 0.0;
   return (double)points * SymbolInfoDouble(_Symbol, SYMBOL_POINT);
}

double FreezeDistance()
{
   const long points = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_FREEZE_LEVEL);
   if(points <= 0)
      return 0.0;
   return (double)points * SymbolInfoDouble(_Symbol, SYMBOL_POINT);
}

int MoneyDigits()
{
   const int digits = (int)AccountInfoInteger(ACCOUNT_CURRENCY_DIGITS);
   if(digits < 0)
      return 2;
   return digits;
}

bool PriceDiffers(const double left, const double right)
{
   return MathAbs(left - right) >= TickSize() * 0.5;
}

bool VolumeDiffers(const double left, const double right)
{
   double step = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   if(step <= 0.0)
      step = 0.01;
   return MathAbs(left - right) >= step * 0.5;
}

double NormalizeVolumeDown(const double lots)
{
   const double step = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   const double minLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   const double maxLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
   if(step <= 0.0 || lots <= 0.0)
      return 0.0;

   double normalized = MathFloor(lots / step + 1e-8) * step;
   normalized = NormalizeDouble(normalized, 8);
   if(normalized < minLot - 1e-8)
      return 0.0;
   if(maxLot > 0.0 && normalized > maxLot)
      normalized = MathFloor(maxLot / step + 1e-8) * step;
   return NormalizeDouble(normalized, 8);
}

string LevelComment(const bool isBuy, const int index)
{
   return StringFormat("%s%02d", isBuy ? "GB" : "GS", index);
}

double GridStep(const bool isBuy)
{
   if(InpGridLevels <= 1)
      return 0.0;
   if(isBuy)
      return (g_middle - g_lower) / (InpGridLevels - 1);
   return (g_upper - g_middle) / (InpGridLevels - 1);
}

// Index 0 is the outer band. The last index is the middle band.
double LevelPrice(const bool isBuy, const int index)
{
   if(InpGridLevels <= 1)
      return NormalizePrice(isBuy ? g_lower : g_upper);

   if(isBuy)
      return NormalizePrice(g_lower + index * GridStep(true));
   return NormalizePrice(g_upper - index * GridStep(false));
}

double TakeProfitPrice(const bool isBuy, const double entry)
{
   const double distance = entry * InpTakeProfitPercent / 100.0;
   double tp = isBuy ? entry + distance : entry - distance;

   const double minDist = StopsDistance();
   if(minDist > 0.0)
   {
      if(isBuy && (tp - entry) < minDist)
         tp = entry + minDist;
      if(!isBuy && (entry - tp) < minDist)
         tp = entry - minDist;
   }

   tp = NormalizePrice(tp);
   const double tick = TickSize();
   if(isBuy && tp <= entry)
      tp = NormalizePrice(entry + tick);
   if(!isBuy && tp >= entry)
      tp = NormalizePrice(entry - tick);
   return tp;
}

ENUM_ORDER_TYPE_FILLING DetectFilling()
{
   const long filling = SymbolInfoInteger(_Symbol, SYMBOL_FILLING_MODE);
   if((filling & SYMBOL_FILLING_FOK) == SYMBOL_FILLING_FOK)
      return ORDER_FILLING_FOK;
   if((filling & SYMBOL_FILLING_IOC) == SYMBOL_FILLING_IOC)
      return ORDER_FILLING_IOC;
   return ORDER_FILLING_RETURN;
}

void ConfigureTrade()
{
   g_trade.SetExpertMagicNumber(InpMagic);
   g_trade.SetDeviationInPoints(InpSlippagePoints);
   g_trade.SetTypeFilling(g_filling);
   g_trade.LogLevel(LOG_LEVEL_NO);
}

void LogError(const string message)
{
   if(message == "" || StringFind(g_lastError, message) >= 0)
      return;
   g_lastError += message + "\n";
   Print("DynamicGridBB: ", message);
}

void PauseAfterTradeError()
{
   g_pauseTradingUntil = TimeCurrent() + 30;
}

bool ConsumeRequest()
{
   if(g_requestsLeft <= 0)
      return false;
   g_requestsLeft--;
   return true;
}

bool TradingAllowed()
{
   if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED))
      return false;
   if(!MQLInfoInteger(MQL_TRADE_ALLOWED))
      return false;
   if(!AccountInfoInteger(ACCOUNT_TRADE_ALLOWED))
      return false;

   const long mode = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_MODE);
   if(mode == SYMBOL_TRADE_MODE_DISABLED || mode == SYMBOL_TRADE_MODE_CLOSEONLY)
      return false;
   return true;
}

bool DirectionAllowed(const bool isBuy)
{
   const long mode = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_MODE);
   if(mode == SYMBOL_TRADE_MODE_LONGONLY)
      return isBuy;
   if(mode == SYMBOL_TRADE_MODE_SHORTONLY)
      return !isBuy;
   return true;
}

//+------------------------------------------------------------------+
//| Bands: middle is the 4H EMA. Width is 3 population deviations    |
//| of the last N closed closes around that EMA.                    |
//+------------------------------------------------------------------+
bool ComputeBands()
{
   if(BarsCalculated(g_maHandle) < InpBandsPeriod + 2)
      return false;
   if(Bars(_Symbol, InpTimeframe) < InpBandsPeriod + 2)
      return false;

   double ema[];
   ArraySetAsSeries(ema, true);
   if(CopyBuffer(g_maHandle, 0, 1, 1, ema) != 1)
      return false;

   double closes[];
   ArraySetAsSeries(closes, true);
   if(CopyClose(_Symbol, InpTimeframe, 1, InpBandsPeriod, closes) != InpBandsPeriod)
      return false;

   double sum = 0.0;
   for(int i = 0; i < InpBandsPeriod; ++i)
   {
      const double delta = closes[i] - ema[0];
      sum += delta * delta;
   }

   const double deviation = MathSqrt(sum / InpBandsPeriod);
   const double middle = ema[0];
   const double upper = middle + InpBandsDeviation * deviation;
   const double lower = middle - InpBandsDeviation * deviation;
   if(upper - middle < TickSize() || middle - lower < TickSize())
      return false;

   g_middle = middle;
   g_upper = upper;
   g_lower = lower;
   return true;
}

bool EnsureState()
{
   const datetime barOpen = iTime(_Symbol, InpTimeframe, 0);
   if(barOpen <= 0)
      return false;
   if(g_ready && barOpen == g_barTime)
      return true;
   if(!ComputeBands())
      return g_ready;

   const double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   g_equityAtRefresh = equity;
   g_margin = equity - InpEquityReserve;
   g_barTime = barOpen;
   g_ready = true;
   g_realign = true;
   g_lastError = "";

   ArrayResize(g_buyLots, InpGridLevels);
   ArrayResize(g_sellLots, InpGridLevels);
   ArrayInitialize(g_buyLots, -1.0);
   ArrayInitialize(g_sellLots, -1.0);

   PrintFormat("DynamicGridBB refresh. Equity %s, reserve %s, margin %s. Lower %s, middle %s, upper %s.",
               DoubleToString(equity, MoneyDigits()),
               DoubleToString(InpEquityReserve, MoneyDigits()),
               DoubleToString(g_margin, MoneyDigits()),
               DoubleToString(g_lower, _Digits),
               DoubleToString(g_middle, _Digits),
               DoubleToString(g_upper, _Digits));
   return true;
}

//+------------------------------------------------------------------+
//| Order queries                                                    |
//+------------------------------------------------------------------+
bool IsOurOrder()
{
   if(OrderGetString(ORDER_SYMBOL) != _Symbol)
      return false;
   return OrderGetInteger(ORDER_MAGIC) == (long)InpMagic;
}

bool IsOurPosition()
{
   if(PositionGetString(POSITION_SYMBOL) != _Symbol)
      return false;
   return PositionGetInteger(POSITION_MAGIC) == (long)InpMagic;
}

ulong FindPending(const string comment)
{
   for(int i = OrdersTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = OrderGetTicket(i);
      if(ticket == 0 || !IsOurOrder())
         continue;
      if(OrderGetString(ORDER_COMMENT) == comment)
         return ticket;
   }
   return 0;
}

bool IsExpectedComment(const string comment)
{
   for(int i = 0; i < InpGridLevels; ++i)
   {
      if(comment == LevelComment(true, i) || comment == LevelComment(false, i))
         return true;
   }
   return false;
}

bool LevelOccupied(const bool isBuy, const int index, const double price)
{
   const string comment = LevelComment(isBuy, index);
   const double tolerance = GridStep(isBuy) * 0.25;

   for(int i = PositionsTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = PositionGetTicket(i);
      if(ticket == 0 || !IsOurPosition())
         continue;

      const bool positionIsBuy = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY);
      if(positionIsBuy != isBuy)
         continue;

      const string positionComment = PositionGetString(POSITION_COMMENT);
      if(positionComment == comment)
         return true;

      // Fallback when a broker does not keep the pending-order comment.
      if(positionComment == "" && tolerance > 0.0 &&
         MathAbs(PositionGetDouble(POSITION_PRICE_OPEN) - price) <= tolerance)
         return true;
   }
   return false;
}

bool IsPriceFrozen(const double price)
{
   const double distance = FreezeDistance();
   if(distance <= 0.0)
      return false;

   MqlTick tick;
   if(!SymbolInfoTick(_Symbol, tick))
      return false;
   return MathAbs(price - tick.bid) <= distance || MathAbs(price - tick.ask) <= distance;
}

bool PriceBeyondMarket(const bool isBuy, const double price)
{
   MqlTick tick;
   if(!SymbolInfoTick(_Symbol, tick) || tick.ask <= 0.0 || tick.bid <= 0.0)
      return true;
   if(isBuy)
      return tick.ask <= price;
   return tick.bid >= price;
}

bool IsStopOrder(const ENUM_ORDER_TYPE type)
{
   return type == ORDER_TYPE_BUY_STOP || type == ORDER_TYPE_SELL_STOP || type == ORDER_TYPE_BUY_STOP_LIMIT || type == ORDER_TYPE_SELL_STOP_LIMIT;
}

// Limit orders only. A buy level at or above the ask is skipped.
// A sell level at or below the bid is skipped.
bool PendingType(const bool isBuy, const double price, ENUM_ORDER_TYPE &type)
{
   MqlTick tick;
   if(!SymbolInfoTick(_Symbol, tick) || tick.ask <= 0.0 || tick.bid <= 0.0)
      return false;

   double minDist = StopsDistance();
   const double tickSize = TickSize();
   if(minDist < tickSize)
      minDist = tickSize;

   const int orderMode = (int)SymbolInfoInteger(_Symbol, SYMBOL_ORDER_MODE);
   if(orderMode != 0 && (orderMode & SYMBOL_ORDER_LIMIT) == 0)
      return false;

   if(isBuy)
   {
      if(price > tick.ask - minDist)
         return false;
      type = ORDER_TYPE_BUY_LIMIT;
      return true;
   }

   if(price < tick.bid + minDist)
      return false;
   type = ORDER_TYPE_SELL_LIMIT;
   return true;
}

//+------------------------------------------------------------------+
//| Volume from a margin amount                                     |
//+------------------------------------------------------------------+
double VolumeForMargin(const ENUM_ORDER_TYPE type, const double price, const double money, bool &ok)
{
   ok = false;
   if(money <= 0.0 || price <= 0.0)
      return 0.0;

   double marginPerLot = 0.0;
   if(!OrderCalcMargin(type, _Symbol, 1.0, price, marginPerLot) || marginPerLot <= 0.0)
   {
      const bool sell = (type == ORDER_TYPE_SELL || type == ORDER_TYPE_SELL_LIMIT || type == ORDER_TYPE_SELL_STOP);
      const ENUM_ORDER_TYPE market = sell ? ORDER_TYPE_SELL : ORDER_TYPE_BUY;
      if(!OrderCalcMargin(market, _Symbol, 1.0, price, marginPerLot) || marginPerLot <= 0.0)
         return 0.0;
   }

   ok = true;
   return NormalizeVolumeDown(money / marginPerLot);
}

bool LotsForLevel(const bool isBuy, const int index, const ENUM_ORDER_TYPE type,
                   const double price, const double money, double &lots)
{
   const double cached = isBuy ? g_buyLots[index] : g_sellLots[index];
   if(cached >= 0.0)
   {
      lots = cached;
      return true;
   }

   bool ok = false;
   lots = VolumeForMargin(type, price, money, ok);
   if(!ok)
      return false;

   if(isBuy)
      g_buyLots[index] = lots;
   else
      g_sellLots[index] = lots;
   return true;
}

//+------------------------------------------------------------------+
//| Trade requests                                                   |
//+------------------------------------------------------------------+
bool SendOnce(const ENUM_ORDER_TYPE type, const double lots, const double price,
              const double tp, const string comment)
{
   if(type == ORDER_TYPE_BUY_LIMIT)
      return g_trade.BuyLimit(lots, price, _Symbol, 0.0, tp, ORDER_TIME_GTC, 0, comment);
   if(type == ORDER_TYPE_SELL_LIMIT)
      return g_trade.SellLimit(lots, price, _Symbol, 0.0, tp, ORDER_TIME_GTC, 0, comment);
   return false;
}

bool PlacePending(const ENUM_ORDER_TYPE type, const double lots, const double price,
                  const double tp, const string comment)
{
   double required = 0.0;
   if(OrderCalcMargin(type, _Symbol, lots, price, required) &&
      required > AccountInfoDouble(ACCOUNT_MARGIN_FREE))
   {
      LogError(StringFormat("Not enough free margin for %s. Need %s, free %s.",
                            comment,
                            DoubleToString(required, MoneyDigits()),
                            DoubleToString(AccountInfoDouble(ACCOUNT_MARGIN_FREE), MoneyDigits())));
      return false;
   }

   if(!ConsumeRequest())
      return false;

   ENUM_ORDER_TYPE_FILLING modes[3];
   modes[0] = g_filling;
   modes[1] = ORDER_FILLING_RETURN;
   modes[2] = ORDER_FILLING_IOC;

   for(int i = 0; i < 3; ++i)
   {
      if(i > 0 && modes[i] == modes[0])
         continue;

      g_trade.SetTypeFilling(modes[i]);
      if(SendOnce(type, lots, price, tp, comment))
      {
         g_filling = modes[i];
         return true;
      }

      if(g_trade.ResultRetcode() != TRADE_RETCODE_INVALID_FILL)
      {
         LogError(StringFormat("%s %s failed at %s (%s lots, TP %s): %s",
                               comment,
                               EnumToString(type),
                               DoubleToString(price, _Digits),
                               DoubleToString(lots, 4),
                               DoubleToString(tp, _Digits),
                               g_trade.ResultRetcodeDescription()));
         PauseAfterTradeError();
         return false;
      }
   }

   LogError("Broker rejected the order filling mode.");
   PauseAfterTradeError();
   return false;
}

bool DeletePending(const ulong ticket)
{
   if(!ConsumeRequest())
      return false;
   if(g_trade.OrderDelete(ticket))
      return true;

   LogError(StringFormat("Could not delete order %I64u: %s", ticket, g_trade.ResultRetcodeDescription()));
   PauseAfterTradeError();
   return false;
}

bool ModifyPending(const ulong ticket, const double price, const double tp)
{
   if(!ConsumeRequest())
      return false;
   if(g_trade.OrderModify(ticket, price, 0.0, tp, ORDER_TIME_GTC, 0, 0.0))
      return true;

   LogError(StringFormat("Could not modify order %I64u: %s", ticket, g_trade.ResultRetcodeDescription()));
   PauseAfterTradeError();
   return false;
}

int DeleteAllOurPending()
{
   int deleted = 0;
   for(int i = OrdersTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = OrderGetTicket(i);
      if(ticket == 0 || !IsOurOrder())
         continue;

      const double price = OrderGetDouble(ORDER_PRICE_OPEN);
      if(IsPriceFrozen(price))
         continue;
      if(DeletePending(ticket))
         deleted++;
      if(g_requestsLeft <= 0)
         break;
   }
   return deleted;
}

int DeleteUnexpectedPending()
{
   int deleted = 0;
   for(int i = OrdersTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = OrderGetTicket(i);
      if(ticket == 0 || !IsOurOrder())
         continue;
      if(IsExpectedComment(OrderGetString(ORDER_COMMENT)))
         continue;

      const double price = OrderGetDouble(ORDER_PRICE_OPEN);
      if(IsPriceFrozen(price))
         continue;
      if(DeletePending(ticket))
         deleted++;
      if(g_requestsLeft <= 0)
         break;
   }
   return deleted;
}

//+------------------------------------------------------------------+
//| Keep one pending order at one band level                         |
//+------------------------------------------------------------------+
bool SideBlocked(const bool isBuy)
{
   if(isBuy)
      return g_reduceBuy || (g_flattenHoldBuyBar != 0 && g_flattenHoldBuyBar == g_barTime);
   return g_reduceSell || (g_flattenHoldSellBar != 0 && g_flattenHoldSellBar == g_barTime);
}

double SideFloating(const bool isBuy)
{
   double floating = 0.0;
   const long wanted = isBuy ? POSITION_TYPE_BUY : POSITION_TYPE_SELL;
   for(int i = PositionsTotal() - 1; i >= 0; --i)
   {
      if(PositionGetTicket(i) == 0 || !IsOurPosition())
         continue;
      if(PositionGetInteger(POSITION_TYPE) != wanted)
         continue;
      floating += PositionGetDouble(POSITION_PROFIT) + PositionGetDouble(POSITION_SWAP);
   }
   return floating;
}

void RefreshOpenLoss()
{
   g_buyFloating = SideFloating(true);
   g_sellFloating = SideFloating(false);
   const double floating = g_buyFloating + g_sellFloating;
   g_openLoss = (floating < 0.0) ? -floating : 0.0;
}

int FlattenSide(const bool isBuy)
{
   if(isBuy)
   {
      g_reduceBuy = true;
      g_flattenHoldBuyBar = g_barTime;
   }
   else
   {
      g_reduceSell = true;
      g_flattenHoldSellBar = g_barTime;
   }

   const long wanted = isBuy ? POSITION_TYPE_BUY : POSITION_TYPE_SELL;
   int closed = 0;
   for(int i = PositionsTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = PositionGetTicket(i);
      if(ticket == 0 || !IsOurPosition())
         continue;
      if(PositionGetInteger(POSITION_TYPE) != wanted)
         continue;
      if(!ConsumeRequest())
         break;
      if(!g_trade.PositionClose(ticket, (ulong)InpSlippagePoints))
      {
         LogError(StringFormat("Could not close %s position %I64u: %s",
                               isBuy ? "buy" : "sell",
                               ticket,
                               g_trade.ResultRetcodeDescription()));
         PauseAfterTradeError();
         break;
      }
      closed++;
   }

   if(closed > 0)
   {
      PrintFormat("DynamicGridBB flattened %d %s position(s). Open loss was %s.",
                  closed,
                  isBuy ? "buy" : "sell",
                  DoubleToString(g_openLoss, MoneyDigits()));
   }
   return closed;
}

void UpdateRiskMode()
{
   if(g_flattenHoldBuyBar != 0 && g_flattenHoldBuyBar != g_barTime)
      g_flattenHoldBuyBar = 0;
   if(g_flattenHoldSellBar != 0 && g_flattenHoldSellBar != g_barTime)
      g_flattenHoldSellBar = 0;

   const bool wasReduceBuy = g_reduceBuy;
   const bool wasReduceSell = g_reduceSell;
   RefreshOpenLoss();

   if(InpReduceOnlyGap > 0.0 && g_openLoss >= InpReduceOnlyGap)
   {
      if(g_buyFloating < 0.0)
         g_reduceBuy = true;
      else if(g_flattenHoldBuyBar == 0)
         g_reduceBuy = false;

      if(g_sellFloating < 0.0)
         g_reduceSell = true;
      else if(g_flattenHoldSellBar == 0)
         g_reduceSell = false;
   }
   else if(InpReduceOnlyGap > 0.0 && g_openLoss < InpReduceOnlyGap)
   {
      if(g_flattenHoldBuyBar == 0)
         g_reduceBuy = false;
      if(g_flattenHoldSellBar == 0)
         g_reduceSell = false;
   }
   else
   {
      if(g_flattenHoldBuyBar == 0)
         g_reduceBuy = false;
      if(g_flattenHoldSellBar == 0)
         g_reduceSell = false;
   }

   if(g_reduceBuy && !wasReduceBuy)
      PrintFormat("DynamicGridBB reduce-only on buys. Open loss %s.", DoubleToString(g_openLoss, MoneyDigits()));
   if(g_reduceSell && !wasReduceSell)
      PrintFormat("DynamicGridBB reduce-only on sells. Open loss %s.", DoubleToString(g_openLoss, MoneyDigits()));
   if(!g_reduceBuy && wasReduceBuy)
      Print("DynamicGridBB buys can place orders again.");
   if(!g_reduceSell && wasReduceSell)
      Print("DynamicGridBB sells can place orders again.");

   if(InpFlattenGap > 0.0 && g_openLoss >= InpFlattenGap)
   {
      if(g_buyFloating < 0.0)
         FlattenSide(true);
      if(g_sellFloating < 0.0)
         FlattenSide(false);
      RefreshOpenLoss();
   }
}

void SyncLevel(const bool isBuy, const int index, const bool realign, SyncStats &stats)
{
   if(!DirectionAllowed(isBuy))
      return;

   const string comment = LevelComment(isBuy, index);
   const double price = LevelPrice(isBuy, index);

   if(SideBlocked(isBuy))
   {
      const ulong blocked = FindPending(comment);
      if(blocked != 0)
      {
         const double blockedPrice = OrderGetDouble(ORDER_PRICE_OPEN);
         if(!IsPriceFrozen(blockedPrice) && DeletePending(blocked))
            stats.deleted++;
      }
      return;
   }

   if(LevelOccupied(isBuy, index, price))
   {
      const ulong existing = FindPending(comment);
      if(existing != 0)
      {
         const double currentPrice = OrderGetDouble(ORDER_PRICE_OPEN);
         if(!IsPriceFrozen(currentPrice) && DeletePending(existing))
            stats.deleted++;
      }
      return;
   }

   ulong ticket = FindPending(comment);
   ENUM_ORDER_TYPE currentType = ORDER_TYPE_BUY;
   double currentPrice = 0.0;
   double currentTp = 0.0;
   double currentLots = 0.0;
   if(ticket != 0)
   {
      if(!OrderSelect(ticket))
         return;
      currentType = (ENUM_ORDER_TYPE)OrderGetInteger(ORDER_TYPE);
      currentPrice = OrderGetDouble(ORDER_PRICE_OPEN);
      currentTp = OrderGetDouble(ORDER_TP);
      currentLots = OrderGetDouble(ORDER_VOLUME_CURRENT);
   }

   // Drop stop orders and any order whose level is on the wrong side of the market.
   const bool targetBeyond = PriceBeyondMarket(isBuy, price);
   const bool orderBeyond = (ticket != 0) && (IsStopOrder(currentType) || PriceBeyondMarket(isBuy, currentPrice));
   if(targetBeyond || orderBeyond)
   {
      if(ticket != 0 && !IsPriceFrozen(currentPrice))
      {
         if(!DeletePending(ticket))
            return;
         stats.deleted++;
         ticket = 0;
      }
      else if(ticket != 0)
         return;

      if(targetBeyond)
         return;
   }

   ENUM_ORDER_TYPE type = ORDER_TYPE_BUY;
   if(!PendingType(isBuy, price, type))
      return;

   // Between 4H refreshes, leave a working limit where it is and only fill empty levels.
   if(ticket != 0 && !realign)
      return;

   const double money = g_margin / (isBuy ? InpBuyMarginDivisor : InpSellMarginDivisor);
   double lots = 0.0;
   if(!LotsForLevel(isBuy, index, type, price, money, lots))
      return;
   if(lots <= 0.0)
   {
      LogError(StringFormat("%s needs %s margin, which is below the minimum volume.",
                            comment, DoubleToString(money, MoneyDigits())));
      return;
   }

   const double tp = TakeProfitPrice(isBuy, price);
   if(ticket == 0)
   {
      if(PlacePending(type, lots, price, tp, comment))
         stats.placed++;
      return;
   }

   if(IsPriceFrozen(currentPrice))
      return;

   const bool replace = (currentType != type) || VolumeDiffers(currentLots, lots);
   if(replace)
   {
      if(!DeletePending(ticket))
         return;
      stats.deleted++;
      if(PlacePending(type, lots, price, tp, comment))
         stats.placed++;
      return;
   }

   if(PriceDiffers(currentPrice, price) || PriceDiffers(currentTp, tp))
   {
      if(ModifyPending(ticket, price, tp))
         stats.modified++;
   }
}

//+------------------------------------------------------------------+
//| Chart                                                            |
//+------------------------------------------------------------------+
void SetHLine(const string name, const double price, const color lineColor,
              const int style, const int width, const string tip)
{
   if(ObjectFind(0, name) < 0)
   {
      ObjectCreate(0, name, OBJ_HLINE, 0, 0, price);
      ObjectSetInteger(0, name, OBJPROP_COLOR, lineColor);
      ObjectSetInteger(0, name, OBJPROP_STYLE, style);
      ObjectSetInteger(0, name, OBJPROP_WIDTH, width);
      ObjectSetInteger(0, name, OBJPROP_BACK, true);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
      ObjectSetInteger(0, name, OBJPROP_TIMEFRAMES, OBJ_ALL_PERIODS);
   }
   else
   {
      ObjectSetDouble(0, name, OBJPROP_PRICE, price);
   }

   ObjectSetString(0, name, OBJPROP_TOOLTIP, tip);
}

void DrawGrid()
{
   if(!InpDrawGrid)
   {
      ObjectsDeleteAll(0, OBJ_PREFIX);
      return;
   }

   SetHLine(OBJ_PREFIX + "BAND.U", g_upper, clrGoldenrod, STYLE_SOLID, 2, "Upper band");
   SetHLine(OBJ_PREFIX + "BAND.M", g_middle, clrSilver, STYLE_DASH, 2, "Middle band (EMA)");
   SetHLine(OBJ_PREFIX + "BAND.L", g_lower, clrGoldenrod, STYLE_SOLID, 2, "Lower band");

   for(int i = 0; i < InpGridLevels; ++i)
   {
      const double buyPrice = LevelPrice(true, i);
      const double sellPrice = LevelPrice(false, i);
      const string buyName = StringFormat("%sBUY.%02d", OBJ_PREFIX, i);
      const string sellName = StringFormat("%sSELL.%02d", OBJ_PREFIX, i);

      SetHLine(buyName, buyPrice, clrDodgerBlue, STYLE_DOT, 1,
               StringFormat("Buy %d at %s, TP %s", i, DoubleToString(buyPrice, _Digits),
                            DoubleToString(TakeProfitPrice(true, buyPrice), _Digits)));
      SetHLine(sellName, sellPrice, clrOrangeRed, STYLE_DOT, 1,
               StringFormat("Sell %d at %s, TP %s", i, DoubleToString(sellPrice, _Digits),
                            DoubleToString(TakeProfitPrice(false, sellPrice), _Digits)));
   }

   for(int i = InpGridLevels; i < 100; ++i)
   {
      ObjectDelete(0, StringFormat("%sBUY.%02d", OBJ_PREFIX, i));
      ObjectDelete(0, StringFormat("%sSELL.%02d", OBJ_PREFIX, i));
   }

   ChartRedraw(0);
}

int CountOur(const bool positions)
{
   int count = 0;
   if(positions)
   {
      for(int i = PositionsTotal() - 1; i >= 0; --i)
      {
         if(PositionGetTicket(i) != 0 && IsOurPosition())
            count++;
      }
      return count;
   }

   for(int i = OrdersTotal() - 1; i >= 0; --i)
   {
      if(OrderGetTicket(i) != 0 && IsOurOrder())
         count++;
   }
   return count;
}

string NewsCurrencyLabel()
{
   return (InpNewsCurrencies == NEWS_USD_ONLY) ? "USD" : "EUR/USD";
}

bool NewsCurrency(const string currency)
{
   string code = currency;
   StringTrimLeft(code);
   StringTrimRight(code);
   StringToUpper(code);
   if(code == "USD")
      return true;
   return (InpNewsCurrencies == NEWS_USD_AND_EUR && code == "EUR");
}

bool ManagedByNews(const bool wholeAccount, const bool position)
{
   if(wholeAccount)
      return true;
   return position ? IsOurPosition() : IsOurOrder();
}

void RefreshNewsCache()
{
   if(!InpNewsBlackout)
   {
      g_inNews = false;
      g_newsCalendarOk = true;
      return;
   }

   const datetime now = TimeCurrent();
   const int beforeSec = InpNewsMinutesBefore * 60;
   const int afterSec = InpNewsMinutesAfter * 60;

   MqlCalendarValue values[];
   ResetLastError();
   const int count = CalendarValueHistory(values, now - afterSec - 60, now + beforeSec + 48 * 3600);
   if(count < 0)
   {
      g_newsCalendarOk = false;
      g_inNews = (g_newsFrom > 0 && now >= g_newsFrom && now < g_newsTo);
      LogError(StringFormat("Economic calendar is unavailable (%d). High-impact %s events cannot be cleared automatically.",
                            GetLastError(), NewsCurrencyLabel()));
      return;
   }

   g_newsFrom = 0;
   g_newsTo = 0;
   g_newsEventTime = 0;
   g_newsName = "";
   g_newsCurrency = "";
   g_nextNewsTime = 0;
   g_nextNewsName = "";
   g_nextNewsCurrency = "";

   g_newsCalendarOk = true;
   for(int i = 0; i < count; ++i)
   {
      if(values[i].event_id == 0 || values[i].time == 0)
         continue;

      MqlCalendarEvent event;
      if(!CalendarEventById(values[i].event_id, event))
         continue;
      if(event.importance != CALENDAR_IMPORTANCE_HIGH)
         continue;
      if(event.time_mode != CALENDAR_TIMEMODE_DATETIME && event.time_mode != CALENDAR_TIMEMODE_TENTATIVE)
         continue;

      MqlCalendarCountry country;
      if(!CalendarCountryById(event.country_id, country))
         continue;
      if(!NewsCurrency(country.currency))
         continue;

      const datetime eventTime = values[i].time;
      const datetime blackoutFrom = eventTime - beforeSec;
      const datetime blackoutTo = eventTime + afterSec;
      if(now >= blackoutFrom && now < blackoutTo)
      {
         if(g_newsFrom == 0 || blackoutTo > g_newsTo)
         {
            g_newsFrom = blackoutFrom;
            g_newsTo = blackoutTo;
            g_newsEventTime = eventTime;
            g_newsName = event.name;
            g_newsCurrency = country.currency;
         }
         continue;
      }

      if(eventTime > now && (g_nextNewsTime == 0 || eventTime < g_nextNewsTime))
      {
         g_nextNewsTime = eventTime;
         g_nextNewsName = event.name;
         g_nextNewsCurrency = country.currency;
      }
   }

   const bool nowInNews = (g_newsFrom > 0 && now >= g_newsFrom && now < g_newsTo);
   if(nowInNews && !g_inNews)
   {
      PrintFormat("DynamicGridBB news blackout. %s %s at %s. Flat from %s until %s.",
                  g_newsCurrency,
                  g_newsName,
                  TimeToString(g_newsEventTime, TIME_DATE | TIME_MINUTES),
                  TimeToString(g_newsFrom, TIME_DATE | TIME_MINUTES),
                  TimeToString(g_newsTo, TIME_DATE | TIME_MINUTES));
   }
   if(!nowInNews && g_inNews)
      Print("DynamicGridBB news blackout finished. The grid can place orders again.");
   g_inNews = nowInNews;
}

int DeleteNewsOrders()
{
   int deleted = 0;
   for(int i = OrdersTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = OrderGetTicket(i);
      if(ticket == 0 || !ManagedByNews(InpNewsWholeAccount, false))
         continue;
      if(!ConsumeRequest())
         break;
      if(g_trade.OrderDelete(ticket))
         deleted++;
      else
         LogError(StringFormat("Could not delete order %I64u for the news blackout: %s",
                               ticket, g_trade.ResultRetcodeDescription()));
   }
   return deleted;
}

int CloseNewsPositions()
{
   int closed = 0;
   for(int i = PositionsTotal() - 1; i >= 0; --i)
   {
      const ulong ticket = PositionGetTicket(i);
      if(ticket == 0 || !ManagedByNews(InpNewsWholeAccount, true))
         continue;
      if(!ConsumeRequest())
         break;
      if(g_trade.PositionClose(ticket, (ulong)InpSlippagePoints))
         closed++;
      else
         LogError(StringFormat("Could not close position %I64u for the news blackout: %s",
                               ticket, g_trade.ResultRetcodeDescription()));
   }
   return closed;
}

void EnforceNewsBlackout()
{
   const int deleted = DeleteNewsOrders();
   const int closed = CloseNewsPositions();
   if(deleted + closed > 0)
   {
      PrintFormat("DynamicGridBB cleared %d order(s) and %d position(s) for %s %s.",
                  deleted, closed, g_newsCurrency, g_newsName);
   }
}

string NewsStatus()
{
   if(!InpNewsBlackout)
      return "News blackout off";
   if(!g_newsCalendarOk)
      return "Calendar unavailable. " + NewsCurrencyLabel() + " news is not being cleared.";
   if(g_inNews)
   {
      return StringFormat("NEWS FLAT until %s | %s %s at %s",
                          TimeToString(g_newsTo, TIME_DATE | TIME_MINUTES),
                          g_newsCurrency,
                          g_newsName,
                          TimeToString(g_newsEventTime, TIME_MINUTES));
   }
   if(g_nextNewsTime > 0)
   {
      return StringFormat("Next high %s news: %s %s at %s",
                          NewsCurrencyLabel(),
                          g_nextNewsCurrency,
                          g_nextNewsName,
                          TimeToString(g_nextNewsTime, TIME_DATE | TIME_MINUTES));
   }
   return "No high-impact " + NewsCurrencyLabel() + " news in the next 48 hours";
}

void ShowStatus(const string note)
{
   const int digits = MoneyDigits();
   const double buyMoney = (InpBuyMarginDivisor > 0.0) ? g_margin / InpBuyMarginDivisor : 0.0;
   const double sellMoney = (InpSellMarginDivisor > 0.0) ? g_margin / InpSellMarginDivisor : 0.0;
   const datetime closedBar = iTime(_Symbol, InpTimeframe, 1);

   const double gridMargin = InpGridLevels * (buyMoney + sellMoney);
   const string buyMode = SideBlocked(true) ? "reduce-only" : "trading";
   const string sellMode = SideBlocked(false) ? "reduce-only" : "trading";
   string text = StringFormat("Dynamic BB grid  %s\nEquity now %s | Reserve %s\nGrid margin %s = snapshot equity %s - reserve\nBuy/order %s | Sell/order %s | Full grid %s | Free %s\nOpen loss %s | Buys %s | Sells %s\nReduce-only %s | Flatten %s | Buy %s | Sell %s\nLower %s | EMA %s | Upper %s\nPending %d | Positions %d | Bands from %s",
                              _Symbol,
                              DoubleToString(AccountInfoDouble(ACCOUNT_EQUITY), digits),
                              DoubleToString(InpEquityReserve, digits),
                              DoubleToString(g_margin, digits),
                              DoubleToString(g_equityAtRefresh, digits),
                              DoubleToString(buyMoney, digits),
                              DoubleToString(sellMoney, digits),
                              DoubleToString(gridMargin, digits),
                              DoubleToString(AccountInfoDouble(ACCOUNT_MARGIN_FREE), digits),
                              DoubleToString(g_openLoss, digits),
                              DoubleToString(g_buyFloating, digits),
                              DoubleToString(g_sellFloating, digits),
                              (InpReduceOnlyGap > 0.0 ? DoubleToString(InpReduceOnlyGap, digits) : "off"),
                              (InpFlattenGap > 0.0 ? DoubleToString(InpFlattenGap, digits) : "off"),
                              buyMode,
                              sellMode,
                              DoubleToString(g_lower, _Digits),
                              DoubleToString(g_middle, _Digits),
                              DoubleToString(g_upper, _Digits),
                              CountOur(false),
                              CountOur(true),
                              closedBar > 0 ? TimeToString(closedBar, TIME_DATE | TIME_MINUTES) : "-");
   text += "\n" + NewsStatus();
   if(InpEquityLog && g_equityFile != "")
      text += "\nEquity record: " + g_equityFile;
   if(note != "")
      text += "\n" + note;
   Comment(text);
}

//+------------------------------------------------------------------+
//| Maintenance                                                      |
//+------------------------------------------------------------------+
void RunGrid()
{
   ConfigureTrade();
   g_requestsLeft = MAX_REQUESTS_PER_PASS;

   if(!EnsureState())
   {
      Comment("Dynamic BB grid\nWaiting for " + EnumToString(InpTimeframe) + " EMA data.");
      return;
   }

   DrawGrid();
   RefreshNewsCache();

   if(g_inNews)
   {
      if(!TradingAllowed())
      {
         RefreshOpenLoss();
         ShowStatus("News window, but AutoTrading is off. Orders and positions were not cleared.");
         return;
      }

      g_requestsLeft = 100;
      EnforceNewsBlackout();
      RefreshOpenLoss();
      ShowStatus("");
      return;
   }

   if(!TradingAllowed())
   {
      RefreshOpenLoss();
      ShowStatus("AutoTrading is disabled. Existing orders were left in place.");
      return;
   }

   UpdateRiskMode();

   if(TimeCurrent() < g_pauseTradingUntil)
   {
      ShowStatus("Paused for 30 seconds after a trade error. See the Experts log.");
      return;
   }

   if(g_margin <= 0.0)
   {
      const int deleted = DeleteAllOurPending();
      ShowStatus("Equity is at or below the reserve. No new grid orders.");
      if(deleted > 0)
         PrintFormat("DynamicGridBB removed %d pending orders because margin is %.2f.", deleted, g_margin);
      return;
   }

   const bool realign = g_realign;
   SyncStats stats;
   stats.placed = 0;
   stats.modified = 0;
   stats.deleted = 0;

   bool interrupted = false;
   for(int i = 0; i < InpGridLevels; ++i)
   {
      if(TimeCurrent() < g_pauseTradingUntil)
      {
         interrupted = true;
         break;
      }
      SyncLevel(true, i, realign, stats);
      SyncLevel(false, i, realign, stats);
   }
   if(!interrupted)
      stats.deleted += DeleteUnexpectedPending();
   if(realign && !interrupted && g_requestsLeft > 0)
      g_realign = false;

   ShowStatus("");
   if(stats.placed + stats.modified + stats.deleted > 0)
   {
      PrintFormat("DynamicGridBB sync. Placed %d, modified %d, deleted %d.",
                  stats.placed, stats.modified, stats.deleted);
   }
}

void Maintain(const bool force)
{
   if(g_busy)
      return;

   const datetime now = TimeCurrent();
   if(!force && g_lastMaintain > 0 && (now - g_lastMaintain) < InpMaintainSeconds)
      return;

   g_busy = true;
   g_lastMaintain = now;
   RunGrid();
   g_busy = false;
}

//+------------------------------------------------------------------+
//| Events                                                           |
//+------------------------------------------------------------------+
int OnInit()
{
   if(InpEquityReserve < 0.0 || InpBuyMarginDivisor <= 0.0 || InpSellMarginDivisor <= 0.0)
      return INIT_PARAMETERS_INCORRECT;
   if(InpBandsPeriod < 2 || InpBandsDeviation <= 0.0)
      return INIT_PARAMETERS_INCORRECT;
   if(InpGridLevels < 2 || InpGridLevels > 100)
      return INIT_PARAMETERS_INCORRECT;
   if(InpTakeProfitPercent <= 0.0 || InpTakeProfitPercent >= 100.0)
      return INIT_PARAMETERS_INCORRECT;
   if(InpReduceOnlyGap < 0.0 || InpFlattenGap < 0.0)
      return INIT_PARAMETERS_INCORRECT;
   if(InpReduceOnlyGap > 0.0 && InpFlattenGap > 0.0 && InpFlattenGap <= InpReduceOnlyGap)
   {
      Print("DynamicGridBB: the flatten gap must be above the reduce-only gap.");
      return INIT_PARAMETERS_INCORRECT;
   }
   if(InpNewsMinutesBefore < 0 || InpNewsMinutesAfter < 0)
      return INIT_PARAMETERS_INCORRECT;
   if(InpNewsBlackout && InpNewsMinutesBefore + InpNewsMinutesAfter < 1)
   {
      Print("DynamicGridBB: the news window must cover at least one minute.");
      return INIT_PARAMETERS_INCORRECT;
   }
   if(InpMagic <= 0 || InpMaintainSeconds < 1)
      return INIT_PARAMETERS_INCORRECT;

   g_maHandle = iMA(_Symbol, InpTimeframe, InpBandsPeriod, 0, MODE_EMA, PRICE_CLOSE);
   if(g_maHandle == INVALID_HANDLE)
   {
      Print("DynamicGridBB: failed to create the EMA. Error ", GetLastError());
      return INIT_FAILED;
   }

   g_filling = DetectFilling();
   ConfigureTrade();

   const long marginMode = AccountInfoInteger(ACCOUNT_MARGIN_MODE);
   if(marginMode != ACCOUNT_MARGIN_MODE_RETAIL_HEDGING)
      Print("DynamicGridBB: this grid keeps buys and sells open together. Use a hedging account.");

   if(!EventSetTimer(InpMaintainSeconds))
      Print("DynamicGridBB: timer was not created. The grid will update on ticks. Error ", GetLastError());

   OpenEquityLog();
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   CloseEquityLog();
   EventKillTimer();
   ObjectsDeleteAll(0, OBJ_PREFIX);
   Comment("");

   if(InpDeletePendingOnRemove && reason == REASON_REMOVE)
   {
      ConfigureTrade();
      g_requestsLeft = OrdersTotal() + 5;
      DeleteAllOurPending();
   }

   if(g_maHandle != INVALID_HANDLE)
   {
      IndicatorRelease(g_maHandle);
      g_maHandle = INVALID_HANDLE;
   }
}

string EquityFileName()
{
   string symbol = _Symbol;
   StringReplace(symbol, "\\", "_");
   StringReplace(symbol, "/", "_");
   StringReplace(symbol, ":", "_");
   StringReplace(symbol, "*", "_");
   StringReplace(symbol, "?", "_");
   StringReplace(symbol, "\"", "_");
   StringReplace(symbol, "<", "_");
   StringReplace(symbol, ">", "_");
   StringReplace(symbol, "|", "_");

   string stamp = TimeToString(TimeCurrent(), TIME_DATE | TIME_MINUTES);
   StringReplace(stamp, ".", "");
   StringReplace(stamp, ":", "");
   StringReplace(stamp, " ", "_");
   return StringFormat("DynamicGridBB_%s_%s.csv", symbol, stamp);
}

void WriteEquityPoint()
{
   if(g_equityHandle == INVALID_HANDLE)
      return;

   const double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   if(!g_equityTracking || equity < g_equityLow)
      g_equityLow = equity;
   g_equityTracking = true;

   const datetime now = TimeCurrent();
   if(now > 0 && now == g_lastEquityWrite)
      return;

   const int digits = MoneyDigits();
   const double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   FileWrite(g_equityHandle,
             TimeToString(now, TIME_DATE | TIME_SECONDS),
             DoubleToString(balance, digits),
             DoubleToString(equity, digits),
             DoubleToString(equity - balance, digits),
             DoubleToString(g_equityLow, digits));
   FileFlush(g_equityHandle);
   g_lastEquityWrite = now;

   const int size = ArraySize(g_eqTime);
   if(g_eqCount >= size)
   {
      const int next = size + 512;
      ArrayResize(g_eqTime, next);
      ArrayResize(g_eqBalance, next);
      ArrayResize(g_eqEquity, next);
      ArrayResize(g_eqLow, next);
   }
   g_eqTime[g_eqCount] = now;
   g_eqBalance[g_eqCount] = balance;
   g_eqEquity[g_eqCount] = equity;
   g_eqLow[g_eqCount] = g_equityLow;
   g_eqCount++;
   g_equityLow = equity;
}

int EquityStepSeconds()
{
   const int seconds = PeriodSeconds(InpEquityTimeframe);
   if(seconds > 0)
      return seconds;
   return 60;
}

string EquityChartName()
{
   string name = g_equityFile;
   const int dot = StringFind(name, ".csv");
   if(dot > 0)
      name = StringSubstr(name, 0, dot);
   return name + ".html";
}

string EquityPolyline(const double &series[], const int count, const datetime t0, const datetime t1,
                      const double minValue, const double maxValue)
{
   string points = "";
   const double spanT = (double)MathMax(1, (int)(t1 - t0));
   const double spanV = MathMax(maxValue - minValue, 0.01);
   for(int i = 0; i < count; ++i)
   {
      const double x = 56.0 + (double)(g_eqTime[i] - t0) / spanT * 900.0;
      const double y = 24.0 + (maxValue - series[i]) / spanV * 360.0;
      points += DoubleToString(x, 1) + "," + DoubleToString(y, 1) + " ";
   }
   return points;
}

void WriteEquityChart()
{
   if(g_eqCount < 2 || g_equityFile == "")
      return;

   double minValue = g_eqEquity[0];
   double maxValue = g_eqEquity[0];
   for(int i = 0; i < g_eqCount; ++i)
   {
      minValue = MathMin(minValue, MathMin(g_eqBalance[i], MathMin(g_eqEquity[i], g_eqLow[i])));
      maxValue = MathMax(maxValue, MathMax(g_eqBalance[i], MathMax(g_eqEquity[i], g_eqLow[i])));
   }

   const datetime t0 = g_eqTime[0];
   const datetime t1 = g_eqTime[g_eqCount - 1];
   const string balanceLine = EquityPolyline(g_eqBalance, g_eqCount, t0, t1, minValue, maxValue);
   const string equityLine = EquityPolyline(g_eqEquity, g_eqCount, t0, t1, minValue, maxValue);
   const string lowLine = EquityPolyline(g_eqLow, g_eqCount, t0, t1, minValue, maxValue);
   const int digits = MoneyDigits();
   const string htmlName = EquityChartName();
   const int handle = FileOpen(htmlName, FILE_WRITE | FILE_TXT | FILE_COMMON | FILE_ANSI | FILE_SHARE_READ);
   if(handle == INVALID_HANDLE)
   {
      Print("DynamicGridBB: equity chart was not created. Error ", GetLastError());
      return;
   }

   FileWriteString(handle,
      "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Equity "
      + g_equityFile + "</title></head><body style=\"font-family:Segoe UI,sans-serif;background:#111;color:#eee\">"
      + "<h2 style=\"margin:16px\">Balance and equity</h2>"
      + "<p style=\"margin:0 16px 12px\">Balance "
      + DoubleToString(g_eqBalance[g_eqCount - 1], digits)
      + " | Equity " + DoubleToString(g_eqEquity[g_eqCount - 1], digits)
      + " | Floating " + DoubleToString(g_eqEquity[g_eqCount - 1] - g_eqBalance[g_eqCount - 1], digits)
      + "</p><svg width=\"980\" height=\"420\" style=\"background:#1b1b1b;margin:16px\">"
      + "<polyline fill=\"none\" stroke=\"#8a8a8a\" stroke-width=\"1.5\" points=\"" + balanceLine + "\"/>"
      + "<polyline fill=\"none\" stroke=\"#4da3ff\" stroke-width=\"2\" points=\"" + equityLine + "\"/>"
      + "<polyline fill=\"none\" stroke=\"#e05a4f\" stroke-width=\"1\" points=\"" + lowLine + "\"/>"
      + "</svg><p style=\"margin:0 16px\">Gray balance, blue equity, red lowest equity since the previous sample.</p>"
      + "</body></html>");
   FileClose(handle);
   Print("DynamicGridBB equity chart: Common\\Files\\", htmlName);
}

bool OpenEquityLog()
{
   if(!InpEquityLog)
      return true;

   g_equityFile = EquityFileName();
   g_eqCount = 0;
   g_equityHandle = FileOpen(g_equityFile, FILE_WRITE | FILE_CSV | FILE_COMMON | FILE_SHARE_READ | FILE_ANSI, ',');
   if(g_equityHandle == INVALID_HANDLE)
   {
      Print("DynamicGridBB: equity file was not created. Error ", GetLastError());
      return false;
   }

   FileWrite(g_equityHandle, "time", "balance", "equity", "floating", "equity_low");
   FileFlush(g_equityHandle);
   WriteEquityPoint();
   Print("DynamicGridBB equity record: Common\\Files\\", g_equityFile);
   return true;
}

void TrackEquitySample()
{
   if(g_equityHandle == INVALID_HANDLE)
      return;

   const double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   if(!g_equityTracking || equity < g_equityLow)
      g_equityLow = equity;
   g_equityTracking = true;

   const datetime now = TimeCurrent();
   if(now <= 0)
      return;
   const datetime bucket = now - (now % EquityStepSeconds());
   if(g_equitySampleBar == 0)
   {
      g_equitySampleBar = bucket;
      return;
   }
   if(bucket == g_equitySampleBar)
      return;

   g_equitySampleBar = bucket;
   WriteEquityPoint();
}

void CloseEquityLog()
{
   if(g_equityHandle == INVALID_HANDLE)
      return;

   WriteEquityPoint();
   FileClose(g_equityHandle);
   g_equityHandle = INVALID_HANDLE;
   WriteEquityChart();
}

void OnTick()
{
   TrackEquitySample();
   Maintain(false);
}

void OnTimer()
{
   TrackEquitySample();
   Maintain(false);
}

void OnTrade()
{
   Maintain(true);
}
//+------------------------------------------------------------------+
