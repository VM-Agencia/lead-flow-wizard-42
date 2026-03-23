import { useBusiness } from "@/context/BusinessContext";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageCircle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

/* ═══════════════════════════════════════════
   PER-BUSINESS CTA CONTENT
   ═══════════════════════════════════════════ */

interface CTAContent {
  label: string;
  icon: string;
  before: { title: string; items: string[] };
  after: { title: string; items: string[] };
  microcopy: string;
}

const ctaData: CTAContent[] = [
  {
    label: "Barbería",
    icon: "💈",
    before: {
      title: "Seguir como hasta ahora",
      items: [
        "Responder mensajes para citas todo el día",
        "Clientes preguntando horarios sin parar",
        "Huecos perdidos que nadie ocupa",
      ],
    },
    after: {
      title: "Automatizar tu barbería",
      items: [
        "Citas gestionadas automáticamente",
        "Respuestas instantáneas 24/7",
        "Agenda siempre llena y organizada",
      ],
    },
    microcopy: "Te mostramos cómo funcionaría en tu barbería",
  },
  {
    label: "Electricista",
    icon: "⚡",
    before: {
      title: "Seguir como hasta ahora",
      items: [
        "Llamadas constantes interrumpiendo tu trabajo",
        "Mensajes sin responder durante horas",
        "Servicios desorganizados y solapados",
      ],
    },
    after: {
      title: "Automatizar tu servicio",
      items: [
        "Solicitudes gestionadas automáticamente",
        "Prioridad inteligente según urgencia",
        "Agenda clara y sin conflictos",
      ],
    },
    microcopy: "Te mostramos cómo funcionaría para electricistas",
  },
  {
    label: "Fontanero",
    icon: "🔧",
    before: {
      title: "Seguir como hasta ahora",
      items: [
        "Avisos desordenados sin prioridad",
        "Clientes esperando respuesta durante horas",
        "Trabajo sin organización ni control",
      ],
    },
    after: {
      title: "Automatizar tu servicio",
      items: [
        "Avisos clasificados automáticamente",
        "Respuestas inmediatas a cada solicitud",
        "Trabajo organizado y rentable",
      ],
    },
    microcopy: "Te mostramos cómo funcionaría para fontaneros",
  },
  {
    label: "Detailing",
    icon: "🚗",
    before: {
      title: "Seguir como hasta ahora",
      items: [
        "Clientes preguntando precios todo el tiempo",
        "Reservas manuales que se pierden",
        "Tiempo perdido en gestión básica",
      ],
    },
    after: {
      title: "Automatizar tu negocio",
      items: [
        "Reservas automáticas con catálogo",
        "Respuestas al instante con precios",
        "Mejor organización, más ingresos",
      ],
    },
    microcopy: "Te mostramos cómo funcionaría en tu negocio de detailing",
  },
  {
    label: "Clínica",
    icon: "🏥",
    before: {
      title: "Seguir como hasta ahora",
      items: [
        "Pacientes esperando respuesta por teléfono",
        "Gestión manual de citas y expedientes",
        "Saturación en recepción constante",
      ],
    },
    after: {
      title: "Automatizar tu clínica",
      items: [
        "Citas automáticas sin recepción",
        "Filtrado inteligente de pacientes",
        "Agenda organizada en tiempo real",
      ],
    },
    microcopy: "Te mostramos cómo funcionaría en tu clínica",
  },
  {
    label: "Restaurante",
    icon: "🍽️",
    before: {
      title: "Seguir como hasta ahora",
      items: [
        "Reservas por mensaje sin control",
        "Desorganización en la sala",
        "Errores y duplicaciones constantes",
      ],
    },
    after: {
      title: "Automatizar reservas",
      items: [
        "Reservas automáticas sin errores",
        "Confirmaciones instantáneas al cliente",
        "Control total de mesas y horarios",
      ],
    },
    microcopy: "Te mostramos cómo funcionaría en tu restaurante",
  },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function CTASection() {
  const { selectedBusiness } = useBusiness();
  const ref = useReveal();
  const data = ctaData[selectedBusiness] || ctaData[0];

  return (
    <section id="cta-final" className="py-28 lg:py-40 section-padding relative overflow-hidden">
      {/* BG glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-destructive/[0.02] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[160px] pointer-events-none" />

      <div ref={ref} className="reveal max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.06] text-gold text-[11px] font-semibold tracking-widest uppercase mb-6">
            <span>{data.icon}</span>
            {data.label}
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4"
            style={{ lineHeight: "1.08" }}
          >
            La decisión es{" "}
            <span className="text-gold">simple</span>
          </h2>
        </div>

        {/* Split panels */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-0 rounded-2xl overflow-hidden border border-border">
          {/* LEFT — Before (darker) */}
          <div className="bg-[hsl(225,25%,4%)] p-8 sm:p-10 md:rounded-l-2xl relative">
            <div className="absolute inset-0 bg-destructive/[0.02] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-red-400/70">
                  Opción A
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground/80 mb-6">
                {data.before.title}
              </h3>

              <ul className="space-y-4">
                {data.before.items.map((item, i) => (
                  <li
                    key={`b-${selectedBusiness}-${i}`}
                    className="flex items-start gap-3"
                  >
                    <XCircle size={18} className="text-red-400/60 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — After (glow) */}
          <div className="relative p-8 sm:p-10 md:rounded-r-2xl bg-[hsl(225,22%,6%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-transparent to-gold/[0.02] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[300px] h-[300px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gold/[0.06] blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80">
                  Opción B
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                {data.after.title}
              </h3>

              <ul className="space-y-4 mb-8">
                {data.after.items.map((item, i) => (
                  <li
                    key={`a-${selectedBusiness}-${i}`}
                    className="flex items-start gap-3 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${200 + i * 120}ms` }}
                  >
                    <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="space-y-3">
                <Button variant="gold" size="xl" asChild className="w-full">
                  <a href="#contacto">
                    Agenda tu llamada gratuita
                    <ArrowRight className="ml-1" size={18} />
                  </a>
                </Button>
                <Button variant="goldOutline" size="lg" asChild className="w-full">
                  <a
                    href="https://wa.me/+34632507839?text=Hola%2C%20quiero%20automatizar%20mi%20negocio"
                    target="_blank"
                    rel="noopener"
                  >
                    <MessageCircle size={16} />
                    Escríbenos por WhatsApp
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {data.microcopy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
