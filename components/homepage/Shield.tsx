"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── inject keyframes once ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

@keyframes shieldBreathe {
  0%,100% {
    filter: drop-shadow(0 0 18px rgba(255,255,255,.25))
            drop-shadow(0 0 44px rgba(30,80,160,.35))
            drop-shadow(0 0 80px rgba(10,40,100,.2));
  }
  50% {
    filter: drop-shadow(0 0 28px rgba(255,255,255,.38))
            drop-shadow(0 0 70px rgba(40,100,200,.45))
            drop-shadow(0 0 120px rgba(20,60,140,.28));
  }
}
@keyframes shieldHover {
  0%,100% {
    filter: drop-shadow(0 0 36px rgba(255,255,255,.55))
            drop-shadow(0 0 80px rgba(50,120,220,.6))
            drop-shadow(0 0 160px rgba(30,80,180,.35));
  }
  50% {
    filter: drop-shadow(0 0 52px rgba(255,255,255,.7))
            drop-shadow(0 0 110px rgba(60,140,240,.75))
            drop-shadow(0 0 200px rgba(40,100,200,.45));
  }
}
@keyframes pulseRing {
  0%   { transform: scale(.3);  opacity: 1;   border-color: rgba(200,220,255,.7); }
  100% { transform: scale(1.8); opacity: 0;   border-color: rgba(200,220,255,0); }
}
@keyframes pulseRingFast {
  0%   { transform: scale(.3);  opacity: 1;   border-color: rgba(220,235,255,.9); }
  100% { transform: scale(1.8); opacity: 0;   border-color: rgba(220,235,255,0); }
}
@keyframes cometStreak {
  0%   { opacity: 0;   transform: translate(-120px, 80px)  scaleX(.4); }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { opacity: 0;   transform: translate(110px, -80px) scaleX(1); }
}
@keyframes redStreakAnim {
  0%   { opacity: 0;   transform: translate(80px, -60px) scaleX(.4); }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { opacity: 0;   transform: translate(-100px, 70px) scaleX(1); }
}
@keyframes cometGlow {
  0%,100% { filter: drop-shadow(0 0 6px #ff8800) drop-shadow(0 0 18px rgba(255,100,0,.6)); }
  50%      { filter: drop-shadow(0 0 14px #ffaa00) drop-shadow(0 0 32px rgba(255,140,0,.8)); }
}
@keyframes redGlow {
  0%,100% { filter: drop-shadow(0 0 6px #cc1100) drop-shadow(0 0 16px rgba(200,20,0,.5)); }
  50%      { filter: drop-shadow(0 0 12px #ff2200) drop-shadow(0 0 28px rgba(220,40,0,.7)); }
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
  0%,100% { box-shadow: 0 0 8px 2px rgba(180,200,255,.5), 0 0 20px 4px rgba(100,150,255,.25); }
  50%     { box-shadow: 0 0 16px 4px rgba(200,220,255,.8), 0 0 40px 8px rgba(120,170,255,.45); }
}
@keyframes scanLine {
  0%   { top: -8%; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: .6; }
  100% { top: 108%; opacity: 0; }
}
@keyframes splatPulse {
  0%,100% { opacity: .7; transform: scale(1); }
  50%     { opacity: 1;  transform: scale(1.15); }
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
              "linear-gradient(to bottom, transparent, #c8d8ff, rgba(180,200,255,.3), transparent)",
            borderRadius: 1,
            boxShadow: "0 0 5px #aabbff, 0 0 10px #6688cc",
            opacity: a.op,
            animation: `arcFlick ${a.dur} steps(1) infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Paint splatter dots matching logo ── */
const SPLATS = [
  // Red dots (logo has ~5 red dots)
  { x: 22, y: 38, r: 9, color: "#cc1100", delay: "0s" },
  { x: 38, y: 68, r: 6, color: "#dd2200", delay: "0.4s" },
  { x: 72, y: 28, r: 5, color: "#bb0f00", delay: "0.8s" },
  { x: 52, y: 82, r: 11, color: "#ee1500", delay: "0.2s" },
  { x: 18, y: 72, r: 4, color: "#cc1100", delay: "1.1s" },
  // Blue/teal dots (logo has scattered blue dots)
  { x: 82, y: 22, r: 7, color: "#2266cc", delay: "0.6s" },
  { x: 78, y: 58, r: 5, color: "#1155bb", delay: "1.0s" },
  { x: 88, y: 42, r: 4, color: "#3377dd", delay: "0.3s" },
  { x: 90, y: 72, r: 6, color: "#1a4499", delay: "0.9s" },
  { x: 14, y: 52, r: 3, color: "#2255aa", delay: "0.7s" },
];

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
        cursor: "default",
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        zIndex: 12,
      }}
    >
      {/* Pulse rings — now silver/white tinted to match logo */}
      {[0, 0.95, 1.9].map((delay, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: -28,
            borderRadius: "50%",
            border: "2px solid rgba(200,220,255,0)",
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
        {/* Scanline sweep */}
        <div
          style={{
            position: "absolute",
            left: "12%",
            right: "12%",
            height: "6px",
            background:
              "linear-gradient(to bottom, transparent, rgba(180,210,255,.14), transparent)",
            animation: "scanLine 4s linear infinite",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Arc sparks on hover */}
        <ArcSparks active={hovered} />

        {/* ── Paint splatter dots — positioned around shield like the logo ── */}
        {SPLATS.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: "50%",
              background: s.color,
              boxShadow: `0 0 ${s.r * 2}px ${s.color}`,
              animation: `splatPulse ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: s.delay,
              pointerEvents: "none",
              zIndex: 7,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* ── SHIELD SVG ── */}
        <svg
          width="310"
          height="330"
          viewBox="0 0 310 330"
          fill="none"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            {/* Deep navy fill — matches logo shield body */}
            <linearGradient id="sg2" x1=".5" y1="0" x2=".5" y2="1">
              <stop offset="0%" stopColor="#1a2d4e" stopOpacity=".96" />
              <stop offset="50%" stopColor="#0d1e38" stopOpacity=".98" />
              <stop offset="100%" stopColor="#07111f" stopOpacity="1" />
            </linearGradient>
            {/* White/silver border gradient — matches logo's shield outline */}
            <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".95" />
              <stop offset="40%" stopColor="#c8d8ee" stopOpacity=".8" />
              <stop offset="100%" stopColor="#e0ecff" stopOpacity=".7" />
            </linearGradient>
            {/* Subtle inner edge */}
            <linearGradient id="sg3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".22" />
              <stop offset="100%" stopColor="#8aaad0" stopOpacity=".08" />
            </linearGradient>
            {/* Glow filter — white/silver toned */}
            <filter id="sfGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="5" result="b1" />
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
            <filter id="sfInner" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shield fill — deep navy */}
          <path
            d="M155 14 L28 58 C28 58 22 80 22 120 C22 220 80 285 155 315 C230 285 288 220 288 120 C288 80 282 58 282 58 Z"
            fill="url(#sg2)"
          />
          {/* Outer white/silver glowing border */}
          <path
            d="M155 14 L28 58 C28 58 22 80 22 120 C22 220 80 285 155 315 C230 285 288 220 288 120 C288 80 282 58 282 58 Z"
            fill="none"
            stroke="url(#sg1)"
            strokeWidth="3.5"
            filter="url(#sfGlow)"
          />
          {/* Bright sharp inner edge — logo has a white highlight ring */}
          <path
            d="M155 14 L28 58 C28 58 22 80 22 120 C22 220 80 285 155 315 C230 285 288 220 288 120 C288 80 282 58 282 58 Z"
            fill="none"
            stroke="rgba(255,255,255,.65)"
            strokeWidth="1.2"
          />
          {/* Inner offset ring */}
          <path
            d="M155 28 L42 66 C42 66 36 85 36 122 C36 212 88 272 155 300 C222 272 274 212 274 122 C274 85 268 66 268 66 Z"
            fill="none"
            stroke="url(#sg3)"
            strokeWidth="1.2"
            filter="url(#sfInner)"
          />

          {/* Subtle interior circuit lines — very faint */}
          <line
            x1="68"
            y1="115"
            x2="242"
            y2="115"
            stroke="rgba(140,170,220,.08)"
            strokeWidth="1"
          />
          <line
            x1="58"
            y1="155"
            x2="252"
            y2="155"
            stroke="rgba(140,170,220,.06)"
            strokeWidth="1"
          />
          <line
            x1="66"
            y1="195"
            x2="244"
            y2="195"
            stroke="rgba(140,170,220,.05)"
            strokeWidth="1"
          />
          <line
            x1="82"
            y1="235"
            x2="228"
            y2="235"
            stroke="rgba(140,170,220,.04)"
            strokeWidth="1"
          />

          {/* Corner brackets */}
          <path
            d="M38 65 L38 82 L55 82"
            fill="none"
            stroke="rgba(200,220,255,.3)"
            strokeWidth="1.8"
            style={{ animation: "stemPulse 2.2s ease-in-out infinite" }}
          />
          <path
            d="M272 65 L272 82 L255 82"
            fill="none"
            stroke="rgba(200,220,255,.3)"
            strokeWidth="1.8"
            style={{ animation: "stemPulse 2.2s ease-in-out infinite .7s" }}
          />

          {/* Bottom tip line */}
          <line
            x1="155"
            y1="315"
            x2="155"
            y2="320"
            stroke="rgba(200,220,255,.5)"
            strokeWidth="3"
          />
        </svg>

        {/* ── Bs text — solid white like the logo ── */}
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
            /* White/off-white solid fill like logo */
            WebkitTextStroke: "2px rgba(255,255,255,.9)",
            textShadow: hovered
              ? `
                0 0 0px #fff,
                2px 2px 0px rgba(80,100,140,.4),
                0 0 24px rgba(255,255,255,.9),
                0 0 50px rgba(180,210,255,.5)
              `
              : `
                0 0 0px #fff,
                2px 2px 0px rgba(60,80,120,.45),
                0 0 14px rgba(255,255,255,.55),
                0 0 32px rgba(160,190,240,.25)
              `,
            transition: "text-shadow .35s",
            /* Concrete/stone gradient matching logo's Bs */
            background: `
              linear-gradient(
                150deg,
                #f0f4fa 0%,
                #d8e4f0 15%,
                #ffffff 24%,
                #c0d0e4 33%,
                #eaf0f8 42%,
                #b8cce0 54%,
                #f4f8fc 62%,
                #ccdaec 74%,
                #ffffff 83%,
                #b0c4d8 91%,
                #e8f0fa 100%
              )
            `,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Bs
        </div>

        {/* ── Orange comet streak — top-right direction, matches logo ── */}
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
            <path
              d="M10 165 C50 130, 100 100, 160 55 C180 40, 210 20, 248 8
                 C230 14, 195 32, 170 50 C120 85, 68 118, 30 152 Z"
              fill="url(#cometGrad)"
            />
            <line
              x1="30"
              y1="152"
              x2="248"
              y2="8"
              stroke="url(#cometCore)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="248" cy="8" r="5" fill="#fff8e0" opacity=".85" />
            <circle cx="248" cy="8" r="10" fill="#ffcc44" opacity=".35" />
          </svg>
        </div>

        {/* ── Red streak — bottom-left direction, matches logo's red brush ── */}
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "5%",
            width: "70%",
            height: "44%",
            pointerEvents: "none",
            zIndex: 6,
            animation: "redStreakAnim 4.2s ease-in-out infinite 1.4s",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 220 160"
            fill="none"
            style={{ animation: "redGlow 2s ease-in-out infinite alternate" }}
          >
            <defs>
              <linearGradient id="redGrad" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cc0000" stopOpacity="0" />
                <stop offset="35%" stopColor="#dd1100" stopOpacity=".55" />
                <stop offset="70%" stopColor="#ff2200" stopOpacity=".85" />
                <stop offset="88%" stopColor="#ff4422" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff7755" stopOpacity=".5" />
              </linearGradient>
              <linearGradient id="redCore" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#aa0000" stopOpacity="0" />
                <stop offset="60%" stopColor="#ee2200" stopOpacity=".7" />
                <stop offset="100%" stopColor="#ff6644" stopOpacity=".9" />
              </linearGradient>
            </defs>
            {/* Wide feathered tail */}
            <path
              d="M210 10 C170 40, 120 75, 70 115 C50 130, 24 148, 8 155
                 C26 148, 56 132, 76 118 C128 80, 175 48, 214 18 Z"
              fill="url(#redGrad)"
            />
            {/* Bright core streak */}
            <line
              x1="210"
              y1="10"
              x2="8"
              y2="155"
              stroke="url(#redCore)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Bright tip */}
            <circle cx="8" cy="155" r="4" fill="#ff8866" opacity=".8" />
            <circle cx="8" cy="155" r="9" fill="#ff3300" opacity=".3" />
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
            "linear-gradient(to bottom, rgba(200,220,255,.6), rgba(160,190,255,.1))",
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
            "radial-gradient(circle, #ccddff 0%, #091830 60%, transparent 100%)",
          animation: "dotGlow 2.8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </div>
  );
}
