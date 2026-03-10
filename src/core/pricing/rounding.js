const EPSILON = 1e-10;

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function normalizeStep(step) {
  if (!isFiniteNumber(step) || step <= 0) {
    return null;
  }

  return Math.abs(step);
}

function countStepDecimals(step) {
  const normalizedStep = normalizeStep(step);

  if (!normalizedStep) {
    return 0;
  }

  const stepString = normalizedStep.toString();

  if (stepString.includes("e-")) {
    const [, exponent] = stepString.split("e-");
    return Number(exponent) || 0;
  }

  const parts = stepString.split(".");
  return parts[1] ? parts[1].length : 0;
}

function toFixedByStep(value, step) {
  const decimals = countStepDecimals(step);
  return Number(value.toFixed(decimals));
}

export function roundToStep(value, step) {
  const normalizedStep = normalizeStep(step);

  if (!isFiniteNumber(value) || !normalizedStep) {
    return value;
  }

  const rounded = Math.round((value + EPSILON) / normalizedStep) * normalizedStep;
  return toFixedByStep(rounded, normalizedStep);
}

export function floorToStep(value, step) {
  const normalizedStep = normalizeStep(step);

  if (!isFiniteNumber(value) || !normalizedStep) {
    return value;
  }

  const floored = Math.floor((value + EPSILON) / normalizedStep) * normalizedStep;
  return toFixedByStep(floored, normalizedStep);
}

export function ceilToStep(value, step) {
  const normalizedStep = normalizeStep(step);

  if (!isFiniteNumber(value) || !normalizedStep) {
    return value;
  }

  const ceiled = Math.ceil((value - EPSILON) / normalizedStep) * normalizedStep;
  return toFixedByStep(ceiled, normalizedStep);
}

export function roundPriceToTick(price, instrument) {
  const tickSize = instrument?.tickSize;

  if (!isFiniteNumber(price) || !normalizeStep(tickSize)) {
    return price;
  }

  return roundToStep(price, tickSize);
}

export function floorPriceToTick(price, instrument) {
  const tickSize = instrument?.tickSize;

  if (!isFiniteNumber(price) || !normalizeStep(tickSize)) {
    return price;
  }

  return floorToStep(price, tickSize);
}

export function ceilPriceToTick(price, instrument) {
  const tickSize = instrument?.tickSize;

  if (!isFiniteNumber(price) || !normalizeStep(tickSize)) {
    return price;
  }

  return ceilToStep(price, tickSize);
}

export function roundLotToStep(lotSize, instrument) {
  const lotStep = instrument?.lotStep;

  if (!isFiniteNumber(lotSize) || !normalizeStep(lotStep)) {
    return lotSize;
  }

  return roundToStep(lotSize, lotStep);
}

export function floorLotToStep(lotSize, instrument) {
  const lotStep = instrument?.lotStep;

  if (!isFiniteNumber(lotSize) || !normalizeStep(lotStep)) {
    return lotSize;
  }

  return floorToStep(lotSize, lotStep);
}

export function ceilLotToStep(lotSize, instrument) {
  const lotStep = instrument?.lotStep;

  if (!isFiniteNumber(lotSize) || !normalizeStep(lotStep)) {
    return lotSize;
  }

  return ceilToStep(lotSize, lotStep);
}