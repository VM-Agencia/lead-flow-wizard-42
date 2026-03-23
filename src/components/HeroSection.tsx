import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center section-padding pt-28 pb-20">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold/30 text-gold text-xs font-medium tracking-wide mb-8 uppercase">
            Automatización inteligente
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-balance animate-fade-up mb-6"
          style={{ animationDelay: "0.25s" }}
        >
          Automatizamos tu negocio con IA para que{" "}
          <span className="text-gold">vendas más</span> trabajando menos
        </h1>

        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-up mb-10"
          style={{ animationDelay: "0.4s" }}
        >
          Implementamos sistemas inteligentes que captan, responden y convierten
          clientes por ti, 24/7.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <Button variant="gold" size="xl" asChild>
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
