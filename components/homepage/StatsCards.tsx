"use client";

import { useEffect, useState } from "react";
import homepageData from "@/data/homepage.json";

export default function StatsCards() {
  const [stats, setStats] = useState(
    homepageData.stats.map(stat => ({ ...stat, value: 0 }))
  );

  useEffect(() => {
    const iv = setInterval(
      () =>
        setStats((p) =>
          p.map((s) => ({
            ...s,
            value: Math.min(s.value + Math.floor(s.target / 90), s.target),
          })),
        ),
      45,
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginTop: 12,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: "rgba(4,14,34,.87)",
            border: "1px solid rgba(0,150,255,.18)",
            borderRadius: 10,
            padding: "12px 10px",
            boxShadow: "0 0 13px rgba(0,150,255,.09)",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#00ccff",
              marginBottom: 4,
              fontFamily: "'Orbitron',monospace",
            }}
          >
            {s.value.toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 8,
              color: "#667799",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
