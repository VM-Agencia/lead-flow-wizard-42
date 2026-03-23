import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 section-padding border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-lg font-bold">
              <span className="text-gold">VM</span> Agencia IA
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Automatización de negocios con inteligencia artificial
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="mailto:vmmarketing.ia@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail size={14} /> vmmarketing.ia@gmail.com
            </a>
            <a href="tel:+34632507839" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone size={14} /> +34 632 50 78 39
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} VM Agencia IA. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-gold transition-colors">Aviso legal</a>
            <a href="#" className="hover:text-gold transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
