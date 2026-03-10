import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import ChartStage from "./ChartStage";

const DEMO_CANDLES = [
  { time: "2026-03-01", open: 2938, high: 2946, low: 2931, close: 2942 },
  { time: "2026-03-02", open: 2942, high: 2951, low: 2939, close: 2948 },
  { time: "2026-03-03", open: 2948, high: 2956, low: 2941, close: 2944 },
  { time: "2026-03-04", open: 2944, high: 2950, low: 2936, close: 2939 },
  { time: "2026-03-05", open: 2939, high: 2948, low: 2934, close: 2946 },
  { time: "2026-03-06", open: 2946, high: 2958, low: 2942, close: 2954 },
  { time: "2026-03-07", open: 2954, high: 2962, low: 2948, close: 2951 },
  { time: "2026-03-08", open: 2951, high: 2968, low: 2949, close: 2963 },
  { time: "2026-03-09", open: 2963, high: 2972, low: 2956, close: 2960 },
  { time: "2026-03-10", open: 2960, high: 2976, low: 2958, close: 2971 },
];

export default function ChartShell({ height = 420 }) {
  const chartLayerRef = useRef(null);
  const overlayLayerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!chartLayerRef.current) return;

    const chart = createChart(chartLayerRef.current, {
      width: chartLayerRef.current.clientWidth,
      height,
      layout: {
        background: { color: "transparent" },
        textColor: "#9CA3AF",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.08)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22C55E",
      downColor: "#EF4444",
      borderUpColor: "#22C55E",
      borderDownColor: "#EF4444",
      wickUpColor: "#22C55E",
      wickDownColor: "#EF4444",
    });

    candleSeries.setData(DEMO_CANDLES);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = candleSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height: nextHeight } = entry.contentRect;
      chart.applyOptions({
        width,
        height: nextHeight,
      });
    });

    resizeObserver.observe(chartLayerRef.current);

    return () => {
      resizeObserver.disconnect();
      seriesRef.current = null;
      chartRef.current = null;
      chart.remove();
    };
  }, [height]);

  return (
    <ChartStage
      height={height}
      chartLayerRef={chartLayerRef}
      overlayLayerRef={overlayLayerRef}
    >
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 3,
          padding: "6px 10px",
          fontSize: 12,
          fontWeight: 700,
          background: "rgba(245,158,11,0.14)",
          border: "1px solid rgba(245,158,11,0.35)",
          borderRadius: 8,
          color: "#F59E0B",
          pointerEvents: "none",
        }}
      >
        Overlay Layer
      </div>
    </ChartStage>
  );
}