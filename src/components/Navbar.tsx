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
          max-w-[1250px] mx-auto rounded-3xl md:rounded-full border transition-all duration-500
          ${scrolled
            ? "bg-white/90 backdrop-blur-2xl border-neutral-200 shadow-xl shadow-black/5"
            : "bg-white/65 backdrop-blur-xl border-white/70 shadow-lg shadow-black/5"
          }
        `}
      >
        <div className="min-h-16 md:h-20 px-4 md:px-8 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logofondonegro2.png"
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
              className="relative text-2xl text-neutral-700 hover:text-yellow-700 transition"
            >
              🛒

              {totalItems > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-500 text-white min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="hidden sm:flex">
            <Link
              to="/productos"
              className="
    bg-neutral-950
    text-white
    px-6
    py-3
    rounded-full
    font-bold
    hover:bg-neutral-800
    transition-all
    duration-300
    shadow-lg
    shadow-black/10
  "
            >
              Productos
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

            <Link to="/mis-compras">Mis compras</Link>

            <Link
              onClick={() => setOpen(false)}
              to="/productos"
              className="
    bg-neutral-950
    text-white
    px-6
    py-3
    rounded-full
    font-bold
    text-center
    hover:bg-neutral-800
    transition-all
    duration-300
    shadow-lg
    shadow-black/10
  "
            >
              Productos
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
