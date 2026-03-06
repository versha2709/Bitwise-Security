import { useEffect, useRef, useState, useCallback } from "react";

/* ─── CONSTANTS ─── */
const PAD_TOP = 140;
const PAD_SIDE = 80;
const PAD_BOTTOM = 40;

const SHIELD_PATH =
  "M150 10 L16 52 C14 52,10 72,10 100 C10 195,72 275,150 328 C228 275,290 195,290 100 C290 72,286 52,284 52 Z";
const SHIELD_INNER =
  "M150 26 L32 64 C30 64,26 82,26 108 C26 194,84 268,150 316 C216 268,274 194,274 108 C274 82,270 64,268 64 Z";
const SHIELD_I2 =
  "M150 36 L44 72 C42 72,38 90,38 114 C38 192,90 258,150 304 C210 258,262 192,262 114 C262 90,258 72,256 72 Z";
const SHIELD_I3 =
  "M150 48 L56 80 C54 80,50 96,50 118 C50 190,96 250,150 292 C204 250,250 190,250 118 C250 96,246 80,244 80 Z";

/* ─── CSS ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@900&display=swap');

@keyframes shieldBreathe {
  0%,100%{ filter: drop-shadow(0 0 4px rgba(0,220,255,.9)) drop-shadow(0 0 10px rgba(0,200,255,.5)); }
  50%    { filter: drop-shadow(0 0 7px rgba(0,235,255,1))  drop-shadow(0 0 16px rgba(0,215,255,.7)); }
}
@keyframes shieldHover {
  0%,100%{ filter: drop-shadow(0 0 8px rgba(0,235,255,1))  drop-shadow(0 0 18px rgba(0,220,255,.8)); }
  50%    { filter: drop-shadow(0 0 12px rgba(0,245,255,1)) drop-shadow(0 0 26px rgba(0,230,255,.95)); }
}
@keyframes pulseRing {
  0%  { transform:scale(.15); opacity:.7;  border-color:rgba(255,150,40,.7); }
  100%{ transform:scale(1.6); opacity:0;   border-color:rgba(255,70,0,0); }
}
@keyframes pulseRingFast {
  0%  { transform:scale(.15); opacity:.85; border-color:rgba(255,170,55,.85); }
  100%{ transform:scale(1.6); opacity:0;   border-color:rgba(255,90,10,0); }
}
@keyframes energyRing {
  0%  { transform:scale(.4) rotate(0deg);   opacity:.7; }
  100%{ transform:scale(1.9) rotate(180deg); opacity:0; }
}
@keyframes orbitCW {
  from{ transform:rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
  to  { transform:rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
}
@keyframes orbitCCW {
  from{ transform:rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
  to  { transform:rotate(-360deg) translateX(var(--orbit-r)) rotate(360deg); }
}
@keyframes sparkPop {
  0%  { opacity:0; transform:scale(0); }
  20% { opacity:1; transform:scale(1.4); }
  70% { opacity:.8; }
  100%{ opacity:0; transform:scale(.2) translateY(-18px); }
}
@keyframes lightningFlash {
  0%,100%{ opacity:0; }
  2%     { opacity:1; }
  4%     { opacity:.3; }
  6%     { opacity:.9; }
  8%     { opacity:0; }
}
@keyframes runeRotate {
  from{ transform:rotate(0deg); }
  to  { transform:rotate(360deg); }
}
@keyframes runeRotateCCW {
  from{ transform:rotate(0deg); }
  to  { transform:rotate(-360deg); }
}
@keyframes scanLine {
  0%  { top:-4%; opacity:0; }
  4%  { opacity:.4; }
  96% { opacity:.12; }
  100%{ top:106%; opacity:0; }
}
@keyframes stemPulse {
  0%,100%{ opacity:.5; transform:translateX(-50%) scaleY(1); }
  50%    { opacity:1;   transform:translateX(-50%) scaleY(1.06); }
}
@keyframes dotPulse {
  0%,100%{ box-shadow:0 0 8px 3px rgba(255,140,60,.6),0 0 22px 5px rgba(255,80,0,.3); }
  50%    { box-shadow:0 0 18px 6px rgba(255,180,80,.95),0 0 40px 10px rgba(255,110,0,.6); }
}
@keyframes splatPop {
  0%,100%{ opacity:.7;  transform:translate(-50%,-50%) scale(1); }
  50%    { opacity:1;   transform:translate(-50%,-50%) scale(1.3); }
}
@keyframes arcFlick {
  0%,100%{ opacity:1; } 35%{ opacity:.03; } 65%{ opacity:.7; }
}
@keyframes sketchFlicker {
  0%,100%{ opacity:1; }
  48%    { opacity:.9; }
  52%    { opacity:.96; }
}
@keyframes plasmaShift {
  0%  { opacity:.5; transform:rotate(0deg) scaleX(1); }
  33% { opacity:.8; transform:rotate(120deg) scaleX(1.08); }
  66% { opacity:.4; transform:rotate(240deg) scaleX(.95); }
  100%{ opacity:.5; transform:rotate(360deg) scaleX(1); }
}
@keyframes coronaPulse {
  0%,100%{ opacity:.35; transform:scale(1); }
  50%    { opacity:.6;  transform:scale(1.04); }
}
@keyframes cometFly {
  0%  { opacity:0; transform:translate(-65px,48px) scale(.4); }
  14% { opacity:1; }
  86% { opacity:1; }
  100%{ opacity:0; transform:translate(65px,-48px) scale(1); }
}
@keyframes redStreakFly {
  0%  { opacity:0; transform:translate(52px,-40px) scale(.4); }
  14% { opacity:1; }
  86% { opacity:1; }
  100%{ opacity:0; transform:translate(-68px,52px) scale(1); }
}
@keyframes cometFly2 {
  0%  { opacity:0; transform:translate(40px,60px) scale(.3); }
  12% { opacity:.7; }
  88% { opacity:.7; }
  100%{ opacity:0; transform:translate(-55px,-70px) scale(1.1); }
}
@keyframes impactRipple {
  0%  { transform:scale(0.3); opacity:.9; }
  100%{ transform:scale(2.2); opacity:0; }
}
@keyframes glitchShift {
  0%,100%{ clip-path:inset(0 0 100% 0); }
  2%     { clip-path:inset(8% 0 82% 0); transform:translateX(-3px); }
  4%     { clip-path:inset(20% 0 60% 0); transform:translateX(3px); }
  6%     { clip-path:inset(45% 0 35% 0); transform:translateX(-2px); }
  8%     { clip-path:inset(0 0 100% 0); }
}
`;

function inject() {
  if (typeof document === "undefined") return;
  if (document.getElementById("shield-css-v9")) return;
  const s = document.createElement("style");
  s.id = "shield-css-v9";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ─── FLAME CANVAS (multi-layer) ─── */
