import { useMemo, useState } from "react";

const INSTRUMENTS = {
  XAUUSD: { label: "Gold (XAUUSD)", contractValue: 100, defaultPrice: 2950 },
  XAGUSD: { label: "Silver (XAGUSD)", contractValue: 5000, defaultPrice: 32.5 },
  GBPUSD: { label: "GBPUSD", contractValue: 100000, defaultPrice: 1.2850 },
  US100: { label: "US100", contractValue: 1, defaultPrice: 20850 },
  BTCUSD: { label: "BTCUSD", contractValue: 1, defaultPrice: 92000 },
  XRPUSD: { label: "XRPUSD", contractValue: 10000, defaultPrice: 2.55 },
};

const PROP_PROFILES = {
  CUSTOM: {
    label: "Custom",
    accountSize: 100000,
    dailyLoss: 5000,
    maxLoss: 10000,
    profitTarget: 5000,
  },
  FUNDEDELITE_100K: {
    label: "FundedElite 100k",
    accountSize: 100000,
    dailyLoss: 5000,
    maxLoss: 10000,
    profitTarget: 5000,
  },
  FTMO_100K: {
    label: "FTMO 100k",
    accountSize: 100000,
    dailyLoss: 5000,
    maxLoss: 10000,
    profitTarget: 10000,
  },
  FIVEERS_100K: {
    label: "The5ers 100k",
    accountSize: 100000,
    dailyLoss: 5000,
    maxLoss: 10000,
    profitTarget: 8000,
  },
};

function fmtUsd(value) {
  if (!isFinite(Number(value))) return "-";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value));
}

function fmtNum(value, digits = 2) {
  if (!isFinite(Number(value))) return "-";
  return Number(value).toLocaleString("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function fmtPct(value) {
  if (!isFinite(Number(value))) return "-";
  return `${Number(value).toFixed(2)}%`;
}

function cardStyle(extra = {}) {
  return {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    ...extra,
  };
}

function labelStyle() {
  return {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: "#334155",
  };
}

function inputStyle() {
  return {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    boxSizing: "border-box",
  };
}

function statBox(title, value, subtitle, valueColor = "#0f172a") {
  return (
    <div style={cardStyle()}>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: valueColor }}>{value}</div>
      <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{subtitle}</div>
    </div>
  );
}

