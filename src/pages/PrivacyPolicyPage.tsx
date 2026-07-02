export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-50 py-10 px-4">
      <div className="absolute left-0 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <section className="relative max-w-4xl mx-auto bg-white/40 backdrop-blur-xl border border-neutral-200 rounded-[28px] shadow-xl shadow-black/5 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-black text-neutral-950">
          Aviso de Privacidad
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Última actualización: {new Date().getFullYear()}
        </p>

        <div className="mt-8 space-y-6 text-neutral-700 leading-relaxed">
  <p>
    En <strong>KAM Barber Salón</strong> respetamos la privacidad de nuestros
    clientes y nos comprometemos a proteger la información personal que sea
    proporcionada mediante los medios de contacto disponibles en este sitio
    web.
  </p>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Información proporcionada por el usuario
    </h2>
    <p>
      Cuando el usuario se comunica con KAM Barber Salón mediante WhatsApp u
      otros medios de contacto disponibles en este sitio, podrá proporcionar
      información como su nombre, número telefónico, fecha y hora de la cita,
      así como los servicios que desea solicitar.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Finalidad del uso de la información
    </h2>
    <p>
      La información proporcionada se utiliza exclusivamente para atender
      solicitudes de información, gestionar citas, confirmar horarios,
      brindar atención al cliente y dar seguimiento a los servicios
      solicitados.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Compartición de información
    </h2>
    <p>
      KAM Barber Salón no vende, comparte ni transfiere información personal
      a terceros, salvo cuando sea requerido por la legislación aplicable o
      por una autoridad competente.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Seguridad de la información
    </h2>
    <p>
      Se implementan medidas razonables para proteger la información
      proporcionada contra accesos no autorizados, pérdida, alteración o uso
      indebido.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Conservación de la información
    </h2>
    <p>
      Los datos personales se conservarán únicamente durante el tiempo
      necesario para cumplir con las finalidades descritas en este Aviso de
      Privacidad o conforme a las obligaciones legales aplicables.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Derechos del usuario
    </h2>
    <p>
      El usuario podrá solicitar el acceso, actualización, corrección o
      eliminación de la información que haya proporcionado, comunicándose
      directamente con KAM Barber Salón a través de los medios de contacto
      disponibles.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-bold text-neutral-950 mb-2">
      Modificaciones al Aviso de Privacidad
    </h2>
    <p>
      KAM Barber Salón podrá actualizar el presente Aviso de Privacidad cuando
      sea necesario. Cualquier modificación será publicada en este mismo
      sitio web.
    </p>
  </section>
</div>
      </section>
    </main>
  );
}