import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";

export default function Socials() {
  return (
    <section
      className="relative py-16 md:py-10 overflow-hidden "
    >
      <div className="absolute left-20 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1750px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-6 md:p-12 shadow-xl shadow-black/5">
          <div className="text-center">
            <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Redes Sociales
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-neutral-950 mt-4">
              Síguenos
            </h2>

            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
              Conoce nuestros trabajos, promociones y novedades.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-12">
            {/* Instagram */}

            <a
              href="https://www.instagram.com/kambarbersalon/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                text-white
                font-bold
                bg-gradient-to-r
                from-pink-500
                via-purple-500
                to-orange-500
                hover:scale-105
                transition-all
                duration-300
                shadow-xl
                shadow-pink-500/25
              "
            >
              <FaInstagram size={22} />
              Instagram
            </a>

            {/* Facebook */}

            <a
              href="https://www.facebook.com/profile.php?id=100064010473832"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                text-white
                font-bold
                bg-[#1877F2]
                hover:scale-105
                transition-all
                duration-300
                shadow-xl
                shadow-blue-500/25
              "
            >
              <FaFacebookF size={20} />
              Facebook
            </a>

            {/* TikTok */}

            <a
              href="https://www.tiktok.com/@karinamartinezgr?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                text-white
                font-bold
                bg-black
                hover:scale-105
                transition-all
                duration-300
                shadow-xl
                shadow-black/25
              "
            >
              <FaTiktok size={20} />
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}