import { useReveal } from "@/hooks/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "¿Esto sirve para mi tipo de negocio?",
    a: "Sí. Adaptamos cada sistema a cómo trabajas actualmente. Da igual si eres autónomo, tienes un equipo pequeño o gestionas múltiples ubicaciones. Si tienes clientes, podemos automatizar cómo los captas, atiendes y fidelizas.",
    tag: "Compatibilidad",
  },
  {
    q: "¿Tengo que saber algo técnico?",
    a: "No. Nos encargamos de absolutamente todo: diseño, desarrollo, integración y optimización. Tú solo ves los resultados en un panel claro y sencillo.",
    tag: "Facilidad",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "En pocos días puedes tener tu sistema activo y generando resultados. El proceso es rápido porque trabajamos con metodologías probadas que aceleran cada fase.",
    tag: "Rapidez",
  },
  {
    q: "¿Tengo que cambiar cómo trabajo?",
    a: "No. El sistema se adapta a tu forma de trabajar actual. Usamos los mismos canales que ya utilizas (WhatsApp, Instagram, web) y automatizamos lo que te roba tiempo.",
    tag: "Adaptación",
  },
  {
    q: "¿Y si no me funciona?",
    a: "Trabajamos contigo hasta que el sistema tenga sentido para tu negocio. No te dejamos con una herramienta que no entiendes. Además, en la llamada gratuita te mostramos exactamente qué haríamos antes de empezar.",
    tag: "Garantía",
  },
];

export default function FAQSection() {
  const ref = useReveal();
  return (
    <section id="faq" className="py-28 lg:py-40 section-padding relative">
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/[0.02] blur-[160px] pointer-events-none" />

      <div ref={ref} className="reveal max-w-2xl mx-auto relative z-10">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
          Antes de empezar
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-6"
          style={{ lineHeight: "1.08" }}
        >
          Dudas habituales
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-14">
          Respondemos lo que la mayoría se pregunta antes de dar el paso.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="premium-card px-6 sm:px-7 border-border/60 data-[state=open]:border-gold/30 transition-colors duration-500"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-gold transition-colors py-5 sm:py-6 text-[15px] gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase text-gold/60 bg-gold/[0.08] px-2 py-0.5 rounded-md">
                    {f.tag}
                  </span>
                  <span className="truncate">{f.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-[15px]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Micro-CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Tienes otra duda? Te la resolvemos en 2 minutos.
          </p>
          <Button variant="goldOutline" size="lg" asChild>
            <a href="#contacto">
              Habla con nosotros
              <ArrowRight size={16} className="ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
