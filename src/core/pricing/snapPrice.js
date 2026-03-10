import {
  snapPriceToTick,
  snapPriceUpToTick,
  snapPriceDownToTick,
} from "./priceMath";

import { normalizePrice } from "./normalizePrice";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

export function snapPriceForDragging(rawPrice, instrument) {
  if (!isFiniteNumber(rawPrice)) {
    return null;
  }

  const snapped = snapPriceToTick(rawPrice, instrument);
  return normalizePrice(snapped, instrument);
}

export function snapStopForLong(entry, rawStop, instrument) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(rawStop)) {
    return null;
  }

  if (rawStop >= entry) {
    return null;
  }

  const snapped = snapPriceDownToTick(rawStop, instrument);
  return normalizePrice(snapped, instrument);
}

export function snapStopForShort(entry, rawStop, instrument) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(rawStop)) {
    return null;
  }

  if (rawStop <= entry) {
    return null;
  }

  const snapped = snapPriceUpToTick(rawStop, instrument);
  return normalizePrice(snapped, instrument);
}

export function snapTPForLong(entry, rawTP, instrument) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(rawTP)) {
    return null;
  }

  if (rawTP <= entry) {
    return null;
  }

  const snapped = snapPriceUpToTick(rawTP, instrument);
  return normalizePrice(snapped, instrument);
}

export function snapTPForShort(entry, rawTP, instrument) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(rawTP)) {
    return null;
  }

  if (rawTP >= entry) {
    return null;
  }

  const snapped = snapPriceDownToTick(rawTP, instrument);
  return normalizePrice(snapped, instrument);
}