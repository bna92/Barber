import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../services/firebase";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  if (loading) {
    return <p className="text-white p-10">Cargando producto...</p>;
  }

  if (!product) {
    return <p className="text-white p-10">Producto no encontrado.</p>;
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
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920')",
        }}
      />

      <div className="fixed inset-0 -z-10 bg-black/90" />

      <Navbar />

      {showNotification && (
        <div className="fixed top-24 right-4 z-[9999] bg-green-600 border border-green-400 text-white px-5 py-4 rounded-2xl shadow-2xl animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>

            <div>
              <p className="font-semibold">Producto agregado al carrito</p>

              <p className="text-sm text-green-100">
                Ya puedes finalizar tu compra
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="pt-36 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 mb-8 text-yellow-400 hover:text-yellow-300 font-bold"
          >
            ← Volver a productos
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="relative">
                <img
                  src={currentImage}
                  alt={product.nombre}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-[320px] md:h-[420px] object-cover rounded-3xl border border-white/10 cursor-zoom-in hover:border-yellow-400 transition-all duration-300"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 text-white text-3xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition cursor-pointer"
                    >
                      ‹
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 text-white text-3xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition cursor-pointer"
                    >
                      ›
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

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
                          ? "w-full h-24 object-cover rounded-xl border-2 border-yellow-400"
                          : "w-full h-24 object-cover rounded-xl border border-white/10 opacity-70 hover:opacity-100 transition"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-3xl p-6">
              <p className="text-yellow-400 font-bold mb-2">
                {product.categoria}
              </p>

              <h1 className="text-4xl font-black mb-4">{product.nombre}</h1>

              <p className="text-gray-300 mb-6">{product.descripcion}</p>

              <p className="text-4xl font-black text-yellow-400 mb-6">
                ${product.precio}
              </p>

              <p className="text-sm text-gray-400 mb-6">
                Stock disponible: {product.stock}
              </p>

              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black hover:bg-yellow-400 transition cursor-pointer"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
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
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
