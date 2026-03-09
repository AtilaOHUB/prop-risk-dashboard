import { getInstrumentDefinition } from "./instruments";

const FALLBACK_INSTRUMENT = {
  symbol: "UNKNOWN",
  pricePrecision: 2,
  valuePerPoint: 0,
};

export function getInstrument(symbol) {
  if (!symbol || typeof symbol !== "string") {
    return FALLBACK_INSTRUMENT;
  }

  return getInstrumentDefinition(symbol) ?? FALLBACK_INSTRUMENT;
}

export default getInstrument;