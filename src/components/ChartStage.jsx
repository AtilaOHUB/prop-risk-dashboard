export default function ChartStage({
  height = 420,
  children,
  overlay,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 22,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0B0B0B 0%, #111111 100%)",
        border: "1px solid #2A2A2A",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 48px, 72px 100%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {overlay}
      </div>
    </div>
  );
}