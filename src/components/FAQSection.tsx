import { useReveal } from "@/hooks/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Esto funciona para mi tipo de negocio?",
    a: "Sí. Trabajamos con autónomos, pymes, negocios locales y ecommerce. Si tienes clientes, podemos automatizar cómo los captas, atiendes y fidelizas.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Nos encargamos de todo: diseño, implementación y optimización. Tú solo ves los resultados.",
  },
  {
    q: "¿Cuánto tarda en funcionar?",
    a: "Entre 1 y 3 semanas tienes tu sistema funcionando y generando resultados medibles.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Cada solución se adapta a tu presupuesto y necesidades. El retorno suele ser rápido: menos horas perdidas, más clientes convertidos.",
  },
  {
    q: "¿Qué pasa si no me convence?",
    a: "En la llamada gratuita te mostramos exactamente qué haríamos por tu negocio. Sin compromiso. Si no te convence, no pasa nada.",
  },
];

export default function FAQSection() {
  const ref = useReveal();
  return (
    <section id="faq" className="py-28 lg:py-40 section-padding">
      <div ref={ref} className="reveal max-w-2xl mx-auto">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
          FAQ
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-6" style={{ lineHeight: "1.1" }}>
          Preguntas frecuentes
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-14">
          Resolvemos tus dudas antes de dar el primer paso.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="premium-card px-7 data-[state=open]:border-gold/30"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-gold transition-colors py-6 text-[15px]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-[15px]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