function FlameCanvas({ width, height, hovered }: any) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current as any;
    if (!canvas) return;
    const cw = width + PAD_SIDE * 2;
    const ch = height + PAD_TOP + PAD_BOTTOM;
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    const sX = width / 300,
      sY = height / 340;
    const sx = (x: any) => x * sX + PAD_SIDE;
    const sy = (y: any) => y * sY + PAD_TOP;

    function cubicPt(
      t: number,
      x0: number,
      y0: number,
      cx1: number,
      cy1: number,
      cx2: number,
      cy2: number,
      x1: number,
      y1: number,
    ) {
      const m = 1 - t;
      return {
        x: sx(
          m * m * m * x0 +
            3 * m * m * t * cx1 +
            3 * m * t * t * cx2 +
            t * t * t * x1,
        ),
        y: sy(
          m * m * m * y0 +
            3 * m * m * t * cy1 +
            3 * m * t * t * cy2 +
            t * t * t * y1,
        ),
      };
    }

    const pts: any = [];
    const STEPS = 70;
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      pts.push({ x: sx(150 + (16 - 150) * t), y: sy(10 + (52 - 10) * t) });
    }
    const segs = [
      [16, 52, 14, 52, 10, 72, 10, 100],
      [10, 100, 10, 150, 40, 220, 90, 275],
      [90, 275, 110, 295, 130, 312, 150, 328],
      [150, 328, 170, 312, 190, 295, 210, 275],
      [210, 275, 260, 220, 290, 150, 290, 100],
      [290, 100, 290, 72, 286, 52, 284, 52],
    ];
    for (const [x0, y0, cx1, cy1, cx2, cy2, x1, y1] of segs)
      for (let i = 1; i <= STEPS; i++)
        pts.push(cubicPt(i / STEPS, x0, y0, cx1, cy1, cx2, cy2, x1, y1));
    for (let i = 1; i <= STEPS; i++) {
      const t = i / STEPS;
      pts.push({ x: sx(284 + (150 - 284) * t), y: sy(52 + (10 - 52) * t) });
    }

    // Layer 1: core bright flame
    const core: any = [];
    // Layer 2: outer wild flame
    const wild: any = [];
    // Layer 3: ember sparks
    const embers: any = [];

    const MAX_CORE = hovered ? 900 : 550;
    const MAX_WILD = hovered ? 400 : 200;
    const MAX_EMBER = hovered ? 180 : 80;
    const SPAWN_CORE = hovered ? 22 : 12;
    const SPAWN_WILD = hovered ? 10 : 5;
    const SPAWN_EMBER = hovered ? 6 : 2;

    function spawnCore() {
      const pt = pts[Math.floor(Math.random() * pts.length)];
      const life = 20 + Math.random() * 35;
      core.push({
        x: pt.x + (Math.random() - 0.5) * 2,
        y: pt.y + (Math.random() - 0.5) * 2,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.6 + Math.random() * 1.5),
        life,
        maxLife: life,
        size: 3 + Math.random() * (hovered ? 12 : 7.5),
      });
    }
    function spawnWild() {
      const pt = pts[Math.floor(Math.random() * pts.length)];
      const life = 15 + Math.random() * 25;
      wild.push({
        x: pt.x + (Math.random() - 0.5) * 6,
        y: pt.y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -(0.3 + Math.random() * 2.2),
        life,
        maxLife: life,
        size: 6 + Math.random() * (hovered ? 20 : 12),
      });
    }
    function spawnEmber() {
      const pt = pts[Math.floor(Math.random() * pts.length)];
      const life = 30 + Math.random() * 50;
      embers.push({
        x: pt.x,
        y: pt.y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(1.2 + Math.random() * 2.5),
        life,
        maxLife: life,
        size: 1 + Math.random() * 2.5,
      });
    }

    function drawParticle(p: any, type: string) {
      const t = p.life / p.maxLife;
      const sz = p.size * (0.3 + t * 0.7);
      let r, g, b, a;
      if (type === "ember") {
        r = 255;
        g = Math.round(100 + t * 155);
        b = Math.round(t * 50);
        a = t * 0.9;
      } else if (type === "wild") {
        if (t > 0.6) {
          r = 255;
          g = Math.round(t * 180);
          b = 0;
          a = t * 0.5;
        } else {
          r = Math.round(200 * t);
          g = 0;
          b = 0;
          a = t * 0.4;
        }
      } else {
        if (t > 0.72) {
          const f = (t - 0.72) / 0.28;
          r = 255;
          g = Math.round(210 + f * 45);
          b = Math.round(f * 120);
          a = t * 0.9;
        } else if (t > 0.42) {
          const f = (t - 0.42) / 0.3;
          r = 255;
          g = Math.round(f * 190);
          b = 0;
          a = t * 0.85;
        } else {
          r = Math.round(230 * (t / 0.42));
          g = 0;
          b = 0;
          a = t * 0.72;
        }
      }
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz);
      grd.addColorStop(0, `rgba(${r},${g},${b},${a})`);
      grd.addColorStop(0.45, `rgba(${r},${Math.max(0, g - 60)},0,${a * 0.5})`);
      grd.addColorStop(1, `rgba(${Math.max(0, r - 80)},0,0,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, cw, ch);
      for (let i = 0; i < SPAWN_WILD; i++) spawnWild();
      for (let i = 0; i < SPAWN_CORE; i++) spawnCore();
      for (let i = 0; i < SPAWN_EMBER; i++) spawnEmber();

      // Wild (draw first, behind)
      for (let i = wild.length - 1; i >= 0; i--) {
        const p = wild[i];
        p.x += p.vx + Math.sin(p.life * 0.25) * 0.6;
        p.y += p.vy;
        p.vy *= 0.978;
        p.vx *= 0.96;
        p.life--;
        if (p.life <= 0) {
          wild.splice(i, 1);
          continue;
        }
        drawParticle(p, "wild");
      }
      // Core
      for (let i = core.length - 1; i >= 0; i--) {
        const p = core[i];
        p.x += p.vx + Math.sin(p.life * 0.38) * 0.28;
        p.y += p.vy;
        p.vy *= 0.983;
        p.vx *= 0.975;
        p.life--;
        if (p.life <= 0) {
          core.splice(i, 1);
          continue;
        }
        drawParticle(p, "core");
      }
      // Embers (top layer)
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.x += p.vx + Math.sin(p.life * 0.2) * 0.4;
        p.y += p.vy;
        p.vy *= 0.99;
        p.vx *= 0.99;
        p.life--;
        if (p.life <= 0) {
          embers.splice(i, 1);
          continue;
        }
        drawParticle(p, "ember");
      }
      while (core.length > MAX_CORE) core.shift();
      while (wild.length > MAX_WILD) wild.shift();
      while (embers.length > MAX_EMBER) embers.shift();
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, hovered]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        top: -PAD_TOP,
        left: -PAD_SIDE,
        pointerEvents: "none",
        zIndex: 8,
      }}
    />
  );
}

/* ─── LIGHTNING CANVAS ─── */
function LightningCanvas({
  width,
  height,
  hovered,
}: {
  width: number;
  height: number;
  hovered: boolean;
}) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const timer = useRef(0);

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement | null;
    if (!canvas) return;
    canvas.width = width + PAD_SIDE * 2;
    canvas.height = height + PAD_TOP + PAD_BOTTOM;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;
    const cw = canvas.width,
      ch = canvas.height;
    const cx = cw / 2,
      cy = PAD_TOP + height * 0.08;

    function bolt(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      roughness: number,
      depth: number,
    ) {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return;
      }
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness;
      bolt(x1, y1, mx, my, roughness * 0.6, depth - 1);
      bolt(mx, my, x2, y2, roughness * 0.6, depth - 1);
      if (Math.random() < 0.3 && depth > 1) {
        const bx = mx + (Math.random() - 0.5) * roughness * 1.5;
        const by = my + roughness * (0.5 + Math.random() * 0.5);
        bolt(mx, my, bx, by, roughness * 0.4, depth - 2);
      }
    }

    let bolts: any[] = [];
    const interval = hovered ? 400 : 900;

    function addBolt() {
      const angle = Math.random() * Math.PI * 2;
      const r = 90 + Math.random() * 40;
      const x = cx + Math.cos(angle) * r;
      const y = cy + height * 0.3 + Math.sin(angle) * r * 0.7;
      bolts.push({
        x1: cx + (Math.random() - 0.5) * 20,
        y1: cy - 10,
        x2: x,
        y2: y,
        life: 8,
      });
    }

    function tick() {
      ctx.clearRect(0, 0, cw, ch);
      timer.current++;
      if (timer.current % Math.floor(interval / 16) === 0) addBolt();

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        const a = (b.life / 8) * (hovered ? 0.85 : 0.55);
        ctx.strokeStyle = `rgba(180,220,255,${a})`;
        ctx.lineWidth = b.life > 5 ? 1.5 : 0.8;
        ctx.shadowColor = `rgba(100,180,255,${a})`;
        ctx.shadowBlur = 6;
        bolt(b.x1, b.y1, b.x2, b.y2, 28, 5);
        ctx.shadowBlur = 0;
        b.life--;
        if (b.life <= 0) bolts.splice(i, 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, hovered]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        top: -PAD_TOP,
        left: -PAD_SIDE,
        pointerEvents: "none",
        zIndex: 14,
        opacity: hovered ? 1 : 0.6,
        transition: "opacity .4s",
      }}
    />
  );
}

/* ─── ARC SPARKS ─── */
function ArcSparks({ active }: { active: boolean }) {
  const [arcs, setArcs] = useState<
    Array<{
      id: number;
      x: string;
      y: string;
      h: string;
      op: number;
      dur: string;
    }>
  >([]);
  const ctr = useRef(0);
  useEffect(() => {
    if (!active) {
      setArcs([]);
      return;
    }
    const iv = setInterval(() => {
      const id = ctr.current++;
      setArcs((p) => [
        ...p.slice(-18),
        {
          id,
          x: `${6 + Math.random() * 88}%`,
          y: `${5 + Math.random() * 78}%`,
          h: `${6 + Math.random() * 22}%`,
          op: 0.2 + Math.random() * 0.75,
          dur: `${0.05 + Math.random() * 0.1}s`,
        },
      ]);
      setTimeout(() => setArcs((p) => p.filter((x) => x.id !== id)), 200);
    }, 40);
    return () => clearInterval(iv);
  }, [active]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 6,
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
              "linear-gradient(to bottom,transparent,#fff8e0,rgba(255,220,100,.3),transparent)",
            borderRadius: 1,
            boxShadow: "0 0 5px #ffcc44,0 0 10px #ff8800",
            opacity: a.op,
            animation: `arcFlick ${a.dur} steps(1) infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── PAINT SPLATS ─── */
const SPLATS = [
  { x: 14, y: 26, r: 9, c: "#dd1100", d: "0s" },
  { x: 28, y: 58, r: 6, c: "#cc1000", d: "0.35s" },
  { x: 20, y: 80, r: 5, c: "#cc1100", d: "1.0s" },
  { x: 50, y: 88, r: 11, c: "#ee1400", d: "0.18s" },
  { x: 62, y: 72, r: 7, c: "#dd1200", d: "0.7s" },
  { x: 38, y: 36, r: 5, c: "#cc1100", d: "0.5s" },
  { x: 86, y: 14, r: 7, c: "#2a5fc0", d: "0.6s" },
  { x: 90, y: 42, r: 5, c: "#1a4db0", d: "0.95s" },
  { x: 94, y: 68, r: 6, c: "#224caa", d: "0.85s" },
  { x: 78, y: 82, r: 4, c: "#1a3d99", d: "0.4s" },
  { x: 8, y: 46, r: 3, c: "#2255bb", d: "0.65s" },
  { x: 82, y: 62, r: 3, c: "#8899bb", d: "0.3s" },
  { x: 88, y: 74, r: 2, c: "#7788aa", d: "0.9s" },
];

/* ─── SKETCH Bs ─── */
function SketchBs({ hovered }: { hovered: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "44%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 12,
      }}
    >
      <svg
        width="220"
        height="148"
        viewBox="0 0 220 148"
        fill="none"
        overflow="visible"
      >
        {/* Chromatic aberration ghosts */}
        <text
          x="107"
          y="118"
          textAnchor="middle"
          fontFamily="'Georgia','Times New Roman',serif"
          fontSize="128"
          fontWeight="900"
          fill="rgba(255,30,30,.15)"
          letterSpacing="-4"
          transform="translate(-4,0)"
        >
          Bs
        </text>
        <text
          x="113"
          y="118"
          textAnchor="middle"
          fontFamily="'Georgia','Times New Roman',serif"
          fontSize="128"
          fontWeight="900"
          fill="rgba(30,100,255,.12)"
          letterSpacing="-4"
          transform="translate(4,0)"
        >
          Bs
        </text>

        {/* Subtle dark shadow */}
        <text
          x="110"
          y="120"
          textAnchor="middle"
          fontFamily="'Georgia','Times New Roman',serif"
          fontSize="128"
          fontWeight="900"
          fill="rgba(0,0,0,.4)"
          letterSpacing="-4"
        >
          Bs
        </text>

        {/* Main white fill */}
        <text
          x="110"
          y="118"
          textAnchor="middle"
          fontFamily="'Georgia','Times New Roman',serif"
          fontSize="128"
          fontWeight="900"
          fill="#ffffff"
          letterSpacing="-4"
          style={{
            filter: hovered
              ? "drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 18px rgba(255,170,70,.45))"
              : "drop-shadow(0 0 4px rgba(255,255,255,.7)) drop-shadow(0 0 10px rgba(255,140,50,.2))",
          }}
        >
          Bs
        </text>
      </svg>
    </div>
  );
}

