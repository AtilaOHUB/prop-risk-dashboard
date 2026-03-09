import { useMemo, useState } from "react";
import brandLogo from "./assets/capulet-edge-logo.png";
import { formatNumber } from "./core/formatting/formatNumber";
import { formatPrice } from "./core/formatting/formatPrice";
import { formatCurrency } from "./core/formatting/formatCurrency";

const COLORS = {
  bgTop: "#050505",
  bgBottom: "#121212",
  card: "rgba(24, 24, 24, 0.95)",
  panel: "#111111",
  panelSoft: "#0D0D0D",
  border: "#2A2A2A",
  borderGold: "rgba(245,158,11,0.22)",
  text: "#F8FAFC",
  textSoft: "#9CA3AF",
  textMuted: "#6B7280",
  gold: "#F59E0B",
  goldSoft: "#FBBF24",
  green: "#22C55E",
  red: "#EF4444",
  blue: "#38BDF8",
  purple: "#A78BFA",
};

const CFD_LIBRARY = {
  forex: {
    label: "Forex CFDs",
    items: {
      EURUSD: { label: "EURUSD", valuePerPoint: 100000, defaultPrice: 1.085 },
      GBPUSD: { label: "GBPUSD", valuePerPoint: 100000, defaultPrice: 1.285 },
      USDJPY: { label: "USDJPY", valuePerPoint: 1000, defaultPrice: 148.5 },
      AUDUSD: { label: "AUDUSD", valuePerPoint: 100000, defaultPrice: 0.655 },
      USDCAD: { label: "USDCAD", valuePerPoint: 100000, defaultPrice: 1.355 },
      USDCHF: { label: "USDCHF", valuePerPoint: 100000, defaultPrice: 0.885 },
      NZDUSD: { label: "NZDUSD", valuePerPoint: 100000, defaultPrice: 0.605 },
    },
  },
  indices: {
    label: "Index CFDs",
    items: {
      US30: { label: "US30", valuePerPoint: 1, defaultPrice: 39100 },
      US100: { label: "US100", valuePerPoint: 1, defaultPrice: 20850 },
      SPX500: { label: "SPX500", valuePerPoint: 1, defaultPrice: 5150 },
      GER40: { label: "GER40", valuePerPoint: 1, defaultPrice: 17750 },
      UK100: { label: "UK100", valuePerPoint: 1, defaultPrice: 7720 },
      JP225: { label: "JP225", valuePerPoint: 1, defaultPrice: 38800 },
    },
  },
  metals: {
    label: "Metal CFDs",
    items: {
      XAUUSD: { label: "Gold (XAUUSD)", valuePerPoint: 100, defaultPrice: 2950 },
      XAGUSD: { label: "Silver (XAGUSD)", valuePerPoint: 5000, defaultPrice: 32.5 },
    },
  },
  crypto: {
    label: "Crypto CFDs",
    items: {
      BTCUSD: { label: "BTCUSD", valuePerPoint: 1, defaultPrice: 92000 },
      ETHUSD: { label: "ETHUSD", valuePerPoint: 1, defaultPrice: 3400 },
      XRPUSD: { label: "XRPUSD", valuePerPoint: 10000, defaultPrice: 2.55 },
      SOLUSD: { label: "SOLUSD", valuePerPoint: 100, defaultPrice: 145 },
    },
  },
  energy: {
    label: "Energy CFDs",
    items: {
      USOIL: { label: "USOIL", valuePerPoint: 1000, defaultPrice: 77.5 },
      UKOIL: { label: "UKOIL", valuePerPoint: 1000, defaultPrice: 81.2 },
      NATGAS: { label: "NATGAS", valuePerPoint: 10000, defaultPrice: 1.95 },
    },
  },
};

