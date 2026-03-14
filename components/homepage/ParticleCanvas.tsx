"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let startRaf: number;
    let animId: number;
    let frameCount = 0;

    // Hoisted so cleanup can always reference them even before init runs
    let cleanupResize = () => {};
    let cleanupVisibility = () => {};

    const init = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: false })!;

      // Set real dimensions now that DOM is fully painted
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      cleanupResize = () => window.removeEventListener("resize", resize);

      // Pause when tab hidden (e.g. user switches to YouTube)
      const onVisibilityChange = () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else loop();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      cleanupVisibility = () =>
        document.removeEventListener("visibilitychange", onVisibilityChange);

      const nodes = Array.from({ length: 18 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));

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

      const loop = () => {
        animId = requestAnimationFrame(loop);
        frameCount++;
        if (frameCount % 2 !== 0) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
          nodes[i].x += nodes[i].vx;
          nodes[i].y += nodes[i].vy;
          if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
          if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;

          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d2 = dx * dx + dy * dy;
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
          ctx.fillStyle = p.col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      };

      loop();
    };

    // Wait one rAF — guarantees DOM is fully painted before canvas starts
    // Fixes: blank canvas on first load in Next.js (SSR hydration timing issue)
    startRaf = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(startRaf);
      cancelAnimationFrame(animId);
      cleanupResize();
      cleanupVisibility();
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
