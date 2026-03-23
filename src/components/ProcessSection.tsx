import { Headphones, Puzzle, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Headphones,
    num: "01",
    title: "Entendemos tu negocio",
    desc: "Analizamos cómo trabajas, dónde pierdes tiempo y qué oportunidades se te escapan. En una sola llamada.",
    tag: "Llamada gratuita · 30 min",
  },
  {
    icon: Puzzle,
    num: "02",
    title: "Diseñamos tu sistema",
    desc: "Creamos una solución a medida para tu caso. Nada genérico, nada estándar.",
    tag: "Propuesta personalizada",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Lo implementamos todo",
    desc: "Dejamos todo funcionando sin que tengas que tocar nada técnico. En días, no meses.",
    tag: "Sin intervención tuya",
  },
  {
    icon: TrendingUp,
    num: "04",
    title: "Optimizamos resultados",
    desc: "Medimos, ajustamos y mejoramos. Tu sistema es cada vez más inteligente.",
    tag: "Mejora continua",
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-28 lg:py-40 section-padding surface-alt overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5">
          Cómo funciona
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-5"
          style={{ lineHeight: "1.08" }}
        >
          Así lo implementamos
          <br />
          <span className="text-muted-foreground">en tu negocio</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-xl mx-auto mb-20 text-pretty">
          Un proceso simple, claro y sin complicaciones técnicas.
          Nosotros nos encargamos de todo.
        </p>

        {/* Timeline — Desktop horizontal / Mobile vertical */}
        <div className="hidden lg:block">
          <DesktopTimeline />
        </div>
        <div className="lg:hidden">
          <MobileTimeline />
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop: horizontal timeline ─── */
function DesktopTimeline() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-[38px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px">
        <div
          className="h-full bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40"
          style={{
            opacity: 0,
            animation: "reveal-card 1s cubic-bezier(0.16,1,0.3,1) forwards",
            animationDelay: "0.6s",
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center text-center group"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              filter: "blur(4px)",
              animation:
                "reveal-card 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: `${0.2 + i * 0.15}s`,
            }}
          >
            {/* Node circle */}
            <div className="relative z-10 w-[76px] h-[76px] rounded-2xl border border-gold/20 bg-card/80 backdrop-blur-sm flex items-center justify-center mb-7 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_30px_hsl(43,56%,52%,0.12)] group-hover:scale-105">
              <step.icon
                size={28}
                className="text-gold/60 transition-colors duration-300 group-hover:text-gold"
              />
              {/* Step number badge */}
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[10px] font-bold text-gold">
                {step.num}
              </span>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 group-hover:border-gold/15 group-hover:shadow-[0_0_32px_hsl(43,56%,52%,0.05)] group-hover:-translate-y-1 w-full">
              <h3 className="text-[15px] font-bold text-foreground mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {step.desc}
              </p>
              <span className="inline-block text-[10px] font-semibold text-gold/80 bg-gold/[0.07] px-3 py-1.5 rounded-full tracking-wide uppercase">
                {step.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile: vertical connected steps ─── */
function MobileTimeline() {
  return (
    <div className="relative max-w-md mx-auto">
      {/* Vertical line */}
      <div className="absolute left-[30px] top-10 bottom-10 w-px bg-gradient-to-b from-gold/30 via-gold/15 to-transparent" />

      <div className="space-y-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex items-start gap-5 group"
            style={{
              opacity: 0,
              transform: "translateY(18px)",
              filter: "blur(4px)",
              animation:
                "reveal-card 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: `${0.15 + i * 0.12}s`,
            }}
          >
            {/* Node */}
            <div className="relative z-10 shrink-0 w-[60px] h-[60px] rounded-xl border border-gold/20 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_hsl(43,56%,52%,0.1)]">
              <step.icon
                size={22}
                className="text-gold/60 transition-colors duration-300 group-hover:text-gold"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[9px] font-bold text-gold">
                {step.num}
              </span>
            </div>

            {/* Card */}
            <div className="flex-1 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 group-hover:border-gold/15 group-hover:shadow-[0_0_32px_hsl(43,56%,52%,0.05)]">
              <h3 className="text-[15px] font-semibold text-foreground mb-1.5 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {step.desc}
              </p>
              <span className="inline-block text-[10px] font-semibold text-gold/80 bg-gold/[0.07] px-2.5 py-1 rounded-full tracking-wide uppercase">
                {step.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
