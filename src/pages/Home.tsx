import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TikTokVideos from "../components/TikTokVideos";
import Services from "../components/Services";
import GallerySection from "../components/GallerySection";
import WhatsAppButton from "../components/WhatsAppButton";
import Location from "../components/Location";
import Socials from "../components/Socials";
import Footer from "../components/Footer";

export default function Home() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY}px`);
  };
  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#faf7f2]"
    >
      {/* Spotlight global */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          opacity-100
          [background:radial-gradient(520px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(234,179,8,0.12),transparent_45%)]
        "
      />

      <div className="fixed left-0 top-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] pointer-events-none" />

      <div className="fixed right-0 bottom-0 w-[600px] h-[600px] bg-orange-400/10 blur-[180px] pointer-events-none" />

      <div className="relative z-[2]">
        <Navbar />

        <Hero />

        <Services />

        <GallerySection />

        <TikTokVideos />

        <Location />

        <Socials />

        <Footer />
      </div>

      <WhatsAppButton />
    </main>
  );
}