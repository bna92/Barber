const services = [
  {
    title: "Corte Caballero",
    price: "$200",
    description: "Corte moderno con acabado profesional.",
    image:
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1200",
  },
  {
    title: "Corte Dama",
    price: "$300",
    description: "Diseño personalizado para cualquier estilo.",
    image:
      "https://speedy.uenicdn.com/adf7e2ae-79b7-4c2d-a086-36e2f65cef5e/c1024_a/image/upload/v1567705538/category/shutterstock_653296774.jpg",
  },
  {
    title: "Barba",
    price: "$150",
    description: "Perfilado y definición profesional.",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1200",
  },
  {
    title: "Tinte",
    price: "$350",
    description: "Coloración y retoque profesional.",
    image:
      "https://tahecosmetics.com/trends/wp-content/uploads/2021/12/tipos-tintes.jpeg",
  },
  {
    title: "Rasurado",
    price: "$180",
    description: "Afeitado completo con acabado limpio.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200",
  },
  {
    title: "Lavado",
    price: "$100",
    description: "Lavado y cuidado capilar profesional.",
    image:
      "https://mejorconsalud.as.com/wp-content/uploads/2018/07/mujer-peluqueria-lavado-cabello-768x513.jpg?auto=format%2Ccompress&quality=75&width=1080&height=608&fit=cover&gravity=center&sharp=true&progressive=true",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="relative py-16 md:py-10 overflow-hidden scroll-mt-32 "
    >
      <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute left-10 bottom-20 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-5 md:p-12 shadow-xl shadow-black/5">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Servicios
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-neutral-950 mt-4">
              Nuestros Servicios
            </h2>

            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Servicios diseñados para resaltar tu imagen y mantener tu estilo
              impecable.
            </p>
          </div>

          <div
            className="
              flex
              md:grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
              md:gap-8
              overflow-x-auto
              md:overflow-visible
              snap-x
              snap-mandatory
              md:snap-none
              pb-4
              md:pb-0
              scrollbar-hide
            "
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="
                  min-w-[85%]
                  sm:min-w-[60%]
                  md:min-w-0
                  snap-center
                  overflow-hidden
                  rounded-[28px]
                  md:rounded-[32px]
                  bg-white/30
                  border
                  border-neutral-200
                  shadow-xl
                  shadow-black/10
                  hover:border-yellow-500/50
                  md:hover:-translate-y-3
                  hover:shadow-[0_25px_60px_rgba(234,179,8,0.18)]
                  transition-all
                  duration-500
                  group
                "
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-56 md:h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-neutral-950 text-xl md:text-2xl font-bold">
                      {service.title}
                    </h3>

                    <span className="text-yellow-700 font-black text-lg md:text-xl shrink-0">
                      {service.price}
                    </span>
                  </div>

                  <p className="mt-4 text-neutral-600 text-sm md:text-base">
                    {service.description}
                  </p>

                  <a
                    href="https://wa.me/526671234567?text=Hola,%20quiero%20agendar%20una%20cita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-neutral-950 text-white font-bold px-6 py-3 rounded-full hover:bg-yellow-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10"
                  >
                    Reservar
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="md:hidden text-center text-neutral-500 text-xs mt-3">
            Desliza hacia los lados para ver más servicios →
          </p>
        </div>
      </div>
    </section>
  );
}