import {
  calculateStopDistance,
  calculateTakeProfitDistance,
  calculateStopPips,
  calculateTakeProfitPips,
  calculateStopTicks,
  calculateTakeProfitTicks,
  calculateRewardRiskRatio,
} from "../pricing/priceMath";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function getContractSize(instrument) {
  const size = instrument?.contractSize;
  return isFiniteNumber(size) && size > 0 ? size : 1;
}

function getValuePerPoint(instrument) {
  const v = instrument?.valuePerPoint;
  return isFiniteNumber(v) && v > 0 ? v : null;
}

function calculateMoneyFromPriceDistance(priceDistance, lot, instrument) {
  if (!isFiniteNumber(priceDistance) || !isFiniteNumber(lot)) {
    return 0;
  }

  const valuePerPoint = getValuePerPoint(instrument);

  if (valuePerPoint) {
    return priceDistance * valuePerPoint * lot;
  }

  const contractSize = getContractSize(instrument);
  return priceDistance * contractSize * lot;
}

export function calculateTradeMetrics(trade) {
  if (!trade || !trade.instrument) {
    return null;
  }

  const { entry, stop, takeProfit, lot, instrument } = trade;

  const stopPrice = calculateStopDistance(entry, stop, instrument);
  const tpPrice = calculateTakeProfitDistance(entry, takeProfit, instrument);

  const stopPips = calculateStopPips(entry, stop, instrument);
  const tpPips = calculateTakeProfitPips(entry, takeProfit, instrument);

  const stopTicks = calculateStopTicks(entry, stop, instrument);
  const tpTicks = calculateTakeProfitTicks(entry, takeProfit, instrument);

  const rr = calculateRewardRiskRatio(entry, stop, takeProfit, instrument);

  const riskAmount = calculateMoneyFromPriceDistance(
    stopPrice,
    lot,
    instrument
  );

  const rewardAmount = calculateMoneyFromPriceDistance(
    tpPrice,
    lot,
    instrument
  );

  return {
    price: {
      risk: stopPrice,
      reward: tpPrice,
    },
    pips: {
      risk: stopPips,
      reward: tpPips,
    },
    ticks: {
      risk: stopTicks,
      reward: tpTicks,
    },
    money: {
      risk: riskAmount,
      reward: rewardAmount,
    },
    rr,
  };
}