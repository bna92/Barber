export default function Footer() {
  return (
    <footer
      id="contacto"
      className="
        border-t
        border-white/10
        bg-black/40
        backdrop-blur-xl
        mt-20
      "
    >
      <div
        className="
          max-w-[1900px]
          mx-auto
          px-6
          py-10
          md:py-14
          text-center
          md:text-left
        "
      >
        <h3 className="text-white text-2xl md:text-3xl font-black">
          BARBER IA
        </h3>

        <p className="text-gray-400 mt-4 text-sm md:text-base">
          📍 Plaza Fórum · Culiacán
        </p>

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          📱 WhatsApp: +52 667 XXX XXXX
        </p>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Barber IA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}