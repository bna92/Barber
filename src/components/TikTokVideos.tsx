import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../services/firebase";
import { TikTokVideo } from "../types/tiktok";

export default function TikTokVideos() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const q = query(
          collection(db, "tiktok_videos"),
          orderBy("order", "asc"),
        );

        const snapshot = await getDocs(q);

        const data: TikTokVideo[] = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<TikTokVideo, "id">),
        }));

        setVideos(data.filter((video) => video.active));
      } catch (error) {
        console.error("Error cargando videos TikTok:", error);
      }
    };

    loadVideos();
  }, []);

  if (videos.length === 0) return null;

  return (
    <section
      id="tiktok"
      className="relative py-16 md:py-10 overflow-hidden scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(520px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(234,179,8,0.14),transparent_45%)]" />
      <div className="absolute left-20 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-10 bottom-20 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-5 md:p-12 shadow-xl shadow-black/5">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Videos TikTok
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-neutral-950 mt-4">
              KAM BARBER SALÓN en redes
            </h2>

            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Mira algunos de nuestros trabajos recientes. Toca el botón para
              verlo completo en TikTok.
            </p>
          </div>

          <div className="flex lg:grid lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0">
            {videos.map((item) => (
              <article
                key={item.id}
                className="min-w-[82%] sm:min-w-[55%] lg:min-w-0 snap-center overflow-hidden rounded-[28px] md:rounded-[32px] border border-neutral-200 bg-white shadow-xl shadow-black/10"
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
    className="w-full h-full object-contain bg-black"
  />

                  <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10 pointer-events-none">
                    <span className="text-white font-bold text-sm drop-shadow-lg">
                      @{item.user}
                    </span>

                    <a
                      href={item.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-red-500/30 transition-all duration-300"
                    >
                      Ver perfil
                    </a>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <p className="text-neutral-950 font-bold text-sm mb-2">
                    @{item.user}
                  </p>

                  <div className="overflow-hidden whitespace-nowrap mb-3">
                    <p className="inline-block text-neutral-800 text-sm animate-marquee">
                      {item.title} — {item.description}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed mb-5">
                    {item.tags}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full shadow-xl shadow-red-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Ver en TikTok
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="lg:hidden text-center text-neutral-500 text-xs mt-3">
            Desliza hacia los lados para ver más videos →
          </p>
        </div>
      </div>
    </section>
  );
}