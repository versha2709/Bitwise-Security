"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── inject keyframes once ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

@keyframes shieldBreathe {
  0%,100% {
    filter: drop-shadow(0 0 22px rgba(0,210,255,.85))
            drop-shadow(0 0 55px rgba(0,180,255,.4))
            drop-shadow(0 0 90px rgba(0,150,255,.18));
  }
  50% {
    filter: drop-shadow(0 0 42px rgba(0,230,255,1))
            drop-shadow(0 0 90px rgba(0,200,255,.65))
            drop-shadow(0 0 140px rgba(0,160,255,.3));
  }
}
@keyframes shieldHover {
  0%,100% {
    filter: drop-shadow(0 0 55px rgba(0,230,255,1))
            drop-shadow(0 0 110px rgba(0,210,255,.75))
            drop-shadow(0 0 180px rgba(0,180,255,.45));
  }
  50% {
    filter: drop-shadow(0 0 70px rgba(60,240,255,1))
            drop-shadow(0 0 140px rgba(0,220,255,.85))
            drop-shadow(0 0 220px rgba(0,190,255,.55));
  }
}
@keyframes pulseRing {
  0%   { transform: scale(.3);  opacity: 1;   border-color: rgba(0,210,255,.9); }
  100% { transform: scale(1.8); opacity: 0;   border-color: rgba(0,210,255,0); }
}
@keyframes pulseRingFast {
  0%   { transform: scale(.3);  opacity: 1;   border-color: rgba(0,230,255,1); }
  100% { transform: scale(1.8); opacity: 0;   border-color: rgba(0,230,255,0); }
}
@keyframes cometStreak {
  0%   { opacity: 0;   transform: translate(-120px, 80px)  scaleX(.4); }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { opacity: 0;   transform: translate(110px, -80px) scaleX(1); }
}
@keyframes cometGlow {
  0%,100% { filter: drop-shadow(0 0 6px #ff8800) drop-shadow(0 0 18px rgba(255,100,0,.6)); }
  50%      { filter: drop-shadow(0 0 14px #ffaa00) drop-shadow(0 0 32px rgba(255,140,0,.8)); }
}
@keyframes arcFlick {
  0%,100% { opacity: 1; }
  33%     { opacity: .1; }
  66%     { opacity: .7; }
}
@keyframes stemPulse {
  0%,100% { opacity: .55; transform: translateX(-50%) scaleY(1); }
  50%     { opacity: 1;   transform: translateX(-50%) scaleY(1.04); }
}
@keyframes dotGlow {
  0%,100% { box-shadow: 0 0 8px 2px rgba(0,210,255,.6), 0 0 20px 4px rgba(0,180,255,.3); }
  50%     { box-shadow: 0 0 16px 4px rgba(0,230,255,.9), 0 0 40px 8px rgba(0,200,255,.5); }
}
@keyframes scanLine {
  0%   { top: -8%; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: .6; }
  100% { top: 108%; opacity: 0; }
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("shield-v4-styles")) return;
  const tag = document.createElement("style");
  tag.id = "shield-v4-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

/* ── Electric arc sparks ── */
function ArcSparks({ active }: { active: boolean }) {
  const [arcs, setArcs] = useState<
    { id: number; x: string; y: string; h: string; op: number; dur: string }[]
  >([]);
  const ctr = useRef(0);

  useEffect(() => {
    if (!active) {
      setArcs([]);
      return;
    }
    const iv = setInterval(() => {
      const id = ctr.current++;
      const a = {
        id,
        x: `${6 + Math.random() * 88}%`,
        y: `${4 + Math.random() * 80}%`,
        h: `${12 + Math.random() * 20}%`,
        op: 0.35 + Math.random() * 0.65,
        dur: `${0.07 + Math.random() * 0.13}s`,
      };
      setArcs((p) => [...p.slice(-14), a]);
      setTimeout(() => setArcs((p) => p.filter((x) => x.id !== id)), 280);
    }, 50);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        borderRadius: 4,
      }}
    >
      {arcs.map((a) => (
        <div
          key={a.id}
          style={{
            position: "absolute",
            left: a.x,
            top: a.y,
            width: 2,
            height: a.h,
            background:
              "linear-gradient(to bottom, transparent, #00e8ff, rgba(0,230,255,.3), transparent)",
            borderRadius: 1,
            boxShadow: "0 0 5px #00cfff, 0 0 10px #00647aff",
            opacity: a.op,
            animation: `arcFlick ${a.dur} steps(1) infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Shield() {
  injectStyles();

  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const curScale = useRef(1);
  const tgtScale = useRef(1);
  const raf = useRef<number>(0);

  const onMove = useCallback((e: MouseEvent) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const dist = Math.hypot(
      e.clientX - (r.left + r.width / 2),
      e.clientY - (r.top + r.height / 2),
    );
    tgtScale.current = 1 + Math.max(0, 1 - dist / 400) * 0.2;
    setOffset({
      x: ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 16,
      y: ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 10,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      curScale.current += (tgtScale.current - curScale.current) * 0.07;
      setScale(+curScale.current.toFixed(4));
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [onMove]);

  const ringAnim = hovered ? "pulseRingFast" : "pulseRing";
  const ringDur = hovered ? "1.05s" : "2.8s";

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 360,
        height: 380,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        /* ← cursor visible — use default arrow, NOT none */
        cursor: "default",
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        zIndex: 12,
      }}
    >
      {/* Pulse rings */}
      {[0, 0.95, 1.9].map((delay, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: -28,
            borderRadius: "50%",
            border: "2px solid rgba(0,210,255,0)",
            animation: `${ringAnim} ${ringDur} ease-out ${delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Shield body */}
      <div
        style={{
          position: "relative",
          width: 310,
          height: 330,
          animation: hovered
            ? "shieldHover 1.8s ease-in-out infinite"
            : "shieldBreathe 3s ease-in-out infinite",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform .35s cubic-bezier(.23,1,.32,1)",
        }}
      >
        {/* Scanline sweep inside shield */}
        <div
          style={{
            position: "absolute",
            left: "12%",
            right: "12%",
            height: "6px",
            background:
              "linear-gradient(to bottom, transparent, rgba(0,220,255,.18), transparent)",
            animation: "scanLine 4s linear infinite",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Arc sparks on hover */}
        <ArcSparks active={hovered} />

        {/* ── SHIELD SVG ── */}
        <svg
          width="310"
          height="330"
          viewBox="0 0 310 330"
          fill="none"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            {/* Main border gradient */}
            <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#40f0ff" stopOpacity=".98" />
              <stop offset="40%" stopColor="#00aaff" stopOpacity=".85" />
              <stop offset="100%" stopColor="#00e0ff" stopOpacity=".7" />
            </linearGradient>
            {/* Fill gradient */}
            <linearGradient id="sg2" x1=".5" y1="0" x2=".5" y2="1">
              <stop offset="0%" stopColor="#002850" stopOpacity=".55" />
              <stop offset="100%" stopColor="#001030" stopOpacity=".35" />
            </linearGradient>
            {/* Glow filter for border */}
            <filter id="sfGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="6" result="b1" />
              <feGaussianBlur
                stdDeviation="12"
                result="b2"
                in="SourceGraphic"
              />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Inner glow */}
            <filter id="sfInner" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/*
            Shield shape from video:
            - Wide top (~290px across at shoulders)
            - Slight concave indentation at top center
            - Sides curve outward then taper to bottom point
            - Proportions roughly 310w × 310h before stem
          */}
          {/* ── shield path: wide squat shape matching video ── */}
          <path
            d="M155 14
               L28 58
               C28 58 22 80 22 120
               C22 220 80 285 155 315
               C230 285 288 220 288 120
               C288 80 282 58 282 58
               Z"
            fill="url(#sg2)"
          />
          {/* Outer glowing border */}
          <path
            d="M155 14
               L28 58
               C28 58 22 80 22 120
               C22 220 80 285 155 315
               C230 285 288 220 288 120
               C288 80 282 58 282 58
               Z"
            fill="none"
            stroke="url(#sg1)"
            strokeWidth="4"
            filter="url(#sfGlow)"
          />
          {/* Sharp bright inner edge */}
          <path
            d="M155 14
               L28 58
               C28 58 22 80 22 120
               C22 220 80 285 155 315
               C230 285 288 220 288 120
               C288 80 282 58 282 58
               Z"
            fill="none"
            stroke="rgba(180,245,255,.8)"
            strokeWidth="1.5"
          />
          {/* Inner offset shape */}
          <path
            d="M155 28
               L42 66
               C42 66 36 85 36 122
               C36 212 88 272 155 300
               C222 272 274 212 274 122
               C274 85 268 66 268 66
               Z"
            fill="none"
            stroke="rgba(0,190,255,.18)"
            strokeWidth="1.2"
            filter="url(#sfInner)"
          />

          {/* Horizontal circuit lines inside */}
          <line
            x1="68"
            y1="115"
            x2="242"
            y2="115"
            stroke="rgba(0,190,255,.12)"
            strokeWidth="1"
          />
          <line
            x1="58"
            y1="155"
            x2="252"
            y2="155"
            stroke="rgba(0,190,255,.10)"
            strokeWidth="1"
          />
          <line
            x1="66"
            y1="195"
            x2="244"
            y2="195"
            stroke="rgba(0,190,255,.08)"
            strokeWidth="1"
          />
          <line
            x1="82"
            y1="235"
            x2="228"
            y2="235"
            stroke="rgba(0,190,255,.06)"
            strokeWidth="1"
          />

          {/* Top-left corner bracket */}
          <path
            d="M38 65 L38 82 L55 82"
            fill="none"
            stroke="rgba(0,210,255,.4)"
            strokeWidth="1.8"
            style={{ animation: "stemPulse 2.2s ease-in-out infinite" }}
          />
          {/* Top-right corner bracket */}
          <path
            d="M272 65 L272 82 L255 82"
            fill="none"
            stroke="rgba(0,210,255,.4)"
            strokeWidth="1.8"
            style={{ animation: "stemPulse 2.2s ease-in-out infinite .7s" }}
          />

          {/* Bottom stem */}
          <line
            x1="155"
            y1="315"
            x2="155"
            y2="320"
            stroke="rgba(0,210,255,.6)"
            strokeWidth="3"
          />
        </svg>

        {/* ── Bs text — large, stone/concrete look ── */}
        <div
          style={{
            position: "absolute",
            top: "44%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Orbitron', monospace",
            fontSize: 88,
            fontWeight: 900,
            color: "transparent",
            letterSpacing: -4,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 5,
            lineHeight: 1,
            /* Cracked stone/concrete effect via multi-layer text-shadow */
            WebkitTextStroke: "1.5px rgba(220,240,255,.9)",
            textShadow: hovered
              ? `
              0 0 0px #fff,
              2px 2px 0px rgba(100,140,180,.35),
              0 0 30px rgba(255,255,255,.8),
              0 0 60px rgba(0,220,255,.55),
              0 0 100px rgba(0,190,255,.3)
            `
              : `
              0 0 0px #fff,
              2px 2px 0px rgba(80,110,150,.4),
              0 0 16px rgba(255,255,255,.5),
              0 0 40px rgba(0,200,255,.25)
            `,
            transition: "text-shadow .35s",
            /* Cracked stone fill using gradient */
            background: `
            linear-gradient(
              160deg,
              #e8eef5 0%,
              #c8d8e8 18%,
              #f0f5fa 25%,
              #a8b8cc 32%,
              #dde8f0 40%,
              #b8c8d8 52%,
              #eef2f8 60%,
              #ccd8e4 72%,
              #f2f5fa 82%,
              #b0c0d4 90%,
              #e0e8f2 100%
            )
          `,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Bs
        </div>

        {/* ── Comet / streak across shield ── */}
        {/* This is the diagonal orange streak going lower-left → upper-right */}
        <div
          style={{
            position: "absolute",
            top: "18%",
            left: "8%",
            width: "82%",
            height: "52%",
            pointerEvents: "none",
            zIndex: 6,
            animation: "cometStreak 3.5s ease-in-out infinite",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 260 180"
            fill="none"
            style={{
              animation: "cometGlow 1.8s ease-in-out infinite alternate",
            }}
          >
            <defs>
              <linearGradient id="cometGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff4400" stopOpacity="0" />
                <stop offset="30%" stopColor="#ff7700" stopOpacity=".5" />
                <stop offset="65%" stopColor="#ffaa00" stopOpacity=".9" />
                <stop offset="80%" stopColor="#ffcc44" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff0aa" stopOpacity=".6" />
              </linearGradient>
              <linearGradient id="cometCore" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff6600" stopOpacity="0" />
                <stop offset="60%" stopColor="#ffbb33" stopOpacity=".7" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity=".9" />
              </linearGradient>
            </defs>
            {/* Tail — wide feathered */}
            <path
              d="M10 165 C50 130, 100 100, 160 55 C180 40, 210 20, 248 8
                 C230 14, 195 32, 170 50 C120 85, 68 118, 30 152 Z"
              fill="url(#cometGrad)"
            />
            {/* Core bright streak */}
            <line
              x1="30"
              y1="152"
              x2="248"
              y2="8"
              stroke="url(#cometCore)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Bright tip */}
            <circle cx="248" cy="8" r="5" fill="#fff8e0" opacity=".85" />
            <circle cx="248" cy="8" r="10" fill="#ffcc44" opacity=".35" />
          </svg>
        </div>
      </div>
      {/* end shield body */}

      {/* Bottom stem + glowing dot */}
      <div
        style={{
          position: "absolute",
          bottom: 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 3,
          height: 28,
          background:
            "linear-gradient(to bottom, rgba(0,210,255,.7), rgba(0,180,255,.15))",
          animation: "stemPulse 3s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 3,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #00f0ff 0%, #091830 60%, transparent 100%)",
          animation: "dotGlow 2.8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </div>
  );
}
