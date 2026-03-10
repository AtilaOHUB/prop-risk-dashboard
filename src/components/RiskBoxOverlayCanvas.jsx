import { useEffect, useRef } from "react";
import { buildRiskBoxOverlayModel } from "../core/overlay/buildRiskBoxOverlayModel";
import { drawRiskBoxOverlay } from "../core/overlay/drawRiskBoxOverlay";

export default function RiskBoxOverlayCanvas({ series, trade }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!series) return;
    if (!trade) return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const model = buildRiskBoxOverlayModel({
        trade,
        priceToY: (price) => series.priceToCoordinate(price),
        width: rect.width,
        height: rect.height,
      });

      if (!model) return;

      drawRiskBoxOverlay(ctx, model);
    };

    draw();
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [series, trade]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}