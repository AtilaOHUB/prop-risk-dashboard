import { getInstrument } from "./getInstrument";

export function resolveTradeInstrument({
  cfdKey,
  selectedCfd,
  customValuePerPoint,
}) {
  if (cfdKey === "CUSTOM") {
    return {
      symbol: "CUSTOM",
      pricePrecision: 4,
      valuePerPoint: Number(customValuePerPoint) || 0,
    };
  }

  const instrument = getInstrument(cfdKey);

  return {
    symbol: instrument.symbol,
    pricePrecision: instrument.pricePrecision,
    valuePerPoint:
      instrument.valuePerPoint ??
      selectedCfd?.valuePerPoint ??
      0,
  };
}

export default resolveTradeInstrument;