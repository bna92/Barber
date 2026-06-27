export default function TermsAndConditionsPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-neutral-50 py-10 px-4">
            <div className="absolute left-0 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-400/10 blur-[120px]" />

            <section className="relative max-w-4xl mx-auto bg-white/40 backdrop-blur-xl border border-neutral-200 rounded-[28px] shadow-xl shadow-black/5 p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-black text-neutral-950">
                    Términos y Condiciones
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                    Última actualización: {new Date().getFullYear()}
                </p>

                <div className="mt-8 space-y-6 text-neutral-700 leading-relaxed">
                    <p>
                        Al utilizar este sitio web de <strong>KAM Barber Salón</strong>, el usuario
                        acepta los presentes Términos y Condiciones. Si no está de acuerdo con
                        alguno de ellos, se recomienda no utilizar este sitio.
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Uso del sitio
                        </h2>
                        <p>
                            Este sitio web tiene como finalidad proporcionar información sobre KAM
                            Barber Salón, sus servicios, productos, ubicación y medios de contacto.
                            Asimismo, permite al usuario iniciar una conversación mediante WhatsApp
                            para solicitar información o gestionar una cita.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Solicitud de citas
                        </h2>
                        <p>
                            Este sitio web no procesa reservas de citas de forma automática. Las
                            solicitudes de cita se realizan mediante WhatsApp y están sujetas a la
                            disponibilidad de horarios y a la confirmación por parte de KAM Barber
                            Salón.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Cancelaciones y cambios
                        </h2>
                        <p>
                            En caso de requerir la cancelación o modificación de una cita previamente
                            acordada, se recomienda comunicarse con KAM Barber Salón con la mayor
                            anticipación posible a través de WhatsApp o de los medios de contacto
                            disponibles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Precios y disponibilidad
                        </h2>
                        <p>
                            Los precios, promociones y servicios publicados en este sitio tienen un
                            carácter informativo y podrán modificarse sin previo aviso. Todos los
                            servicios están sujetos a disponibilidad.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Enlaces a servicios externos
                        </h2>
                        <p>
                            Este sitio puede contener enlaces a servicios de terceros, como WhatsApp,
                            Google Maps o TikTok, con el propósito de facilitar la comunicación y el
                            acceso a información adicional. KAM Barber Salón no es responsable del
                            contenido, funcionamiento o políticas de privacidad de dichos servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Propiedad intelectual
                        </h2>
                        <p>
                            Todo el contenido del sitio, incluyendo textos, imágenes, logotipos,
                            fotografías, diseño, elementos gráficos y demás materiales, pertenece a
                            KAM Barber Salón o cuenta con autorización para su uso. Queda prohibida su
                            reproducción, distribución o utilización sin autorización previa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-950 mb-2">
                            Limitación de responsabilidad
                        </h2>
                        <p>
                            KAM Barber Salón realiza esfuerzos razonables para mantener la información
                            del sitio actualizada y disponible; sin embargo, no garantiza que el
                            contenido permanezca libre de errores, interrupciones temporales o cambios
                            no previstos.
                        </p>
                    </section>
                </div>
            </section>
        </main>
    );
}