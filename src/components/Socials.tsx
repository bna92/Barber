import {
  FaInstagram,
  FaFacebookF,
  FaTiktok
} from "react-icons/fa";

export default function Socials() {
  return (
    <section >

      <div className="max-w-4xl mx-auto px-6 text-center">

        <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
          Redes Sociales
        </span>

        <h2 className="text-5xl font-black text-white mt-4">
          Síguenos
        </h2>

        <p className="text-gray-400 mt-4">
          Conoce nuestros trabajos,
          promociones y novedades.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          {/* Instagram */}

          <a
            href="https://instagram.com"
            target="_blank"
            className="
              flex items-center gap-3
              px-8 py-4
              rounded-2xl
              text-white
              border border-pink-500/30
              bg-gradient-to-r
              from-pink-500/20
              via-purple-500/20
              to-orange-500/20
              hover:scale-105
              transition-all
            "
          >
            <FaInstagram size={22} />
            Instagram
          </a>

          {/* Facebook */}

          <a
            href="https://facebook.com"
            target="_blank"
            className="
              flex items-center gap-3
              px-8 py-4
              rounded-2xl
              text-white
              border border-blue-500/30
              bg-blue-500/15
              hover:scale-105
              transition-all
            "
          >
            <FaFacebookF size={20} />
            Facebook
          </a>

          {/* TikTok */}

          <a
            href="https://tiktok.com"
            target="_blank"
            className="
              flex items-center gap-3
              px-8 py-4
              rounded-2xl
              text-white
              border border-white/20
              bg-white/5
              hover:scale-105
              transition-all
            "
          >
            <FaTiktok size={20} />
            TikTok
          </a>

        </div>

      </div>
    </section>
  );
}