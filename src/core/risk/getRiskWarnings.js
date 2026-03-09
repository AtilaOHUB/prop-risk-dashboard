export function getRiskWarnings({
  mode,
  ruleType,
  riskAbs,
  dailyLossValue,
  maxLossValue,
}) {
  const warnings = [];

  if (mode === "prop" && ruleType !== "own_capital") {
    if (riskAbs > dailyLossValue) {
      warnings.push("Trade would exceed the allowed daily loss.");
    }

    if (riskAbs > maxLossValue) {
      warnings.push("Trade would exceed the maximum account loss.");
    }

    if (ruleType === "eod_trailing") {
      warnings.push(
        "FTMO 1-Step uses end-of-day trailing logic. Do not treat it like a static drawdown model."
      );
    }

    if (ruleType === "trailing" || ruleType === "trailing_live") {
      warnings.push(
        "This preset uses trailing drawdown logic. Static calculations can be misleading."
      );
    }

    if (ruleType === "equity_drawdown") {
      warnings.push(
        "TegasFX instant funding uses firm-specific equity drawdown logic. Confirm details before trading."
      );
    }
  }

  if (mode === "own") {
    warnings.push(
      "Own Capital Mode focuses on notional, leverage and margin. Prop-rule protection is disabled."
    );
  }

  return warnings;
}