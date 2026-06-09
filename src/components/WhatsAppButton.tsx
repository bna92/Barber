import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "6671505736";
const message = "Hola, quiero agendar una cita";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar cita por WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-50
        group
        flex
        items-center
        gap-3
        rounded-full
        bg-gradient-to-r
        from-green-500
        to-emerald-400
        px-5
        py-4
        text-white
        shadow-[0_0_35px_rgba(34,197,94,0.45)]
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-[0_0_50px_rgba(34,197,94,0.7)]
      "
    >
      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-green-400/40
          blur-xl
          opacity-60
          group-hover:opacity-100
          transition
        "
      />

      <FaWhatsapp className="relative z-10 text-3xl" />

    
    </a>
  );
}