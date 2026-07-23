import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "motion/react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../services/firebase";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { tieneMayoreo } from "../utils/pricing";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      const ref = doc(db, "productos", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = {
          id: snap.id,
          ...(snap.data() as Omit<Product, "id">),
        };

        setProduct(data);
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  if (loading) {
    return (
      <main className="relative min-h-screen bg-[#faf7f2]">
        <Navbar />

        <section className="pt-40 px-4 text-center">
          <p className="text-neutral-600 font-bold">Cargando producto...</p>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="relative min-h-screen bg-[#faf7f2]">
        <Navbar />

        <section className="pt-40 px-4 text-center">
          <p className="text-neutral-600 font-bold">Producto no encontrado.</p>

          <Link
            to="/productos"
            className="inline-flex mt-6 px-6 py-3 rounded-full bg-neutral-950 text-white font-bold hover:bg-yellow-600 transition"
          >
            Volver a productos
          </Link>
        </section>
      </main>
    );
  }

  const images = product.imagenes?.length ? product.imagenes : [product.imagen];

  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleAddToCart = () => {
    addToCart(product);

    toast.success("Producto agregado al carrito", {
      description: product.nombre,
      action: {
        label: "Ver carrito",
        onClick: () => {
          window.location.href = "/carrito";
        },
      },
    });
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
          [background:radial-gradient(700px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(250,204,21,0.22),transparent_55%)]
        "
      />

      <div className="fixed left-0 top-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] pointer-events-none" />
      <div className="fixed right-0 bottom-0 w-[600px] h-[600px] bg-orange-400/10 blur-[180px] pointer-events-none" />

      <div className="relative z-[2]">
        <Navbar />

        <section className="pt-32 md:pt-40 pb-10 md:pb-14 px-4">
          <div className="max-w-[1200px] mx-auto">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 mb-8 text-neutral-700 hover:text-yellow-700 font-bold transition"
            >
              ← Volver a productos
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="
                    relative
                    bg-white
                    border
                    border-neutral-200
                    rounded-[28px]
                    md:rounded-[36px]
                    p-3
                    shadow-xl
                    shadow-black/10
                  "
                >
                  <div className="relative overflow-hidden rounded-[22px] md:rounded-[30px] bg-neutral-100">
                    <motion.img
                      src={currentImage}
                      alt={product.nombre}
                      onClick={() => {
                        setZoom(1);
                        setIsModalOpen(true);
                      }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-[300px] md:h-[480px] object-cover cursor-zoom-in"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 text-neutral-950 text-3xl flex items-center justify-center hover:bg-yellow-500 transition cursor-pointer shadow-lg"
                        >
                          ‹
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 text-neutral-950 text-3xl flex items-center justify-center hover:bg-yellow-500 transition cursor-pointer shadow-lg"
                        >
                          ›
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-neutral-950 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>

                <div className="grid grid-cols-4 gap-3 mt-4">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      onClick={() => setCurrentImageIndex(index)}
                      className="cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={product.nombre}
                        className={
                          currentImageIndex === index
                            ? "w-full h-20 md:h-24 object-cover rounded-xl border-2 border-yellow-500 shadow-md shadow-yellow-500/20"
                            : "w-full h-20 md:h-24 object-cover rounded-xl border border-neutral-200 opacity-70 hover:opacity-100 transition"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="
                  bg-white/75
                  backdrop-blur-xl
                  border
                  border-neutral-200
                  rounded-[28px]
                  md:rounded-[36px]
                  p-6
                  md:p-8
                  shadow-xl
                  shadow-black/5
                "
              >
                <p className="inline-flex mb-4 rounded-full bg-yellow-100 text-yellow-800 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
                  {product.categoria}
                </p>

                <h1 className="text-3xl md:text-5xl font-black text-neutral-950 leading-tight">
                  {product.nombre}
                </h1>

                <p className="text-neutral-600 mt-5 leading-relaxed">
                  {product.descripcion}
                </p>

                <div className="mt-7">
                  <p className="text-sm font-bold text-green-600">
                    Stock disponible: {product.inStock}
                  </p>

                  <p className="text-4xl md:text-5xl font-black text-neutral-950 mt-2">
                    ${product.precio}
                  </p>

                  {tieneMayoreo(product) && (
                    <p className="text-sm font-bold text-yellow-700 mt-2">
                      Precio mayoreo: ${product.precioMayoreo} c/u comprando {product.cantidadMayoreo} o más piezas
                    </p>
                  )}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="
                    mt-8
                    w-full
                    bg-neutral-950
                    text-white
                    py-4
                    rounded-2xl
                    font-black
                    hover:bg-yellow-600
                    transition
                    cursor-pointer
                    shadow-lg
                    shadow-black/10
                  "
                >
                  Agregar al carrito
                </button>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                    <p className="text-sm font-bold text-neutral-950">
                      Compra segura
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Pedido por WhatsApp
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white text-4xl font-bold cursor-pointer z-10"
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-4xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition z-10 cursor-pointer"
                >
                  ‹
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-4xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition z-10 cursor-pointer"
                >
                  ›
                </button>
              </>
            )}

            <img
              src={currentImage}
              alt={product.nombre}
              onClick={(e) => {
                e.stopPropagation();
                setZoom((prev) => (prev === 1 ? 2 : 1));
              }}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in"
              style={{
                transform: `scale(${zoom})`,
                cursor: zoom === 1 ? "zoom-in" : "zoom-out",
              }}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </main>
  );
}
