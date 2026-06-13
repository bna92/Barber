import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 md:top-3 left-0 w-full z-50 px-4 md:px-6 transition-all duration-500">
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
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Barbershop"
              className="w-25 h-25 md:w-20 md:h-20 object-contain"
            />

            <span className="text-white font-black text-xl">Barbershop</span>
          </Link>

          <nav className="hidden md:flex items-center gap-15">
            <HashLink
              smooth
              to="/#servicios"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Servicios
            </HashLink>

            <Link
              to="/productos"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Productos
            </Link>

            <HashLink
              smooth
              to="/#horarios"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Horarios
            </HashLink>

            <HashLink
              smooth
              to="/#ubicacion"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Ubicación
            </HashLink>

            <HashLink
              smooth
              to="/#galeria"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Galería
            </HashLink>

            <HashLink
              smooth
              to="/#tiktok"
              className="text-white/80 hover:text-yellow-400 transition"
            >
              Videos
            </HashLink>

            <Link
              to="/carrito"
              className="relative flex items-center gap-2 text-white/80 hover:text-yellow-400 transition"
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-5 bg-red-600 text-white min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
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

          <div className="md:hidden flex items-center gap-4">
            <Link to="/carrito" className="relative text-white text-2xl">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-600 text-white min-w-[22px] h-5 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="text-white text-3xl cursor-pointer"
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4">
            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#servicios"
              className="text-white/80"
            >
              Servicios
            </HashLink>

            <Link
              onClick={() => setOpen(false)}
              to="/productos"
              className="text-white/80"
            >
              Productos
            </Link>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#horarios"
              className="text-white/80"
            >
              Horarios
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#ubicacion"
              className="text-white/80"
            >
              Ubicación
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#galeria"
              className="text-white/80"
            >
              Galería
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#tiktok"
              className="text-white/80"
            >
              Videos
            </HashLink>

            <Link
              onClick={() => setOpen(false)}
              to="/carrito"
              className="relative flex items-center gap-2 text-white/80 hover:text-yellow-400 transition"
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span className="absolute -top-3 left-24 bg-red-600 text-white min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <a
              onClick={() => setOpen(false)}
              href="https://wa.me/52667TU_NUMERO"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-black px-5 py-3 rounded-full font-bold text-center"
            >
              Reservar Cita
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
