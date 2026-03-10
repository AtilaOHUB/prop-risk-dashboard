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

import { normalizePrice } from "./normalizePrice";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

export function snapPriceToTick(price, instrument) {
  const snapped = roundPriceToTick(price, instrument);
  return normalizePrice(snapped, instrument);
}

export function snapPriceDownToTick(price, instrument) {
  const snapped = floorPriceToTick(price, instrument);
  return normalizePrice(snapped, instrument);
}

export function snapPriceUpToTick(price, instrument) {
  const snapped = ceilPriceToTick(price, instrument);
  return normalizePrice(snapped, instrument);
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

export function calculatePriceDistance(entry, price, instrument) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(price)) {
    return 0;
  }

  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedPrice = normalizePrice(price, instrument);

  return getPriceDistance(normalizedEntry, normalizedPrice);
}

export function calculateStopDistance(entry, stop, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedStop = normalizePrice(stop, instrument);

  return getAbsolutePriceDistance(normalizedEntry, normalizedStop);
}

export function calculateTakeProfitDistance(entry, takeProfit, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedTP = normalizePrice(takeProfit, instrument);

  return getAbsolutePriceDistance(normalizedEntry, normalizedTP);
}

export function calculateStopPips(entry, stop, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedStop = normalizePrice(stop, instrument);

  return getAbsolutePipDistance(normalizedEntry, normalizedStop, instrument);
}

export function calculateTakeProfitPips(entry, takeProfit, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedTP = normalizePrice(takeProfit, instrument);

  return getAbsolutePipDistance(normalizedEntry, normalizedTP, instrument);
}

export function calculateStopTicks(entry, stop, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedStop = normalizePrice(stop, instrument);

  return Math.abs(getTickDistance(normalizedEntry, normalizedStop, instrument));
}

export function calculateTakeProfitTicks(entry, takeProfit, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedTP = normalizePrice(takeProfit, instrument);

  return Math.abs(getTickDistance(normalizedEntry, normalizedTP, instrument));
}

export function calculateRewardRiskRatio(entry, stop, takeProfit, instrument) {
  const normalizedEntry = normalizePrice(entry, instrument);
  const normalizedStop = normalizePrice(stop, instrument);
  const normalizedTP = normalizePrice(takeProfit, instrument);

  const risk = getAbsolutePriceDistance(normalizedEntry, normalizedStop);
  const reward = getAbsolutePriceDistance(normalizedEntry, normalizedTP);

  if (!isFiniteNumber(risk) || risk === 0) {
    return 0;
  }

  return reward / risk;
}