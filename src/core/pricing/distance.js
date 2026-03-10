function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function normalizeNumber(value) {
  if (!isFiniteNumber(value)) {
    return null;
  }

  return Number(value);
}

export function getPriceDistance(priceA, priceB) {
  const a = normalizeNumber(priceA);
  const b = normalizeNumber(priceB);

  if (a === null || b === null) {
    return 0;
  }

  return b - a;
}

export function getAbsolutePriceDistance(priceA, priceB) {
  const distance = getPriceDistance(priceA, priceB);
  return Math.abs(distance);
}

export function getPipDistance(priceA, priceB, instrument) {
  const pipSize = instrument?.pipSize;

  if (!isFiniteNumber(pipSize) || pipSize <= 0) {
    return 0;
  }

  const distance = getPriceDistance(priceA, priceB);

  return distance / pipSize;
}

export function getAbsolutePipDistance(priceA, priceB, instrument) {
  const pipDistance = getPipDistance(priceA, priceB, instrument);
  return Math.abs(pipDistance);
}

export function getTickDistance(priceA, priceB, instrument) {
  const tickSize = instrument?.tickSize;

  if (!isFiniteNumber(tickSize) || tickSize <= 0) {
    return 0;
  }

  const distance = getPriceDistance(priceA, priceB);

  return distance / tickSize;
}

export function getAbsoluteTickDistance(priceA, priceB, instrument) {
  const tickDistance = getTickDistance(priceA, priceB, instrument);
  return Math.abs(tickDistance);
}

export function isPriceAbove(priceA, priceB) {
  const a = normalizeNumber(priceA);
  const b = normalizeNumber(priceB);

  if (a === null || b === null) {
    return false;
  }

  return a > b;
}

export function isPriceBelow(priceA, priceB) {
  const a = normalizeNumber(priceA);
  const b = normalizeNumber(priceB);

  if (a === null || b === null) {
    return false;
  }

  return a < b;
}