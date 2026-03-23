import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#problema", label: "Problema" },
  { href: "#solucion", label: "Solución" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-18 py-4 section-padding">
        <a href="#" className="text-lg font-bold tracking-tight">
          <span className="text-gold">VM</span> Agencia IA
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-3 h-10 px-6 rounded-lg bg-gold text-primary-foreground text-sm font-semibold inline-flex items-center hover:brightness-110 transition-all active:scale-[0.97] shadow-md shadow-gold/15"
          >
            Agenda tu llamada
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-up">
          <div className="flex flex-col gap-1 p-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-lg text-sm text-muted-foreground hover:text-gold hover:bg-muted/30 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-3 h-12 rounded-lg bg-gold text-primary-foreground text-sm font-semibold flex items-center justify-center hover:brightness-110 transition-all"
            >
              Agenda tu llamada
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
