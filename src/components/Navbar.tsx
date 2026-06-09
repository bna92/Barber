import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-0 w-full z-50 px-4 md:px-6 transition-all duration-500">
      <div
        className={`
          max-w-[1700px] mx-auto rounded-3xl md:rounded-full border transition-all duration-500
          ${
            scrolled
              ? "bg-black/80 backdrop-blur-2xl border-white/10 shadow-2xl"
              : "bg-black/30 backdrop-blur-xl border-white/5"
          }
        `}
      >
        <div className="min-h-16 md:h-20 px-4 md:px-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-white text-lg md:text-2xl font-black tracking-wider">
              BARBER IA
            </h1>

            <p className="text-yellow-500 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em]">
              PREMIUM BARBERSHOP
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-25">
            <a
              href="#servicios"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Servicios
            </a>

            <a
              href="#horarios"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Horarios
            </a>

            <a
              href="#ubicacion"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Ubicación
            </a>

            <a
              href="#galeria"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Galería
            </a>

            <a
              href="#tiktok"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Videos
            </a>
          </nav>

          <div className="hidden sm:flex">
            <a
              href="https://wa.me/52667TU_NUMERO"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-500 to-amber-400 text-black px-5 md:px-7 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/20"
            >
              Reservar Cita
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {open && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4">
            <a
              onClick={() => setOpen(false)}
              href="#servicios"
              className="text-white/80"
            >
              Servicios
            </a>

            <a
              onClick={() => setOpen(false)}
              href="#horarios"
              className="text-white/80"
            >
              Horarios
            </a>

            <a
              onClick={() => setOpen(false)}
              href="#ubicacion"
              className="text-white/80"
            >
              Ubicación
            </a>

            <a
              onClick={() => setOpen(false)}
              href="#galeria"
              className="text-white/80"
            >
              Galería
            </a>

            <a
              onClick={() => setOpen(false)}
              href="#tiktok"
              className="text-white/80"
            >
              Videos
            </a>

            <a
              onClick={() => setOpen(false)}
              href="https://wa.me/52667TU_NUMERO"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-black px-5 py-3 rounded-full font-bold text-center"
            >
              Reservar
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
