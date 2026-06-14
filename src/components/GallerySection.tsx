import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1517832606299-7ae9b720a186",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
  "https://cdn0.bodas.com.mx/article-vendor/1604/original/1280/jpg/tempimageufaq2k_5_151604-172359396024812.jpeg",
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <section
      id="galeria"
      className="relative py-16 md:py-10 scroll-mt-32 overflow-hidden"
    >
      <div className="absolute left-20 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-10 bottom-20 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-5 md:p-12 shadow-xl shadow-black/5">
          <div className="text-center mb-10 md:mb-16">
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

          <div
            className="
              flex
              md:grid
              md:grid-cols-3
              gap-5
              md:gap-6
              overflow-x-auto
              md:overflow-visible
              snap-x
              snap-mandatory
              md:snap-none
              pb-4
              md:pb-0
              scrollbar-hide
            "
          >
            {images.map((image) => (
              <div
                key={image}
                onClick={() => setSelectedImage(image)}
                className="
                  min-w-[85%]
                  sm:min-w-[60%]
                  md:min-w-0
                  snap-center
                  overflow-hidden
                  rounded-[28px]
                  md:rounded-[32px]
                  border
                  border-neutral-200
                  bg-white
                  shadow-xl
                  shadow-black/10
                   hover:border-yellow-500/50
                  md:hover:-translate-y-3
                  hover:shadow-[0_25px_60px_rgba(234,179,8,0.18)]
                  group
                  cursor-pointer
                "
              >
                <img
                  src={image}
                  alt="Corte"
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          <p className="md:hidden text-center text-neutral-500 text-xs mt-3">
            Desliza hacia los lados para ver más trabajos →
          </p>
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/80
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-4
            cursor-pointer
          "
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute
              top-5
              right-5
              text-white
              text-5xl
              font-light
              cursor-pointer
            "
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="
              max-w-[95vw]
              max-h-[90vh]
              object-contain
              rounded-2xl
              shadow-2xl
              shadow-black/40
            "
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
