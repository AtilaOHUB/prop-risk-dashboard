import { formatNumber } from "./formatNumber";

export function formatPrice(value, instrument) {
  const precision = instrument?.pricePrecision ?? 2;

  return formatNumber(value, {
    decimals: precision,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    useGrouping: false,
  });
}