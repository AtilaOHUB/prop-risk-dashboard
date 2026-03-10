import { normalizePrice } from "../pricing/normalizePrice";
import { snapLotToStep } from "../pricing/priceMath";
import { calculateRiskBox } from "../pricing/riskBox";
import {
  resolveTradeDirection,
  isValidTrade,
} from "./tradeDirection";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function normalizeLot(lot, instrument) {
  if (!isFiniteNumber(lot)) {
    return lot;
  }

  return snapLotToStep(lot, instrument);
}

export function updateTradeState(trade, updates) {
  if (!trade || !trade.instrument) {
    return trade;
  }

  const instrument = trade.instrument;

  const entry =
    updates.entry !== undefined
      ? normalizePrice(updates.entry, instrument)
      : trade.entry;

  const stop =
    updates.stop !== undefined
      ? normalizePrice(updates.stop, instrument)
      : trade.stop;

  const takeProfit =
    updates.takeProfit !== undefined
      ? normalizePrice(updates.takeProfit, instrument)
      : trade.takeProfit;

  const lot =
    updates.lot !== undefined
      ? normalizeLot(updates.lot, instrument)
      : trade.lot;

  const direction = resolveTradeDirection(entry, stop);
  const valid = isValidTrade(entry, stop, takeProfit);
  const riskBox = calculateRiskBox(entry, stop, takeProfit, instrument);

  return {
    ...trade,
    entry,
    stop,
    takeProfit,
    lot,
    direction,
    valid,
    riskBox,
  };
}