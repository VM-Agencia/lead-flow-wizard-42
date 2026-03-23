import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  const ref = useReveal();
  return (
    <section className="py-24 lg:py-32 section-padding bg-secondary/30">
      <div ref={ref} className="reveal max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
          ¿Listo para dejar de perder{" "}
          <span className="text-gold">clientes</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Agenda una llamada gratuita y te mostramos cómo automatizar tu negocio
          en menos de lo que piensas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="gold" size="xl" asChild className="animate-glow-pulse">
            <a href="#contacto">
              Agenda tu llamada gratuita
              <ArrowRight className="ml-1" size={18} />
            </a>
          </Button>
          <Button variant="goldOutline" size="xl" asChild>
            <a
              href="https://wa.me/+34632507839?text=Hola%2C%20quiero%20automatizar%20mi%20negocio"
              target="_blank"
              rel="noopener"
            >
              <MessageCircle size={18} />
              Hablar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
