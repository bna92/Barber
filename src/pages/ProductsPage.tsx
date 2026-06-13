import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";


export default function ProductsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920')",
        }}
      />

      <div className="fixed inset-0 -z-10 bg-black/90" />

      <Navbar />

      <section className="pt-32 pb-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black">
          Productos Profesionales
        </h1>

        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Cuida tu cabello y barba con productos seleccionados por profesionales.
        </p>
      </section>

      <Products />

      <Footer />

    </main>
  );
}