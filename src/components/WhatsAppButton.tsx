import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+34632507839?text=Hola%2C%20quiero%20automatizar%20mi%20negocio"
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}
