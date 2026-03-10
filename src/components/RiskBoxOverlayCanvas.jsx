import { useEffect, useRef } from "react";

export default function RiskBoxOverlayCanvas({ chart }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!chart) return;
    if (!canvasRef.current) return;

    // In diesem Schritt machen wir noch nichts mit dem Chart.
    // Wir stellen nur sicher, dass das Overlay stabil mountet,
    // sobald die Chart API verfügbar ist.

  }, [chart]);

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