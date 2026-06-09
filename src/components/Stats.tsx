const stats = [
  {
    value: "5★",
    label: "Valoración promedio",
  },
  {
    value: "30min",
    label: "Tiempo promedio por cita",
  },
  {
    value: "7 días",
    label: "Disponibilidad semanal",
  },
  {
    value: "100%",
    label: "Atención personalizada",
  },
];

export default function Stats() {
  return (
    <section className="relative py-28 overflow-hidden">

      {/* Glow */}

      <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 blur-[120px]" />

      <div
        className="
          relative
          z-10
          max-w-[1900px]
          mx-auto
          px-6
        "
      >
        <div
          className="
            bg-black/35
            backdrop-blur-xl
            border
            border-white/10
            rounded-[40px]
            p-8
            md:p-12
          "
        >
          <div className="text-center mb-16">

            <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
              Nuestra Experiencia
            </span>

            <h2 className="text-5xl font-black text-white mt-4">
              Calidad que se nota
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Atención profesional, cortes modernos y una experiencia diseñada
              para que siempre luzcas tu mejor versión.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-[32px]
                  p-8
                  text-center
                  hover:-translate-y-2
                  hover:border-yellow-500/30
                  hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]
                  transition-all
                  duration-300
                "
              >
                <h3 className="text-yellow-400 text-6xl font-black">
                  {stat.value}
                </h3>

                <p className="text-gray-300 mt-4 font-medium">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>
        </div>
      </div>

    </section>
  );
}