/* ─── PLASMA CORONA ─── */
function PlasmaCrown({ hovered }: { hovered: boolean }) {
  const SHIELD =
    "M150 10 L16 52 C14 52,10 72,10 100 C10 195,72 275,150 328 C228 275,290 195,290 100 C290 72,286 52,284 52 Z";
  return (
    <svg
      width="300"
      height="340"
      viewBox="0 0 300 340"
      fill="none"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 7,
        opacity: hovered ? 0.6 : 0.22,
        transition: "opacity .5s",
      }}
    >
      <defs>
        <clipPath id="plasmaClip">
          <path d={SHIELD} />
        </clipPath>
        <radialGradient id="pg0" cx="30%" cy="15%" r="55%">
          <stop offset="0%" stopColor="rgba(255,100,20,.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="pg1" cx="70%" cy="20%" r="50%">
          <stop offset="0%" stopColor="rgba(255,120,15,.14)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="pg2" cx="20%" cy="55%" r="45%">
          <stop offset="0%" stopColor="rgba(255,80,10,.1)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="pg3" cx="80%" cy="60%" r="45%">
          <stop offset="0%" stopColor="rgba(255,90,15,.1)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Static warm glow pools — clipped to shield, NO rotation */}
      <rect
        x="0"
        y="0"
        width="300"
        height="340"
        fill="url(#pg0)"
        clipPath="url(#plasmaClip)"
      />
      <rect
        x="0"
        y="0"
        width="300"
        height="340"
        fill="url(#pg1)"
        clipPath="url(#plasmaClip)"
      />
      <rect
        x="0"
        y="0"
        width="300"
        height="340"
        fill="url(#pg2)"
        clipPath="url(#plasmaClip)"
      />
      <rect
        x="0"
        y="0"
        width="300"
        height="340"
        fill="url(#pg3)"
        clipPath="url(#plasmaClip)"
      />
    </svg>
  );
}

