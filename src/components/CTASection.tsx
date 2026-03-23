import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  const ref = useReveal();
  return (
    <section className="py-28 lg:py-36 section-padding surface-alt relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-5" style={{ lineHeight: "1.1" }}>
          Cada día sin automatizar,{" "}
          <span className="text-gold">pierdes clientes</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Agenda una llamada gratuita y te mostramos exactamente cómo automatizar tu negocio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
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
        <p className="text-xs text-muted-foreground">
          Sin compromiso · En la llamada te damos una propuesta clara
        </p>
      </div>
    </section>
  );
}
