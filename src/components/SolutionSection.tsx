import { useReveal } from "@/hooks/useReveal";
import { MessageSquare, Filter, RefreshCcw, Clock } from "lucide-react";

const solutions = [
  { icon: MessageSquare, title: "Respuesta automática", desc: "Atiende a cada cliente al instante, sin importar la hora." },
  { icon: Filter, title: "Cualificación de leads", desc: "Filtra y prioriza los contactos que realmente importan." },
  { icon: RefreshCcw, title: "Seguimiento automático", desc: "Nunca pierdas un lead por falta de seguimiento." },
  { icon: Clock, title: "Funciona 24/7", desc: "Tu sistema vende mientras tú descansas." },
];

export default function SolutionSection() {
  const ref = useReveal();
  return (
    <section id="solucion" className="py-24 lg:py-32 section-padding bg-secondary/30">
      <div ref={ref} className="reveal max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
          Creamos sistemas que{" "}
          <span className="text-gold">trabajan por ti</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-16">
          Automatizamos cada punto de contacto para que no pierdas ni una oportunidad.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} p-6 rounded-xl border border-border surface-elevated text-left hover:border-gold/30 hover:glow-gold transition-all duration-300 group`}
            >
              <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <s.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
