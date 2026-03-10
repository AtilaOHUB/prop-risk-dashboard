import { snapPriceForDragging } from "../pricing/snapPrice";
import { resolveTradeDirection } from "./tradeDirection";
import { calculateRiskBox } from "../pricing/riskBox";

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

export function updateTradeFromChartDrag(
  trade,
  draggedField,
  rawPrice,
  instrument
) {
  if (!trade || !instrument) {
    return trade;
  }

  const snappedPrice = snapPriceForDragging(rawPrice, instrument);

  if (!isFiniteNumber(snappedPrice)) {
    return trade;
  }

  const nextTrade = {
    ...trade,
  };

  if (draggedField === "entry") {
    nextTrade.entry = snappedPrice;
  }

  if (draggedField === "stop") {
    nextTrade.stop = snappedPrice;
  }

  if (draggedField === "takeProfit") {
    nextTrade.takeProfit = snappedPrice;
  }

  const direction = resolveTradeDirection(nextTrade.entry, nextTrade.stop);

  const riskBox = calculateRiskBox(
    nextTrade.entry,
    nextTrade.stop,
    nextTrade.takeProfit,
    instrument
  );

  return {
    ...nextTrade,
    direction,
    riskBox,
  };
}