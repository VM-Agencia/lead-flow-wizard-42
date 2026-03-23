import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Calendar, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const ref = useReveal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    whatsapp: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form data:", form);
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setForm({ nombre: "", empresa: "", email: "", whatsapp: "", mensaje: "" });
    } catch {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar. Intenta por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-28 lg:py-40 section-padding surface-alt">
      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
          Contacto
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-balance mb-6" style={{ lineHeight: "1.1" }}>
          Hablemos de tu <span className="text-gold">negocio</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-14">
          Déjanos tus datos y recibe una propuesta personalizada sin compromiso.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="nombre" placeholder="Tu nombre" required value={form.nombre} onChange={handleChange} className="bg-background/60 border-border focus:border-gold h-12" />
              <Input name="empresa" placeholder="Tu empresa" value={form.empresa} onChange={handleChange} className="bg-background/60 border-border focus:border-gold h-12" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} className="bg-background/60 border-border focus:border-gold h-12" />
              <Input name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} className="bg-background/60 border-border focus:border-gold h-12" />
            </div>
            <Textarea name="mensaje" placeholder="¿Qué quieres automatizar?" rows={4} value={form.mensaje} onChange={handleChange} className="bg-background/60 border-border focus:border-gold resize-none" />
            <Button variant="gold" size="lg" type="submit" disabled={loading} className="w-full sm:w-auto">
              <Send size={16} />
              {loading ? "Enviando…" : "Recibir propuesta"}
            </Button>
          </form>

          <div className="md:col-span-2 flex flex-col gap-4">
            <a
              href="#contacto"
              className="premium-card flex items-center gap-4 p-6 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Calendar size={20} className="text-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm">Agenda en Cal.com</p>
                <p className="text-xs text-muted-foreground">Elige tu horario ideal</p>
              </div>
            </a>
            <a
              href="https://wa.me/+34632507839?text=Hola%2C%20quiero%20automatizar%20mi%20negocio"
              target="_blank"
              rel="noopener"
              className="premium-card flex items-center gap-4 p-6 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <MessageCircle size={20} className="text-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm">WhatsApp directo</p>
                <p className="text-xs text-muted-foreground">+34 632 50 78 39</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
