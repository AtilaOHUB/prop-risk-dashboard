const COLORS = {
  riskFill: "rgba(220,38,38,0.18)",
  rewardFill: "rgba(34,197,94,0.18)",

  entryLine: "#F59E0B",
  stopLine: "#EF4444",
  tpLine: "#22C55E",

  rrText: "#F8FAFC"
};

export function drawRiskBoxOverlay(ctx, model) {
  if (!ctx || !model || !model.visible) {
    return;
  }

  drawZones(ctx, model);
  drawLines(ctx, model);
  drawLabels(ctx, model);
}

function drawZones(ctx, model) {
  const { risk, reward } = model.zones;

  if (risk) {
    ctx.fillStyle = COLORS.riskFill;
    ctx.fillRect(
      risk.x,
      risk.y,
      risk.width,
      risk.height
    );
  }

  if (reward) {
    ctx.fillStyle = COLORS.rewardFill;
    ctx.fillRect(
      reward.x,
      reward.y,
      reward.width,
      reward.height
    );
  }
}

function drawLines(ctx, model) {
  const { entry, stop, takeProfit } = model.lines;

  if (entry) {
    drawHorizontalLine(ctx, entry, COLORS.entryLine, 2);
  }

  if (stop) {
    drawHorizontalLine(ctx, stop, COLORS.stopLine, 2);
  }

  if (takeProfit) {
    drawHorizontalLine(ctx, takeProfit, COLORS.tpLine, 2);
  }
}

function drawLabels(ctx, model) {
  const { rr } = model.labels;

  if (!rr) return;

  ctx.fillStyle = COLORS.rrText;
  ctx.font = "12px Inter, system-ui, sans-serif";

  if (rr.align === "right") {
    ctx.textAlign = "right";
  } else {
    ctx.textAlign = "left";
  }

  if (rr.baseline === "middle") {
    ctx.textBaseline = "middle";
  } else {
    ctx.textBaseline = "alphabetic";
  }

  ctx.fillText(rr.text, rr.x, rr.y);
}

function drawHorizontalLine(ctx, line, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  ctx.beginPath();
  ctx.moveTo(line.x1, line.y);
  ctx.lineTo(line.x2, line.y);
  ctx.stroke();
}