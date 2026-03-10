export const PROP_PRESETS = {
  FTMO_2STEP_10K: { company: "FTMO", program: "2-Step", accountSize: 10000, dailyLossPct: 5, maxLossPct: 10, targetPct: 10, phase2TargetPct: 5, ruleType: "static" },
  FTMO_2STEP_25K: { company: "FTMO", program: "2-Step", accountSize: 25000, dailyLossPct: 5, maxLossPct: 10, targetPct: 10, phase2TargetPct: 5, ruleType: "static" },
  FTMO_2STEP_50K: { company: "FTMO", program: "2-Step", accountSize: 50000, dailyLossPct: 5, maxLossPct: 10, targetPct: 10, phase2TargetPct: 5, ruleType: "static" },
  FTMO_2STEP_100K: { company: "FTMO", program: "2-Step", accountSize: 100000, dailyLossPct: 5, maxLossPct: 10, targetPct: 10, phase2TargetPct: 5, ruleType: "static" },
  FTMO_2STEP_200K: { company: "FTMO", program: "2-Step", accountSize: 200000, dailyLossPct: 5, maxLossPct: 10, targetPct: 10, phase2TargetPct: 5, ruleType: "static" },

  FTMO_1STEP_25K: { company: "FTMO", program: "1-Step", accountSize: 25000, dailyLossPct: 3, maxLossPct: 10, targetPct: 10, phase2TargetPct: 0, ruleType: "eod_trailing" },
  FTMO_1STEP_50K: { company: "FTMO", program: "1-Step", accountSize: 50000, dailyLossPct: 3, maxLossPct: 10, targetPct: 10, phase2TargetPct: 0, ruleType: "eod_trailing" },
  FTMO_1STEP_100K: { company: "FTMO", program: "1-Step", accountSize: 100000, dailyLossPct: 3, maxLossPct: 10, targetPct: 10, phase2TargetPct: 0, ruleType: "eod_trailing" },

  FUNDINGPIPS_1STEP_10K: { company: "Funding Pips", program: "1-Step", accountSize: 10000, dailyLossPct: 3, maxLossPct: 6, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },
  FUNDINGPIPS_1STEP_25K: { company: "Funding Pips", program: "1-Step", accountSize: 25000, dailyLossPct: 3, maxLossPct: 6, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },
  FUNDINGPIPS_1STEP_50K: { company: "Funding Pips", program: "1-Step", accountSize: 50000, dailyLossPct: 3, maxLossPct: 6, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },
  FUNDINGPIPS_1STEP_100K: { company: "Funding Pips", program: "1-Step", accountSize: 100000, dailyLossPct: 3, maxLossPct: 6, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },

  FUNDINGPIPS_2STEP_10K: { company: "Funding Pips", program: "2-Step", accountSize: 10000, dailyLossPct: 5, maxLossPct: 10, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },
  FUNDINGPIPS_2STEP_25K: { company: "Funding Pips", program: "2-Step", accountSize: 25000, dailyLossPct: 5, maxLossPct: 10, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },
  FUNDINGPIPS_2STEP_50K: { company: "Funding Pips", program: "2-Step", accountSize: 50000, dailyLossPct: 5, maxLossPct: 10, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },
  FUNDINGPIPS_2STEP_100K: { company: "Funding Pips", program: "2-Step", accountSize: 100000, dailyLossPct: 5, maxLossPct: 10, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },

  FUNDINGPIPS_ZERO_10K: { company: "Funding Pips", program: "Zero", accountSize: 10000, dailyLossPct: 3, maxLossPct: 5, targetPct: 0, phase2TargetPct: 0, ruleType: "static" },
  FUNDINGPIPS_ZERO_25K: { company: "Funding Pips", program: "Zero", accountSize: 25000, dailyLossPct: 3, maxLossPct: 5, targetPct: 0, phase2TargetPct: 0, ruleType: "static" },
  FUNDINGPIPS_ZERO_50K: { company: "Funding Pips", program: "Zero", accountSize: 50000, dailyLossPct: 3, maxLossPct: 5, targetPct: 0, phase2TargetPct: 0, ruleType: "static" },
  FUNDINGPIPS_ZERO_100K: { company: "Funding Pips", program: "Zero", accountSize: 100000, dailyLossPct: 3, maxLossPct: 5, targetPct: 0, phase2TargetPct: 0, ruleType: "static" },

  FUNDEDELITE_STANDARD_1STEP_25K: { company: "FundedElite", program: "Standard 1-Step", accountSize: 25000, dailyLossPct: 3, maxLossPct: 8, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },
  FUNDEDELITE_STANDARD_1STEP_50K: { company: "FundedElite", program: "Standard 1-Step", accountSize: 50000, dailyLossPct: 3, maxLossPct: 8, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },
  FUNDEDELITE_STANDARD_1STEP_100K: { company: "FundedElite", program: "Standard 1-Step", accountSize: 100000, dailyLossPct: 3, maxLossPct: 8, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },

  FUNDEDELITE_STANDARD_2STEP_25K: { company: "FundedElite", program: "Standard 2-Step", accountSize: 25000, dailyLossPct: 5, maxLossPct: 8, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },
  FUNDEDELITE_STANDARD_2STEP_50K: { company: "FundedElite", program: "Standard 2-Step", accountSize: 50000, dailyLossPct: 5, maxLossPct: 8, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },
  FUNDEDELITE_STANDARD_2STEP_100K: { company: "FundedElite", program: "Standard 2-Step", accountSize: 100000, dailyLossPct: 5, maxLossPct: 8, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },

  FUNDEDELITE_LITE_1STEP_25K: { company: "FundedElite", program: "Lite 1-Step", accountSize: 25000, dailyLossPct: 3, maxLossPct: 8, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },
  FUNDEDELITE_LITE_1STEP_50K: { company: "FundedElite", program: "Lite 1-Step", accountSize: 50000, dailyLossPct: 3, maxLossPct: 8, targetPct: 10, phase2TargetPct: 0, ruleType: "static" },

  FUNDEDELITE_LITE_2STEP_25K: { company: "FundedElite", program: "Lite 2-Step", accountSize: 25000, dailyLossPct: 4, maxLossPct: 8, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },
  FUNDEDELITE_LITE_2STEP_50K: { company: "FundedElite", program: "Lite 2-Step", accountSize: 50000, dailyLossPct: 4, maxLossPct: 8, targetPct: 8, phase2TargetPct: 5, ruleType: "static" },

  FUNDEDELITE_INSTANT_10K: { company: "FundedElite", program: "Instant", accountSize: 10000, dailyLossPct: 3, maxLossPct: 6, targetPct: 0, phase2TargetPct: 0, ruleType: "trailing" },
  FUNDEDELITE_INSTANT_25K: { company: "FundedElite", program: "Instant", accountSize: 25000, dailyLossPct: 3, maxLossPct: 6, targetPct: 0, phase2TargetPct: 0, ruleType: "trailing" },
  FUNDEDELITE_INSTANT_50K: { company: "FundedElite", program: "Instant", accountSize: 50000, dailyLossPct: 3, maxLossPct: 6, targetPct: 0, phase2TargetPct: 0, ruleType: "trailing" },

  FUNDEDELITE_FLASH_10K: { company: "FundedElite", program: "Flash Activation", accountSize: 10000, dailyLossPct: 3, maxLossPct: 6, targetPct: 6, phase2TargetPct: 0, ruleType: "trailing_live" },
  FUNDEDELITE_FLASH_25K: { company: "FundedElite", program: "Flash Activation", accountSize: 25000, dailyLossPct: 3, maxLossPct: 6, targetPct: 6, phase2TargetPct: 0, ruleType: "trailing_live" },
  FUNDEDELITE_FLASH_50K: { company: "FundedElite", program: "Flash Activation", accountSize: 50000, dailyLossPct: 3, maxLossPct: 6, targetPct: 6, phase2TargetPct: 0, ruleType: "trailing_live" },

  TEGASFX_INSTANT_5K: { company: "TegasFX", program: "Instant Funding", accountSize: 5000, dailyLossPct: 5, maxLossPct: 10, targetPct: 0, phase2TargetPct: 0, ruleType: "equity_drawdown" },
  TEGASFX_INSTANT_10K: { company: "TegasFX", program: "Instant Funding", accountSize: 10000, dailyLossPct: 5, maxLossPct: 10, targetPct: 0, phase2TargetPct: 0, ruleType: "equity_drawdown" },
  TEGASFX_INSTANT_25K: { company: "TegasFX", program: "Instant Funding", accountSize: 25000, dailyLossPct: 5, maxLossPct: 10, targetPct: 0, phase2TargetPct: 0, ruleType: "equity_drawdown" },
  TEGASFX_INSTANT_50K: { company: "TegasFX", program: "Instant Funding", accountSize: 50000, dailyLossPct: 5, maxLossPct: 10, targetPct: 0, phase2TargetPct: 0, ruleType: "equity_drawdown" },

  BITUNIX_OWN_5K: { company: "Bitunix / Own Capital", program: "Exchange Mode", accountSize: 5000, dailyLossPct: 100, maxLossPct: 100, targetPct: 0, phase2TargetPct: 0, ruleType: "own_capital" },
  BITUNIX_OWN_10K: { company: "Bitunix / Own Capital", program: "Exchange Mode", accountSize: 10000, dailyLossPct: 100, maxLossPct: 100, targetPct: 0, phase2TargetPct: 0, ruleType: "own_capital" },
  BITUNIX_OWN_25K: { company: "Bitunix / Own Capital", program: "Exchange Mode", accountSize: 25000, dailyLossPct: 100, maxLossPct: 100, targetPct: 0, phase2TargetPct: 0, ruleType: "own_capital" },

  CUSTOM: { company: "Custom", program: "Custom", accountSize: 100000, dailyLossPct: 5, maxLossPct: 10, targetPct: 5, phase2TargetPct: 0, ruleType: "custom" },
};

export const groupedPresetKeys = {
  FTMO: Object.keys(PROP_PRESETS).filter((k) => k.startsWith("FTMO")),
  "Funding Pips": Object.keys(PROP_PRESETS).filter((k) => k.startsWith("FUNDINGPIPS")),
  FundedElite: Object.keys(PROP_PRESETS).filter((k) => k.startsWith("FUNDEDELITE")),
  TegasFX: Object.keys(PROP_PRESETS).filter((k) => k.startsWith("TEGASFX")),
  "Bitunix / Own Capital": Object.keys(PROP_PRESETS).filter((k) => k.startsWith("BITUNIX")),
  Custom: ["CUSTOM"],
};