import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

/* ═══════════════════════════════════════════
   DATA — Business types & their flows
   ═══════════════════════════════════════════ */

interface BusinessFlow {
  icon: string;
  label: string;
  steps: { label: string; detail: string }[];
  stat: { value: string; label: string };
}

const businesses: BusinessFlow[] = [
  {
    icon: "💈",
    label: "Barbería",
    steps: [
      { label: "Cliente pide cita", detail: "WhatsApp / Instagram" },
      { label: "Respuesta automática", detail: "En menos de 1 segundo" },
      { label: "Horarios disponibles", detail: "Sincronizado en tiempo real" },
      { label: "Cita confirmada", detail: "Sin intervención manual" },
    ],
    stat: { value: "+180%", label: "más citas agendadas" },
  },
  {
    icon: "⚡",
    label: "Electricista",
    steps: [
      { label: "Solicitud urgente", detail: "Formulario / WhatsApp" },
      { label: "Respuesta inmediata", detail: "Clasificación automática" },
      { label: "Recoge información", detail: "Tipo de avería y zona" },
      { label: "Servicio agendado", detail: "Asignación automática" },
    ],
    stat: { value: "+220%", label: "más servicios cerrados" },
  },
  {
    icon: "🔧",
    label: "Fontanero",
    steps: [
      { label: "Avería reportada", detail: "Cualquier canal digital" },
      { label: "Respuesta automática", detail: "24/7 sin esperas" },
      { label: "Prioriza urgencia", detail: "IA clasifica gravedad" },
      { label: "Visita programada", detail: "Agenda optimizada" },
    ],
    stat: { value: "+195%", label: "más clientes atendidos" },
  },
  {
    icon: "🚗",
    label: "Detailing",
    steps: [
      { label: "Solicita lavado premium", detail: "Mensaje automático" },
      { label: "Respuesta enviada", detail: "Catálogo + precios" },
      { label: "Disponibilidad ofrecida", detail: "Calendario en vivo" },
      { label: "Reserva confirmada", detail: "Pago anticipado" },
    ],
    stat: { value: "+240%", label: "más reservas al mes" },
  },
  {
    icon: "🏥",
    label: "Clínica",
    steps: [
      { label: "Paciente solicita cita", detail: "Web / WhatsApp" },
      { label: "Respuesta automática", detail: "Formulario inteligente" },
      { label: "Filtra servicio", detail: "Especialidad + urgencia" },
      { label: "Cita agendada", detail: "Confirmación + recordatorio" },
    ],
    stat: { value: "+310%", label: "más citas sin llamadas" },
  },
  {
    icon: "🍽️",
    label: "Restaurante",
    steps: [
      { label: "Solicita reserva", detail: "Instagram / Google" },
      { label: "Respuesta automática", detail: "Menú + opciones" },
      { label: "Valida disponibilidad", detail: "Mesas en tiempo real" },
      { label: "Reserva confirmada", detail: "Recordatorio automático" },
    ],
    stat: { value: "+160%", label: "más reservas online" },
  },
];

/* ═══════════════════════════════════════════
   Canvas — Node network background
   ═══════════════════════════════════════════ */

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
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 22000), 50);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.6,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      const maxDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx!.strokeStyle = `rgba(${gold.r},${gold.g},${gold.b},${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${gold.r},${gold.g},${gold.b},0.4)`;
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
      style={{ opacity: 0.5 }}
    />
  );
}

/* ═══════════════════════════════════════════
   Live dot indicator
   ═══════════════════════════════════════════ */

function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
  );
}

/* ═══════════════════════════════════════════
   Flow visualization — the "live system"
   ═══════════════════════════════════════════ */

