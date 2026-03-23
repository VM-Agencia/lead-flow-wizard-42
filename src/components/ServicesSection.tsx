import { useReveal } from "@/hooks/useReveal";
import { Zap, Bot, BarChart3, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Captación automatizada",
    desc: "Atraemos leads desde múltiples canales sin que tengas que hacer nada.",
    highlight: "Más leads, menos esfuerzo",
  },
  {
    icon: Bot,
    title: "Respuesta inteligente",
    desc: "Chatbots con IA que responden al instante con contexto y personalización.",
    highlight: "0 mensajes sin responder",
  },
  {
    icon: BarChart3,
    title: "Follow-up automático",
    desc: "Secuencias que convierten interesados en clientes de forma natural.",
    highlight: "Conversión sin esfuerzo",
  },
  {
    icon: ShoppingCart,
    title: "Ventas 24/7",
    desc: "Pipelines que cierran ventas incluso cuando estás de vacaciones.",
    highlight: "Vendes mientras duermes",
  },
];

export default function ServicesSection() {
  const ref = useReveal();
  return (
    <section id="servicios" className="py-28 lg:py-40 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
          Servicios
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-6" style={{ lineHeight: "1.1" }}>
          Lo que hacemos por tu negocio
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Cada servicio diseñado para un objetivo: que vendas más con menos trabajo.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} premium-card relative p-8 group overflow-hidden`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <s.icon size={24} className="text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <span className="inline-block text-xs font-semibold text-gold bg-gold/[0.08] px-3 py-1.5 rounded-full">
                {s.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
