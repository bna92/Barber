import { lazy, Suspense } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhatsAppButton from "../components/WhatsAppButton";
import Location from "../components/Location";
import Socials from "../components/Socials";
import Footer from "../components/Footer";

const GallerySection = lazy(() => import("../components/GallerySection"));
const TikTokVideos = lazy(() => import("../components/TikTokVideos"));

export default function Home() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768) return;

    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#faf7f2]"
    >
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          hidden
          md:block
          opacity-100
          [background:radial-gradient(520px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(234,179,8,0.12),transparent_45%)]
        "
      />

      <div className="fixed left-0 top-0 w-[260px] h-[260px] md:w-[600px] md:h-[600px] bg-yellow-500/10 blur-[80px] md:blur-[180px] pointer-events-none" />

      <div className="fixed right-0 bottom-0 w-[260px] h-[260px] md:w-[600px] md:h-[600px] bg-orange-400/10 blur-[80px] md:blur-[180px] pointer-events-none" />

      <div className="relative z-[2]">
        <Navbar />
        <Hero />
        <Services />

        <Suspense fallback={null}>
          <GallerySection />
        </Suspense>

        <Suspense fallback={null}>
          <TikTokVideos />
        </Suspense>

        <Location />
        <Socials />
        <Footer />
      </div>

      <WhatsAppButton />
    </main>
  );
}