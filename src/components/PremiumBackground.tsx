import { useEffect, useRef } from "react";

/**
 * PremiumBackground — multi-layer atmospheric background
 * Layers: base gradient, animated glow blobs, grid, floating particles, cursor glow
 * All CSS-based except particles (lightweight canvas)
 */
export default function PremiumBackground() {
  return (
    <div className="premium-bg fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* L1 — Base gradient with depth */}
      <div className="premium-bg__base absolute inset-0" />

      {/* L2 — Animated glow blobs */}
      <div className="premium-bg__blob premium-bg__blob--1" />
      <div className="premium-bg__blob premium-bg__blob--2" />
      <div className="premium-bg__blob premium-bg__blob--3" />
      <div className="premium-bg__blob premium-bg__blob--4" />

      {/* L3 — Subtle tech grid */}
      <div className="premium-bg__grid absolute inset-0" />

      {/* L4 — Floating particles (canvas) */}
      <ParticleField />

      {/* L5 — Noise/grain texture */}
      <div className="premium-bg__noise absolute inset-0" />
    </div>
  );
}

/* ─── Particle canvas — lightweight floating dots ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      alphaDir: number;
    }[] = [];

    const gold = { r: 212, g: 175, b: 55 };
    const blue = { r: 100, g: 140, b: 220 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 20 : 40;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1 - 0.05,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        alphaDir: (Math.random() - 0.5) * 0.003,
      }));
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;

        if (p.alpha <= 0.05 || p.alpha >= 0.5) p.alphaDir *= -1;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const color = Math.random() > 0.3 ? gold : blue;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color.r},${color.g},${color.b},${p.alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
