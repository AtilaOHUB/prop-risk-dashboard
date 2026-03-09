export function formatNumber(value, options = {}) {
  const {
    decimals = 2,
    minimumFractionDigits = decimals,
    maximumFractionDigits = decimals,
    useGrouping = true,
  } = options;

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    useGrouping,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericValue);
}