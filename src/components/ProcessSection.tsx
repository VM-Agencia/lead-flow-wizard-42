import { useReveal } from "@/hooks/useReveal";

const steps = [
  { num: "01", title: "Analizamos", desc: "Entendemos tu negocio, clientes y puntos de fricción en una sola llamada." },
  { num: "02", title: "Diseñamos", desc: "Creamos la arquitectura de automatización a tu medida." },
  { num: "03", title: "Implementamos", desc: "Ponemos en marcha tus flujos de IA en días, no meses." },
  { num: "04", title: "Optimizamos", desc: "Medimos, ajustamos y escalamos lo que funciona." },
];

export default function ProcessSection() {
  const ref = useReveal();
  return (
    <section id="proceso" className="py-28 lg:py-40 section-padding surface-alt">
      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
          Proceso
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-6" style={{ lineHeight: "1.1" }}>
          De cero a automático en{" "}
          <span className="text-gold">4 pasos</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Un proceso claro, rápido y sin sorpresas.
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[29px] top-8 bottom-8 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} flex items-start gap-6 p-7 premium-card relative`}
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center relative z-10">
                  <span className="text-gold font-black text-lg">{s.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
