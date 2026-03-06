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
          width: "min(470px, 80vw)",
          height: "min(470px, 80vw)",
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
          gridTemplateColumns: "1fr",
          gap: 0,
          padding: "80px 16px 0",
          alignItems: "center",
          maxWidth: 1420,
          margin: "0 auto",
        }}
        className="homepage-grid"
      >
        <div className="homepage-left">
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
            minHeight: 400,
          }}
          className="homepage-center"
        >
          <div
            style={{
              position: "absolute",
              width: "min(490px, 90vw)",
              height: "min(530px, 90vw)",
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
              width: "min(220px, 50vw)",
              height: "min(140px, 30vw)",
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
            justifyContent: "center",
            paddingLeft: 8,
            paddingRight: 8,
            position: "relative",
            minHeight: 400,
          }}
          className="homepage-right"
        >
          <HexGrid />
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "calc(15% + 10px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          padding: "0 16px",
          textAlign: "center",
          maxWidth: "90vw",
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: "clamp(7px, 1.8vw, 10px)",
            letterSpacing: "clamp(1px, 0.8vw, 4px)",
            color: "rgba(80,160,255,.52)",
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          {homepageData.footer.text}
        </span>
      </div>

      <Ocean />
    </main>
  );
}
