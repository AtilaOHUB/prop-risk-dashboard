export const RULE_TYPES = {
  static: {
    key: "static",
    label: "Static Drawdown",
    shortLabel: "Static",
    description: "Fixed daily and overall loss limits based on initial account size.",
  },
  trailing: {
    key: "trailing",
    label: "Trailing Drawdown",
    shortLabel: "Trailing",
    description: "Loss threshold trails account growth until the defined stop condition.",
  },
  trailing_live: {
    key: "trailing_live",
    label: "Live Trailing Drawdown",
    shortLabel: "Trailing Live",
    description: "Drawdown threshold adjusts live with equity movement.",
  },
  eod_trailing: {
    key: "eod_trailing",
    label: "End-of-Day Trailing Drawdown",
    shortLabel: "EOD Trailing",
    description: "Trailing logic updates based on end-of-day balance/equity rules.",
  },
  equity_drawdown: {
    key: "equity_drawdown",
    label: "Equity Drawdown",
    shortLabel: "Equity DD",
    description: "Loss limits are evaluated directly against live equity.",
  },
  own_capital: {
    key: "own_capital",
    label: "Own Capital",
    shortLabel: "Own Capital",
    description: "No prop-style loss cap. Margin and position exposure are primary constraints.",
  },
  custom: {
    key: "custom",
    label: "Custom Rules",
    shortLabel: "Custom",
    description: "User-defined account logic and limits.",
  },
};

export function getRuleType(ruleTypeKey) {
  if (!ruleTypeKey || typeof ruleTypeKey !== "string") {
    return RULE_TYPES.custom;
  }

  return RULE_TYPES[ruleTypeKey] ?? RULE_TYPES.custom;
}

export default RULE_TYPES;