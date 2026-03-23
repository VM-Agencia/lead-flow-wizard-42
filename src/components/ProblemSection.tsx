import { useReveal } from "@/hooks/useReveal";
import { AlertTriangle, Clock, UserX, Repeat } from "lucide-react";

const problems = [
  { icon: Repeat, text: "Repites las mismas tareas cada día y no avanzas" },
  { icon: Clock, text: "Mensajes sin responder = clientes que se van" },
  { icon: AlertTriangle, text: "La competencia capta a tus leads mientras duermes" },
  { icon: UserX, text: "Si tú paras, tu negocio para" },
];

export default function ProblemSection() {
  const ref = useReveal();
  return (
    <section id="problema" className="py-28 lg:py-40 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
          El problema
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-6" style={{ lineHeight: "1.1" }}>
          Tu negocio no necesita más esfuerzo
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Necesita sistemas que trabajen por ti. ¿Te suena alguno de estos?
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} premium-card flex items-start gap-5 p-7`}
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
                <p.icon size={20} className="text-destructive" />
              </div>
              <p className="text-foreground/90 leading-relaxed text-[15px]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
