import { useReveal } from "@/hooks/useReveal";
import { AlertTriangle, Clock, UserX, Repeat } from "lucide-react";

const problems = [
  { icon: Repeat, text: "Tareas repetitivas que consumen tu tiempo" },
  { icon: Clock, text: "Mensajes sin responder y oportunidades perdidas" },
  { icon: AlertTriangle, text: "Clientes potenciales que se van a la competencia" },
  { icon: UserX, text: "Tu negocio depende al 100% de ti" },
];

export default function ProblemSection() {
  const ref = useReveal();
  return (
    <section id="problema" className="py-24 lg:py-32 section-padding">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Tu negocio no necesita más esfuerzo…{" "}
          <span className="text-gold">necesita mejores sistemas</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          ¿Te suena alguno de estos problemas?
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} flex items-start gap-4 p-6 rounded-xl border border-border surface-elevated hover:border-gold/30 transition-colors duration-300`}
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <p.icon size={20} className="text-gold" />
              </div>
              <p className="text-foreground/90 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
