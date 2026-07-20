import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../services/firebase";
import { HeroSlide } from "../types/hero";

const whatsappNumber = "5216673220272";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    const loadHeroImages = async () => {
      const q = query(collection(db, "hero"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);

      const data: HeroSlide[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<HeroSlide, "id">),
      }));

      setHeroImages(
        data.filter((slide) => slide.active).map((slide) => slide.image),
      );
    };

    loadHeroImages();
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7f2] text-neutral-950 pt-28 sm:pt-28 md:pt-28 lg:pt-28 xl:pt-8 2xl:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(251,191,36,0.20),transparent_32%)]" />

      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10 min-h-screen max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 xl:gap-16 items-center w-full">
          <div className="relative text-center lg:text-left">
            <motion.h1
              initial="hidden"
              animate="visible"
              className="text-[3.2rem] sm:text-6xl lg:text-6xl xl:text-5xl 2xl:text-6xl font-black leading-[0.95] tracking-tight uppercase"
            >
              {["Tu mejor", "versión", "empieza", "aqui."].map(
                (line, index) => (
                  <motion.span
                    key={line}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.12,
                      ease: "easeOut",
                    }}
                    className={
                      index === 1
                        ? "block text-transparent bg-gradient-to-r from-yellow-700 via-amber-500 to-orange-400 bg-clip-text"
                        : index === 3
                          ? "block text-transparent [-webkit-text-stroke:1.5px_#171717]"
                          : "block"
                    }
                  >
                    {line}
                  </motion.span>
                ),
              )}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="origin-left mx-auto lg:mx-0 mt-7 h-1 w-40 bg-gradient-to-r from-yellow-600 to-orange-400"
            />

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.65 }}
              className="mt-7 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Cortes modernos, barba, coloración y cuidado personal con una
              experiencia profesional diseñada para que salgas impecable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.65 }}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20agendar%20una%20cita`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-yellow-500 text-neutral-950 px-7 py-4 font-black border border-yellow-600 shadow-xl shadow-yellow-500/20 transition hover:bg-neutral-950 hover:text-white"
              >
                RESERVAR CITA
                <span className="ml-5 flex h-8 w-8 items-center justify-center border border-neutral-950/30 transition group-hover:border-white/40">
                  →
                </span>
              </a>

              <a
                href="#servicios"
                className="inline-flex items-center justify-center border border-neutral-300 bg-white/60 px-7 py-4 font-black text-neutral-950 backdrop-blur-md transition hover:border-yellow-500 hover:bg-white"
              >
                VER SERVICIOS
                <span className="ml-5 text-yellow-600">+</span>
              </a>
            </motion.div>


          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-first lg:order-last w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto"
          >
            <Link
              to="/productos"
              className="
                absolute
                z-300
                left-0
                top-5
                sm:left-5
                sm:top-7
                lg:-left-5
                lg:top-10
                border
                border-yellow-500/40
                bg-white/85
                backdrop-blur-md
                px-3
                py-2
                sm:px-4
                sm:py-3
                text-[10px]
                sm:text-xs
                font-black
                tracking-[0.22em]
                sm:tracking-[0.25em]
                text-neutral-900
                transition
                hover:bg-yellow-500
                hover:text-black
              "
            >
              VER CATÁLOGO →
            </Link>

            <div className="relative isolate">
              <div className="absolute -inset-1 -z-10 bg-gradient-to-br from-yellow-400/60 via-transparent to-orange-400/60 blur-lg" />

              <div className="relative z-10 h-[430px] sm:h-[520px] lg:h-[610px] overflow-hidden border border-yellow-600/30 shadow-2xl shadow-yellow-900/10 [clip-path:polygon(0_0,88%_0,100%_12%,100%_100%,12%_100%,0_88%)]">
                {heroImages.length > 0 && (
                  <motion.img
                    key={currentImage}
                    src={heroImages[currentImage]}
                    alt="Barbería premium"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-yellow-500/8 to-transparent" />

                <div className="absolute left-5 top-5 h-16 w-16 border-l-2 border-t-2 border-yellow-400" />
                <div className="absolute right-5 bottom-5 h-16 w-16 border-b-2 border-r-2 border-yellow-400" />

                <div
                  className="
                    absolute
                    bottom-7
                    left-10
                    right-7
                    sm:bottom-5
                    sm:left-5
                    sm:right-5
                    lg:bottom-8
                    lg:left-20
                    lg:right-8
                    border
                    border-white/30
                    bg-white/15
                    backdrop-blur-lg
                    px-1
                    py-1
                    sm:px-5
                    sm:py-4
                    rounded-xl
                  "
                >
                  <p className="text-[9px] sm:text-[10px] lg:text-xs font-black tracking-[0.22em] text-yellow-300">
                    EXPERIENCIA PERSONALIZADA
                  </p>

                  <p className="mt-1 text-lg sm:text-xl lg:text-2xl font-black text-white leading-tight drop-shadow-lg">
                    Cada detalle cuenta en tu imagen.
                  </p>

                  <div className="mt-3 flex gap-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        aria-label={`Ver imagen ${index + 1}`}
                        className={`transition-all duration-500 ${
                          currentImage === index
                            ? "w-7 h-2 bg-yellow-400"
                            : "w-2 h-2 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}