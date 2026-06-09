import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TikTokVideos from "../components/TikTokVideos";
import Services from "../components/Services";
import GallerySection from "../components/GallerySection";
import WhatsAppButton from "../components/WhatsAppButton";
import AvailableHours from "../components/AvailableHours";
import Location from "../components/Location";
import Socials from "../components/Socials";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* Fondo global */}

      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920')",
        }}
      />

      {/* Overlay global */}

      <div className="fixed inset-0 -z-10 bg-black/85" />

      <Navbar />

      <Hero />

      <TikTokVideos />

      <GallerySection />

      <Services />

      <AvailableHours />

      <Testimonials />

      

      <Location />

      <Socials />

      <Footer />

      <WhatsAppButton />
    </main>
  );
}
