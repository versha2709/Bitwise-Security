import homepageData from "@/data/homepage.json";

export default function SidebarIcons() {
  const icons = homepageData.sidebarIcons;

  return (
    <div
      style={{
        position: "fixed",
        left: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
      className="sidebar-icons"
    >
      {icons.map((iconData, i) => (
        <div
          key={i}
          style={{
            width: 44,
            height: 44,
            background: "rgba(5,18,40,0.82)",
            border: "1px solid rgba(0,200,255,0.32)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(0,200,255,0.18)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,220,255,0.45)";
            e.currentTarget.style.borderColor = "rgba(0,220,255,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 12px rgba(0,200,255,0.18)";
            e.currentTarget.style.borderColor = "rgba(0,200,255,0.32)";
          }}
        >
          {iconData.type === "terminal" ? (
            <span style={{ fontSize: 20, color: "#00ccff" }}>{iconData.symbol}</span>
          ) : (
            <svg
              style={{ width: 22, height: 22, color: "#00ccff" }}
              fill="currentColor"
              viewBox={iconData.viewBox}
            >
              <path d={iconData.path} />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