export default function App() {
  const [instrument, setInstrument] = useState("XAUUSD");
  const [profile, setProfile] = useState("FUNDEDELITE_100K");
  const [direction, setDirection] = useState("Long");
  const [entry, setEntry] = useState(INSTRUMENTS.XAUUSD.defaultPrice);
  const [tp, setTp] = useState(2970);
  const [sl, setSl] = useState(2940);
  const [lots, setLots] = useState(0.5);
  const [riskPercent, setRiskPercent] = useState(1);

  const [accountSize, setAccountSize] = useState(
    PROP_PROFILES.FUNDEDELITE_100K.accountSize
  );
  const [dailyLossLimit, setDailyLossLimit] = useState(
    PROP_PROFILES.FUNDEDELITE_100K.dailyLoss
  );
  const [maxLossLimit, setMaxLossLimit] = useState(
    PROP_PROFILES.FUNDEDELITE_100K.maxLoss
  );
  const [profitTarget, setProfitTarget] = useState(
    PROP_PROFILES.FUNDEDELITE_100K.profitTarget
  );

  const contractValue = INSTRUMENTS[instrument].contractValue;

  const metrics = useMemo(() => {
    const e = Number(entry);
    const t = Number(tp);
    const s = Number(sl);
    const l = Number(lots);
    const account = Number(accountSize);
    const daily = Number(dailyLossLimit);
    const max = Number(maxLossLimit);
    const target = Number(profitTarget);
    const riskPct = Number(riskPercent);

    const tpDistance = Math.abs(t - e);
    const slDistance = Math.abs(s - e);

    let profitTp = 0;
    let lossSl = 0;

    if (direction === "Long") {
      profitTp = (t - e) * contractValue * l;
      lossSl = (s - e) * contractValue * l;
    } else {
      profitTp = (e - t) * contractValue * l;
      lossSl = (e - s) * contractValue * l;
    }

    const riskAbs = Math.abs(lossSl);
    const rewardAbs = Math.abs(profitTp);
    const rr = riskAbs > 0 ? rewardAbs / riskAbs : 0;
    const riskAmountTarget = account * (riskPct / 100);
    const suggestedLots =
      slDistance > 0 && contractValue > 0
        ? riskAmountTarget / (slDistance * contractValue)
        : 0;

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
      tpPct: account > 0 ? (profitTp / account) * 100 : 0,
      slPct: account > 0 ? (riskAbs / account) * 100 : 0,
      leftToDaily: Math.max(0, daily - riskAbs),
      leftToMax: Math.max(0, max - riskAbs),
      leftToTarget: Math.max(0, target - Math.max(0, profitTp)),
    };
  }, [
    instrument,
    direction,
    entry,
    tp,
    sl,
    lots,
    accountSize,
    dailyLossLimit,
    maxLossLimit,
    profitTarget,
    riskPercent,
    contractValue,
  ]);

  const applyProfile = (value) => {
    setProfile(value);
    const p = PROP_PROFILES[value];
    setAccountSize(p.accountSize);
    setDailyLossLimit(p.dailyLoss);
    setMaxLossLimit(p.maxLoss);
    setProfitTarget(p.profitTarget);
  };

  const applySuggestedLots = () => {
    if (metrics.suggestedLots > 0) {
      setLots(Number(metrics.suggestedLots.toFixed(2)));
    }
  };

  const riskWarning =
    metrics.slPct > 1
      ? "Dieses Setup riskiert mehr als 1% des Kontos."
      : metrics.leftToDaily <= 0
      ? "Dieses Setup wäre nahe oder über dem Daily-Loss-Limit."
      : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: 24,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 34 }}>Prop Risk Dashboard v2</h1>
          <p style={{ color: "#475569", marginTop: 8 }}>
            P&amp;L, Risiko, Prop-Profile und Lot-Size-Rechner in einer Oberfläche.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <div style={cardStyle()}>
            <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>
              Trade-Rechner
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label style={labelStyle()}>Instrument</label>
                <select
                  style={inputStyle()}
                  value={instrument}
                  onChange={(e) => {
                    const next = e.target.value;
                    setInstrument(next);
                    setEntry(INSTRUMENTS[next].defaultPrice);
                  }}
                >
                  {Object.entries(INSTRUMENTS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle()}>Prop-Profil</label>
                <select
                  style={inputStyle()}
                  value={profile}
                  onChange={(e) => applyProfile(e.target.value)}
                >
                  {Object.entries(PROP_PROFILES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle()}>Richtung</label>
                <select
                  style={inputStyle()}
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                >
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
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label style={labelStyle()}>Einstieg</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.0001"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle()}>Take Profit</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.0001"
                  value={tp}
                  onChange={(e) => setTp(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle()}>Stop Loss</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.0001"
                  value={sl}
                  onChange={(e) => setSl(e.target.value)}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label style={labelStyle()}>Kontogröße ($)</label>
                <input
                  style={inputStyle()}
                  type="number"
                  value={accountSize}
                  onChange={(e) => setAccountSize(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle()}>5% Daily Loss ($)</label>
                <input
                  style={inputStyle()}
                  type="number"
                  value={dailyLossLimit}
                  onChange={(e) => setDailyLossLimit(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle()}>10% Max Loss ($)</label>
                <input
                  style={inputStyle()}
                  type="number"
                  value={maxLossLimit}
                  onChange={(e) => setMaxLossLimit(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle()}>Profit Target ($)</label>
                <input
                  style={inputStyle()}
                  type="number"
                  value={profitTarget}
                  onChange={(e) => setProfitTarget(e.target.value)}
                />
              </div>
            </div>

            {riskWarning ? (
              <div
                style={{
                  background: "#fff7ed",
                  border: "1px solid #fdba74",
                  color: "#9a3412",
                  borderRadius: 14,
                  padding: 14,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {riskWarning}
              </div>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <div style={cardStyle()}>
              <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>
                Lot-Size-Rechner
              </h2>

              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle()}>Gewünschtes Risiko (%)</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                />
              </div>

              <div
                style={{
                  background: "#f1f5f9",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 13, color: "#64748b" }}>Risk Amount</div>
                <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>
                  {fmtUsd(metrics.riskAmountTarget)}
                </div>
              </div>

              <div
                style={{
                  background: "#f1f5f9",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 14,
                }}
              >
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  Empfohlene Lots
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>
                  {fmtNum(metrics.suggestedLots, 2)}
                </div>
              </div>

              <button
                onClick={applySuggestedLots}
                style={{
                  width: "100%",
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  padding: "12px 16px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Empfohlene Lots übernehmen
              </button>
            </div>

            <div style={cardStyle()}>
              <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>
                Marktprofil
              </h2>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: "#64748b" }}>Instrument</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>
                  {INSTRUMENTS[instrument].label}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#64748b" }}>Kontraktgröße</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>
                  {fmtNum(contractValue, 2)} USD je 1.0 Move / 1 Lot
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {statBox(
            "Gewinn bei TP",
            fmtUsd(metrics.profitTp),
            `TP-Distanz: ${fmtNum(metrics.tpDistance, 4)}`,
            "#15803d"
          )}
          {statBox(
            "Verlust bei SL",
            fmtUsd(metrics.lossSl),
            `SL-Distanz: ${fmtNum(metrics.slDistance, 4)}`,
            "#dc2626"
          )}
          {statBox(
            "CRV",
            `${fmtNum(metrics.rr, 2)}x`,
            `TP: ${fmtPct(metrics.tpPct)} | SL: ${fmtPct(metrics.slPct)}`
          )}
          {statBox(
            "Risiko vom Konto",
            fmtPct(metrics.slPct),
            `Bei Kontogröße ${fmtUsd(accountSize)}`,
            metrics.slPct > 1 ? "#dc2626" : "#0f172a"
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {statBox(
            "Rest bis 5% Daily Loss",
            fmtUsd(metrics.leftToDaily),
            "Wie viel Puffer nach diesem SL noch bleibt"
          )}
          {statBox(
            "Rest bis 10% Max Loss",
            fmtUsd(metrics.leftToMax),
            "Gesamtpuffer nach diesem Setup"
          )}
          {statBox(
            "Rest bis Profit Target",
            fmtUsd(metrics.leftToTarget),
            "Was bis zum Ziel noch fehlt"
          )}
        </div>
      </div>
    </div>
  );
}