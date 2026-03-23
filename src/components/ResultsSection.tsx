import { useState, useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import {
  Zap,
  Brain,
  BarChart3,
  RefreshCw,
  Clock,
  Bot,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  MessageSquareOff,
  MessagesSquare,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

/* ═══════════════════════════════════════════
   BEFORE / AFTER — Scenarios
   ═══════════════════════════════════════════ */

interface StatusItem {
  icon: React.ElementType;
  text: string;
  detail: string;
}

const beforeItems: StatusItem[] = [
  { icon: MessageSquareOff, text: "3 mensajes sin responder", detail: "Hace 4 horas" },
  { icon: AlertTriangle, text: "Lead perdido en Instagram", detail: "No se respondió a tiempo" },
  { icon: XCircle, text: "Cita cancelada sin aviso", detail: "Hueco sin cubrir" },
  { icon: Clock, text: "2h organizando agenda", detail: "Trabajo manual repetitivo" },
];

const afterItems: StatusItem[] = [
  { icon: MessagesSquare, text: "Todos los mensajes respondidos", detail: "En menos de 1 segundo" },
  { icon: CheckCircle2, text: "Lead captado y cualificado", detail: "Automáticamente por IA" },
  { icon: Users, text: "3 citas confirmadas hoy", detail: "Sin intervención manual" },
  { icon: TrendingUp, text: "Pipeline actualizado", detail: "Todo organizado en tiempo real" },
];

/* ═══════════════════════════════════════════
   RESULT CARDS — Support blocks
   ═══════════════════════════════════════════ */

const resultCards = [
  { icon: Zap, title: "Respuestas al instante", desc: "Cada mensaje se responde en menos de 1 segundo, 24/7." },
  { icon: Brain, title: "Menos carga mental", desc: "Deja de pensar en seguimientos. El sistema lo hace por ti." },
  { icon: BarChart3, title: "Más control", desc: "Dashboard con métricas reales de captación y conversión." },
  { icon: RefreshCw, title: "Nada se pierde", desc: "Cada lead queda registrado y en seguimiento automático." },
  { icon: Clock, title: "Más tiempo disponible", desc: "Recupera horas cada semana para lo que importa." },
  { icon: Bot, title: "El sistema trabaja sin ti", desc: "Mientras duermes, el negocio sigue captando clientes." },
];

/* ═══════════════════════════════════════════
   LIVE DOT
   ═══════════════════════════════════════════ */

function LiveDot({ color = "emerald" }: { color?: "emerald" | "red" }) {
  const c = color === "emerald" ? "bg-emerald-400" : "bg-red-400";
  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c} opacity-60`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${c}`} />
    </span>
  );
}

/* ═══════════════════════════════════════════
   STATUS PANEL (Before or After)
   ═══════════════════════════════════════════ */

function StatusPanel({
  items,
  mode,
  isVisible,
}: {
  items: StatusItem[];
  mode: "before" | "after";
  isVisible: boolean;
}) {
  const isBefore = mode === "before";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-700 ${
        isBefore
          ? "border-red-500/20 bg-red-500/[0.04]"
          : "border-gold/20 bg-gold/[0.04]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <LiveDot color={isBefore ? "red" : "emerald"} />
        <span
          className={`text-[11px] font-semibold tracking-widest uppercase ${
            isBefore ? "text-red-400/80" : "text-emerald-400/80"
          }`}
        >
          {isBefore ? "Sin automatización" : "Con VM Agencia IA"}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              } ${
                isBefore
                  ? "border-red-500/10 bg-red-500/[0.03]"
                  : "border-gold/10 bg-gold/[0.03]"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isBefore ? "bg-red-500/10" : "bg-gold/10"
                }`}
              >
                <Icon
                  size={16}
                  className={isBefore ? "text-red-400" : "text-gold"}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.text}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN — ResultsSection
   ═══════════════════════════════════════════ */

export default function ResultsSection() {
  const sectionRef = useReveal();
  const [activeView, setActiveView] = useState<"before" | "after">("before");
  const [panelVisible, setPanelVisible] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setInterval>>();

  // Animate items in on view/tab change
  useEffect(() => {
    setPanelVisible(false);
    const t = setTimeout(() => setPanelVisible(true), 80);
    return () => clearTimeout(t);
  }, [activeView]);

  // Auto-toggle every 5s
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      setActiveView((v) => (v === "before" ? "after" : "before"));
    }, 5000);
    return () => clearInterval(autoTimer.current);
  }, []);

  const handleToggle = (view: "before" | "after") => {
    clearInterval(autoTimer.current);
    setActiveView(view);
  };

  return (
    <section id="resultados" className="py-28 lg:py-40 section-padding relative">
      {/* BG accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.03] blur-[180px] pointer-events-none" />

      <div ref={sectionRef} className="reveal max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Resultados
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6"
            style={{ lineHeight: "1.08" }}
          >
            Lo que cambia cuando{" "}
            <span className="text-gold">activas el sistema</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No es teoría. Es la diferencia entre gestionar a mano y tener un
            sistema que trabaja por ti.
          </p>
        </div>

        {/* ── Toggle ── */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center rounded-xl border border-border bg-card/60 backdrop-blur-sm p-1 gap-1">
            <button
              onClick={() => handleToggle("before")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeView === "before"
                  ? "bg-red-500/15 text-red-400 shadow-lg shadow-red-500/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🟥 Antes
            </button>
            <button
              onClick={() => handleToggle("after")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeView === "after"
                  ? "bg-gold/15 text-gold shadow-lg shadow-gold/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🟩 Después
            </button>
          </div>
        </div>

        {/* ── Panels ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <StatusPanel
            items={beforeItems}
            mode="before"
            isVisible={panelVisible && activeView === "before"}
          />
          <StatusPanel
            items={afterItems}
            mode="after"
            isVisible={panelVisible && activeView === "after"}
          />
        </div>

        {/* ── Arrow transition (center) ── */}
        <div className="flex justify-center -mt-14 mb-10">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
              activeView === "after"
                ? "bg-gold/20 border border-gold/30 shadow-[0_0_20px_hsl(43,56%,52%,0.2)]"
                : "bg-card/60 border border-border"
            }`}
          >
            <ArrowRight
              size={20}
              className={`transition-all duration-500 ${
                activeView === "after" ? "text-gold" : "text-muted-foreground"
              }`}
            />
          </div>
        </div>

        {/* ── Support result cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="premium-card p-6 group"
                style={{
                  animation: "reveal-card 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                  animationDelay: `${i * 100}ms`,
                  opacity: 0,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
