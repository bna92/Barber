const videos = [
  {
    user: "barberia_ia",
    profile: "https://www.tiktok.com/@barberia_ia",
    title: "Corte caballero moderno",
    description:
      "Corte moderno con acabado profesional, estilo limpio y fresco para cualquier ocasión.",
    tags: "#barberia #fade #cortecaballero #fyp #parati",
    video: "/videos/corte1.mp4",
    link: "https://www.tiktok.com/@usuario/video/VIDEO_ID",
  },
  {
    user: "barberia_ia",
    profile: "https://www.tiktok.com/@barberia_ia",
    title: "Corte dama premium",
    description:
      "Diseño personalizado para resaltar tu estilo con un acabado elegante.",
    tags: "#cortedama #cabello #estilo #belleza #parati",
    video: "/videos/corte2.mp4",
    link: "https://www.tiktok.com/@usuario/video/VIDEO_ID",
  },
  {
    user: "barberia_ia",
    profile: "https://www.tiktok.com/@barberia_ia",
    title: "Barba y perfilado",
    description:
      "Perfilado de barba con acabado limpio, definido y profesional.",
    tags: "#barba #perfilado #barberia #beardstyle #fyp",
    video: "/videos/corte3.mp4",
    link: "https://www.tiktok.com/@usuario/video/VIDEO_ID",
  },
];

export default function TikTokVideos() {
  return (
    <section
      id="tiktok"
      className="relative py-20 md:py-28 overflow-hidden scroll-mt-32"
    >
      <div className="absolute left-20 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="bg-black/35 backdrop-blur-xl border border-white/10 rounded-[28px] md:rounded-[40px] p-5 md:p-12">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs md:text-sm">
              Videos TikTok
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
              Barbershop en redes
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Mira algunos de nuestros trabajos recientes. Toca el botón para
              verlo completo en TikTok.
            </p>
          </div>

          <div
            className="
              flex
              lg:grid
              lg:grid-cols-3
              gap-5
              md:gap-8
              overflow-x-auto
              lg:overflow-visible
              snap-x
              snap-mandatory
              lg:snap-none
              pb-4
              lg:pb-0
            "
          >
            {videos.map((item) => (
              <article
                key={item.title}
                className="
                  min-w-[82%]
                  sm:min-w-[55%]
                  lg:min-w-0
                  snap-center
                  overflow-hidden
                  rounded-[28px]
                  md:rounded-[32px]
                  border
                  border-white/10
                  bg-black/70
                  shadow-2xl
                  shadow-black/40
                "
              >
                <div className="relative bg-black">
                  <video
                    src={item.video}
                    autoPlay
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="
      w-full
      aspect-[9/10]
      object-cover
      bg-black
    "
                  />

                  <div
                    className="
      absolute
      top-0
      left-0
      right-0
      flex
      items-center
      justify-between
      p-4
      z-10
      pointer-events-none
    "
                  >
                    <span
                      className="
        text-white
        font-bold
        text-sm
        drop-shadow-lg
      "
                    >
                      @{item.user}
                    </span>

                    <a
                      href={item.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
        pointer-events-auto
        bg-red-600
        hover:bg-red-700
        text-white
        text-xs
        md:text-sm
        font-bold
        px-4
        py-2
        rounded-full
        shadow-lg
        shadow-red-600/40
      "
                    >
                      Ver perfil
                    </a>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <p className="text-white font-bold text-sm mb-2">
                    @{item.user}
                  </p>

                  <div className="overflow-hidden whitespace-nowrap mb-3">
                    <p className="inline-block text-white text-sm animate-marquee">
                      {item.title} — {item.description}
                    </p>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    {item.tags}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full
                      flex
                      justify-center
                      items-center
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      font-bold
                      py-3
                      rounded-full
                      shadow-lg
                      shadow-red-600/30
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                    "
                  >
                    Ver en Tik Tok
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="lg:hidden text-center text-gray-400 text-xs mt-3">
            Desliza hacia los lados para ver más videos →
          </p>
        </div>
      </div>
    </section>
  );
}
