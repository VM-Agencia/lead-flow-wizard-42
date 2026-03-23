import { useReveal } from "@/hooks/useReveal";
import { MessageSquare, Filter, RefreshCcw, Clock } from "lucide-react";

const solutions = [
  { icon: MessageSquare, title: "Respuesta instantánea", desc: "Cada mensaje respondido al segundo, día y noche." },
  { icon: Filter, title: "Leads cualificados", desc: "Solo hablas con quien realmente va a comprar." },
  { icon: RefreshCcw, title: "Seguimiento automático", desc: "Cero leads olvidados. Seguimiento sin que muevas un dedo." },
  { icon: Clock, title: "Ventas 24/7", desc: "Tu sistema cierra ventas mientras tú duermes." },
];

export default function SolutionSection() {
  const ref = useReveal();
  return (
    <section id="solucion" className="py-28 lg:py-40 section-padding surface-alt">
      <div ref={ref} className="reveal max-w-5xl mx-auto text-center">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
          La solución
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6" style={{ lineHeight: "1.1" }}>
          Sistemas inteligentes que{" "}
          <span className="text-gold">venden por ti</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-16">
          Automatizamos cada punto de contacto para convertir más, sin esfuerzo.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} premium-card p-7 text-left group`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <s.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
