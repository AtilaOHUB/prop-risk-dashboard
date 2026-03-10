import { useMemo } from "react";

const DEFAULT_HEIGHT = 520;

export default function ChartStage({
  height = DEFAULT_HEIGHT,
  minHeight,
  className = "",
  chartLayerRef = null,
  overlayLayerRef = null,
  children = null,
}) {
  const resolvedMinHeight = useMemo(() => {
    if (typeof minHeight === "number") {
      return minHeight;
    }

    return height;
  }, [height, minHeight]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height,
        minHeight: resolvedMinHeight,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <div
        ref={chartLayerRef}
        data-layer="chart"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      <div
        ref={overlayLayerRef}
        data-layer="overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {children}
    </div>
  );
}