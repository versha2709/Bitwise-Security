import homepageData from "@/data/homepage.json";

export default function BarChart({ h }: any) {
  const cols = ["#1188ee", "#ff6622", "#1188ee"];
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 88 }}
    >
      {cols.map((c, i) => (
        <div
          key={i}
          style={{
            width: 45,
            height: `${h[i]}%`,
            background: `linear-gradient(to top, ${c}, ${c}cc)`,
            borderRadius: "3px 3px 0 0",
            boxShadow: `0 0 12px ${c}, 0 0 22px ${c}55`,
            border: `1px solid ${c}88`,
            transition: "height 0.85s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      ))}
    </div>
  );
}
