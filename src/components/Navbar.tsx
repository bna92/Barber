import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { GiFlame } from "react-icons/gi";

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
          max-w-[1250px] mx-auto rounded-3xl md:rounded-full border transition-all duration-500
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-2xl border-neutral-200 shadow-xl shadow-black/5"
              : "bg-white/65 backdrop-blur-xl border-white/70 shadow-lg shadow-black/5"
          }
        `}
      >
        <div className="min-h-16 md:h-20 px-4 md:px-8 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logofondonegro.png"
              alt="Barbershop"
              className="w-25 h-25 md:w-20 md:h-20 object-contain"
            />

            <span className="text-neutral-950 font-black text-xl">
              KAM BARBER SALÓN
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 xl:gap-14">
            <HashLink
              smooth
              to="/#servicios"
              className="text-neutral-700 hover:text-yellow-700 font-medium transition"
            >
              Servicios
            </HashLink>

            <HashLink
              smooth
              to="/#galeria"
              className="text-neutral-700 hover:text-yellow-700 font-medium transition"
            >
              Galería
            </HashLink>

            <HashLink
              smooth
              to="/#tiktok"
              className="text-neutral-700 hover:text-yellow-700 font-medium transition"
            >
              Videos
            </HashLink>

            <HashLink
              smooth
              to="/#ubicacion"
              className="text-neutral-700 hover:text-yellow-700 font-medium transition"
            >
              Ubicación
            </HashLink>

            <Link
              to="/carrito"
              className="relative flex items-center gap-2 text-neutral-700 hover:text-yellow-700 font-medium transition"
            >
              <span>Carrito</span>

              <span className="text-lg">🛒</span>

              {totalItems > 0 && (
                <span className="absolute -top-3 -right-5 bg-red-500 text-white min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="hidden sm:flex">
            <Link
              to="/productos"
              className="relative font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 animate-pulse"
            >
              <span
                className="
    absolute
    inset-0
    rounded-xl
    bg-gradient-to-b
    from-amber-300
    to-yellow-700
    blur-md
    opacity-70
  "
              ></span>

              <span
                className="
    relative
    flex
    items-center
    justify-center
    gap-2
    rounded-xl
    px-6
    py-3
    bg-gradient-to-r
    from-amber-300
    via-yellow-500
    to-amber-700
    border
    border-yellow-100/50
    shadow-lg
    shadow-yellow-600/40
    text-black
    font-black
  "
              >
                🔥 Productos
              </span>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/carrito" className="relative text-neutral-950 text-2xl">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-500 text-white min-w-[22px] h-5 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="text-neutral-950 text-3xl cursor-pointer"
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
              className="text-neutral-700 font-medium"
            >
              Servicios
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#galeria"
              className="text-neutral-700 font-medium"
            >
              Galería
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#tiktok"
              className="text-neutral-700 font-medium"
            >
              Videos
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#ubicacion"
              className="text-neutral-700 font-medium"
            >
              Ubicación
            </HashLink>

            <Link
              onClick={() => setOpen(false)}
              to="/carrito"
              className="relative flex items-center gap-2 text-neutral-700 hover:text-yellow-700 transition font-medium"
            >
              Carrito
              <span className="ml-1">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-3 left-24 bg-red-500 text-white min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/productos"
              className="
    relative
    font-bold
     text-white
    animate-pulse
    transition-all
    duration-300
  "
            >
              <span
                className="
    absolute
    inset-0
    rounded-xl
    bg-gradient-to-b
    from-amber-300
    to-yellow-700
    blur-md
    opacity-70
  "
              ></span>

              <span
                className="
    relative
    flex
    items-center
    justify-center
    gap-2
    rounded-xl
    px-6
    py-3
    bg-gradient-to-r
    from-amber-300
    via-yellow-500
    to-amber-700
    border
    border-yellow-100/50
    shadow-lg
    shadow-yellow-600/40
    text-black
    font-black
  "
              >
                🔥 Productos
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
