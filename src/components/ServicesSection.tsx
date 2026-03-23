import { useReveal } from "@/hooks/useReveal";
import { MessageSquare, Users, RefreshCw, CalendarCheck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Respuesta automática a clientes",
    desc: "Cada mensaje se responde al instante, con contexto y personalización. De día, de noche, festivos.",
    benefit: "No pierdes clientes por tardar en contestar",
    accent: "< 1s de respuesta",
  },
  {
    icon: Users,
    title: "Captación de clientes",
    desc: "Convierte visitas en contactos reales de forma automática desde web, redes y WhatsApp.",
    benefit: "Siempre tienes nuevos clientes entrando",
    accent: "Funciona 24/7",
  },
  {
    icon: RefreshCw,
    title: "Seguimiento automático",
    desc: "El sistema recuerda, programa y ejecuta el seguimiento sin que tengas que pensar en ello.",
    benefit: "No se te escapa ningún cliente",
    accent: "0 leads olvidados",
  },
  {
    icon: CalendarCheck,
    title: "Gestión de citas y reservas",
    desc: "Organiza, confirma y recuerda citas automáticamente. Sin llamadas, sin caos.",
    benefit: "Menos caos, más control",
    accent: "Sin intervención manual",
  },
];

export default function ServicesSection() {
  const ref = useReveal();
  return (
    <section id="servicios" className="py-28 lg:py-40 section-padding surface-alt">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5">
          Servicios
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-5"
          style={{ lineHeight: "1.08" }}
        >
          Qué puedes automatizar
          <br />
          <span className="text-muted-foreground">en tu negocio</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-xl mx-auto mb-20 text-pretty">
          Desde la primera interacción hasta el seguimiento, todo puede
          funcionar sin que tengas que estar encima.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 transition-all duration-300 hover:border-gold/25 hover:shadow-[0_0_40px_hsl(43,56%,52%,0.07)] hover:-translate-y-1"
              style={{
                opacity: 0,
                transform: "translateY(18px)",
                filter: "blur(4px)",
                animation:
                  "reveal-card 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                animationDelay: `${0.15 + i * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-gold/[0.14] group-hover:border-gold/20 group-hover:shadow-[0_0_20px_hsl(43,56%,52%,0.1)]">
                <s.icon
                  size={22}
                  className="text-gold/70 transition-colors duration-300 group-hover:text-gold"
                />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-foreground mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {s.desc}
              </p>

              {/* Benefit line */}
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight
                  size={14}
                  className="text-gold/60 shrink-0"
                />
                <span className="text-sm font-medium text-foreground/90">
                  {s.benefit}
                </span>
              </div>

              {/* Accent badge */}
              <span className="inline-block text-[11px] font-semibold text-gold bg-gold/[0.08] px-3 py-1.5 rounded-full tracking-wide">
                {s.accent}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
