export default function Ocean() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "15%",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(to right, transparent, #0088dd, #00ccff 40%, #0088dd, transparent)",
          boxShadow: "0 0 18px #0099ee, 0 0 36px #0066bb55",
          animation: "oceanLine 3s ease-in-out infinite",
        }}
      />
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="og" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0077cc" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#001133" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q360,18 720,40 Q1080,62 1440,40 L1440,130 L0,130 Z"
          fill="url(#og)"
          style={{ animation: "oceanW1 5.2s ease-in-out infinite" }}
        />
        <path
          d="M0,55 Q360,36 720,55 Q1080,74 1440,55 L1440,130 L0,130 Z"
          fill="#002266"
          opacity="0.6"
          style={{ animation: "oceanW2 6.8s ease-in-out infinite reverse" }}
        />
        <path
          d="M0,68 Q360,52 720,68 Q1080,84 1440,68 L1440,130 L0,130 Z"
          fill="#001144"
          opacity="0.78"
          style={{ animation: "oceanW1 8.5s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}
