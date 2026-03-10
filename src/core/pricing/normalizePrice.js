function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function getSafePrecision(instrument) {
  const precision = instrument?.pricePrecision;

  if (!Number.isInteger(precision) || precision < 0) {
    return 0;
  }

  return precision;
}

export function normalizePrice(price, instrument) {
  if (!isFiniteNumber(price)) {
    return price;
  }

  const precision = getSafePrecision(instrument);
  return Number(price.toFixed(precision));
}

export function normalizeOptionalPrice(price, instrument) {
  if (price === null || price === undefined || price === "") {
    return null;
  }

  if (!isFiniteNumber(price)) {
    return null;
  }

  return normalizePrice(price, instrument);
}

export function formatNormalizedPriceString(price, instrument) {
  if (!isFiniteNumber(price)) {
    return "";
  }

  const precision = getSafePrecision(instrument);
  return normalizePrice(price, instrument).toFixed(precision);
}

export function arePricesEqual(priceA, priceB, instrument) {
  if (!isFiniteNumber(priceA) || !isFiniteNumber(priceB)) {
    return false;
  }

  return normalizePrice(priceA, instrument) === normalizePrice(priceB, instrument);
}