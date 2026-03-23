import { useEffect, useRef, useCallback } from "react";

/*
  ULTRA PREMIUM BACKGROUND — Agency-grade immersive system
  
  Canvas systems:
    1. Data matrix — scrolling text/numbers like a live data feed
    2. Network nodes — connected pulsing constellation
    3. Data flow lines — animated paths with glowing heads
    4. Orbital rings — slow rotating ellipses
    5. Multi-layer particles — 3 depth layers
    6. Pulse waves — expanding rings from random points
  
  CSS layers:
    - Deep gradient base
    - 5 animated glow blobs with scroll parallax
    - Pulsing tech grid
    - Noise texture
    - Cursor glow
*/

export default function PremiumBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glowRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (blobsRef.current) {
        blobsRef.current.style.transform = `translateY(${window.scrollY * 0.06}px)`;
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
      <div className="premium-bg__base absolute inset-0" />

      <div ref={blobsRef} className="absolute inset-0 will-change-transform">
        <div className="premium-bg__blob premium-bg__blob--1" />
        <div className="premium-bg__blob premium-bg__blob--2" />
        <div className="premium-bg__blob premium-bg__blob--3" />
        <div className="premium-bg__blob premium-bg__blob--4" />
        <div className="premium-bg__blob premium-bg__blob--5" />
      </div>

      <div className="premium-bg__grid absolute inset-0" />

      <ImmersiveCanvas />

      <div className="premium-bg__noise absolute inset-0" />

      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-500"
        style={{
          width: 700,
          height: 700,
          marginLeft: -350,
          marginTop: -350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(43 56% 52% / 0.10) 0%, hsl(43 56% 52% / 0.04) 30%, transparent 65%)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   IMMERSIVE CANVAS
   ═══════════════════════════════════════════ */

const GOLD = [212, 175, 55] as const;
const BLUE = [80, 140, 230] as const;
const PURPLE = [140, 100, 210] as const;
const CYAN = [60, 200, 220] as const;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function ImmersiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    const mobile = window.innerWidth < 768;

    // ── State ──
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; aDir: number; layer: number; color: readonly number[] };
    type FlowLine = { pts: { x: number; y: number }[]; progress: number; speed: number; alpha: number; color: readonly number[] };
    type Node = { x: number; y: number; r: number; phase: number; speed: number };
    type PulseWave = { x: number; y: number; radius: number; maxRadius: number; alpha: number; color: readonly number[] };
    type DataCol = { x: number; chars: string[]; y: number; speed: number; alpha: number; color: readonly number[] };
    type Ring = { cx: number; cy: number; rx: number; ry: number; rotation: number; rotSpeed: number; alpha: number; color: readonly number[] };

    let particles: Particle[] = [];
    let flows: FlowLine[] = [];
    let nodes: Node[] = [];
    let pulses: PulseWave[] = [];
    let dataCols: DataCol[] = [];
    let rings: Ring[] = [];

    // ── Data characters ──
    const dataChars = "01αβγδ→←↑↓⟶◈◇□△▽●∞≈∴∅ΣΔΩ".split("");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pickColor() {
      const r = Math.random();
      if (r < 0.45) return GOLD;
      if (r < 0.7) return BLUE;
      if (r < 0.9) return PURPLE;
      return CYAN;
    }

    function createFlow(): FlowLine {
      const pts: { x: number; y: number }[] = [{ x: Math.random() * w, y: Math.random() * h }];
      const segs = 4 + Math.floor(Math.random() * 5);
      for (let i = 0; i < segs; i++) {
        const prev = pts[pts.length - 1];
        pts.push({
          x: prev.x + (Math.random() - 0.5) * 400,
          y: prev.y + (Math.random() - 0.3) * 250,
        });
      }
      return { pts, progress: 0, speed: 0.0015 + Math.random() * 0.004, alpha: 0.1 + Math.random() * 0.15, color: pickColor() };
    }

    function init() {
      resize();

      // Particles (3 layers)
      const pCount = mobile ? 40 : 90;
      particles = Array.from({ length: pCount }, () => {
        const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
        const sm = [0.25, 0.5, 1][layer];
        return {
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25 * sm, vy: (Math.random() - 0.5) * 0.18 * sm - 0.03,
          size: (Math.random() * 2 + 0.3) * sm, alpha: Math.random() * 0.5 + 0.1,
          aDir: (Math.random() - 0.5) * 0.005, layer, color: pickColor(),
        };
      });

      // Data flows
      flows = Array.from({ length: mobile ? 4 : 10 }, createFlow);

      // Nodes
      const nCount = mobile ? 12 : 28;
      nodes = Array.from({ length: nCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2.5 + 0.8,
        phase: Math.random() * Math.PI * 2, speed: 0.008 + Math.random() * 0.02,
      }));

      // Data matrix columns
      const dCount = mobile ? 6 : 16;
      dataCols = Array.from({ length: dCount }, () => ({
        x: Math.random() * w,
        chars: Array.from({ length: 8 + Math.floor(Math.random() * 12) }, () => dataChars[Math.floor(Math.random() * dataChars.length)]),
        y: Math.random() * h - 200,
        speed: 0.15 + Math.random() * 0.4,
        alpha: 0.03 + Math.random() * 0.05,
        color: pickColor(),
      }));

      // Orbital rings
      rings = Array.from({ length: mobile ? 2 : 4 }, () => ({
        cx: Math.random() * w, cy: Math.random() * h,
        rx: 100 + Math.random() * 250, ry: 40 + Math.random() * 100,
        rotation: Math.random() * Math.PI, rotSpeed: 0.0005 + Math.random() * 0.001,
        alpha: 0.04 + Math.random() * 0.06, color: pickColor(),
      }));

      // Initial pulses
      pulses = [];
    }

    function getFlowPoint(f: FlowLine, t: number) {
      const total = f.pts.length - 1;
      const idx = Math.min(Math.floor(t * total), total - 1);
      const local = (t * total) - idx;
      return { x: lerp(f.pts[idx].x, f.pts[idx + 1].x, local), y: lerp(f.pts[idx].y, f.pts[idx + 1].y, local) };
    }

    let frame = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      frame++;

      // ── 1. Data matrix columns ──
      ctx!.font = "10px monospace";
      for (const col of dataCols) {
        col.y += col.speed;
        if (col.y > h + 200) { col.y = -200; col.x = Math.random() * w; }
        for (let i = 0; i < col.chars.length; i++) {
          const cy = col.y + i * 16;
          if (cy < -20 || cy > h + 20) continue;
          const fade = i < 3 ? col.alpha * (i / 3) : i > col.chars.length - 3 ? col.alpha * ((col.chars.length - i) / 3) : col.alpha;
          ctx!.fillStyle = `rgba(${col.color[0]},${col.color[1]},${col.color[2]},${fade})`;
          ctx!.fillText(col.chars[i], col.x, cy);
        }
        // Randomly mutate chars
        if (Math.random() < 0.02) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = dataChars[Math.floor(Math.random() * dataChars.length)];
        }
      }

      // ── 2. Orbital rings ──
      for (const ring of rings) {
        ring.rotation += ring.rotSpeed;
        ctx!.save();
        ctx!.translate(ring.cx, ring.cy);
        ctx!.rotate(ring.rotation);
        ctx!.strokeStyle = `rgba(${ring.color[0]},${ring.color[1]},${ring.color[2]},${ring.alpha})`;
        ctx!.lineWidth = 0.5;
        ctx!.beginPath();
        ctx!.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
      }

      // ── 3. Node connections ──
      const maxDist = mobile ? 110 : 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const a = (1 - dist / maxDist) * 0.08;
            ctx!.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${a})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // ── 4. Nodes (pulsing) ──
      for (const n of nodes) {
        n.phase += n.speed;
        const pulse = 0.25 + Math.sin(n.phase) * 0.35;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${pulse})`;
        ctx!.fill();
        // Outer glow
        if (pulse > 0.4) {
          const grd = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
          grd.addColorStop(0, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${pulse * 0.15})`);
          grd.addColorStop(1, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},0)`);
          ctx!.fillStyle = grd;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // ── 5. Data flows ──
      for (const flow of flows) {
        flow.progress += flow.speed;
        if (flow.progress > 1) Object.assign(flow, createFlow(), { progress: 0 });

        const headT = flow.progress;
        const tailT = Math.max(0, headT - 0.12);
        const steps = 24;
        const c = flow.color;

        ctx!.lineWidth = 1.2;
        for (let s = 0; s < steps; s++) {
          const t1 = lerp(tailT, headT, s / steps);
          const t2 = lerp(tailT, headT, (s + 1) / steps);
          const p1 = getFlowPoint(flow, t1);
          const p2 = getFlowPoint(flow, t2);
          const segAlpha = (s / steps) * flow.alpha;
          ctx!.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${segAlpha})`;
          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.stroke();
        }

        // Glowing head
        const head = getFlowPoint(flow, headT);
        const grd = ctx!.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
        grd.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${flow.alpha * 0.8})`);
        grd.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 12, 0, Math.PI * 2);
        ctx!.fill();
      }

      // ── 6. Pulse waves ──
      if (frame % 120 === 0 && pulses.length < 5) {
        pulses.push({
          x: Math.random() * w, y: Math.random() * h,
          radius: 0, maxRadius: 150 + Math.random() * 200,
          alpha: 0.1 + Math.random() * 0.08, color: pickColor(),
        });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += 0.8;
        const life = 1 - p.radius / p.maxRadius;
        if (life <= 0) { pulses.splice(i, 1); continue; }
        ctx!.strokeStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.alpha * life})`;
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // ── 7. Particles ──
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.aDir;
        if (p.alpha <= 0.05 || p.alpha >= 0.6) p.aDir *= -1;
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        const la = [0.4, 0.65, 1][p.layer];
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.alpha * la})`;
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
      style={{ opacity: 0.85 }}
    />
  );
}
