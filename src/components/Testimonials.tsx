const testimonials = [
  {
    name: "Carlos M.",
    text: "Excelente atención y cortes impecables. Sin duda volveré.",
    service: "Corte Caballero",
  },

  {
    name: "Luis R.",
    text: "La mejor barbería que he visitado. Muy profesional.",
    service: "Barba + Corte",
  },

  {
    name: "Jorge A.",
    text: "Muy puntual, excelente servicio y gran ambiente.",
    service: "Tinte",
  },
];

export default function Testimonials() {
  return (
    <section
      className="relative py-28 overflow-hidden"
    >


      {/* Glow */}

      <div className="absolute bottom-0 left-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
            Testimonios
          </span>

          <h2 className="text-white text-5xl font-black mt-4">
            Lo que dicen nuestros clientes
          </h2>

          <p className="text-gray-400 mt-4">
            La satisfacción de nuestros clientes habla por nosotros.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-[32px]
                p-8
                hover:border-yellow-500/30
                hover:-translate-y-2
                hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]
                transition-all
                duration-300
              "
            >

              <div className="text-yellow-400 text-2xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                "{item.text}"
              </p>

              <div className="mt-8">

                <p className="text-white font-bold text-lg">
                  {item.name}
                </p>

                <p className="text-yellow-500 text-sm mt-1">
                  {item.service}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}