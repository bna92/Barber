import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";

export default function ProductsPage() {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("products-scroll-y");

    if (!savedScroll) {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#faf7f2] overflow-hidden"
    >
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          opacity-100
          mix-blend-multiply
          [background:radial-gradient(520px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(234,179,8,0.12),transparent_45%)]
        "
      />

      <div className="fixed left-0 top-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] pointer-events-none" />
      <div className="fixed right-0 bottom-0 w-[600px] h-[600px] bg-orange-400/10 blur-[180px] pointer-events-none" />

      <div className="relative z-[2]">
        <Navbar />

        <section className="pt-32 md:pt-40 pb-6 text-center px-4">
          <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
            Tienda
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-neutral-950 mt-4">
            Catálogo de Productos 
          </h1>

          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Cuida tu cabello y barba con productos seleccionados por
            profesionales.
          </p>
        </section>

        <Products />

        <Footer />
      </div>
    </main>
  );
}
