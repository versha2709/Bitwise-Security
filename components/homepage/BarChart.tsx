import homepageData from "@/data/homepage.json";

export default function BarChart({ h }: any) {
  const bars = [
    {
      gradient: "linear-gradient(to top, #0a4fd4, #1188ee, #38c6f7)",
      glow: "#1188ee",
      shimmer:
        "linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
    },
    {
      gradient: "linear-gradient(to top, #c93b00, #ff6622, #ffaa44)",
      glow: "#ff6622",
      shimmer:
        "linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
    },
    {
      gradient: "linear-gradient(to top, #0a4fd4, #1188ee, #38c6f7)",
      glow: "#1188ee",
      shimmer:
        "linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
    },
  ];

  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 88 }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            width: 45,
            height: `${h[i]}%`,
            position: "relative",
            borderRadius: "3px 3px 0 0",
            background: bar.gradient,
            boxShadow: `0 0 10px ${bar.glow}99, 0 0 28px ${bar.glow}44, 0 2px 6px ${bar.glow}33`,
            border: `1px solid ${bar.glow}66`,
            transition: "height 0.85s cubic-bezier(0.34,1.56,0.64,1)",
            overflow: "hidden",
          }}
        >
          {/* Shimmer overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: bar.shimmer,
              borderRadius: "inherit",
            }}
          />
          {/* Top highlight edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(to right, transparent, white, transparent)`,
              opacity: 0.45,
            }}
          />
        </div>
      ))}
    </div>
  );
}
