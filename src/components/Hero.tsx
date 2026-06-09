import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const whatsappNumber = "6671505736";

const heroImages = [
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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 md:pt-0">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1920')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute top-28 left-10 w-72 h-72 md:w-96 md:h-96 bg-yellow-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 md:w-96 md:h-96 bg-orange-500/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-[1900px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                inline-flex
                items-center
                gap-2
                bg-yellow-500/10
                border
                border-yellow-500/30
                text-yellow-400
                px-5
                py-2
                rounded-full
                text-xs
                md:text-sm
                font-bold
                tracking-[0.25em]
              "
            >
              ✦ BARBERÍA PREMIUM
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="
  mt-6
  md:mt-8
  text-white
  font-black
  leading-[0.95]
  text-2xl
  sm:text-5xl
  md:text-8xl
  max-w-5xl
  mx-auto
  lg:mx-0
"
            >
              Estilo que se nota,
              <br />
              confianza que se siente.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="
                mt-6
                md:mt-8
                text-gray-300
                text-base
                md:text-xl
                max-w-2xl
                mx-auto
                lg:mx-0
                leading-relaxed
              "
            >
              Cortes modernos, barba definida y atención profesional para que
              salgas con una imagen limpia, segura y lista para cualquier
              ocasión.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="
                mt-8
                md:mt-10
                flex
                flex-col
                sm:flex-row
                justify-center
                lg:justify-start
                gap-4
              "
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20agendar%20una%20cita`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-gradient-to-r
                  from-yellow-500
                  to-amber-400
                  hover:from-yellow-400
                  hover:to-yellow-300
                  text-black
                  font-black
                  px-8
                  py-4
                  rounded-full
                  transition-all
                  duration-300
                  hover:scale-105
                  shadow-xl
                  shadow-yellow-500/20
                "
              >
                Reservar cita
              </a>

              <a
                href="#servicios"
                className="
                  bg-white/5
                  border
                  border-white/15
                  hover:border-yellow-500/50
                  hover:bg-white/10
                  text-white
                  font-bold
                  px-8
                  py-4
                  rounded-full
                  transition-all
                  duration-300
                "
              >
                Ver servicios
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="
  relative
  order-first
  lg:order-last
  w-full
  max-w-sm
  mx-auto
  lg:max-w-none
"
          >
            <div className="absolute -inset-6 bg-yellow-500/20 blur-[80px] rounded-full" />

            <div
              className="
    relative
    w-full
    h-[320px]
    sm:h-[420px]
    lg:h-[620px]
    rounded-[32px]
    lg:rounded-[48px]
    overflow-hidden
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
  "
            >
              <motion.img
                key={currentImage}
                src={heroImages[currentImage]}
                alt="Barbería premium"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
  "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div
                className="
    absolute
    bottom-3
    left-3
    right-3

    md:bottom-8
    md:left-8
    md:right-8
  "
              >
                <div
                  className="
    bg-black/60
    backdrop-blur-xl
    border
    border-white/10

    rounded-2xl
    md:rounded-3xl

    p-3
    md:p-6
  "
                >
                  <p className="text-yellow-400 font-bold text-[10px] md:text-sm tracking-widest">
                    EXPERIENCIA PREMIUM
                  </p>

                  <p className="text-white text-sm md:text-2xl font-black mt-1 md:mt-2">
                    Cada detalle cuenta en tu imagen.
                  </p>
                  <div className="flex gap-2 mt-4">
                    {heroImages.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          currentImage === index
                            ? "w-8 bg-yellow-500"
                            : "w-2 bg-white/40"
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
