export function calculateTradeMetrics({
  effectiveEntry,
  tp,
  sl,
  lots,
  valuePerPoint,
  accountSize,
  riskPercent,
  leverage,
  direction,
  dailyLossValue,
  maxLossValue,
  profitTargetValue,
}) {
  const e = Number(effectiveEntry);
  const t = Number(tp);
  const s = Number(sl);
  const l = Number(lots);
  const vpp = Number(valuePerPoint || 0);
  const acc = Number(accountSize);
  const riskPct = Number(riskPercent);
  const lev = Number(leverage);

  const tpDistance = Math.abs(t - e);
  const slDistance = Math.abs(s - e);

  let profitTp = 0;
  let lossSl = 0;

  if (direction === "Long") {
    profitTp = (t - e) * vpp * l;
    lossSl = (s - e) * vpp * l;
  } else {
    profitTp = (e - t) * vpp * l;
    lossSl = (e - s) * vpp * l;
  }

  const riskAbs = Math.abs(lossSl);
  const rewardAbs = Math.abs(profitTp);
  const rr = riskAbs > 0 ? rewardAbs / riskAbs : 0;
  const riskAmountTarget = acc * (riskPct / 100);

  const suggestedLots =
    slDistance > 0 && vpp > 0
      ? riskAmountTarget / (slDistance * vpp)
      : 0;

  const notional = e * l * vpp;
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
    leftToDaily: Math.max(0, Number(dailyLossValue) - riskAbs),
    leftToMax: Math.max(0, Number(maxLossValue) - riskAbs),
    leftToTarget: Math.max(0, Number(profitTargetValue) - Math.max(0, profitTp)),
  };
}