const PROP_PRESETS = {
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

const groupedPresetKeys = {
  FTMO: Object.keys(PROP_PRESETS).filter((k) => k.startsWith("FTMO")),
  "Funding Pips": Object.keys(PROP_PRESETS).filter((k) => k.startsWith("FUNDINGPIPS")),
  FundedElite: Object.keys(PROP_PRESETS).filter((k) => k.startsWith("FUNDEDELITE")),
  TegasFX: Object.keys(PROP_PRESETS).filter((k) => k.startsWith("TEGASFX")),
  "Bitunix / Own Capital": Object.keys(PROP_PRESETS).filter((k) => k.startsWith("BITUNIX")),
  Custom: ["CUSTOM"],
};

const allCfdItems = Object.values(CFD_LIBRARY).flatMap((group) =>
  Object.entries(group.items).map(([key, value]) => ({
    key,
    ...value,
    group: group.label,
  }))
);

function getCfdByKey(key) {
  return allCfdItems.find((i) => i.key === key);
}

function getPricePrecisionForCfd(cfdKey) {
  const precisionMap = {
    EURUSD: 5,
    GBPUSD: 5,
    AUDUSD: 5,
    NZDUSD: 5,
    USDCAD: 5,
    USDCHF: 5,
    USDJPY: 3,
    XAUUSD: 2,
    XAGUSD: 3,
    BTCUSD: 2,
    ETHUSD: 2,
    XRPUSD: 4,
    SOLUSD: 2,
    USOIL: 2,
    UKOIL: 2,
    NATGAS: 3,
    US30: 1,
    US100: 1,
    SPX500: 1,
    GER40: 1,
    UK100: 1,
    JP225: 1,
    CUSTOM: 4,
  };

  return precisionMap[cfdKey] ?? 2;
}

function getPriceInstrument(cfdKey) {
  return { pricePrecision: getPricePrecisionForCfd(cfdKey) };
}

function fmtUsd(n) {
  return formatCurrency(n, {
    currencySymbol: "$",
    decimals: 2,
  });
}

function fmtNum(n, digits = 2) {
  return formatNumber(n, {
    decimals: digits,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: true,
  });
}

function fmtPrice(n, cfdKey) {
  return formatPrice(n, getPriceInstrument(cfdKey));
}

function fmtPct(n) {
  if (!Number.isFinite(Number(n))) return "-";
  return `${Number(n).toFixed(2)}%`;
}

function cardStyle(extra = {}) {
  return {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
    ...extra,
  };
}

function panelStyle(extra = {}) {
  return {
    background: COLORS.panel,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 14,
    ...extra,
  };
}

function labelStyle() {
  return {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.textSoft,
    marginBottom: 6,
    letterSpacing: 0.3,
  };
}

function inputStyle() {
  return {
    width: "100%",
    minHeight: 46,
    padding: "12px 14px",
    borderRadius: 14,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.panel,
    color: "#F5F5F5",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
  };
}

function buttonStyle(primary = true) {
  return primary
    ? {
        border: "none",
        borderRadius: 14,
        minHeight: 46,
        padding: "12px 16px",
        fontWeight: 800,
        cursor: "pointer",
        background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
        color: "#111111",
        boxShadow: "0 10px 24px rgba(245,158,11,0.22)",
      }
    : {
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        minHeight: 46,
        padding: "12px 16px",
        fontWeight: 700,
        cursor: "pointer",
        background: COLORS.panel,
        color: "#F5F5F5",
      };
}

function Stat({ title, value, subtitle, color }) {
  return (
    <div style={cardStyle({ padding: 16 })}>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10, fontWeight: 700 }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: color || COLORS.text,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 6 }}>{subtitle}</div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("prop");
  const [presetKey, setPresetKey] = useState("FUNDEDELITE_STANDARD_2STEP_100K");
  const [cfdKey, setCfdKey] = useState("XAUUSD");
  const [customCfdName, setCustomCfdName] = useState("Custom CFD");
  const [customValuePerPoint, setCustomValuePerPoint] = useState(100);
  const [direction, setDirection] = useState("Long");
  const [entry, setEntry] = useState(2950);
  const [tp, setTp] = useState(2970);
  const [sl, setSl] = useState(2940);
  const [lots, setLots] = useState(0.5);
  const [riskPercent, setRiskPercent] = useState(1);
  const [phase, setPhase] = useState("phase1");
  const [leverage, setLeverage] = useState(10);
  const [livePrice, setLivePrice] = useState("");
  const [useLiveAsEntry, setUseLiveAsEntry] = useState(false);

  const preset = PROP_PRESETS[presetKey];

  const selectedCfd =
    cfdKey === "CUSTOM"
      ? {
          key: "CUSTOM",
          label: customCfdName || "Custom CFD",
          valuePerPoint: Number(customValuePerPoint) || 0,
          defaultPrice: Number(entry) || 0,
          group: "Custom CFD",
        }
      : getCfdByKey(cfdKey);

  const effectiveEntry = useLiveAsEntry && livePrice !== "" ? Number(livePrice) : Number(entry);

  const accountSize = preset.accountSize;
  const dailyLossValue =
    preset.ruleType === "own_capital"
      ? accountSize
      : accountSize * (preset.dailyLossPct / 100);
  const maxLossValue =
    preset.ruleType === "own_capital"
      ? accountSize
      : accountSize * (preset.maxLossPct / 100);
  const targetPct =
    phase === "phase2" && preset.phase2TargetPct > 0
      ? preset.phase2TargetPct
      : preset.targetPct;
  const profitTargetValue = accountSize * (targetPct / 100);

  const metrics = useMemo(() => {
    const e = Number(effectiveEntry);
    const t = Number(tp);
    const s = Number(sl);
    const l = Number(lots);
    const valuePerPoint = Number(selectedCfd?.valuePerPoint || 0);
    const acc = Number(accountSize);
    const riskPct = Number(riskPercent);
    const lev = Number(leverage);

    const tpDistance = Math.abs(t - e);
    const slDistance = Math.abs(s - e);

    let profitTp = 0;
    let lossSl = 0;

    if (direction === "Long") {
      profitTp = (t - e) * valuePerPoint * l;
      lossSl = (s - e) * valuePerPoint * l;
    } else {
      profitTp = (e - t) * valuePerPoint * l;
      lossSl = (e - s) * valuePerPoint * l;
    }

    const riskAbs = Math.abs(lossSl);
    const rewardAbs = Math.abs(profitTp);
    const rr = riskAbs > 0 ? rewardAbs / riskAbs : 0;
    const riskAmountTarget = acc * (riskPct / 100);
    const suggestedLots =
      slDistance > 0 && valuePerPoint > 0
        ? riskAmountTarget / (slDistance * valuePerPoint)
        : 0;

    const notional = e * l * valuePerPoint;
    const marginRequired = lev > 0 ? notional / lev : 0;

    return {
      tpDistance,
      slDistance,
      profitTp,
      lossSl,
      riskAbs,
      rewardAbs,
      rr,
      riskAmountTarget,
      suggestedLots,
      notional,
      marginRequired,
      tpPct: acc > 0 ? (profitTp / acc) * 100 : 0,
      slPct: acc > 0 ? (riskAbs / acc) * 100 : 0,
      leftToDaily: Math.max(0, dailyLossValue - riskAbs),
      leftToMax: Math.max(0, maxLossValue - riskAbs),
      leftToTarget: Math.max(0, profitTargetValue - Math.max(0, profitTp)),
    };
  }, [
    effectiveEntry,
    tp,
    sl,
    lots,
    selectedCfd,
    direction,
    accountSize,
    riskPercent,
    leverage,
    dailyLossValue,
    maxLossValue,
    profitTargetValue,
  ]);

  const warnings = [];
  if (mode === "prop" && preset.ruleType !== "own_capital") {
    if (metrics.riskAbs > dailyLossValue) warnings.push("Trade would exceed the allowed daily loss.");
    if (metrics.riskAbs > maxLossValue) warnings.push("Trade would exceed the maximum account loss.");
    if (preset.ruleType === "eod_trailing") warnings.push("FTMO 1-Step uses end-of-day trailing logic. Do not treat it like a static drawdown model.");
    if (preset.ruleType === "trailing" || preset.ruleType === "trailing_live") warnings.push("This preset uses trailing drawdown logic. Static calculations can be misleading.");
    if (preset.ruleType === "equity_drawdown") warnings.push("TegasFX instant funding uses firm-specific equity drawdown logic. Confirm details before trading.");
  }
  if (mode === "own") {
    warnings.push("Own Capital Mode focuses on notional, leverage and margin. Prop-rule protection is disabled.");
  }

  const applySuggestedLots = () => {
    if (metrics.suggestedLots > 0) {
      setLots(Number(metrics.suggestedLots.toFixed(2)));
    }
  };

  const resetTrade = () => {
    const basePrice = selectedCfd?.defaultPrice || 0;
    setEntry(basePrice);
    setTp(basePrice);
    setSl(basePrice);
    setLots(0.5);
    setRiskPercent(1);
    setLivePrice("");
    setUseLiveAsEntry(false);
  };

  const layoutGrid = typeof window !== "undefined" && window.innerWidth < 980;
  const stickyMobile = typeof window !== "undefined" && window.innerWidth < 760;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(245,158,11,0.08), transparent 20%), linear-gradient(180deg, #050505 0%, #121212 100%)",
        color: COLORS.text,
        padding: stickyMobile ? "16px 16px 92px" : 20,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={cardStyle({
            padding: layoutGrid ? 18 : 22,
            marginBottom: 20,
            overflow: "hidden",
            background:
              "radial-gradient(circle at top right, rgba(245,158,11,0.14), transparent 30%), rgba(24,24,24,0.95)",
            border: `1px solid ${COLORS.borderGold}`,
          })}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: layoutGrid ? "1fr" : "170px 1fr",
              gap: 18,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: layoutGrid ? 130 : "100%",
                aspectRatio: "1 / 1",
                justifySelf: layoutGrid ? "center" : "stretch",
                borderRadius: 24,
                background: "#050505",
                border: "2px solid rgba(245,158,11,0.45)",
                boxShadow: "0 0 30px rgba(245,158,11,0.22)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={brandLogo}
                alt="Capulet Edge logo"
                style={{
                  width: "180%",
                  height: "180%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div style={{ textAlign: layoutGrid ? "center" : "left" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: layoutGrid ? "center" : "flex-start",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: layoutGrid ? 30 : 40,
                    fontWeight: 900,
                    letterSpacing: -1.2,
                    color: COLORS.text,
                  }}
                >
                  Capulet Edge
                </span>

                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: 999,
                    background: "rgba(245,158,11,0.10)",
                    color: COLORS.gold,
                    fontSize: 12,
                    fontWeight: 800,
                    border: "1px solid rgba(245,158,11,0.18)",
                  }}
                >
                  Premium Risk Engine
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  color: COLORS.textSoft,
                  fontSize: layoutGrid ? 14 : 15,
                  lineHeight: 1.6,
                  maxWidth: 760,
                  marginInline: layoutGrid ? "auto" : 0,
                }}
              >
                Precision-first CFD calculator for prop traders and own-capital traders.
                Built for disciplined risk control, target tracking, leverage awareness and
                rule protection across multiple funded programs.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 14,
                  justifyContent: layoutGrid ? "center" : "flex-start",
                }}
              >
                {["Prop Rules", "CFD Calculator", "Own Capital Mode", "Mobile Ready"].map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: COLORS.panelSoft,
                      border: `1px solid ${COLORS.border}`,
                      fontSize: 12,
                      color: COLORS.textSoft,
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: layoutGrid ? "1fr" : "1.8fr 1fr",
            gap: 18,
            marginBottom: 18,
          }}
        >
          <div style={cardStyle()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Trade Setup</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>
                  Select CFD, direction, entry, target and stop.
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => setMode("prop")}
                  style={{
                    ...buttonStyle(false),
                    background: mode === "prop" ? "#1A1A1A" : "#111111",
                    borderColor: mode === "prop" ? COLORS.gold : COLORS.border,
                    color: mode === "prop" ? COLORS.gold : "#F5F5F5",
                  }}
                >
                  Prop Mode
                </button>
                <button
                  onClick={() => setMode("own")}
                  style={{
                    ...buttonStyle(false),
                    background: mode === "own" ? "#1A1A1A" : "#111111",
                    borderColor: mode === "own" ? COLORS.gold : COLORS.border,
                    color: mode === "own" ? COLORS.gold : "#F5F5F5",
                  }}
                >
                  Own Capital Mode
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: layoutGrid ? "1fr" : "repeat(4, minmax(0,1fr))",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label style={labelStyle()}>CFD</label>
                <select
                  style={inputStyle()}
                  value={cfdKey}
                  onChange={(e) => {
                    const next = e.target.value;
                    setCfdKey(next);
                    const cfd = next === "CUSTOM" ? null : getCfdByKey(next);
                    if (cfd) setEntry(cfd.defaultPrice);
                  }}
                >
                  {Object.values(CFD_LIBRARY).map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {Object.entries(group.items).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <optgroup label="Custom CFD">
                    <option value="CUSTOM">Custom CFD</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label style={labelStyle()}>Direction</label>
                <select style={inputStyle()} value={direction} onChange={(e) => setDirection(e.target.value)}>
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </select>
              </div>

              <div>
                <label style={labelStyle()}>Lots</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.01"
                  value={lots}
                  onChange={(e) => setLots(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle()}>Risk %</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                />
              </div>
            </div>

            {cfdKey === "CUSTOM" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: layoutGrid ? "1fr" : "1.4fr 1fr",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div>
                  <label style={labelStyle()}>Custom CFD Name</label>
                  <input
                    style={inputStyle()}
                    value={customCfdName}
                    onChange={(e) => setCustomCfdName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle()}>Value per 1.0 move / 1 lot (USD)</label>
                  <input
                    style={inputStyle()}
                    type="number"
                    step="0.01"
                    value={customValuePerPoint}
                    onChange={(e) => setCustomValuePerPoint(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: layoutGrid ? "1fr" : "repeat(4, minmax(0,1fr))",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label style={labelStyle()}>Entry</label>
                <input style={inputStyle()} type="number" step="0.0001" value={entry} onChange={(e) => setEntry(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle()}>Live Price</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.0001"
                  value={livePrice}
                  onChange={(e) => setLivePrice(e.target.value)}
                  placeholder="API-ready field"
                />
              </div>
              <div>
                <label style={labelStyle()}>Take Profit</label>
                <input style={inputStyle()} type="number" step="0.0001" value={tp} onChange={(e) => setTp(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle()}>Stop Loss</label>
                <input style={inputStyle()} type="number" step="0.0001" value={sl} onChange={(e) => setSl(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: COLORS.textSoft }}>
                <input
                  type="checkbox"
                  checked={useLiveAsEntry}
                  onChange={(e) => setUseLiveAsEntry(e.target.checked)}
                />
                Use live price as effective entry
              </label>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={buttonStyle(true)} onClick={applySuggestedLots}>
                Apply suggested lots
              </button>
              <button style={buttonStyle(false)} onClick={resetTrade}>
                Reset trade
              </button>
            </div>
          </div>

          <div style={cardStyle()}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Account Rules</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>
                Choose preset, rule type and account logic.
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <label style={labelStyle()}>Preset</label>
                <select style={inputStyle()} value={presetKey} onChange={(e) => setPresetKey(e.target.value)}>
                  {Object.entries(groupedPresetKeys).map(([group, keys]) => (
                    <optgroup key={group} label={group}>
                      {keys.map((key) => (
                        <option key={key} value={key}>
                          {`${PROP_PRESETS[key].company} · ${PROP_PRESETS[key].program} · ${fmtUsd(
                            PROP_PRESETS[key].accountSize
                          )}`}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {preset.phase2TargetPct > 0 && (
                <div>
                  <label style={labelStyle()}>Phase</label>
                  <select style={inputStyle()} value={phase} onChange={(e) => setPhase(e.target.value)}>
                    <option value="phase1">Phase 1</option>
                    <option value="phase2">Phase 2</option>
                  </select>
                </div>
              )}

              <div style={panelStyle()}>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>Company / Program</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{preset.company}</div>
                <div style={{ fontSize: 14, color: COLORS.textSoft, marginTop: 4 }}>{preset.program}</div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: layoutGrid ? "1fr" : "1fr 1fr",
                  gap: 12,
                }}
              >
                <div style={panelStyle()}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>Account Size</div>
                  <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{fmtUsd(accountSize)}</div>
                </div>
                <div style={panelStyle()}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>Rule Type</div>
                  <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6 }}>{preset.ruleType}</div>
                </div>
              </div>

              {mode === "own" && (
                <div>
                  <label style={labelStyle()}>Leverage</label>
                  <input
                    style={inputStyle()}
                    type="number"
                    step="1"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {warnings.length > 0 && (
          <div
            style={cardStyle({
              marginBottom: 20,
              border: "1px solid rgba(245,158,11,0.25)",
              background: "linear-gradient(180deg, rgba(60,40,0,0.18) 0%, rgba(24,24,24,0.95) 100%)",
            })}
          >
            <div style={{ fontWeight: 900, marginBottom: 10, color: COLORS.gold, fontSize: 16 }}>
              Protection Warnings
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {warnings.map((w, i) => (
                <div key={i} style={{ color: "#FCD34D", fontSize: 14 }}>
                  • {w}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: layoutGrid ? "1fr" : "repeat(4, minmax(0,1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Stat title="Profit at TP" value={fmtUsd(metrics.profitTp)} subtitle={`TP distance ${fmtPrice(metrics.tpDistance, cfdKey)}`} color={COLORS.green} />
          <Stat title="Loss at SL" value={fmtUsd(metrics.lossSl)} subtitle={`SL distance ${fmtPrice(metrics.slDistance, cfdKey)}`} color={COLORS.red} />
          <Stat title="Reward / Risk" value={`${fmtNum(metrics.rr, 2)}x`} subtitle={`Risk ${fmtPct(metrics.slPct)} of account`} color={COLORS.text} />
          <Stat title="Suggested Lots" value={fmtNum(metrics.suggestedLots, 2)} subtitle={`Target risk ${fmtUsd(metrics.riskAmountTarget)}`} color={COLORS.gold} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: layoutGrid
              ? "1fr"
              : mode === "own"
              ? "repeat(4, minmax(0,1fr))"
              : "repeat(3, minmax(0,1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Stat
            title="Left to Daily Limit"
            value={mode === "own" ? "—" : fmtUsd(metrics.leftToDaily)}
            subtitle={mode === "own" ? "Not applicable in own capital mode" : `Daily cap ${fmtUsd(dailyLossValue)}`}
            color={COLORS.blue}
          />
          <Stat
            title="Left to Max Loss"
            value={mode === "own" ? "—" : fmtUsd(metrics.leftToMax)}
            subtitle={mode === "own" ? "Not applicable in own capital mode" : `Max cap ${fmtUsd(maxLossValue)}`}
            color={COLORS.purple}
          />
          <Stat
            title="Left to Target"
            value={profitTargetValue > 0 ? fmtUsd(metrics.leftToTarget) : "—"}
            subtitle={profitTargetValue > 0 ? `Target ${fmtUsd(profitTargetValue)}` : "No target in this mode"}
            color={COLORS.gold}
          />
          {mode === "own" && (
            <Stat
              title="Margin Required"
              value={fmtUsd(metrics.marginRequired)}
              subtitle={`Notional ${fmtUsd(metrics.notional)}`}
              color={COLORS.goldSoft}
            />
          )}
        </div>

        <div style={cardStyle({ padding: 16, marginBottom: stickyMobile ? 12 : 0 })}>
          <div style={{ fontWeight: 900, marginBottom: 12, fontSize: 18 }}>Current CFD & Rules Summary</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: layoutGrid ? "1fr" : "repeat(2, minmax(0,1fr))",
              gap: 12,
            }}
          >
            <div style={panelStyle()}>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Selected CFD</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 6 }}>{selectedCfd?.label}</div>
              <div style={{ fontSize: 13, color: COLORS.textSoft, marginTop: 6 }}>
                {selectedCfd?.group} · {fmtNum(selectedCfd?.valuePerPoint || 0, 2)} USD per 1.0 move / 1 lot
              </div>
            </div>

            <div style={panelStyle()}>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Preset logic</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 6 }}>
                {preset.company} · {preset.program}
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSoft, marginTop: 6 }}>
                Daily {preset.dailyLossPct}% · Max {preset.maxLossPct}% · Target {targetPct}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {stickyMobile && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            padding: 12,
            background: "rgba(5,5,5,0.96)",
            borderTop: `1px solid ${COLORS.border}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button style={buttonStyle(true)} onClick={applySuggestedLots}>
              Apply Lots
            </button>
            <button style={buttonStyle(false)} onClick={resetTrade}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}