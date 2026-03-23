import { useReveal } from "@/hooks/useReveal";
import { Users, Zap, Clock, TrendingUp } from "lucide-react";

const results = [
  { icon: Users, stat: "+300%", title: "Más leads captados", desc: "Sin invertir más en publicidad." },
  { icon: Zap, stat: "<1s", title: "Tiempo de respuesta", desc: "Respuesta inmediata, 24/7." },
  { icon: Clock, stat: "−70%", title: "Menos carga operativa", desc: "Dedica tu tiempo a crecer." },
  { icon: TrendingUp, stat: "2x", title: "Más conversiones", desc: "Más ventas con el mismo tráfico." },
];

export default function ResultsSection() {
  const ref = useReveal();
  return (
    <section id="resultados" className="py-28 lg:py-40 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto text-center">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
          Resultados
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6" style={{ lineHeight: "1.1" }}>
          Lo que pasa cuando{" "}
          <span className="text-gold">automatizas</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-16">
          Números reales de negocios que dejaron de perder oportunidades.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {results.map((r, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} premium-card p-7 text-center group`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <r.icon size={22} className="text-gold" />
              </div>
              <p className="text-3xl font-black text-gold mb-1 tabular-nums">{r.stat}</p>
              <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
