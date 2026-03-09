import { formatNumber } from "./formatNumber";

export function formatCurrency(value, options = {}) {
  const {
    currencySymbol = "$",
    decimals = 2,
  } = options;

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return `${currencySymbol}0.00`;
  }

  const sign = numericValue < 0 ? "-" : "";
  const absoluteValue = Math.abs(numericValue);

  return `${sign}${currencySymbol}${formatNumber(absoluteValue, {
    decimals,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  })}`;
}