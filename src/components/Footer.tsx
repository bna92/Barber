export default function Footer() {
  return (
    <footer
      id="contacto"
      className="
    relative
    overflow-hidden
    pt-10
    pb-8
  "
    >
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        <div
          className="
            bg-white/30
            backdrop-blur-xl
            border
            border-neutral-200
            rounded-[28px]
            md:rounded-[40px]
            p-8
            md:p-12
            shadow-xl
            shadow-black/5
          "
        >
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-neutral-950 text-3xl font-black">
                BARBERSHOP
              </h3>

              <p className="text-neutral-600 mt-4">
                Experiencias de barbería y belleza diseñadas para resaltar tu
                mejor versión.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-950 mb-4">Información</h4>

              <div className="space-y-3 text-neutral-600">
                <p>📍 Plaza Fórum · Culiacán</p>
                <p>📱 +52 667 XXX XXXX</p>
                <p>🕒 Lunes a Sábado</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200">
            <p className="text-center text-neutral-500 text-sm">
              © {new Date().getFullYear()} Barbershop. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
