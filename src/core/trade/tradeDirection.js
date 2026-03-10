function isFiniteNumber(value) {
  return Number.isFinite(value);
}

export const TRADE_DIRECTION = {
  LONG: "LONG",
  SHORT: "SHORT",
  INVALID: "INVALID",
};

export function resolveTradeDirection(entry, stop) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(stop)) {
    return TRADE_DIRECTION.INVALID;
  }

  if (stop < entry) {
    return TRADE_DIRECTION.LONG;
  }

  if (stop > entry) {
    return TRADE_DIRECTION.SHORT;
  }

  return TRADE_DIRECTION.INVALID;
}

export function isLongTrade(entry, stop) {
  return resolveTradeDirection(entry, stop) === TRADE_DIRECTION.LONG;
}

export function isShortTrade(entry, stop) {
  return resolveTradeDirection(entry, stop) === TRADE_DIRECTION.SHORT;
}

export function isValidTrade(entry, stop, takeProfit) {
  if (!isFiniteNumber(entry) || !isFiniteNumber(stop) || !isFiniteNumber(takeProfit)) {
    return false;
  }

  const direction = resolveTradeDirection(entry, stop);

  if (direction === TRADE_DIRECTION.LONG) {
    return takeProfit > entry;
  }

  if (direction === TRADE_DIRECTION.SHORT) {
    return takeProfit < entry;
  }

  return false;
}