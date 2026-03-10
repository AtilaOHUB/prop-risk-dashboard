import resolveTradeInstrument from "../instruments/resolveTradeInstrument";

export function buildTradeContext({
  cfdKey,
  selectedCfd,
  customValuePerPoint,
  entry,
  livePrice,
  useLiveAsEntry,
  tp,
  sl,
  lots,
  direction,
  accountSize,
  riskPercent,
  leverage,
  dailyLossValue,
  maxLossValue,
  profitTargetValue,
}) {
  const tradeInstrument = resolveTradeInstrument({
    cfdKey,
    selectedCfd,
    customValuePerPoint,
  });

  const effectiveEntry =
    useLiveAsEntry && livePrice !== ""
      ? Number(livePrice)
      : Number(entry);

  return {
    effectiveEntry,
    tp,
    sl,
    lots,
    direction,
    valuePerPoint: tradeInstrument.valuePerPoint,
    accountSize,
    riskPercent,
    leverage,
    dailyLossValue,
    maxLossValue,
    profitTargetValue,
  };
}

export default buildTradeContext;