"use client";

import { useEffect, useRef } from "react";

export default function FireCanvas({ cx, cy }: { cx: number; cy: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let startRaf: number;
    let animId: number;
    let frameCount = 0;
    let cleanupVisibility = () => {};

    const init = () => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      const onVisibilityChange = () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else loop();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      cleanupVisibility = () =>
        document.removeEventListener("visibilitychange", onVisibilityChange);

      const embers = Array.from({ length: 22 }, () => ({
        x: cx + (Math.random() - 0.5) * 32,
        y: cy,
        vx: (Math.random() - 0.5) * 1.3,
        vy: -(Math.random() * 2.0 + 0.6),
        r: Math.random() * 2.8 + 0.8,
        life: Math.random(),
        decay: Math.random() * 0.022 + 0.008,
      }));

      const loop = () => {
        animId = requestAnimationFrame(loop);
        frameCount++;
        if (frameCount % 2 !== 0) return; // ~30fps

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        embers.forEach((e) => {
          e.x += e.vx;
          e.y += e.vy;
          e.vx += (Math.random() - 0.5) * 0.09;
          e.life += e.decay;

          if (e.life >= 1) {
            e.x = cx + (Math.random() - 0.5) * 32;
            e.y = cy;
            e.vx = (Math.random() - 0.5) * 1.3;
            e.vy = -(Math.random() * 2.0 + 0.6);
            e.life = 0;
          }

          const fade = 1 - e.life;
          const rad = e.r * 3.5;
          const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, rad);
          g.addColorStop(0, `rgba(255,200,60,${(fade * 0.98).toFixed(2)})`);
          g.addColorStop(0.35, `rgba(255,120,10,${(fade * 0.75).toFixed(2)})`);
          g.addColorStop(0.7, `rgba(255,50,0,${(fade * 0.45).toFixed(2)})`);
          g.addColorStop(1, "rgba(255,30,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(e.x, e.y, rad, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      loop();
    };

    // Wait one rAF — fixes blank canvas on first load (Next.js hydration timing)
    startRaf = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(startRaf);
      cancelAnimationFrame(animId);
      cleanupVisibility();
    };
  }, [cx, cy]);

  return (
    <canvas
      ref={ref}
      width={220}
      height={140}
      style={{
        position: "absolute",
        left: cx - 110,
        top: cy - 120,
        pointerEvents: "none",
        zIndex: 12,
      }}
    />
  );
}
