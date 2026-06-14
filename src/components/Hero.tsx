import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const whatsappNumber = "6671505736";

const heroImages = [
  "/logofondonegro.png",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200",
  "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1200",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const titleWords = ["Más", "que", "un", "corte,", "una", "experiencia."];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();

    currentTarget.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white pt-28 lg:pt-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.18),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold tracking-[0.25em] text-yellow-300"
            >
              ✦ BARBERÍA PREMIUM
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-7 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight"
            >
              Tu estilo,
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
                elevado al siguiente nivel.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-7 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Cortes modernos, barba, coloración y cuidado personal con una
              experiencia profesional diseñada para que salgas impecable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20agendar%20una%20cita`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-4 text-black font-black shadow-2xl shadow-yellow-500/25 transition hover:bg-yellow-300 hover:scale-[1.03]"
              >
                Reservar cita
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-xl transition hover:border-yellow-400/60 hover:bg-white/10"
              >
                Ver servicios
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-first lg:order-last w-full max-w-sm mx-auto lg:max-w-none"
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
              <div className="absolute -inset-6 bg-yellow-500/25 blur-[90px] rounded-full" />

              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[460px] rounded-[40px] overflow-hidden border border-yellow-500/30 bg-white/5 shadow-2xl shadow-yellow-500/20">
                <motion.img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Barbería premium"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="
    absolute
    bottom-4
    left-4
    right-4
    bg-black/10
    border
    border-white/20
    rounded-3xl
    p-5
  "
                >
                  <p className="text-yellow-400 font-bold text-xs tracking-widest">
                    EXPERIENCIA PERSONALIZADA
                  </p>

                  <p className="text-white text-xl md:text-2xl font-black mt-2">
                    Cada detalle cuenta en tu imagen.
                  </p>

                  <div className="flex gap-2 mt-4">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          currentImage === index
                            ? "w-8 bg-yellow-500"
                            : "w-2 bg-white/40"
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
