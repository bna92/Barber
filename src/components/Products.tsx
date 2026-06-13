import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const PRODUCTS_PER_PAGE = 6;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

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
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  if (loading) {
    return (
      <section className="py-20 bg-black text-white">
        <h2 className="text-center text-3xl font-bold">
          Cargando productos...
        </h2>
      </section>
    );
  }

  return (
    <section id="productos" className="py-20 bg-black text-white">
      {showNotification && (
        <div className="fixed top-28 right-6 z-[9999] bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold animate-pulse">
          ✅ Producto agregado al carrito
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Productos</h2>

        <p className="text-center text-gray-400 mb-12">
          Productos profesionales para el cuidado de tu cabello y barba.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoria(categoria)}
              className={
                categoriaActiva === categoria
                  ? "bg-yellow-500 text-black px-5 py-2 rounded-full font-bold cursor-pointer"
                  : "bg-white/10 text-white px-5 py-2 rounded-full hover:bg-white/20 transition cursor-pointer"
              }
            >
              {categoria}
            </button>
          ))}
        </div>

        {productosPaginados.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay productos disponibles en esta categoría.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productosPaginados.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10"
                >
                  <Link to={`/productos/${product.id}`}>
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-40 md:h-64 object-cover cursor-pointer"
                    />
                  </Link>

                  <div className="p-3 md:p-5">
                    <Link to={`/productos/${product.id}`}>
                      <h3 className="text-lg md:text-xl font-bold hover:text-yellow-400 transition cursor-pointer">
                        {product.nombre}
                      </h3>
                    </Link>

                    <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                      {product.descripcion}
                    </p>

                    <p className="text-2xl font-bold mt-4">${product.precio}</p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition cursor-pointer"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "px-4 py-2 rounded-full bg-white/5 text-gray-500 cursor-not-allowed"
                      : "px-4 py-2 rounded-full bg-white/10 text-white hover:bg-yellow-500 hover:text-black transition cursor-pointer"
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
                        ? "w-10 h-10 rounded-full bg-yellow-500 text-black font-bold cursor-pointer"
                        : "w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
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
                      ? "px-4 py-2 rounded-full bg-white/5 text-gray-500 cursor-not-allowed"
                      : "px-4 py-2 rounded-full bg-white/10 text-white hover:bg-yellow-500 hover:text-black transition cursor-pointer"
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
