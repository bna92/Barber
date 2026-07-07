import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../services/firebase";
import { Service } from "../types/service";

const whatsappNumber = "5216673220272";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const q = query(collection(db, "services"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);

        const data: Service[] = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Service, "id">),
        }));

        setServices(data.filter((service) => service.active));
      } catch (error) {
        console.error("Error cargando servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) return null;
  if (services.length === 0) return null;

  return (
    <section
      id="servicios"
      className="relative py-16 md:py-10 overflow-hidden scroll-mt-32"
    >
      <div className="absolute top-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-yellow-500/10 blur-[80px] md:blur-[120px]" />
      <div className="absolute left-10 bottom-20 w-72 h-72 md:w-96 md:h-96 bg-orange-400/10 blur-[80px] md:blur-[120px]" />

      <div className="relative z-10 max-w-[1750px] mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden border border-neutral-200 bg-white/40 backdrop-blur-md md:backdrop-blur-xl p-5 md:p-12 shadow-xl shadow-black/5 [clip-path:polygon(0_0,96%_0,100%_6%,100%_100%,4%_100%,0_94%)]">
          <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative text-center mb-10 md:mb-16">
            <span className="text-yellow-700 uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Servicios
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-neutral-950 mt-4">
              Nuestros Servicios
            </h2>

            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Servicios diseñados para resaltar tu imagen y mantener tu estilo
              impecable.
            </p>
          </div>

          <div className="relative flex md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 scrollbar-hide items-stretch">
            {services.map((service) => (
              <article
                key={service.id}
                className="relative min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center overflow-hidden border border-neutral-200 bg-white/70 shadow-xl shadow-black/10 transition-all duration-500 group md:hover:-translate-y-2 hover:border-yellow-500/60 [clip-path:polygon(0_0,92%_0,100%_8%,100%_100%,8%_100%,0_92%)] flex flex-col h-[520px] md:h-[560px]"
              >
                <div className="relative h-56 md:h-64 shrink-0 overflow-hidden bg-neutral-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 z-20 h-9 w-9 border-l-2 border-t-2 border-yellow-400" />
                  <div className="absolute bottom-4 right-4 z-20 h-9 w-9 border-r-2 border-b-2 border-yellow-400" />
                </div>

                <div className="relative p-5 md:p-6 flex flex-col flex-1">
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-yellow-500 via-neutral-200 to-transparent" />

                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-neutral-950 text-xl md:text-2xl font-bold">
                      {service.title}
                    </h3>

                    <span className="shrink-0 border border-yellow-500/50 bg-yellow-500/10 px-3 py-2 text-yellow-700 font-black text-lg md:text-xl">
                      ${service.price}
                    </span>
                  </div>

                  <p className="mt-4 text-neutral-600 text-sm md:text-base">
                    {service.description}
                  </p>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20agendar%20una%20cita`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center justify-center bg-neutral-950 text-white font-bold px-6 py-3 hover:bg-yellow-600 transition-all duration-300 shadow-lg shadow-black/10"
                  >
                    Reservar
                    <span className="ml-3 text-yellow-300 group-hover:text-white">
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="relative md:hidden text-center text-neutral-500 text-xs mt-3">
            Desliza hacia los lados para ver más servicios →
          </p>
        </div>
      </div>
    </section>
  );
}