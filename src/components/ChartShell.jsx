import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import RiskBoxOverlayCanvas from "./RiskBoxOverlayCanvas";

const DEMO_DATA = [
  { time: "2025-03-01", open: 2320, high: 2332, low: 2314, close: 2328 },
  { time: "2025-03-02", open: 2328, high: 2338, low: 2321, close: 2334 },
  { time: "2025-03-03", open: 2334, high: 2342, low: 2329, close: 2331 },
  { time: "2025-03-04", open: 2331, high: 2348, low: 2327, close: 2344 },
  { time: "2025-03-05", open: 2344, high: 2351, low: 2338, close: 2340 },
  { time: "2025-03-06", open: 2340, high: 2346, low: 2326, close: 2330 },
  { time: "2025-03-07", open: 2330, high: 2337, low: 2318, close: 2322 },
  { time: "2025-03-08", open: 2322, high: 2331, low: 2315, close: 2328 },
  { time: "2025-03-09", open: 2328, high: 2340, low: 2324, close: 2336 },
  { time: "2025-03-10", open: 2336, high: 2345, low: 2330, close: 2341 },
];

export default function ChartShell({ height = 420 }) {
  const rootRef = useRef(null);
  const chartHostRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  const [chartApi, setChartApi] = useState(null);

  useEffect(() => {
    if (!chartHostRef.current) return;

    const chart = createChart(chartHostRef.current, {
      width: chartHostRef.current.clientWidth || 800,
      height,
      layout: {
        background: { color: "#0b0b0f" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)" },
        horzLines: { color: "rgba(255,255,255,0.04)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.12)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.12)",
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    candleSeries.setData(DEMO_DATA);

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    setChartApi(chart);

    const handleResize = () => {
      if (!rootRef.current || !chartRef.current) return;

      chartRef.current.applyOptions({
        width: rootRef.current.clientWidth || 800,
        height,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }

      candleSeriesRef.current = null;
      setChartApi(null);
    };
  }, [height]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        background: "#0b0b0f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div
        ref={chartHostRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      <RiskBoxOverlayCanvas chart={chartApi} />
    </div>
  );
}