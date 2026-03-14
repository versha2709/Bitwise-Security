"use client";

import { useEffect, useRef, useState } from "react";
import homepageData from "@/data/homepage.json";

const R = 63;
const RD = R * 0.87;
const CS = R * Math.sqrt(3);
const RS = R * 1.5;
const HO = (R * Math.sqrt(3)) / 2;
const PAD = R + 8;

function hexPts(cx: number, cy: number, r = R) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 2 - i * (Math.PI / 3);
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy - r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

const HEXES = homepageData.hexagons;
const VB_W = PAD + HO + CS + PAD;
const VB_H = PAD + RS * 3 + PAD;

export default function HexGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [scanY, setScanY] = useState(-VB_H);
  const [vals, setVals] = useState<number[]>(
    HEXES.map((h) => {
      const n = parseInt(String(h.val), 10);
      return isNaN(n) ? 100 : n;
    }),
  );

  // Refs for float animation (avoid React re-renders for float)
  const floatRefsArr = useRef<(SVGGElement | null)[]>(HEXES.map(() => null));
  const setFloatRef = (i: number) => (el: SVGGElement | null) => {
    floatRefsArr.current[i] = el;
  };

  // PERF FIX: Merge float + scan into ONE single rAF loop instead of two
  useEffect(() => {
    let rafId: number;
    let start: number | null = null;
    const dur = 3000;
    const phases = HEXES.map((_, i) => (i * Math.PI * 0.72) % (Math.PI * 2));
    const durations = HEXES.map((_, i) => 3.2 + i * 0.18);

    const animate = (ts: number) => {
      if (!start) start = ts;

      // Scan line
      const elapsed = (ts - start) % dur;
      setScanY(-VB_H + (elapsed / dur) * VB_H * 2.5);

      // Float — direct DOM, no React re-render
      HEXES.forEach((_, i) => {
        const el = floatRefsArr.current[i];
        if (el) {
          const y =
            Math.sin((ts / 1000 / durations[i]) * Math.PI * 2 + phases[i]) * 6;
          el.setAttribute("transform", `translate(0, ${y})`);
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // PERF FIX: Throttled val updates — 2000ms base instead of 1500+random
  // and use a single interval that batches all updates at once
  useEffect(() => {
    const iv = setInterval(() => {
      setVals((prev) => {
        const next = [...prev];
        // Update all hexes in one setState call instead of N separate intervals
        HEXES.forEach((_, i) => {
          next[i] = Math.max(
            50,
            Math.min(999, next[i] + Math.round((Math.random() - 0.48) * 25)),
          );
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "hexReveal 0.9s 0.5s both",
      }}
    >
      <svg
        width={VB_W}
        height={VB_H}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        overflow="visible"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="hfg" cx="50%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#e88020" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#b85c08" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#7a3300" stopOpacity="0.78" />
          </radialGradient>
          <radialGradient id="hfgHov" cx="50%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#ffaa40" stopOpacity="1" />
            <stop offset="55%" stopColor="#dd7010" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#a04400" stopOpacity="0.85" />
          </radialGradient>
          <filter id="hgf" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hgfHov" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="textGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="hexClip">
            <rect x={0} y={0} width={VB_W} height={VB_H} />
          </clipPath>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,190,70,0)" />
            <stop offset="48%" stopColor="rgba(255,190,70,0)" />
            <stop offset="50%" stopColor="rgba(255,210,100,0.38)" />
            <stop offset="52%" stopColor="rgba(255,190,70,0)" />
            <stop offset="100%" stopColor="rgba(255,190,70,0)" />
          </linearGradient>
        </defs>

        {HEXES.map((h, i) => {
          const isHov = hovered === i;
          return (
            <g key={i} ref={setFloatRef(i)}>
              <g
                style={{
                  cursor: "pointer",
                  animation: `hexPop 0.5s ${0.06 * i + 0.55}s both cubic-bezier(0.34,1.56,0.64,1)`,
                  transition: "filter 0.2s",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHov && (
                  <polygon
                    points={hexPts(h.cx, h.cy, RD * 1.08)}
                    fill="none"
                    stroke="#ffcc66"
                    strokeWidth="4"
                    opacity="0.55"
                    filter="url(#hgfHov)"
                    style={{
                      animation:
                        "hexHoverPulse 0.8s ease-in-out infinite alternate",
                    }}
                  />
                )}
                <polygon
                  points={hexPts(h.cx, h.cy, RD)}
                  fill={isHov ? "url(#hfgHov)" : "url(#hfg)"}
                  style={{ transition: "fill 0.2s" }}
                />
                <polygon
                  points={hexPts(h.cx, h.cy, RD)}
                  fill="none"
                  stroke={isHov ? "#ffcc44" : "#ff9922"}
                  strokeWidth={isHov ? "3.2" : "2.3"}
                  filter={isHov ? "url(#hgfHov)" : "url(#hgf)"}
                  style={{ transition: "all 0.2s" }}
                />
                <polygon
                  points={hexPts(h.cx, h.cy, RD * 0.845)}
                  fill="none"
                  stroke="#ffcc66"
                  strokeWidth="0.9"
                  opacity={isHov ? "0.7" : "0.42"}
                />
                {[0, 1, 2].map((j) => {
                  const a1 = Math.PI / 2 - j * (Math.PI / 3);
                  const ir = RD * 0.82;
                  return (
                    <line
                      key={j}
                      x1={h.cx + ir * Math.cos(a1)}
                      y1={h.cy - ir * Math.sin(a1)}
                      x2={h.cx - ir * Math.cos(a1)}
                      y2={h.cy + ir * Math.sin(a1)}
                      stroke="#ff9900"
                      strokeWidth="0.6"
                      opacity={isHov ? "0.38" : "0.22"}
                    />
                  );
                })}
                <text
                  x={h.cx}
                  y={h.cy + 7}
                  textAnchor="middle"
                  fill={isHov ? "#ffffff" : "#fff5e4"}
                  fontSize={isHov ? "18" : "17"}
                  fontWeight="700"
                  fontFamily="'Orbitron','Courier New',monospace"
                  letterSpacing="1.2"
                  filter="url(#textGlow)"
                  style={{ transition: "all 0.2s" }}
                >
                  {vals[i]}
                </text>
              </g>
            </g>
          );
        })}

        <g clipPath="url(#hexClip)">
          <rect
            x={0}
            y={scanY}
            width={VB_W}
            height={VB_H}
            fill="url(#scanGrad)"
            style={{ pointerEvents: "none" }}
          />
        </g>
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: VB_H * 0.82,
          gap: 0,
        }}
      >
        {homepageData.hexDataLabels.map((v, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              animation: `slideRight 0.4s ${0.12 * i + 0.9}s both`,
            }}
          >
            <span
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: 11,
                color: "#ffaa44",
                textShadow: "0 0 8px #ff8800",
                letterSpacing: 1,
              }}
            >
              {v}
            </span>
            <div
              style={{
                width: 36,
                height: 2,
                background: "linear-gradient(to right,#ff9933,#ffcc66)",
                borderRadius: 1,
                boxShadow: "0 0 5px #ff8800",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
