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

export function createTradeState(values, instrument) {
  if (!values || !instrument) {
    return null;
  }

  const entry = normalizePrice(values.entry, instrument);
  const stop = normalizePrice(values.stop, instrument);
  const takeProfit = normalizePrice(values.takeProfit, instrument);
  const lot = normalizeLot(values.lot, instrument);

  const direction = resolveTradeDirection(entry, stop);
  const valid = isValidTrade(entry, stop, takeProfit);
  const riskBox = calculateRiskBox(entry, stop, takeProfit, instrument);

  return {
    instrument,
    entry,
    stop,
    takeProfit,
    lot,
    direction,
    valid,
    riskBox,
  };
}