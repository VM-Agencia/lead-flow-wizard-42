import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ── Animated node network (canvas) ── */
function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const gold = { r: 212, g: 175, b: 55 };

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function init() {
      resize();
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 18000), 60);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw connections
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx!.strokeStyle = `rgba(${gold.r},${gold.g},${gold.b},${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${gold.r},${gold.g},${gold.b},0.5)`;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ── Floating status cards ── */
function FloatingCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute rounded-xl border border-gold/10 bg-card/60 backdrop-blur-md px-4 py-3 shadow-xl shadow-black/30 animate-fade-up ${className}`}
      style={{ animationDelay: delay, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    const timer = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(timer);
  }, [target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ── HERO ── */
export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(225,30%,8%)]" />

      {/* Radial glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gold/[0.03] blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(220,80%,50%)]/[0.04] blur-[140px]" />

      {/* Node network */}
      <NodeNetwork />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--gold)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)/0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto section-padding pt-32 pb-28">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.06] text-gold text-[11px] font-semibold tracking-widest uppercase mb-8">
                <LiveDot />
                Sistema activo 24/7
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.95] tracking-tight text-balance animate-fade-up mb-7"
              style={{ animationDelay: "0.2s", lineHeight: "0.95" }}
            >
              Automatizamos{" "}
              <span className="text-gold">procesos clave</span>{" "}
              de tu negocio con IA
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty animate-fade-up mb-10"
              style={{ animationDelay: "0.35s" }}
            >
              Captación, respuesta y seguimiento — automatizados en un sistema
              que trabaja en segundo plano mientras tú te enfocas en crecer.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up mb-5"
              style={{ animationDelay: "0.5s" }}
            >
              <Button variant="gold" size="xl" asChild className="animate-glow-pulse">
                <a href="#contacto">
                  Agenda tu llamada gratuita
                  <ArrowRight className="ml-1" size={18} />
                </a>
              </Button>
              <Button variant="goldOutline" size="xl" asChild>
                <a
                  href="https://wa.me/+34632507839?text=Hola%2C%20quiero%20automatizar%20mi%20negocio"
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle size={18} />
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>

            <p
              className="text-xs text-muted-foreground animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              Sin compromiso · Te mostramos una propuesta clara en la llamada
            </p>
          </div>

          {/* Right — Live system visual */}
          <div
            className="relative hidden lg:block w-[380px] h-[420px] animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center glow-gold">
              <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-md bg-gold animate-pulse" />
              </div>
            </div>

            {/* Orbit ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-gold/[0.08]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-gold/[0.05]" />

            {/* Floating cards */}
            <FloatingCard className="top-2 left-4" delay="0.7s">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold text-xs font-bold">
                  IA
                </div>
                <div>
                  <p className="text-[11px] font-medium text-foreground/90">Lead cualificado</p>
                  <p className="text-[10px] text-muted-foreground">Hace 12s</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="top-16 right-0" delay="0.9s">
              <div className="flex items-center gap-2">
                <LiveDot />
                <p className="text-[11px] font-medium text-emerald-400">
                  <Counter target={47} /> leads hoy
                </p>
              </div>
            </FloatingCard>

            <FloatingCard className="bottom-24 -left-4" delay="1.1s">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[hsl(220,80%,50%)]/10 flex items-center justify-center text-[hsl(220,80%,50%)] text-[10px] font-bold">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] font-medium text-foreground/90">Respuesta enviada</p>
                  <p className="text-[10px] text-muted-foreground">&lt;1s automático</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="bottom-4 right-4" delay="1.3s">
              <div className="text-center">
                <p className="text-lg font-bold text-gold">
                  <Counter target={312} suffix="%" />
                </p>
                <p className="text-[10px] text-muted-foreground">más conversiones</p>
              </div>
            </FloatingCard>

            {/* Connecting lines (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 380 420"
            >
              {/* Hub to cards — animated dashes */}
              <line x1="190" y1="210" x2="80" y2="40" stroke="hsl(43,56%,52%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="190" y1="210" x2="330" y2="90" stroke="hsl(43,56%,52%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2.5s" repeatCount="indefinite" />
              </line>
              <line x1="190" y1="210" x2="50" y2="340" stroke="hsl(43,56%,52%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.8s" repeatCount="indefinite" />
              </line>
              <line x1="190" y1="210" x2="330" y2="380" stroke="hsl(43,56%,52%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2.2s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
