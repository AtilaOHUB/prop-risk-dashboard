import {
  roundPriceToTick,
  floorPriceToTick,
  ceilPriceToTick,
  roundLotToStep,
  floorLotToStep,
  ceilLotToStep,
} from "./rounding";

import {
  getPriceDistance,
  getAbsolutePriceDistance,
  getPipDistance,
  getAbsolutePipDistance,
  getTickDistance,
} from "./distance";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

export function snapPriceToTick(price, instrument) {
  return roundPriceToTick(price, instrument);
}

export function snapPriceDownToTick(price, instrument) {
  return floorPriceToTick(price, instrument);
}

export function snapPriceUpToTick(price, instrument) {
  return ceilPriceToTick(price, instrument);
}

export function snapLotToStep(lot, instrument) {
  return roundLotToStep(lot, instrument);
}

export function snapLotDownToStep(lot, instrument) {
  return floorLotToStep(lot, instrument);
}

export function snapLotUpToStep(lot, instrument) {
  return ceilLotToStep(lot, instrument);
}

export function calculatePriceDistance(entry, price) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(price)) {
    return 0;
  }

  return getPriceDistance(entry, price);
}

export function calculateStopDistance(entry, stop) {
  return getAbsolutePriceDistance(entry, stop);
}

export function calculateTakeProfitDistance(entry, takeProfit) {
  return getAbsolutePriceDistance(entry, takeProfit);
}

export function calculateStopPips(entry, stop, instrument) {
  return getAbsolutePipDistance(entry, stop, instrument);
}

export function calculateTakeProfitPips(entry, takeProfit, instrument) {
  return getAbsolutePipDistance(entry, takeProfit, instrument);
}

export function calculateStopTicks(entry, stop, instrument) {
  return Math.abs(getTickDistance(entry, stop, instrument));
}

export function calculateTakeProfitTicks(entry, takeProfit, instrument) {
  return Math.abs(getTickDistance(entry, takeProfit, instrument));
}

export function calculateRewardRiskRatio(entry, stop, takeProfit) {
  const risk = getAbsolutePriceDistance(entry, stop);
  const reward = getAbsolutePriceDistance(entry, takeProfit);

  if (!isFiniteNumber(risk) || risk === 0) {
    return 0;
  }

  return reward / risk;
}