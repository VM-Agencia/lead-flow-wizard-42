import { useEffect, useRef, useCallback } from "react";

/*
  PREMIUM BACKGROUND — Ultra immersive multi-layer system
  
  Canvas layers (single canvas, multi-pass for performance):
    1. Data flow lines — animated paths simulating data movement
    2. Node network — connected dots with subtle pulsing
    3. Multi-depth particles — 3 layers with parallax
  
  CSS layers:
    - Base gradient (deep multi-tone)
    - Animated glow blobs (4 breathing halos)
    - Tech grid (subtle animated pattern)
    - Noise texture
    - Cursor glow (follows pointer)
*/

export default function PremiumBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const blobsRef = useRef<HTMLDivElement>(null);

  // Cursor glow
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glowRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  // Scroll parallax for blobs
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (blobsRef.current) {
        const y = scrollRef.current * 0.05;
        blobsRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="premium-bg fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* L1 — Deep base gradient */}
      <div className="premium-bg__base absolute inset-0" />

      {/* L2 — Animated glow blobs with scroll parallax */}
      <div ref={blobsRef} className="absolute inset-0 will-change-transform">
        <div className="premium-bg__blob premium-bg__blob--1" />
        <div className="premium-bg__blob premium-bg__blob--2" />
        <div className="premium-bg__blob premium-bg__blob--3" />
        <div className="premium-bg__blob premium-bg__blob--4" />
        <div className="premium-bg__blob premium-bg__blob--5" />
      </div>

      {/* L3 — Tech grid (animated via CSS) */}
      <div className="premium-bg__grid absolute inset-0" />

      {/* L4 — Canvas: particles + data flows + nodes */}
      <ImmersiveCanvas />

      {/* L5 — Noise grain */}
      <div className="premium-bg__noise absolute inset-0" />

      {/* L6 — Cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-700"
        style={{
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(43 56% 52% / 0.08) 0%, hsl(43 56% 52% / 0.03) 35%, transparent 70%)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   IMMERSIVE CANVAS — particles, nodes, data flows
   Single canvas, multi-pass rendering
   ═══════════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaDir: number;
  layer: number; // 0=back, 1=mid, 2=front
  isGold: boolean;
}

interface FlowLine {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  alpha: number;
  isGold: boolean;
}

interface Node {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
}

function ImmersiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    const isMobile = window.innerWidth < 768;

    // Colors
    const gold = [212, 175, 55];
    const blue = [80, 130, 220];
    const purple = [140, 100, 200];

    // State
    let particles: Particle[] = [];
    let flows: FlowLine[] = [];
    let nodes: Node[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();

      // --- Particles (3 layers) ---
      const pCount = isMobile ? 30 : 70;
      particles = Array.from({ length: pCount }, () => {
        const layer = Math.random() < 0.4 ? 0 : Math.random() < 0.7 ? 1 : 2;
        const speedMul = layer === 0 ? 0.3 : layer === 1 ? 0.6 : 1;
        const sizeMul = layer === 0 ? 0.5 : layer === 1 ? 0.8 : 1.2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2 * speedMul,
          vy: (Math.random() - 0.5) * 0.15 * speedMul - 0.02,
          size: (Math.random() * 1.5 + 0.5) * sizeMul,
          alpha: Math.random() * 0.4 + 0.1,
          alphaDir: (Math.random() - 0.5) * 0.004,
          layer,
          isGold: Math.random() > 0.35,
        };
      });

      // --- Data flow lines ---
      const fCount = isMobile ? 3 : 6;
      flows = Array.from({ length: fCount }, () => createFlow());

      // --- Nodes ---
      const nCount = isMobile ? 8 : 18;
      nodes = Array.from({ length: nCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      }));
    }

    function createFlow(): FlowLine {
      const startX = Math.random() * w;
      const startY = Math.random() * h;
      const points: { x: number; y: number }[] = [{ x: startX, y: startY }];
      const segments = 3 + Math.floor(Math.random() * 4);

      for (let i = 0; i < segments; i++) {
        const prev = points[points.length - 1];
        points.push({
          x: prev.x + (Math.random() - 0.5) * 300,
          y: prev.y + (Math.random() - 0.3) * 200,
        });
      }

      return {
        points,
        progress: 0,
        speed: 0.002 + Math.random() * 0.003,
        alpha: 0.08 + Math.random() * 0.12,
        isGold: Math.random() > 0.4,
      };
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function getFlowPoint(flow: FlowLine, t: number) {
      const pts = flow.points;
      const total = pts.length - 1;
      const idx = Math.min(Math.floor(t * total), total - 1);
      const local = (t * total) - idx;
      return {
        x: lerp(pts[idx].x, pts[idx + 1].x, local),
        y: lerp(pts[idx].y, pts[idx + 1].y, local),
      };
    }

    let frameCount = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      frameCount++;

      // --- Draw node connections ---
      const maxDist = isMobile ? 100 : 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const a = (1 - dist / maxDist) * 0.06;
            ctx!.strokeStyle = `rgba(${gold[0]},${gold[1]},${gold[2]},${a})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // --- Draw nodes (pulsing) ---
      for (const n of nodes) {
        n.pulsePhase += n.pulseSpeed;
        const pulse = 0.3 + Math.sin(n.pulsePhase) * 0.3;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${gold[0]},${gold[1]},${gold[2]},${pulse})`;
        ctx!.fill();
      }

      // --- Draw data flows ---
      for (const flow of flows) {
        flow.progress += flow.speed;
        if (flow.progress > 1) {
          Object.assign(flow, createFlow());
          flow.progress = 0;
        }

        const headT = flow.progress;
        const tailT = Math.max(0, headT - 0.15);
        const steps = 20;
        const color = flow.isGold ? gold : blue;

        ctx!.lineWidth = 1;
        for (let s = 0; s < steps; s++) {
          const t1 = lerp(tailT, headT, s / steps);
          const t2 = lerp(tailT, headT, (s + 1) / steps);
          const p1 = getFlowPoint(flow, t1);
          const p2 = getFlowPoint(flow, t2);
          const segAlpha = (s / steps) * flow.alpha;

          ctx!.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${segAlpha})`;
          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.stroke();
        }

        // Glow at head
        const head = getFlowPoint(flow, headT);
        const grd = ctx!.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8);
        grd.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${flow.alpha * 0.6})`);
        grd.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // --- Draw particles (layered) ---
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;

        if (p.alpha <= 0.05 || p.alpha >= 0.55) p.alphaDir *= -1;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const color = p.isGold ? gold : (p.layer === 0 ? purple : blue);
        const layerAlpha = p.layer === 0 ? p.alpha * 0.5 : p.layer === 1 ? p.alpha * 0.7 : p.alpha;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${layerAlpha})`;
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
      style={{ opacity: 0.8 }}
    />
  );
}
