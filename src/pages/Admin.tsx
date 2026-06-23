import { useEffect, useState } from "react";
import { doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";

import { db } from "../services/firebase";
import { seedProducts, deleteAllProducts } from "../services/seedProducts";


interface Horario {
  disponible: boolean;
  cliente: string;
}

interface HorariosDia {
  [hora: string]: Horario;
}

interface HorariosSemana {
  [dia: string]: HorariosDia;
}

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const generarHorarios = (): HorariosSemana => {
  const horarios: HorariosSemana = {};

  diasSemana.forEach((dia) => {
    horarios[dia] = {};

    for (let hora = 7; hora <= 19; hora++) {
      const hora12 = hora > 12 ? hora - 12 : hora;
      const periodo = hora >= 12 ? "PM" : "AM";

      horarios[dia][`${hora12}:00 ${periodo}`] = {
        disponible: true,
        cliente: "",
      };

      if (hora !== 19) {
        horarios[dia][`${hora12}:30 ${periodo}`] = {
          disponible: true,
          cliente: "",
        };
      }
    }
  });

  return horarios;
};

const convertirHora = (hora: string): number => {
  const [time, period] = hora.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const ordenarHoras = (horariosDia: HorariosDia) => {
  return Object.entries(horariosDia).sort(
    ([horaA], [horaB]) => convertirHora(horaA) - convertirHora(horaB),
  );
};

export default function Admin() {
  const [horarios, setHorarios] = useState<HorariosSemana>({});
  const [diaActivo, setDiaActivo] = useState<string | null>(null);
  const [botActivo, setBotActivo] = useState(true);

  useEffect(() => {
    const ref = doc(db, "barberia", "horarios");
    const botRef = doc(db, "config", "bot");

    const unsubscribe = onSnapshot(ref, async (snap) => {
      if (snap.exists()) {
        setHorarios(snap.data() as HorariosSemana);

        const botSnap = await getDoc(botRef);

        if (botSnap.exists()) {
          setBotActivo(Boolean(botSnap.data().activo));
        }
      } else {
        const horariosIniciales = generarHorarios();

        await setDoc(ref, horariosIniciales);

        setHorarios(horariosIniciales);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleHorario = async (dia: string, hora: string) => {
    const horarioActual = horarios[dia]?.[hora];

    if (!horarioActual) return;

    const nuevoEstado: Horario = {
      disponible: !horarioActual.disponible,
      cliente: horarioActual.disponible ? "Bloqueado manualmente" : "",
    };

    const nuevosHorarios: HorariosSemana = {
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [hora]: nuevoEstado,
      },
    };

    setHorarios(nuevosHorarios);

    const ref = doc(db, "barberia", "horarios");

    await updateDoc(ref, {
      [dia]: nuevosHorarios[dia],
    });
  };

  const resetDay = async (dia: string) => {
    if (!horarios[dia]) return;

    const nuevosHorarios: HorariosSemana = {
      ...horarios,
      [dia]: { ...horarios[dia] },
    };

    Object.keys(nuevosHorarios[dia]).forEach((hora) => {
      nuevosHorarios[dia][hora] = {
        disponible: true,
        cliente: "",
      };
    });

    setHorarios(nuevosHorarios);

    const ref = doc(db, "barberia", "horarios");

    await updateDoc(ref, {
      [dia]: nuevosHorarios[dia],
    });
  };

  const toggleBot = async () => {
    const nuevoEstado = !botActivo;

    setBotActivo(nuevoEstado);

    const botRef = doc(db, "config", "bot");

    await setDoc(botRef, {
      activo: nuevoEstado,
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-5 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-white text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Panel Barbería
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={toggleBot}
            className={
              botActivo
                ? "w-full sm:w-auto bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-2xl font-bold"
                : "w-full sm:w-auto bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-2xl font-bold"
            }
          >
            {botActivo ? "🟢 Bot encendido" : "🔴 Bot apagado"}
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={seedProducts}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl font-bold"
          >
            Subir productos a Firebase
          </button>

          <button
            onClick={deleteAllProducts}
            className="fixed bottom-5 right-5 bg-red-600 text-white px-6 py-3 rounded-xl font-bold z-50"
          >
            Borrar productos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {diasSemana.map((dia) => (
            <div
              key={dia}
              className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setDiaActivo(diaActivo === dia ? null : dia)}
                className="w-full p-4 md:p-5 text-left text-white text-lg md:text-xl font-bold flex justify-between items-center"
              >
                {dia}
                <span>{diaActivo === dia ? "▼" : "▶"}</span>
              </button>

              {diaActivo === dia && (
                <div>
                  <div className="px-4 pb-2">
                    <button
                      onClick={() => resetDay(dia)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-black py-3 rounded-xl font-bold text-sm md:text-base"
                    >
                      Reiniciar citas del día
                    </button>
                  </div>

                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3">
                    {horarios[dia] &&
                      ordenarHoras(horarios[dia]).map(([hora, data]) => (
                        <button
                          key={hora}
                          onClick={() => toggleHorario(dia, hora)}
                          className={
                            data.disponible
                              ? "bg-green-600 hover:bg-green-700 transition text-white p-3 rounded-xl font-bold flex flex-col items-center text-sm"
                              : "bg-red-600 hover:bg-red-700 transition text-white p-3 rounded-xl font-bold flex flex-col items-center text-sm"
                          }
                        >
                          <span
                            className={data.disponible ? "" : "line-through"}
                          >
                            {hora}
                          </span>

                          {!data.disponible && data.cliente && (
                            <span className="text-[10px] md:text-xs mt-1 font-normal text-center break-words">
                              {data.cliente}
                            </span>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
