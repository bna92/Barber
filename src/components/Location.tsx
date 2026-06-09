export default function Location() {
  return (
    <section
      id="ubicacion"
      
    >
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
            Ubicación
          </span>

          <h2 className="text-5xl font-black text-white mt-4">
            Visítanos
          </h2>

          <p className="text-gray-400 mt-4">
            Estamos ubicados en una de las zonas más concurridas de Culiacán.
          </p>

        </div>

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[40px]
            overflow-hidden
            backdrop-blur-xl
          "
        >

          <iframe
            src="https://maps.google.com/maps?q=plaza%20forum%20culiacan&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[500px]"
            loading="lazy"
          />

        </div>

        <div className="mt-8 text-center">

          <h3 className="text-white text-2xl font-bold">
            Plaza Fórum Culiacán
          </h3>

          <p className="text-gray-400 mt-2">
            Blvd. José Diego Valadés #1676,
            Desarrollo Urbano Tres Ríos,
            Culiacán, Sinaloa.
          </p>

        </div>

      </div>
    </section>
  );
}