/* ─── MAIN SHIELD ─── */
export default function Shield() {
  inject();
  const wrapRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cur = useRef(1),
    tgt = useRef(1),
    raf = useRef(0);

  const onMove = useCallback((e: MouseEvent) => {
    const wrap = wrapRef.current as HTMLDivElement | null;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const dist = Math.hypot(
      e.clientX - (r.left + r.width / 2),
      e.clientY - (r.top + r.height / 2),
    );
    tgt.current = 1 + Math.max(0, 1 - dist / 450) * 0.2;
    setOffset({
      x: ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 16,
      y: ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 10,
    });
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      cur.current += (tgt.current - cur.current) * 0.07;
      setScale(+cur.current.toFixed(4));
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [onMove]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 360,
        height: 410,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        overflow: "visible",
        transform: `translate(${offset.x}px,${offset.y}px) scale(${scale})`,
        zIndex: 12,
        flexShrink: 0,
      }}
    >
      {/* Shield glow wrapper */}
      <div
        style={{
          position: "relative",
          width: 300,
          height: 340,
          overflow: "visible",
          isolation: "isolate",
          animation: hovered
            ? "shieldHover 1.5s ease-in-out infinite"
            : "shieldBreathe 3s ease-in-out infinite",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform .35s cubic-bezier(.23,1,.32,1)",
        }}
      >
        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            height: 5,
            background:
              "linear-gradient(180deg,transparent,rgba(255,210,120,.07),transparent)",
            animation: "scanLine 4.5s linear infinite",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Plasma corona */}
        <PlasmaCrown hovered={hovered} />

        <ArcSparks active={hovered} />

        {/* Paint splats */}
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
              background: s.c,
              boxShadow: `0 0 ${s.r * 2.5}px ${s.c}`,
              animation: `splatPop ${2 + i * 0.2}s ease-in-out infinite`,
              animationDelay: s.d,
              pointerEvents: "none",
              zIndex: 15,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}

        {/* FLAME CANVAS */}
        <FlameCanvas width={300} height={340} hovered={hovered} />

        {/* SHIELD SVG */}
        <svg
          width="300"
          height="340"
          viewBox="0 0 300 340"
          fill="none"
          style={{ position: "absolute", inset: 0, zIndex: 10 }}
        >
          <defs>
            <linearGradient id="navyFill2" x1=".5" y1="0" x2=".5" y2="1">
              <stop offset="0%" stopColor="#1c3050" stopOpacity=".97" />
              <stop offset="30%" stopColor="#0f1d34" stopOpacity=".98" />
              <stop offset="100%" stopColor="#060c18" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="rightPanel2" x1="0" y1=".5" x2="1" y2=".5">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,.06)" />
            </linearGradient>
            <linearGradient id="whiteBorder2" x1=".5" y1="0" x2=".5" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="1" />
              <stop offset="35%" stopColor="#00cfff" stopOpacity=".95" />
              <stop offset="100%" stopColor="#0088cc" stopOpacity=".75" />
            </linearGradient>
            <linearGradient id="dashRing2" x1=".5" y1="0" x2=".5" y2="1">
              <stop offset="0%" stopColor="rgba(0,220,255,.32)" />
              <stop offset="100%" stopColor="rgba(0,150,255,.07)" />
            </linearGradient>
            <radialGradient id="fireInner2" cx="50%" cy="95%" r="65%">
              <stop offset="0%" stopColor="rgba(255,120,25,.35)" />
              <stop offset="100%" stopColor="rgba(255,50,0,0)" />
            </radialGradient>
            <radialGradient id="fireTop2" cx="50%" cy="2%" r="55%">
              <stop offset="0%" stopColor="rgba(255,150,50,.22)" />
              <stop offset="100%" stopColor="rgba(255,60,0,0)" />
            </radialGradient>
            {/* Molten crack overlay */}
            <radialGradient id="molten" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,80,0,.04)" />
              <stop offset="70%" stopColor="rgba(255,40,0,.02)" />
              <stop offset="100%" stopColor="rgba(255,20,0,0)" />
            </radialGradient>
            {/* Tight cyan glow — stays right on the stroke, no spread */}
            <filter id="wGlow2" x="-8%" y="-6%" width="116%" height="112%">
              <feGaussianBlur stdDeviation="2" result="soft" />
              <feGaussianBlur
                stdDeviation="5"
                result="mid"
                in="SourceGraphic"
              />
              <feMerge>
                <feMergeNode in="mid" />
                <feMergeNode in="soft" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softG2" x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="sClip2">
              <path d={SHIELD_PATH} />
            </clipPath>
          </defs>

          {/* Body layers — transparent background, border only */}

          {/* Inner dashed rings */}
          <path
            d={SHIELD_INNER}
            fill="none"
            stroke="rgba(0,200,255,.22)"
            strokeWidth="6.5"
            strokeDasharray="3.5 2.5"
            clipPath="url(#sClip2)"
          />
          <path
            d={SHIELD_I2}
            fill="none"
            stroke="rgba(0,180,255,.12)"
            strokeWidth="3"
            strokeDasharray="2 2.2"
            clipPath="url(#sClip2)"
          />

          {/* Outer soft glow halo — miter joins to keep sharp corners */}
          <path
            d={SHIELD_PATH}
            fill="none"
            stroke="rgba(0,220,255,.25)"
            strokeWidth="18"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          <path
            d={SHIELD_PATH}
            fill="none"
            stroke="rgba(0,230,255,.4)"
            strokeWidth="8"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          {/* Core bright border */}
          <path
            d={SHIELD_PATH}
            fill="none"
            stroke="rgba(0,240,255,.95)"
            strokeWidth="2.5"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          {/* Crisp inner white-cyan line */}
          <path
            d={SHIELD_PATH}
            fill="none"
            stroke="rgba(180,255,255,.9)"
            strokeWidth="0.8"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          {/* Top bright edges */}
          <path
            d="M150 10 L16 52"
            fill="none"
            stroke="rgba(0,240,255,1)"
            strokeWidth="3.5"
            strokeLinecap="butt"
          />
          <path
            d="M150 10 L284 52"
            fill="none"
            stroke="rgba(0,240,255,1)"
            strokeWidth="3.5"
            strokeLinecap="butt"
          />

          {/* HUD corner brackets */}
          <path
            d="M20 66 L20 90 L44 90"
            fill="none"
            stroke="rgba(0,200,255,.4)"
            strokeWidth="2"
            style={{ animation: "stemPulse 2.2s ease-in-out infinite" }}
          />
          <path
            d="M280 66 L280 90 L256 90"
            fill="none"
            stroke="rgba(0,200,255,.4)"
            strokeWidth="2"
            style={{ animation: "stemPulse 2.2s ease-in-out infinite .7s" }}
          />
          {/* Top center bracket */}
          <path
            d="M135 14 L135 30 L165 30 L165 14"
            fill="none"
            stroke="rgba(0,200,255,.28)"
            strokeWidth="1.6"
          />
          {/* Bottom tip bracket */}
          <path
            d="M140 320 L140 332 L160 332 L160 320"
            fill="none"
            stroke="rgba(0,200,255,.22)"
            strokeWidth="1.2"
          />

          {/* Side ticks */}
          {[100, 145, 190, 235].map((y, i) => (
            <g key={y}>
              <line
                x1={13}
                y1={y}
                x2={22}
                y2={y}
                stroke="rgba(0,200,255,.3)"
                strokeWidth="1.2"
              />
              <line
                x1={287}
                y1={y}
                x2={278}
                y2={y}
                stroke="rgba(0,200,255,.3)"
                strokeWidth="1.2"
              />
            </g>
          ))}

          {/* Interior horizontal scan lines */}
          {[108, 150, 195, 242].map((y, i) => (
            <line
              key={y}
              x1={18 + i * 8}
              y1={y}
              x2={282 - i * 8}
              y2={y}
              stroke="rgba(0,200,255,0.04)"
              strokeWidth="1"
            />
          ))}

          {/* Bottom tip */}
          <line
            x1="150"
            y1="328"
            x2="150"
            y2="337"
            stroke="rgba(0,220,255,.7)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Sketch Bs */}
        <SketchBs hovered={hovered} />

        {/* Orange comet streak */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "32%",
            width: "60%",
            height: "36%",
            pointerEvents: "none",
            zIndex: 11,
            animation: "cometFly 3.4s ease-in-out infinite",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 185 125" fill="none">
            <defs>
              <linearGradient id="oG2" x1="0" y1=".5" x2="1" y2=".5">
                <stop offset="0%" stopColor="#ff4400" stopOpacity="0" />
                <stop offset="22%" stopColor="#ff6600" stopOpacity=".55" />
                <stop offset="58%" stopColor="#ff8800" stopOpacity=".95" />
                <stop offset="83%" stopColor="#ff9900" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffcc44" stopOpacity=".55" />
              </linearGradient>
            </defs>
            <path
              d="M4 82 C32 66,70 46,118 20 C142 8,162 2,183 0 C174 4,154 12,128 24 C80 48,40 68,12 92 Z"
              fill="url(#oG2)"
            />
            <path
              d="M8 90 C36 74,74 52,122 26 C144 14,164 8,183 5 C176 8,158 16,132 30 C84 54,44 74,16 98 Z"
              fill="url(#oG2)"
              opacity=".5"
            />
            <path
              d="M2 78 C30 62,68 42,116 16 C140 4,160 -1,183 -2 C175 2,155 10,128 22 C80 44,40 64,10 88 Z"
              fill="url(#oG2)"
              opacity=".3"
            />
          </svg>
        </div>

        {/* Second comet (blue tint) */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "45%",
            height: "28%",
            pointerEvents: "none",
            zIndex: 11,
            animation: "cometFly2 5.8s ease-in-out infinite 2.1s",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 140 95" fill="none">
            <defs>
              <linearGradient id="blueG" x1="1" y1=".5" x2="0" y2=".5">
                <stop offset="0%" stopColor="#2244cc" stopOpacity="0" />
                <stop offset="40%" stopColor="#3355ee" stopOpacity=".5" />
                <stop offset="80%" stopColor="#4466ff" stopOpacity=".85" />
                <stop offset="100%" stopColor="#6688ff" stopOpacity=".4" />
              </linearGradient>
            </defs>
            <path
              d="M136 20 C108 34,72 52,30 74 C14 82,2 88,0 92 C10 86,30 76,52 66 C94 44,128 26,138 10 Z"
              fill="url(#blueG)"
            />
            <path
              d="M136 28 C108 42,72 60,30 82 C14 90,2 96,0 98 C10 92,30 82,52 72 C94 50,128 34,138 18 Z"
              fill="url(#blueG)"
              opacity=".4"
            />
          </svg>
        </div>

        {/* Red streak */}
        <div
          style={{
            position: "absolute",
            top: "46%",
            left: "4%",
            width: "56%",
            height: "35%",
            pointerEvents: "none",
            zIndex: 11,
            animation: "redStreakFly 4.0s ease-in-out infinite 1.2s",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 175 115" fill="none">
            <defs>
              <linearGradient id="rG2" x1="1" y1=".5" x2="0" y2=".5">
                <stop offset="0%" stopColor="#aa0000" stopOpacity="0" />
                <stop offset="22%" stopColor="#cc0000" stopOpacity=".55" />
                <stop offset="58%" stopColor="#dd1100" stopOpacity=".92" />
                <stop offset="82%" stopColor="#ee2200" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff4422" stopOpacity=".52" />
              </linearGradient>
            </defs>
            <path
              d="M170 28 C138 42,98 62,52 86 C32 98,12 108,0 114 C12 108,36 96,58 84 C104 60,144 40,172 20 Z"
              fill="url(#rG2)"
            />
            <path
              d="M172 35 C140 49,100 69,54 93 C34 105,14 113,2 118 C14 113,38 103,60 91 C106 67,146 47,174 27 Z"
              fill="url(#rG2)"
              opacity=".45"
            />
            <path
              d="M170 22 C138 36,98 56,52 80 C32 92,12 102,0 108 C12 102,36 90,58 78 C104 54,144 34,172 14 Z"
              fill="url(#rG2)"
              opacity=".28"
            />
          </svg>
        </div>
      </div>

      {/* Stem + dot */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: "50%",
          transform: "translateX(-50%)",
          width: 3.5,
          height: 32,
          borderRadius: 2,
          background:
            "linear-gradient(180deg,rgba(255,170,60,.75),rgba(255,80,0,.06))",
          animation: "stemPulse 3s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#ffaa44 0%,#0a1525 60%,transparent 100%)",
          animation: "dotPulse 2.4s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </div>
  );
}
