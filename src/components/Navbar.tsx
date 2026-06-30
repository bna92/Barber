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
  relative
  max-w-[92vw]
  2xl:max-w-[1820px]
  mx-auto
  overflow-hidden
  border
  md:[clip-path:polygon(0_0,97%_0,100%_28%,100%_100%,3%_100%,0_72%)]
          ${scrolled
            ? "bg-white/90 backdrop-blur-2xl border-neutral-200 shadow-xl shadow-black/5"
            : "bg-white/70 backdrop-blur-xl border-white/80 shadow-lg shadow-black/5"
          }
        `}
      >
        <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />

        <div className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent" />

        <div className="relative min-h-16 md:h-20 px-4 md:px-8 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logofondonegro2.png"
              alt="KAM Barber Salón"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              width="80"
              height="80"
            />

            <span
              className="
    block
    text-neutral-950
    font-black
    text-[11px]
    sm:text-base
    md:text-xl
    leading-none
    tracking-tight
    max-w-[120px]
    sm:max-w-none
  "
            >
              KAM BARBER SALÓN
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 xl:gap-30">
            <HashLink
              smooth
              to="/#servicios"
              className="text-neutral-700 hover:text-yellow-700 font-bold text-sm tracking-wide transition"
            >
              Servicios
            </HashLink>

            <HashLink
              smooth
              to="/#galeria"
              className="text-neutral-700 hover:text-yellow-700 font-bold text-sm tracking-wide transition"
            >
              Galería
            </HashLink>

            <HashLink
              smooth
              to="/#tiktok"
              className="text-neutral-700 hover:text-yellow-700 font-bold text-sm tracking-wide transition"
            >
              Videos
            </HashLink>

            <HashLink
              smooth
              to="/#ubicacion"
              className="text-neutral-700 hover:text-yellow-700 font-bold text-sm tracking-wide transition"
            >
              Ubicación
            </HashLink>

            <Link
              to="/productos"
              className="text-neutral-700 hover:text-yellow-700 font-bold text-sm tracking-wide transition"
            >
              Productos
            </Link>
          </nav>

          <Link
            to="/carrito"
            className="
              hidden
              md:flex
              relative
              items-center
              justify-center
              h-12
              min-w-14
              px-4
              border
              border-yellow-500/50
              bg-white/70
              backdrop-blur-md
              text-neutral-950
              font-black
              shadow-lg
              shadow-yellow-500/10
              transition
              hover:bg-yellow-500
              hover:border-yellow-600
              [clip-path:polygon(0_0,84%_0,100%_28%,100%_100%,16%_100%,0_72%)]
            "
          >
            <span className="text-xl">🛒</span>

            {totalItems > 0 && (
              <span className="ml-2 bg-red-500 text-white min-w-[22px] h-6 px-1 flex items-center justify-center text-xs font-black">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/carrito"
              className="relative flex h-11 w-12 items-center justify-center border border-yellow-500/50 bg-white/70 text-neutral-950"
            >
              <span className="text-xl">🛒</span>

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[22px] h-5 px-1 flex items-center justify-center text-xs font-black">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="h-11 w-12 border border-neutral-300 bg-white/70 text-neutral-950 text-2xl font-black cursor-pointer"
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div className="relative md:hidden px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-neutral-200/70">
            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#servicios"
              className="text-neutral-700 font-bold"
            >
              Servicios
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#galeria"
              className="text-neutral-700 font-bold"
            >
              Galería
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#tiktok"
              className="text-neutral-700 font-bold"
            >
              Videos
            </HashLink>

            <HashLink
              smooth
              onClick={() => setOpen(false)}
              to="/#ubicacion"
              className="text-neutral-700 font-bold"
            >
              Ubicación
            </HashLink>

            <Link
              onClick={() => setOpen(false)}
              to="/productos"
              className="text-neutral-700 font-bold"
            >
              Productos
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}