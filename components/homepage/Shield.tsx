"use client";

import { useState } from "react";

const SHIELD =
  "M225,38 L386,100 L386,264 C386,364 312,446 225,486 C138,446 64,364 64,264 L64,100 Z";
const SHIELD_INNER =
  "M225,54 L369,108 L369,266 C369,357 305,434 225,472 C145,434 81,357 81,266 L81,108 Z";

export default function Shield() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: 470,
        height: 520,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: "translate(-50%,-50%)",
          width: hovered ? 440 : 390,
          height: hovered ? 500 : 450,
          borderRadius: "50%",
          background: hovered
            ? "radial-gradient(ellipse, rgba(0,140,255,0.35) 0%, rgba(0,60,160,0.18) 50%, transparent 75%)"
            : "radial-gradient(ellipse, rgba(0,90,210,0.22) 0%, rgba(0,30,100,0.10) 50%, transparent 75%)",
          filter: "blur(22px)",
          animation: "shieldGlowPulse 3s ease-in-out infinite",
          pointerEvents: "none",
          transition: "all 0.4s ease",
        }}
      />

      <svg
        width="470"
        height="520"
        viewBox="0 0 450 524"
        style={{ position: "relative", zIndex: 2 }}
      >
        <defs>
          <radialGradient id="sbg" cx="50%" cy="36%" r="65%">
            <stop
              offset="0%"
              stopColor={hovered ? "#0c2d6e" : "#0b2255"}
              stopOpacity={hovered ? "0.72" : "0.58"}
            />
            <stop offset="60%" stopColor="#051228" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#020810" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id="sig" cx="50%" cy="44%" r="48%">
            <stop
              offset="0%"
              stopColor="#ffffffff"
              stopOpacity={hovered ? "0.2" : "0.13"}
            />
            <stop offset="100%" stopColor="#0044cc" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ssg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hovered ? "#88eeff" : "#44ddff"} />
            <stop offset="44%" stopColor={hovered ? "#22bbff" : "#0099ee"} />
            <stop offset="100%" stopColor={hovered ? "#0077dd" : "#0055bb"} />
          </linearGradient>
          <filter id="seg" x="-25%" y="-15%" width="150%" height="130%">
            <feGaussianBlur stdDeviation={hovered ? "7" : "5"} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soh" x="-60%" y="-40%" width="220%" height="180%">
            <feGaussianBlur stdDeviation={hovered ? "20" : "14"} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tg" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={hovered ? "13" : "9"} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="sc">
            <path d={SHIELD} />
          </clipPath>
          <linearGradient id="cometG" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop
              offset="35%"
              stopColor="#ff6600"
              stopOpacity={hovered ? "0.85" : "0.65"}
            />
            <stop
              offset="100%"
              stopColor="#ffee55"
              stopOpacity={hovered ? "1" : "0.98"}
            />
          </linearGradient>
        </defs>

        <path
          d={SHIELD}
          fill="none"
          stroke="#0077cc"
          strokeWidth={hovered ? "2.5" : "1.5"}
          opacity={hovered ? "0.5" : "0.28"}
          filter="url(#soh)"
          style={{
            animation: "shieldHalo 2.8s ease-in-out infinite",
            transition: "all 0.3s",
          }}
        />

        <path d={SHIELD} fill="url(#sbg)" style={{ transition: "all 0.3s" }} />
        <path d={SHIELD} fill="url(#sig)" style={{ transition: "all 0.3s" }} />

        <path
          d={SHIELD_INNER}
          fill="none"
          stroke="#1155aa"
          strokeWidth="1"
          opacity={hovered ? "0.7" : "0.48"}
        />

        <path
          d={SHIELD}
          fill="none"
          stroke="url(#ssg)"
          strokeWidth={hovered ? "5" : "3.8"}
          filter="url(#seg)"
          style={{
            animation: "shieldStroke 2.8s ease-in-out infinite",
            transition: "all 0.3s",
          }}
        />

        {[
          [225, 38],
          [386, 100],
          [386, 264],
          [225, 486],
          [64, 264],
          [64, 100],
        ].map(([px, py], i) => (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={hovered ? "7" : "5"}
            fill={hovered ? "#44eeff" : "#00ccff"}
            opacity="0.92"
            filter="url(#seg)"
            style={{
              animation: `dotPulse 2s ${i * 0.3}s ease-in-out infinite`,
              transition: "all 0.3s",
            }}
          />
        ))}

        <g
          clipPath="url(#sc)"
          style={{ animation: "cometAnim 3.8s ease-in-out infinite" }}
        >
          <line
            x1="148"
            y1="318"
            x2="342"
            y2="155"
            stroke="url(#cometG)"
            strokeWidth={hovered ? "16" : "12"}
            strokeLinecap="round"
            opacity={hovered ? "1" : "0.92"}
            style={{ transition: "all 0.3s" }}
          />
        </g>

        <text
          x="218"
          y="314"
          textAnchor="middle"
          fill="white"
          fontSize="152"
          fontWeight="900"
          fontFamily="'Arial Black','Helvetica Neue',system-ui,sans-serif"
          letterSpacing="-6"
          filter="url(#tg)"
        >
          Bs
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          width: hovered ? 14 : 10,
          height: hovered ? 14 : 10,
          borderRadius: "50%",
          background: hovered ? "#44eeff" : "#00ccff",
          boxShadow: hovered
            ? "0 0 20px #00eeff, 0 0 42px #0099ff, 0 0 70px #0066ff55"
            : "0 0 12px #00aaff, 0 0 26px #0077ff",
          animation: "dotPulse 2s ease-in-out infinite",
          zIndex: 15,
          transition: "all 0.3s",
        }}
      />
    </div>
  );
}
