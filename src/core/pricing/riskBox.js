import {
  calculateStopDistance,
  calculateTakeProfitDistance,
  calculateStopPips,
  calculateTakeProfitPips,
  calculateStopTicks,
  calculateTakeProfitTicks,
  calculateRewardRiskRatio,
} from "./priceMath";

import { normalizePrice } from "./normalizePrice";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

export function calculateRiskBox(entry, stop, takeProfit, instrument) {
  if (
    !isFiniteNumber(entry) ||
    !isFiniteNumber(stop) ||
    !isFiniteNumber(takeProfit)
  ) {
    return null;
  }

  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedStop = normalizePrice(stop, instrument);
  const normalizedTP = normalizePrice(takeProfit, instrument);

  const riskPriceDistance = calculateStopDistance(
    normalizedEntry,
    normalizedStop,
    instrument
  );

  const rewardPriceDistance = calculateTakeProfitDistance(
    normalizedEntry,
    normalizedTP,
    instrument
  );

  const riskPips = calculateStopPips(
    normalizedEntry,
    normalizedStop,
    instrument
  );

  const rewardPips = calculateTakeProfitPips(
    normalizedEntry,
    normalizedTP,
    instrument
  );

  const riskTicks = calculateStopTicks(
    normalizedEntry,
    normalizedStop,
    instrument
  );

  const rewardTicks = calculateTakeProfitTicks(
    normalizedEntry,
    normalizedTP,
    instrument
  );

  const rr = calculateRewardRiskRatio(
    normalizedEntry,
    normalizedStop,
    normalizedTP,
    instrument
  );

  return {
    entry: normalizedEntry,
    stop: normalizedStop,
    takeProfit: normalizedTP,

    risk: {
      price: riskPriceDistance,
      pips: riskPips,
      ticks: riskTicks,
    },

    reward: {
      price: rewardPriceDistance,
      pips: rewardPips,
      ticks: rewardTicks,
    },

    rr,
  };
}