import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CartPage() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  const subtotal = total;
  const totalFinal = total;
  const whatsappNumber = "526671505736";

  const handleWhatsAppOrder = () => {
    const orderDetails = cart
      .map(
        (item) =>
          `• ${item.nombre}\nCantidad: ${item.quantity}\nPrecio: $${item.precio}`,
      )
      .join("\n\n");

    const message = `
Hola, me interesa realizar el siguiente pedido:

${orderDetails}

Total: $${totalFinal.toFixed(2)}

Quedo atento(a) a la confirmación.
  `;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
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

            <div className="text-center mb-10">
              <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
                Tu compra
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-neutral-950 mt-4">
                Carrito de compras
              </h1>

              <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
                Revisa tus productos antes de finalizar tu pedido.
              </p>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white/75 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-8 md:p-12 text-center shadow-xl shadow-black/5">
                <p className="text-neutral-600 mb-6">Tu carrito está vacío.</p>

                <Link
                  to="/productos"
                  className="inline-flex bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg shadow-black/10"
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
                      className="
                        bg-white
                        border
                        border-neutral-200
                        rounded-[24px]
                        p-4
                        flex
                        gap-4
                        shadow-lg
                        shadow-black/5
                      "
                    >
                      <Link to={`/productos/${item.id}`}>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
                        />
                      </Link>

                      <div className="flex-1">
                        <Link to={`/productos/${item.id}`}>
                          <h2 className="text-lg md:text-xl font-black text-neutral-950 hover:text-yellow-700 transition cursor-pointer">
                            {item.nombre}
                          </h2>
                        </Link>

                        <p className="text-neutral-500 text-sm mt-1 line-clamp-2">
                          {item.descripcion}
                        </p>

                        <p className="text-neutral-950 font-black text-xl mt-3">
                          ${item.precio}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-950 w-9 h-9 rounded-full font-bold cursor-pointer transition"
                          >
                            -
                          </button>

                          <span className="font-bold text-neutral-950">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-950 w-9 h-9 rounded-full font-bold cursor-pointer transition"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500 hover:text-red-600 font-bold cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <aside
                  className="
                    bg-white/75
                    backdrop-blur-xl
                    border
                    border-neutral-200
                    rounded-[28px]
                    md:rounded-[36px]
                    p-6
                    h-fit
                    shadow-xl
                    shadow-black/5
                  "
                >
                  <h2 className="text-2xl font-black text-neutral-950 mb-6">
                    Resumen
                  </h2>

                  <div className="mt-6 border-t border-neutral-200 pt-5">
                    <h3 className="text-sm font-black text-neutral-950 mb-4">
                      Productos agregados
                    </h3>

                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-4 text-sm"
                        >
                          <div>
                            <p className="font-bold text-neutral-950">
                              {item.nombre}
                            </p>

                            <p className="text-neutral-500">
                              Cantidad: {item.quantity}
                            </p>
                          </div>

                          <p className="font-black text-neutral-950">
                            ${(item.precio * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t border-neutral-200 pt-4 flex justify-between text-2xl font-black text-neutral-950">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleWhatsAppOrder}
                    className="
    mt-8
    w-full
    bg-green-600
    hover:bg-green-700
    text-white
    py-4
    rounded-2xl
    font-black
    transition
    cursor-pointer
  "
                  >
                    Comprar por WhatsApp
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full mt-4 bg-neutral-100 text-neutral-950 py-3 rounded-2xl font-bold hover:bg-neutral-200 transition cursor-pointer"
                  >
                    Vaciar carrito
                  </button>
                </aside>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
