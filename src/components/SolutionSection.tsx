import { useReveal } from "@/hooks/useReveal";
import { Zap, MessageSquare, Brain, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: Zap,
    num: "01",
    title: "Captación automática",
    desc: "Tus clientes llegan sin que busques manualmente. El sistema capta desde WhatsApp, web, redes e Instagram.",
  },
  {
    icon: MessageSquare,
    num: "02",
    title: "Respuesta inmediata",
    desc: "En menos de 1 segundo tu cliente recibe una respuesta personalizada. De día, de noche, festivos.",
  },
  {
    icon: Brain,
    num: "03",
    title: "Cualificación inteligente",
    desc: "El sistema filtra, organiza y prioriza según lo que necesita cada cliente. Sin que tú intervengas.",
  },
  {
    icon: CalendarCheck,
    num: "04",
    title: "Acción automática",
    desc: "Reserva citas, envía presupuestos, hace seguimiento. El proceso se cierra solo.",
  },
];

export default function SolutionSection() {
  const ref = useReveal();

  return (
    <section id="solucion" className="py-28 lg:py-40 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5">
          La solución
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-5"
          style={{ lineHeight: "1.08" }}
        >
          Un sistema que trabaja por ti,
          <br />
          <span className="text-muted-foreground">sin que tengas que estar encima</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-xl mx-auto mb-20 text-pretty">
          No se trata de hacer más. Se trata de tener un sistema que gestione
          las partes repetitivas de tu negocio correctamente.
        </p>

        {/* Flow — vertical connected steps */}
        <div className="relative max-w-2xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-6 lg:left-7 top-8 bottom-8 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex items-start gap-5 lg:gap-6 group"
                style={{
                  opacity: 0,
                  transform: "translateY(18px)",
                  filter: "blur(4px)",
                  animation:
                    "reveal-card 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                  animationDelay: `${0.2 + i * 0.12}s`,
                }}
              >
                {/* Node */}
                <div className="relative z-10 shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl border border-gold/20 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_hsl(43,56%,52%,0.1)]">
                  <step.icon
                    size={20}
                    className="text-gold/70 transition-colors duration-300 group-hover:text-gold"
                  />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 group-hover:border-gold/15 group-hover:shadow-[0_0_32px_hsl(43,56%,52%,0.05)] group-hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold text-gold/50 tracking-wider">
                      {step.num}
                    </span>
                    <h3 className="text-[15px] font-semibold text-foreground leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
