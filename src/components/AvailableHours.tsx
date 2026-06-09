import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

interface Horario {
  disponible: boolean;
  cliente: string;
}

interface HorariosDia {
  [hora: string]: Horario;
}

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const convertirHora = (hora: string): number => {
  const [time, period] = hora.split(" ");

  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export default function AvailableHours() {
  const [horarios, setHorarios] = useState<HorariosDia>({});
  const [open, setOpen] = useState(false);

  const fechaActual = new Date();

  const hoy = diasSemana[fechaActual.getDay()];

  const fechaFormateada = fechaActual
    .toLocaleDateString("es-MX", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(",", "")
    .replace(/^./, (c) => c.toUpperCase());

  useEffect(() => {
    const ref = doc(db, "barberia", "horarios");

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      if (data[hoy]) {
        setHorarios(data[hoy] as HorariosDia);
      }
    });

    return () => unsubscribe();
  }, [hoy]);

  const disponibles = Object.entries(horarios)
    .filter(([, info]) => info.disponible)
    .sort(([horaA], [horaB]) => convertirHora(horaA) - convertirHora(horaB));

  return (
    <section
      id="horarios"
      className="relative py-20 md:py-28 overflow-hidden scroll-mt-32"
    >
      <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="
            bg-black/35
            backdrop-blur-xl
            border
            border-white/10
            rounded-[28px]
            md:rounded-[40px]
            p-5
            md:p-12
          "
        >
          <div className="text-center mb-10 md:mb-14">
            <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs md:text-sm">
              Disponibilidad en vivo
            </span>

            <h2 className="text-3xl md:text-6xl font-black text-white mt-5">
              Horarios Disponibles
            </h2>

            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Actualizados en tiempo real desde nuestro sistema.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl px-8 md:px-10 py-5 md:py-6 text-center w-full max-w-sm">
              <p className="text-yellow-500 uppercase text-xs md:text-sm tracking-widest leading-relaxed">
                {fechaFormateada}
              </p>

              <h3 className="text-white text-5xl md:text-6xl font-black mt-2">
                {disponibles.length}
              </h3>

              <p className="text-gray-400">Horarios libres</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setOpen(!open)}
              className="
                w-full
                flex
                items-center
                justify-between
                gap-4
                bg-white/5
                hover:bg-white/10
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                text-left
                transition
              "
            >
              <div>
                <p className="text-white font-bold text-lg">
                  Ver horarios de hoy
                </p>

                <p className="text-gray-400 text-sm">
                  {open
                    ? "Ocultar lista de horarios"
                    : "Toca para desplegar los horarios disponibles"}
                </p>
              </div>

              <span className="text-yellow-500 text-2xl">
                {open ? "▲" : "▼"}
              </span>
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div
                  className="
                    flex
                    md:grid
                    md:grid-cols-4
                    lg:grid-cols-5
                    xl:grid-cols-6
                    gap-4
                    md:gap-5
                    mt-6
                    overflow-x-auto
                    md:overflow-visible
                    snap-x
                    snap-mandatory
                    md:snap-none
                    pb-4
                    md:pb-0
                  "
                >
                  {disponibles.length > 0 ? (
                    disponibles.map(([hora], index) => (
                      <motion.div
                        key={hora}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.03,
                          duration: 0.25,
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -4,
                        }}
                        className="
                          min-w-[45%]
                          sm:min-w-[30%]
                          md:min-w-0
                          snap-center
                          bg-gradient-to-br
                          from-green-500/15
                          to-green-500/5
                          border
                          border-green-500/20
                          rounded-2xl
                          p-4
                          md:p-5
                          text-center
                        "
                      >
                        <div className="flex justify-center mb-3">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                            className="w-3 h-3 rounded-full bg-green-400"
                          />
                        </div>

                        <p className="text-white font-bold text-base md:text-lg">
                          {hora}
                        </p>

                        <p className="text-green-400 text-xs md:text-sm mt-1">
                          Disponible
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 py-6">
                      No hay horarios disponibles por el momento.
                    </div>
                  )}
                </div>

                <p className="md:hidden text-center text-gray-400 text-xs mt-3">
                  Desliza hacia los lados para ver más horarios →
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}