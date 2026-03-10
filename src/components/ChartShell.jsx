import { useRef } from "react";
import ChartStage from "./ChartStage";

export default function ChartShell({ height = 420 }) {
  const chartLayerRef = useRef(null);
  const overlayLayerRef = useRef(null);

  return (
    <ChartStage
      height={height}
      chartLayerRef={chartLayerRef}
      overlayLayerRef={overlayLayerRef}
    >
      {/* Chart Layer Test Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: "#9CA3AF",
          pointerEvents: "none",
        }}
      >
        Chart Layer Placeholder
      </div>

      {/* Overlay Test Marker */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "4px 8px",
          fontSize: 12,
          background: "rgba(245,158,11,0.15)",
          border: "1px solid rgba(245,158,11,0.35)",
          borderRadius: 6,
          color: "#F59E0B",
          pointerEvents: "none",
        }}
      >
        Overlay Layer
      </div>
    </ChartStage>
  );
}