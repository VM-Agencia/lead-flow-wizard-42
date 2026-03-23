import { useReveal } from "@/hooks/useReveal";
import { Zap, Bot, BarChart3, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Automatización de captación",
    desc: "Sistemas que atraen y captan leads de forma continua desde múltiples canales.",
  },
  {
    icon: Bot,
    title: "Respuesta automática inteligente",
    desc: "Chatbots y flujos que responden al instante con contexto y personalización.",
  },
  {
    icon: BarChart3,
    title: "Seguimiento automático",
    desc: "Secuencias de follow-up que convierten interesados en clientes sin esfuerzo.",
  },
  {
    icon: ShoppingCart,
    title: "Sistemas de ventas 24/7",
    desc: "Pipelines automatizados que venden por ti incluso cuando duermes.",
  },
];

export default function ServicesSection() {
  const ref = useReveal();
  return (
    <section id="servicios" className="py-24 lg:py-32 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Nuestros <span className="text-gold">servicios</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Soluciones diseñadas para escalar tu negocio con inteligencia artificial.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} relative p-8 rounded-2xl border border-border surface-elevated group hover:border-gold/30 transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <s.icon size={24} className="text-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
