import { useReveal } from "@/hooks/useReveal";
import { MessageSquare, TrendingDown, RefreshCw, AlertCircle } from "lucide-react";

const problems = [
  {
    icon: MessageSquare,
    title: "Respondes mensajes todo el día",
    detail: "Clientes preguntando lo mismo una y otra vez. Siempre pendiente del móvil.",
  },
  {
    icon: TrendingDown,
    title: "Se te escapan oportunidades sin darte cuenta",
    detail: "Mensajes que no respondes a tiempo, leads que se enfrían y contactos olvidados.",
  },
  {
    icon: RefreshCw,
    title: "Siempre tienes que estar encima de todo",
    detail: "Si no estás tú, nada avanza. Vacaciones, fines de semana — el negocio se para.",
  },
  {
    icon: AlertCircle,
    title: "No hay un sistema, solo trabajo manual",
    detail: "Cada día empiezas desde cero. No hay proceso, no hay seguimiento, no hay control.",
  },
];

export default function ProblemSection() {
  const ref = useReveal();
  return (
    <section id="problema" className="py-28 lg:py-40 section-padding surface-alt">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5">
          ¿Te suena?
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-5"
          style={{ lineHeight: "1.08" }}
        >
          Tu negocio no necesita más esfuerzo.
          <br />
          <span className="text-muted-foreground">Necesita un sistema mejor.</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-xl mx-auto mb-16 text-pretty">
          El problema no es trabajar más. Es que todo depende de ti y no hay nada
          automatizado.
        </p>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_0_32px_hsl(43,56%,52%,0.06)] hover:-translate-y-0.5`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-destructive/[0.08] border border-destructive/10 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-destructive/[0.12]">
                <p.icon
                  size={18}
                  className="text-destructive/80 transition-colors duration-300 group-hover:text-destructive"
                />
              </div>

              {/* Text */}
              <h3 className="text-[15px] font-semibold text-foreground mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
