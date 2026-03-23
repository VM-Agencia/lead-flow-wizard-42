import { useReveal } from "@/hooks/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Esto sirve para mi negocio?",
    a: "Sí, trabajamos con autónomos, pequeñas empresas, negocios locales y ecommerce. Si tienes clientes, podemos automatizar cómo los captas, atiendes y fidelizas.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. Nosotros nos encargamos de todo: diseño, implementación y optimización. Tú solo ves los resultados.",
  },
  {
    q: "¿Cuánto tiempo tarda en estar listo?",
    a: "Dependiendo de la complejidad, entre 1 y 3 semanas tienes tu sistema funcionando y generando resultados.",
  },
  {
    q: "¿Es caro?",
    a: "Nuestras soluciones se adaptan a cada presupuesto. Además, el retorno suele ser rápido: menos horas perdidas, más clientes atendidos.",
  },
];

export default function FAQSection() {
  const ref = useReveal();
  return (
    <section id="faq" className="py-24 lg:py-32 section-padding">
      <div ref={ref} className="reveal max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Preguntas <span className="text-gold">frecuentes</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Resolvemos tus dudas antes de dar el primer paso.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl surface-elevated px-6 data-[state=open]:border-gold/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-gold transition-colors py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
