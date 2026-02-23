"use client";

import { useEffect, useState } from "react";
import ParticleCanvas from "@/components/homepage/ParticleCanvas";
import FireCanvas from "@/components/homepage/FireCanvas";
import homepageData from "@/data/homepage.json";
import SidebarIcons from "@/components/homepage/SidebarIcons";
import BarChart from "@/components/homepage/BarChart";
import HexGrid from "@/components/homepage/HexGrid";
import Ocean from "@/components/homepage/Ocean";
import Shield from "@/components/homepage/Shield";
import StatsCards from "@/components/homepage/StatsCards";
import ThreatStream from "@/components/homepage/ThreatStream";

export default function Home() {
  const [barH, setBarH] = useState([72, 100, 78]);

  useEffect(() => {
    const iv = setInterval(
      () =>
        setBarH([
          50 + Math.random() * 45,
          70 + Math.random() * 30,
          50 + Math.random() * 45,
        ]),
      2200,
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 35% 44%, #091830 0%, #050d1e 45%, #020810 100%)",
        fontFamily: "'Rajdhani','Orbitron',sans-serif",
      }}
    >
      <ParticleCanvas />

      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "44%",
          transform: "translate(-50%,-50%)",
          width: 470,
          height: 470,
          borderRadius: "50%",
          border: "1px solid rgba(0,140,255,0.10)",
          boxShadow:
            "0 0 0 38px rgba(0,100,200,0.04),0 0 0 76px rgba(0,80,160,0.03)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "radarRing 4s ease-in-out infinite",
        }}
      />

      <SidebarIcons />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "260px 1fr 360px",
          gap: 0,
          padding: "56px 14px 0 70px",
          alignItems: "center",
          maxWidth: 1420,
          margin: "0 auto",
        }}
      >
        <div>
          <ThreatStream />
          <StatsCards />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: 600,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 490,
              height: 530,
              background:
                "radial-gradient(ellipse,rgba(0,80,200,.17) 0%,transparent 70%)",
              borderRadius: "50%",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
          <Shield />
          <div
            style={{
              position: "relative",
              marginTop: -58,
              zIndex: 14,
              width: 220,
              height: 140,
            }}
          >
            <FireCanvas cx={110} cy={105} />
          </div>
          <div style={{ marginTop: -30, zIndex: 15 }}>
            <BarChart h={barH} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 20,
            paddingRight: 8,
            position: "relative",
            minHeight: 600,
          }}
        >
          <HexGrid />
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "4%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: 10,
            letterSpacing: 4,
            color: "rgba(80,160,255,.52)",
            textTransform: "uppercase",
          }}
        >
          {homepageData.footer.text}
        </span>
      </div>

      <Ocean />
    </main>
  );
}
