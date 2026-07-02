import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../services/firebase";
import { Service } from "../types/service";

const cloudName = "df7in528r";
const uploadPreset = "barberia_unsigned";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newService, setNewService] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    image: "",
    active: true,
    order: 0,
  });

  const loadServices = async () => {
    const q = query(collection(db, "services"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    const data: Service[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<Service, "id">),
    }));

    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (
    id: string,
    field: keyof Service,
    value: string | number | boolean,
  ) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, [field]: value } : service,
      ),
    );
  };

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    serviceId?: string,
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Error al subir imagen");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      if (serviceId) {
        await updateDoc(doc(db, "services", serviceId), {
          image: imageUrl,
        });

        setServices((prev) =>
          prev.map((service) =>
            service.id === serviceId
              ? { ...service, image: imageUrl }
              : service,
          ),
        );

        alert("Imagen actualizada correctamente");
        return;
      }

      setNewService((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      alert("Imagen subida correctamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("No se pudo subir la imagen.");
    }
  };

  const handleCreateService = async () => {
    try {
      if (!newService.id || !newService.title || !newService.image) {
        alert("Completa ID, nombre del servicio e imagen.");
        return;
      }

      await setDoc(doc(db, "services", newService.id), {
        title: newService.title,
        price: newService.price,
        description: newService.description,
        image: newService.image,
        active: newService.active,
        order: Number(newService.order),
      });

      alert("Servicio agregado correctamente");

      setNewService({
        id: "",
        title: "",
        price: "",
        description: "",
        image: "",
        active: true,
        order: 0,
      });

      setShowCreateForm(false);
      loadServices();
    } catch (error) {
      console.error("Error creando servicio:", error);
      alert("No se pudo guardar el servicio.");
    }
  };

  const handleSave = async (service: Service) => {
    try {
      await updateDoc(doc(db, "services", service.id), {
        title: service.title,
        price: service.price,
        description: service.description,
        image: service.image,
        active: service.active,
        order: Number(service.order),
      });

      alert("Servicio actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando servicio:", error);
      alert("No se pudo actualizar el servicio.");
    }
  };

  const handleDelete = async (serviceId: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este servicio?");

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "services", serviceId));

    setServices((prev) => prev.filter((service) => service.id !== serviceId));

    alert("Servicio eliminado correctamente");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] p-8">
        <p className="font-bold text-neutral-700">Cargando servicios...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 mb-6 text-neutral-700 hover:text-yellow-700 font-bold transition"
        >
          ← Volver al panel
        </Link>

        <h1 className="text-4xl font-black text-neutral-950 mb-2">
          Administrar servicios
        </h1>

        <p className="text-neutral-600 mb-6">
          Agrega, edita, oculta o elimina los servicios de la página principal.
        </p>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mb-6 bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
        >
          {showCreateForm ? "Cancelar" : "Agregar servicio"}
        </button>

        {showCreateForm && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-5 md:p-6 shadow-lg shadow-black/5 mb-8">
            <h2 className="text-2xl font-black text-neutral-950 mb-5">
              Nuevo servicio
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  ID del servicio
                </label>

                <input
                  placeholder="Ejemplo: 001"
                  value={newService.id}
                  onChange={(e) =>
                    setNewService({ ...newService, id: e.target.value })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Nombre del servicio
                </label>

                <input
                  placeholder="Ejemplo: Corte Caballero"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Precio
                </label>

                <input
                  placeholder="Ejemplo: $200"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Posición en servicios
                </label>

                <input
                  type="number"
                  value={newService.order}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      order: Number(e.target.value),
                    })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <select
                value={newService.active ? "true" : "false"}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    active: e.target.value === "true",
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              >
                <option value="true">Visible</option>
                <option value="false">Oculto</option>
              </select>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Imagen del servicio
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-white"
                />

                {newService.image && (
                  <img
                    src={newService.image}
                    alt="Vista previa"
                    className="mt-4 w-full h-52 object-cover rounded-2xl border border-neutral-200"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Descripción
                </label>

                <textarea
                  placeholder="Descripción del servicio"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <button
                onClick={handleCreateService}
                className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition"
              >
                Guardar servicio
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-neutral-200 rounded-3xl p-4 md:p-6 shadow-lg shadow-black/5"
            >
              <div className="grid md:grid-cols-[220px_1fr] gap-5">
                <div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 object-cover rounded-2xl bg-neutral-100 border border-neutral-200"
                  />

                  <label className="mt-3 block text-center bg-neutral-950 text-white px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-600 transition text-sm">
                    Cambiar imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, service.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Nombre del servicio
                    </label>

                    <input
                      value={service.title}
                      onChange={(e) =>
                        handleChange(service.id, "title", e.target.value)
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Precio
                    </label>

                    <input
                      value={service.price}
                      onChange={(e) =>
                        handleChange(service.id, "price", e.target.value)
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Posición en servicios
                    </label>

                    <input
                      type="number"
                      value={service.order}
                      onChange={(e) =>
                        handleChange(
                          service.id,
                          "order",
                          Number(e.target.value),
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Estado
                    </label>

                    <select
                      value={service.active ? "true" : "false"}
                      onChange={(e) =>
                        handleChange(
                          service.id,
                          "active",
                          e.target.value === "true",
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    >
                      <option value="true">Visible</option>
                      <option value="false">Oculto</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-neutral-700">
                      Descripción
                    </label>

                    <textarea
                      value={service.description}
                      onChange={(e) =>
                        handleChange(
                          service.id,
                          "description",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                    >
                      Eliminar servicio
                    </button>

                    <button
                      onClick={() => handleSave(service)}
                      className="bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}