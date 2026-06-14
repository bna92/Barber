import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "motion/react";

import { db } from "../services/firebase";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";

const PRODUCTS_PER_PAGE = 9;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));

        const data: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(data.filter((product) => product.activo));
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categorias = [
    "Todos",
    ...new Set(products.map((product) => product.categoria)),
  ];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? products
      : products.filter((product) => product.categoria === categoriaActiva);

  const totalPages = Math.ceil(productosFiltrados.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const productosPaginados = productosFiltrados.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const handleCategoria = (categoria: string) => {
    setCategoriaActiva(categoria);
    setCurrentPage(1);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    toast.success("Producto agregado al carrito", {
      description: `${product.nombre} ya está en tu carrito`,
      action: {
        label: "Ver carrito",
        onClick: () => {
          window.location.href = "/carrito";
        },
      },
    });
  };

  if (loading) {
    return (
      <section className="py-20">
        <h2 className="text-center text-3xl font-black text-neutral-950">
          Cargando productos...
        </h2>
      </section>
    );
  }

  return (
    <section id="productos" className="relative py-8 md:py-12">
      <div className="absolute left-20 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-10 bottom-20 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoria(categoria)}
              className={
                categoriaActiva === categoria
                  ? "bg-neutral-950 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer shadow-md shadow-black/10"
                  : "bg-white text-neutral-700 border border-neutral-200 px-4 py-2 rounded-full text-sm hover:border-yellow-500/50 hover:text-yellow-700 transition cursor-pointer shadow-sm"
              }
            >
              {categoria}
            </button>
          ))}
        </div>

        {productosPaginados.length === 0 ? (
          <p className="text-center text-neutral-500">
            No hay productos disponibles en esta categoría.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {productosPaginados.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                    boxShadow: "0 15px 35px rgba(234, 179, 8, 0.14)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                  className="
                    bg-white
                    rounded-xl
                    overflow-hidden
                    border
                    border-neutral-200
                    hover:border-yellow-500/40
                    shadow-md
                    shadow-black/5
                    transition-all
                  "
                >
                  <Link to={`/productos/${product.id}`}>
                    <div className="bg-neutral-50 overflow-hidden">
                      <motion.img
                        src={product.imagen}
                        alt={product.nombre}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-32 md:h-40 object-cover cursor-pointer"
                      />
                    </div>
                  </Link>

                  <div className="p-3">
                    <Link to={`/productos/${product.id}`}>
                      <h3 className="text-sm md:text-base font-bold text-neutral-900 hover:text-yellow-700 transition cursor-pointer line-clamp-2 min-h-[40px]">
                        {product.nombre}
                      </h3>
                    </Link>

                    <p className="text-neutral-500 mt-1 text-xs line-clamp-2 min-h-[32px]">
                      {product.descripcion}
                    </p>

                    <div className="mt-3">
                      <span className="text-xs text-green-600 font-semibold">
                        Stock: {product.stock}
                      </span>

                      <p className="text-lg md:text-xl font-black text-neutral-950 leading-tight">
                        ${product.precio}
                      </p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleAddToCart(product)}
                      className="
                        mt-3
                        w-full
                        bg-neutral-950
                        text-white
                        py-2.5
                        rounded-lg
                        text-sm
                        font-bold
                        hover:bg-yellow-600
                        transition
                        cursor-pointer
                        shadow-md
                        shadow-black/10
                      "
                    >
                      Agregar
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "px-4 py-2 rounded-full bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : "px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-950 hover:text-white transition cursor-pointer shadow-sm"
                  }
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={
                      currentPage === index + 1
                        ? "w-10 h-10 rounded-full bg-neutral-950 text-white font-bold cursor-pointer shadow-lg shadow-black/10"
                        : "w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-yellow-600 hover:text-white transition cursor-pointer"
                    }
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "px-4 py-2 rounded-full bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : "px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-950 hover:text-white transition cursor-pointer shadow-sm"
                  }
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
