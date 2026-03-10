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

const INITIAL_TRADE = {
  entry: 2336,
  stop: 2328,
  takeProfit: 2345,
  direction: "long",
  valid: true,
  metrics: { rr: 1.13 },
};

const HIT_TOLERANCE = 6;
const MIN_PRICE_GAP = 0.01;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizePrice(value) {
  return Number(value.toFixed(2));
}

function calculateRr(trade) {
  if (trade.direction === "short") {
    const risk = trade.stop - trade.entry;
    const reward = trade.entry - trade.takeProfit;
    if (risk <= 0 || reward <= 0) return null;
    return reward / risk;
  }

  const risk = trade.entry - trade.stop;
  const reward = trade.takeProfit - trade.entry;
  if (risk <= 0 || reward <= 0) return null;
  return reward / risk;
}

function buildDraggedTrade(prevTrade, draggedLine, rawPrice) {
  const nextPrice = normalizePrice(rawPrice);

  if (prevTrade.direction === "short") {
    let nextEntry = prevTrade.entry;
    let nextStop = prevTrade.stop;
    let nextTakeProfit = prevTrade.takeProfit;

    if (draggedLine === "entry") {
      nextEntry = clamp(
        nextPrice,
        nextTakeProfit + MIN_PRICE_GAP,
        nextStop - MIN_PRICE_GAP
      );
    }

    if (draggedLine === "stop") {
      nextStop = Math.max(nextPrice, prevTrade.entry + MIN_PRICE_GAP);
    }

    if (draggedLine === "takeProfit") {
      nextTakeProfit = Math.min(nextPrice, prevTrade.entry - MIN_PRICE_GAP);
    }

    const nextTrade = {
      ...prevTrade,
      entry: normalizePrice(nextEntry),
      stop: normalizePrice(nextStop),
      takeProfit: normalizePrice(nextTakeProfit),
    };

    const rr = calculateRr(nextTrade);

    return {
      ...nextTrade,
      valid: Boolean(rr),
      metrics: {
        ...prevTrade.metrics,
        rr: rr ? Number(rr.toFixed(2)) : null,
      },
    };
  }

  let nextEntry = prevTrade.entry;
  let nextStop = prevTrade.stop;
  let nextTakeProfit = prevTrade.takeProfit;

  if (draggedLine === "entry") {
    nextEntry = clamp(
      nextPrice,
      prevTrade.stop + MIN_PRICE_GAP,
      prevTrade.takeProfit - MIN_PRICE_GAP
    );
  }

  if (draggedLine === "stop") {
    nextStop = Math.min(nextPrice, prevTrade.entry - MIN_PRICE_GAP);
  }

  if (draggedLine === "takeProfit") {
    nextTakeProfit = Math.max(nextPrice, prevTrade.entry + MIN_PRICE_GAP);
  }

  const nextTrade = {
    ...prevTrade,
    entry: normalizePrice(nextEntry),
    stop: normalizePrice(nextStop),
    takeProfit: normalizePrice(nextTakeProfit),
  };

  const rr = calculateRr(nextTrade);

  return {
    ...nextTrade,
    valid: Boolean(rr),
    metrics: {
      ...prevTrade.metrics,
      rr: rr ? Number(rr.toFixed(2)) : null,
    },
  };
}

export default function ChartShell({ height = 420 }) {
  const rootRef = useRef(null);
  const chartHostRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  const [chartApi, setChartApi] = useState(null);
  const [candleSeriesApi, setCandleSeriesApi] = useState(null);
  const [trade, setTrade] = useState(INITIAL_TRADE);

  const [mouseProbe, setMouseProbe] = useState({
    y: null,
    price: null,
    hoveredLine: null,
  });

  const [dragState, setDragState] = useState({
    active: false,
    line: null,
  });

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
      handleScroll: {
        pressedMouseMove: false,
        mouseWheel: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: true,
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
    setCandleSeriesApi(candleSeries);

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
      }

      chartRef.current = null;
      candleSeriesRef.current = null;
      setChartApi(null);
      setCandleSeriesApi(null);
    };
  }, [height]);

  const detectHoveredLine = (mouseY) => {
    if (!candleSeriesRef.current) return null;

    const entryY = candleSeriesRef.current.priceToCoordinate(trade.entry);
    const stopY = candleSeriesRef.current.priceToCoordinate(trade.stop);
    const tpY = candleSeriesRef.current.priceToCoordinate(trade.takeProfit);

    if (entryY !== null && Math.abs(mouseY - entryY) < HIT_TOLERANCE) {
      return "entry";
    }

    if (stopY !== null && Math.abs(mouseY - stopY) < HIT_TOLERANCE) {
      return "stop";
    }

    if (tpY !== null && Math.abs(mouseY - tpY) < HIT_TOLERANCE) {
      return "takeProfit";
    }

    return null;
  };

  const handleMouseMove = (event) => {
    if (!chartHostRef.current || !candleSeriesRef.current) return;

    const rect = chartHostRef.current.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const price = candleSeriesRef.current.coordinateToPrice(y);
    const hoveredLine = detectHoveredLine(y);

    setMouseProbe({
      y,
      price: Number.isFinite(price) ? price : null,
      hoveredLine,
    });

    if (dragState.active && Number.isFinite(price)) {
      setTrade((prev) => buildDraggedTrade(prev, dragState.line, price));
    }
  };

  const handleMouseLeave = () => {
    setMouseProbe({
      y: null,
      price: null,
      hoveredLine: null,
    });
  };

  const handleMouseDown = (event) => {
    if (!mouseProbe.hoveredLine) return;

    event.preventDefault();

    setDragState({
      active: true,
      line: mouseProbe.hoveredLine,
    });
  };

  const endDrag = () => {
    setDragState({
      active: false,
      line: null,
    });
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (dragState.active) {
        endDrag();
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [dragState.active]);

  const moveTrade = () => {
    setTrade((prev) => buildDraggedTrade(prev, "entry", prev.entry + 2));
    setTrade((prev) => buildDraggedTrade(prev, "stop", prev.stop + 2));
    setTrade((prev) =>
      buildDraggedTrade(prev, "takeProfit", prev.takeProfit + 2)
    );
  };

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
      <button
        onClick={moveTrade}
        style={{
          position: "absolute",
          zIndex: 20,
          top: 12,
          left: 12,
          padding: "6px 10px",
          fontSize: "12px",
          background: "#1f2937",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Move Trade
      </button>

      <div
        style={{
          position: "absolute",
          zIndex: 20,
          top: 12,
          right: 12,
          padding: "8px 10px",
          fontSize: "12px",
          background: "rgba(17,24,39,0.9)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "8px",
          color: "#fff",
          pointerEvents: "none",
          minWidth: "160px",
        }}
      >
        <div>Hover: {mouseProbe.hoveredLine ?? "-"}</div>
        <div>Drag: {dragState.active ? dragState.line : "-"}</div>
        <div>Entry: {trade.entry.toFixed(2)}</div>
        <div>Stop: {trade.stop.toFixed(2)}</div>
        <div>TP: {trade.takeProfit.toFixed(2)}</div>
        <div>RR: {trade.metrics?.rr ?? "-"}</div>
        <div>Valid: {trade.valid ? "true" : "false"}</div>
      </div>

      <div
        ref={chartHostRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          inset: 0,
          cursor: mouseProbe.hoveredLine || dragState.active ? "ns-resize" : "default",
        }}
      />

      <RiskBoxOverlayCanvas
        chart={chartApi}
        series={candleSeriesApi}
        trade={trade}
      />
    </div>
  );
}