export default function Location() {
  return (
    <section
      id="ubicacion"
      className="relative py-16 md:py-10 overflow-hidden scroll-mt-32 "
    >
      <div className="absolute left-10 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-10 bottom-20 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-5 md:p-12 shadow-xl shadow-black/5">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Ubicación
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-neutral-950 mt-4">
              Visítanos
            </h2>

            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Estamos ubicados en una de las zonas más concurridas de Culiacán.
            </p>
          </div>

          <div
            className="
              bg-white
              border
              border-neutral-200
              rounded-[28px]
              md:rounded-[32px]
              overflow-hidden
              shadow-xl
              shadow-black/10
            "
          >
            <iframe
              src="https://maps.google.com/maps?q=plaza%20forum%20culiacan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[350px] md:h-[500px]"
              loading="lazy"
            />
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-neutral-950 text-2xl font-bold">
              Plaza Fórum Culiacán
            </h3>

            <p className="text-neutral-600 mt-2 max-w-xl mx-auto">
              Blvd. José Diego Valadés #1676,
              Desarrollo Urbano Tres Ríos,
              Culiacán, Sinaloa.
            </p>

            <a
              href="https://maps.google.com/?q=plaza+forum+culiacan"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                mt-6
                px-6
                py-3
                rounded-full
                bg-neutral-950
                text-white
                font-bold
                hover:bg-yellow-600
                transition-all
                duration-300
                shadow-lg
                shadow-black/10
              "
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}