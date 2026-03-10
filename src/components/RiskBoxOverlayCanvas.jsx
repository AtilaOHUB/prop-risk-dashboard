import { useEffect, useRef } from "react";
import { buildRiskBoxOverlayModel } from "../core/overlay/buildRiskBoxOverlayModel";
import { drawRiskBoxOverlay } from "../core/overlay/drawRiskBoxOverlay";

export default function RiskBoxOverlayCanvas({
  trade,
  width,
  height,
  priceToY,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width || 0;
    canvas.height = height || 0;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const model = buildRiskBoxOverlayModel({
      trade,
      view: {
        width: canvas.width,
        height: canvas.height,
        priceToY,
      },
    });

    drawRiskBoxOverlay(ctx, model);
  }, [trade, width, height, priceToY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
}