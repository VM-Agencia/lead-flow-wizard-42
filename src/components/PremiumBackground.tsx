import { useEffect, useRef, useCallback } from "react";

export default function PremiumBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glowRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="premium-bg fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* L1 — Base gradient */}
      <div className="premium-bg__base absolute inset-0" />

      {/* L2 — Glow blobs */}
      <div className="premium-bg__blob premium-bg__blob--1" />
      <div className="premium-bg__blob premium-bg__blob--2" />
      <div className="premium-bg__blob premium-bg__blob--3" />
      <div className="premium-bg__blob premium-bg__blob--4" />

      {/* L3 — Grid */}
      <div className="premium-bg__grid absolute inset-0" />

      {/* L4 — Particles */}
      <ParticleField />

      {/* L5 — Noise */}
      <div className="premium-bg__noise absolute inset-0" />

      {/* L6 — Cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-500"
        style={{
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(43 56% 52% / 0.07) 0%, hsl(43 56% 52% / 0.03) 30%, transparent 70%)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
}

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
      isGold: boolean;
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
      const count = isMobile ? 25 : 50;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12 - 0.04,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        alphaDir: (Math.random() - 0.5) * 0.004,
        isGold: Math.random() > 0.3,
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

        if (p.alpha <= 0.05 || p.alpha >= 0.55) p.alphaDir *= -1;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const color = p.isGold ? gold : blue;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color.r},${color.g},${color.b},${p.alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
