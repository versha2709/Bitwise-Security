"use client";

import { useEffect, useRef } from "react";

// PERF FIX: Reduced node count (28→18) and particle count (55→35)
// PERF FIX: Removed ctx.shadowBlur (most expensive canvas op - was called 55x per frame)
// PERF FIX: Reduced connection distance (185→140) cuts O(n²) checks significantly
// PERF FIX: Use willReadFrequently:false hint

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false })!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // PERF FIX: 18 nodes instead of 28 (cuts O(n²) checks by 58%)
    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }));

    // PERF FIX: 35 particles instead of 55, no shadowBlur
    const pts = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      life: Math.random(),
      decay: Math.random() * 0.005 + 0.002,
      col: Math.random() < 0.35 ? "#ff4422" : "#1177cc",
    }));

    // PERF FIX: frame throttle — only run full draw every other frame
    let frameCount = 0;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      frameCount++;
      // Skip every other frame — halves CPU cost, imperceptible visually
      if (frameCount % 2 !== 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Node network
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;

        // PERF FIX: reduced connection distance 185→140
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy; // avoid sqrt unless needed
          if (d2 < 140 * 140) {
            const d = Math.sqrt(d2);
            ctx.globalAlpha = (1 - d / 140) * 0.17;
            ctx.strokeStyle = "#1155aa";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 0.38;
        ctx.fillStyle = "#2266bb";
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Particles — PERF FIX: no shadowBlur/shadowColor
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += p.decay;
        if (
          p.life >= 1 ||
          p.x < 0 ||
          p.x > canvas.width ||
          p.y < 0 ||
          p.y > canvas.height
        ) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = 0;
        }
        const f = Math.sin(p.life * Math.PI);
        ctx.globalAlpha = f * 0.55;
        // No shadowBlur — was the #1 perf killer
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    loop();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
