import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../services/firebase";
import { GalleryImage } from "../types/gallery";

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);

        const data: GalleryImage[] = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<GalleryImage, "id">),
        }));

        setImages(data.filter((image) => image.active));
      } catch (error) {
        console.error("Error cargando galería:", error);
      }
    };

    loadGalleryImages();
  }, []);

  if (images.length === 0) return null;

  return (
    <section
      id="galeria"
      className="relative py-16 md:py-10 scroll-mt-32 overflow-hidden"
    >
      <div className="absolute left-20 top-20 w-72 h-72 md:w-96 md:h-96 bg-yellow-500/10 blur-[80px] md:blur-[120px]" />
      <div className="absolute right-10 bottom-20 w-72 h-72 md:w-96 md:h-96 bg-orange-400/10 blur-[80px] md:blur-[120px]" />

      <div className="relative z-10 max-w-[1750px] mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden border border-neutral-200 bg-white/40 backdrop-blur-md md:backdrop-blur-xl p-5 md:p-12 shadow-xl shadow-black/5 [clip-path:polygon(0_0,96%_0,100%_6%,100%_100%,4%_100%,0_94%)]">
          <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative text-center mb-10 md:mb-16">
            <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Galería
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-neutral-950 mt-4">
              Nuestros Trabajos
            </h2>

            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Algunos de los estilos y cortes realizados por nuestros
              profesionales.
            </p>
          </div>

          <div className="relative flex md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 scrollbar-hide">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.image)}
                className="relative text-left min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center overflow-hidden border border-neutral-200 bg-white shadow-xl shadow-black/10 hover:border-yellow-500/60 md:hover:-translate-y-2 transition-all duration-500 group cursor-pointer [clip-path:polygon(0_0,92%_0,100%_8%,100%_100%,8%_100%,0_92%)]"
              >

                <img
                  src={image.image}
                  alt="Corte"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80" />



                <div className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-yellow-400" />

                <div className="absolute right-4 bottom-4 h-10 w-10 border-r-2 border-b-2 border-yellow-400" />
              </button>
            ))}
          </div>

          <p className="relative md:hidden text-center text-neutral-500 text-xs mt-3">
            Desliza hacia los lados para ver más trabajos →
          </p>
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white text-5xl font-light cursor-pointer"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-[95vw] max-h-[90vh] object-contain border border-yellow-400/40 shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}