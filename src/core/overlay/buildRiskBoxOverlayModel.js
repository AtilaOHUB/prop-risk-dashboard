export function buildRiskBoxOverlayModel({
  trade,
  view,
}) {
  if (!trade || !view) {
    return createEmptyOverlayModel();
  }

  const {
    entry,
    stop,
    takeProfit,
    direction,
    valid,
    metrics,
  } = trade;

  const {
    width,
    height,
    priceToY,
  } = view;

  if (
    !isFiniteNumber(width) ||
    !isFiniteNumber(height) ||
    typeof priceToY !== "function"
  ) {
    return createEmptyOverlayModel();
  }

  if (
    !isFiniteNumber(entry) ||
    !isFiniteNumber(stop) ||
    !isFiniteNumber(takeProfit)
  ) {
    return createEmptyOverlayModel();
  }

  const entryY = priceToSafeY(priceToY, entry, height);
  const stopY = priceToSafeY(priceToY, stop, height);
  const takeProfitY = priceToSafeY(priceToY, takeProfit, height);

  if (
    entryY === null ||
    stopY === null ||
    takeProfitY === null
  ) {
    return createEmptyOverlayModel();
  }

  const left = 0;
  const right = width;

  const riskTop = Math.min(entryY, stopY);
  const riskBottom = Math.max(entryY, stopY);

  const rewardTop = Math.min(entryY, takeProfitY);
  const rewardBottom = Math.max(entryY, takeProfitY);

  const riskRect = {
    x: left,
    y: riskTop,
    width: right - left,
    height: Math.max(0, riskBottom - riskTop),
  };

  const rewardRect = {
    x: left,
    y: rewardTop,
    width: right - left,
    height: Math.max(0, rewardBottom - rewardTop),
  };

  const entryLine = createHorizontalLine(left, right, entryY, "entry");
  const stopLine = createHorizontalLine(left, right, stopY, "stop");
  const takeProfitLine = createHorizontalLine(left, right, takeProfitY, "takeProfit");

  const rrValue = metrics && isFiniteNumber(metrics.rr) ? metrics.rr : null;

  const rrLabel = rrValue === null
    ? null
    : {
        text: formatRR(rrValue),
        x: Math.max(12, width - 88),
        y: clamp((rewardTop + rewardBottom) / 2, 18, Math.max(18, height - 18)),
        align: "right",
        baseline: "middle",
      };

  return {
    visible: Boolean(valid),
    direction: direction || null,

    bounds: {
      width,
      height,
      left,
      right,
    },

    zones: {
      risk: riskRect,
      reward: rewardRect,
    },

    lines: {
      entry: entryLine,
      stop: stopLine,
      takeProfit: takeProfitLine,
    },

    labels: {
      rr: rrLabel,
    },
  };
}

export function createEmptyOverlayModel() {
  return {
    visible: false,
    direction: null,

    bounds: {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
    },

    zones: {
      risk: null,
      reward: null,
    },

    lines: {
      entry: null,
      stop: null,
      takeProfit: null,
    },

    labels: {
      rr: null,
    },
  };
}

function createHorizontalLine(x1, x2, y, type) {
  return {
    type,
    x1,
    x2,
    y,
  };
}

function priceToSafeY(priceToY, price, height) {
  const y = priceToY(price);

  if (!isFiniteNumber(y)) {
    return null;
  }

  return clamp(y, -height, height * 2);
}

function formatRR(value) {
  return `RR ${value.toFixed(2)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}