import { useEffect, useRef } from "react";

const DEBUG_PRICE = 2341;
const RIGHT_SCALE_GUTTER = 72;

export default function RiskBoxOverlayCanvas({ series }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!series) return;
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

      const y = series.priceToCoordinate(DEBUG_PRICE);
      if (y == null) return;

      const drawableWidth = Math.max(0, rect.width - RIGHT_SCALE_GUTTER);

      ctx.fillStyle = "rgba(255, 200, 0, 0.9)";
      ctx.fillRect(0, y - 1, drawableWidth, 2);
    };

    draw();
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [series]);

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