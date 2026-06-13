import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = total;
  const iva = subtotal * 0.16;
  const totalConIva = subtotal + iva;

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

      <section className="pt-36 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 mb-6 text-yellow-400 hover:text-yellow-300 font-bold cursor-pointer"
          >
            ← Volver a productos
          </Link>

          <h1 className="text-4xl md:text-5xl font-black mb-10">
            Carrito de compras
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <p className="text-gray-300 mb-6">Tu carrito está vacío.</p>

              <Link
                to="/productos"
                className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-full font-bold"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900 border border-white/10 rounded-3xl p-4 flex gap-4"
                  >
                    <Link to={`/productos/${item.id}`}>
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-28 h-28 object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link to={`/productos/${item.id}`}>
                        <h2 className="text-xl font-bold hover:text-yellow-400 transition cursor-pointer">
                          {item.nombre}
                        </h2>
                      </Link>

                      <p className="text-gray-400 text-sm mt-1">
                        {item.descripcion}
                      </p>

                      <p className="text-yellow-400 font-black text-xl mt-3">
                        ${item.precio}
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-white/10 w-9 h-9 rounded-full font-bold cursor-pointer"
                        >
                          -
                        </button>

                        <span className="font-bold">{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-white/10 w-9 h-9 rounded-full font-bold cursor-pointer"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-400 hover:text-red-300 font-bold cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="bg-gray-900 border border-white/10 rounded-3xl p-6 h-fit">
                <h2 className="text-2xl font-black mb-6">Resumen</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>IVA 16%</span>
                    <span>${iva.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span>${totalConIva.toFixed(2)}</span>
                  </div>
                </div>

                <button className="mt-8 w-full bg-yellow-500 text-black py-4 rounded-2xl font-black hover:bg-yellow-400 transition">
                  Proceder al pago
                </button>

                <button
                  onClick={clearCart}
                  className="w-full mt-4 bg-white/10 text-white py-3 rounded-2xl font-bold hover:bg-white/20 transition cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