function FlowVisualization({
  business,
  animKey,
}: {
  business: BusinessFlow;
  animKey: number;
}) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    setActiveStep(-1);
    const timers: ReturnType<typeof setTimeout>[] = [];
    business.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), 600 + i * 700));
    });
    return () => timers.forEach(clearTimeout);
  }, [animKey, business.steps]);

  return (
    <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
      {/* System header */}
      <div className="flex items-center gap-2 mb-6">
        <LiveDot />
        <span className="text-[11px] font-medium tracking-wider uppercase text-emerald-400/80">
          Sistema activo — {business.label}
        </span>
      </div>

      {/* Flow steps */}
      <div className="space-y-3">
        {business.steps.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={`${animKey}-${i}`} className="flex items-start gap-3">
              {/* Connector line + node */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "border-gold bg-gold/30 shadow-[0_0_12px_hsl(43,56%,52%,0.4)]"
                      : "border-border bg-background"
                  }`}
                />
                {i < business.steps.length - 1 && (
                  <div className="relative w-[2px] h-8 mt-1">
                    <div className="absolute inset-0 bg-border" />
                    <div
                      className="absolute top-0 left-0 w-full bg-gold/60 transition-all duration-500"
                      style={{ height: isActive ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>

              {/* Card */}
              <div
                className={`flex-1 rounded-xl border px-4 py-3 transition-all duration-500 ${
                  isActive
                    ? "border-gold/20 bg-card/80 backdrop-blur-sm shadow-lg shadow-gold/[0.06]"
                    : "border-border/40 bg-card/20"
                } ${isCurrent ? "scale-[1.02]" : "scale-100"}`}
              >
                <p
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isActive ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-[11px] mt-0.5 transition-colors duration-500 ${
                    isActive ? "text-muted-foreground" : "text-muted-foreground/30"
                  }`}
                >
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result stat */}
      <div
        className={`mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-700 ${
          activeStep >= business.steps.length - 1
            ? "border-gold/20 bg-gold/[0.06] opacity-100 translate-y-0"
            : "border-transparent bg-transparent opacity-0 translate-y-2"
        }`}
      >
        <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold font-bold text-sm shrink-0">
          {business.icon}
        </div>
        <div>
          <p className="text-xl font-bold text-gold">{business.stat.value}</p>
          <p className="text-[11px] text-muted-foreground">{business.stat.label}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO — Main component
   ═══════════════════════════════════════════ */

export default function HeroSection() {
  const [selected, setSelected] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const selectBusiness = useCallback(
    (idx: number) => {
      if (idx === selected) return;
      setSelected(idx);
      setAnimKey((k) => k + 1);
    },
    [selected],
  );

  // Auto-cycle every 8s if user hasn't interacted
  const interacted = useRef(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (interacted.current) return;
      setSelected((s) => {
        const next = (s + 1) % businesses.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* ── BG layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(225,30%,8%)]" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gold/[0.03] blur-[160px]" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(220,80%,50%)]/[0.03] blur-[140px]" />
      <NodeNetwork />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto section-padding pt-32 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── Left — Copy + Selector ── */}
          <div>
            {/* Tag */}
            <div
              className="animate-fade-up mb-8"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.06] text-gold text-[11px] font-semibold tracking-widest uppercase">
                <LiveDot />
                Sistema activo 24/7
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-tight text-balance animate-fade-up mb-6"
              style={{ animationDelay: "0.2s", lineHeight: "0.98" }}
            >
              Automatizamos{" "}
              <span className="text-gold">procesos clave</span> de tu negocio
              con IA
            </h1>

            {/* Sub */}
            <p
              className="text-base sm:text-lg text-muted-foreground max-w-lg text-pretty animate-fade-up mb-8"
              style={{ animationDelay: "0.3s" }}
            >
              Selecciona a qué te dedicas y observa cómo funcionaría tu sistema
              automatizado en tiempo real.
            </p>

            {/* ── Business selector ── */}
            <div
              className="animate-fade-up mb-10"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wide uppercase">
                ¿A qué te dedicas?
              </p>
              <div className="flex flex-wrap gap-2">
                {businesses.map((b, i) => (
                  <button
                    key={b.label}
                    onClick={() => {
                      interacted.current = true;
                      selectBusiness(i);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 active:scale-[0.96] ${
                      selected === i
                        ? "bg-gold/15 text-gold border border-gold/30 shadow-[0_0_16px_hsl(43,56%,52%,0.12)]"
                        : "bg-card/40 text-muted-foreground border border-border/50 hover:border-gold/20 hover:text-foreground"
                    }`}
                  >
                    <span className="mr-1.5">{b.icon}</span>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-start gap-3 animate-fade-up mb-4"
              style={{ animationDelay: "0.5s" }}
            >
              <Button
                variant="gold"
                size="xl"
                asChild
                className="animate-glow-pulse"
              >
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
                  WhatsApp
                </a>
              </Button>
            </div>

            <p
              className="text-xs text-muted-foreground animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              Te mostramos cómo se aplicaría exactamente en tu negocio
            </p>
          </div>

          {/* ── Right — Flow visualization ── */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <FlowVisualization
              business={businesses[selected]}
              animKey={animKey}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
