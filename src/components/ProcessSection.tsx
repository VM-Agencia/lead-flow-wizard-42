import { useReveal } from "@/hooks/useReveal";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, num: "01", title: "Analizamos tu negocio", desc: "Entendemos tu modelo, tus clientes y tus puntos de fricción." },
  { icon: PenTool, num: "02", title: "Diseñamos tu sistema", desc: "Creamos la arquitectura de automatización a medida." },
  { icon: Rocket, num: "03", title: "Implementamos", desc: "Ponemos en marcha tus flujos de automatización con IA." },
  { icon: TrendingUp, num: "04", title: "Optimizamos resultados", desc: "Medimos, ajustamos y escalamos lo que funciona." },
];

export default function ProcessSection() {
  const ref = useReveal();
  return (
    <section id="proceso" className="py-24 lg:py-32 section-padding bg-secondary/30">
      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Cómo <span className="text-gold">funciona</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Un proceso claro, sin sorpresas, enfocado en resultados.
        </p>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} flex items-start gap-5 p-6 rounded-xl border border-border surface-elevated hover:border-gold/20 transition-colors duration-300`}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">{s.num}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
