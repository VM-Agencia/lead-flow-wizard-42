import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center section-padding pt-32 pb-24">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block px-5 py-2 rounded-full border border-gold/20 bg-gold/[0.06] text-gold text-xs font-semibold tracking-widest mb-10 uppercase">
            Automatización con IA
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.04] tracking-tight text-balance animate-fade-up mb-8"
          style={{ animationDelay: "0.2s", lineHeight: "1.04" }}
        >
          Más ventas.{" "}
          <span className="text-gold">Menos trabajo.</span>
          <br className="hidden sm:block" />
          <span className="text-foreground/70 text-[0.75em]">Todo automático.</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-fade-up mb-12"
          style={{ animationDelay: "0.35s" }}
        >
          Implementamos sistemas de IA que captan, responden y convierten clientes por ti — 24 horas, 7 días.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up mb-6"
          style={{ animationDelay: "0.5s" }}
        >
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

        <p
          className="text-xs text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          Sin compromiso · Te mostramos una propuesta clara en la llamada
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
