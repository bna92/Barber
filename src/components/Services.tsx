import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { Service } from "../types/service";

const whatsappNumber = "526671234567";

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
      <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />
      <div className="absolute left-10 bottom-20 w-96 h-96 bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="bg-white/30 backdrop-blur-xl border border-neutral-200 rounded-[28px] md:rounded-[40px] p-5 md:p-12 shadow-xl shadow-black/5">
          <div className="text-center mb-10 md:mb-16">
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

          <div
            className="
              flex
              md:grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
              md:gap-8
              overflow-x-auto
              md:overflow-visible
              snap-x
              snap-mandatory
              md:snap-none
              pb-4
              md:pb-0
              scrollbar-hide
            "
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="
                  min-w-[85%]
                  sm:min-w-[60%]
                  md:min-w-0
                  snap-center
                  overflow-hidden
                  rounded-[28px]
                  md:rounded-[32px]
                  bg-white/30
                  border
                  border-neutral-200
                  shadow-xl
                  shadow-black/10
                  hover:border-yellow-500/50
                  md:hover:-translate-y-3
                  hover:shadow-[0_25px_60px_rgba(234,179,8,0.18)]
                  transition-all
                  duration-500
                  group
                "
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-56 md:h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-neutral-950 text-xl md:text-2xl font-bold">
                      {service.title}
                    </h3>

                    <span className="text-yellow-700 font-black text-lg md:text-xl shrink-0">
                      {service.price}
                    </span>
                  </div>

                  <p className="mt-4 text-neutral-600 text-sm md:text-base">
                    {service.description}
                  </p>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20agendar%20una%20cita`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-neutral-950 text-white font-bold px-6 py-3 rounded-full hover:bg-yellow-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10"
                  >
                    Reservar
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="md:hidden text-center text-neutral-500 text-xs mt-3">
            Desliza hacia los lados para ver más servicios →
          </p>
        </div>
      </div>
    </section>
  );
}