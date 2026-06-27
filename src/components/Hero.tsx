import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { HeroSlide } from "../types/hero";

const whatsappNumber = "6671505736";

const titleWords = ["Tu", "estilo", "elevado", "al,", "siguiente", "nivel."];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    const loadHeroImages = async () => {
      const q = query(
        collection(db, "hero"),
        orderBy("order", "asc"),
      );

      const snapshot = await getDocs(q);

      const data: HeroSlide[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<HeroSlide, "id">),
      }));

      setHeroImages(
        data
          .filter((slide) => slide.active)
          .map((slide) => slide.image),
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
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);
  return (
    <section
      className="relative min-h-screen overflow-hidden  text-neutral-950 pt-28 lg:pt-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-700/20 bg-white/70 px-4 py-2 text-xs font-bold tracking-[0.25em] text-yellow-700 shadow-sm backdrop-blur-xl"
            >
              ✦ BEAUTY & BARBER EXPERIENCE
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              className="mt-7 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.2] tracking-tight"
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={word + index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 35,
                      filter: "blur(10px)",
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    },
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className={
                    index >= 4
                      ? "inline-block mr-3 bg-gradient-to-r from-yellow-700 via-amber-500 to-orange-400 bg-clip-text text-transparent"
                      : "inline-block mr-3"
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-7 text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Cortes modernos, barba, coloración y cuidado personal con una
              experiencia profesional diseñada para que salgas impecable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20agendar%20una%20cita`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-white font-black shadow-2xl shadow-neutral-900/20 transition hover:bg-yellow-600 hover:scale-[1.03]"
              >
                Reservar cita
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/70 px-8 py-4 font-bold text-neutral-950 shadow-sm backdrop-blur-xl transition hover:border-yellow-500 hover:bg-white"
              >
                Ver servicios
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-first lg:order-last w-full max-w-sm mx-auto mt-12 lg:mt-0 lg:max-w-none"
          >
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotate: [0, 1.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 rounded-[42px] opacity-70 blur-sm" />

              <div
                className="
    relative
    w-full
    h-[360px]
    sm:h-[500px]
    lg:h-[560px]
    rounded-[40px]
    overflow-hidden
    bg-white
    border
    border-white
  "
              >
                <motion.img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Barbería premium"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/15 border border-white/40 rounded-3xl p-5"
                >
                  <p className="text-yellow-300 font-bold text-xs tracking-widest">
                    EXPERIENCIA PERSONALIZADA
                  </p>

                  <p className="text-white text-xl md:text-2xl font-black mt-2 drop-shadow-lg">
                    Cada detalle cuenta en tu imagen.
                  </p>

                  <div className="flex gap-2 mt-4">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${currentImage === index
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
