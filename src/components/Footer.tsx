export default function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden pt-1 pb-1">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[24px] p-4 md:p-5 shadow-xl shadow-black/5">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-neutral-950 text-xl font-black">
                KAM BARBER SALÓN
              </h3>

              <p className="text-neutral-600 mt-2 text-sm">
                Experiencias de barbería y belleza diseñadas para
                <br />
                resaltar tu mejor versión.
              </p>
            </div>

            <div className="text-center md:text-left md:-ml-25">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Información */}
                <div>
                  <h4 className="font-bold text-neutral-950 mb-2">
                    Información
                  </h4>

                  <div className="space-y-1 text-neutral-600 text-sm">
                    <p>📍 Calle Sarh #3220 Fovissste Humaya · Culiacán</p>
                    <p>📱 +52 667 322 0272</p>
                    <p>🕒 Lunes a Sábado</p>
                  </div>
                </div>

                {/* Información legal */}
                <div>

                  <div className="flex flex-col gap-2 text-sm text-neutral-500">
                    <a
                      href="/aviso-de-privacidad"
                      className="hover:text-yellow-500 transition-colors"
                    >
                      Aviso de Privacidad
                    </a>

                    <a
                      href="/terminos-y-condiciones"
                      className="hover:text-yellow-500 transition-colors"
                    >
                      Términos y Condiciones
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

            <div className="mt-4 pt-3 border-t border-neutral-200">
              <p className="text-center text-neutral-500 text-xs">
                © {new Date().getFullYear()} Sitio Web desarrollado por
                <br />

                <span className="inline-flex items-center gap-2 mt-2">
                  <img
                    src="/naburesystemslogo.png"
                    alt="NS"
                    className="w-13 h-13"
                  />

                  <span className="font-semibold tracking-wide">
                    NABURE SYSTEMS
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
    </footer>
  );
}