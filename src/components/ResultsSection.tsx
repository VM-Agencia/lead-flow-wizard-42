import { useReveal } from "@/hooks/useReveal";
import { Users, Zap, Clock, TrendingUp } from "lucide-react";

const results = [
  { icon: Users, title: "Más clientes", desc: "Sin más esfuerzo ni más horas de trabajo." },
  { icon: Zap, title: "Respuestas inmediatas", desc: "24/7, sin que tú tengas que estar." },
  { icon: Clock, title: "Menos carga de trabajo", desc: "Dedica tu tiempo a lo que realmente importa." },
  { icon: TrendingUp, title: "Más tiempo para crecer", desc: "Escala tu negocio, no tus horas." },
];

export default function ResultsSection() {
  const ref = useReveal();
  return (
    <section id="resultados" className="py-24 lg:py-32 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
          Lo que cambia cuando{" "}
          <span className="text-gold">automatizas</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-16">
          Resultados reales para negocios que quieren crecer sin complicarse.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((r, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} p-6 rounded-xl border border-border surface-elevated text-center group hover:border-gold/30 transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <r.icon size={24} className="text-gold" />
              </div>
              <h3 className="font-semibold mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
