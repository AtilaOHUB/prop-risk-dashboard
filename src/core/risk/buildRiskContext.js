export function buildRiskContext({
  mode,
  preset,
  metrics,
  dailyLossValue,
  maxLossValue,
}) {
  return {
    mode,
    ruleType: preset.ruleType,
    riskAbs: metrics.riskAbs,
    dailyLossValue,
    maxLossValue,
  };
}

export default buildRiskContext;