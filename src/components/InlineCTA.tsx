import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface InlineCTAProps {
  text?: string;
  microcopy?: string;
}

export default function InlineCTA({
  text = "Agenda tu llamada gratuita",
  microcopy = "Sin compromiso · Propuesta personalizada en la llamada",
}: InlineCTAProps) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal py-16 lg:py-20 text-center section-padding">
      <Button variant="gold" size="xl" asChild>
        <a href="#contacto">
          {text}
          <ArrowRight className="ml-1" size={18} />
        </a>
      </Button>
      <p className="text-xs text-muted-foreground mt-4">{microcopy}</p>
    </div>
  );
}
