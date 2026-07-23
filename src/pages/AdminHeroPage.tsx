// src/pages/AdminHeroPage.tsx
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { HeroSlide } from "../types/hero";

const cloudName = "df7in528r";
const uploadPreset = "barberia_unsigned";

export default function AdminHeroPage() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<Record<string, "dirty" | "saved">>({});

  const hasUnsavedChanges = Object.values(saveStatus).some(
    (status) => status === "dirty",
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const [newSlide, setNewSlide] = useState({
    id: "",
    title: "",
    image: "",
    active: true,
    order: 0,
  });

  const loadSlides = async () => {
    const q = query(collection(db, "hero"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    const data: HeroSlide[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<HeroSlide, "id">),
    }));

    setSlides(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleChange = (
    id: string,
    field: keyof HeroSlide,
    value: string | number | boolean,
  ) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide,
      ),
    );

    setSaveStatus((prev) => ({ ...prev, [id]: "dirty" }));
  };

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slideId?: string,
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

      if (!response.ok) throw new Error("Error al subir imagen");

      const data = await response.json();
      const imageUrl = data.secure_url;

      if (slideId) {
        await updateDoc(doc(db, "hero", slideId), {
          image: imageUrl,
        });

        setSlides((prev) =>
          prev.map((slide) =>
            slide.id === slideId ? { ...slide, image: imageUrl } : slide,
          ),
        );

        alert("Imagen actualizada correctamente");
        return;
      }

      setNewSlide((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      alert("Imagen subida correctamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("No se pudo subir la imagen.");
    }
  };

  const handleCreateSlide = async () => {
    if (!newSlide.id || !newSlide.title || !newSlide.image) {
      alert("Completa ID, título e imagen.");
      return;
    }

    const existing = await getDoc(doc(db, "hero", newSlide.id));

    if (existing.exists()) {
      alert(
        `Ya existe una imagen del Hero con el ID "${newSlide.id}". Usa otro ID distinto.`,
      );
      return;
    }

    await setDoc(doc(db, "hero", newSlide.id), {
      title: newSlide.title,
      image: newSlide.image,
      active: newSlide.active,
      order: Number(newSlide.order),
    });

    alert("Imagen agregada al Hero");

    setNewSlide({
      id: "",
      title: "",
      image: "",
      active: true,
      order: 0,
    });

    setShowCreateForm(false);
    loadSlides();
  };

  const handleSave = async (slide: HeroSlide) => {
    await updateDoc(doc(db, "hero", slide.id), {
      title: slide.title,
      image: slide.image,
      active: slide.active,
      order: Number(slide.order),
    });

    setSaveStatus((prev) => ({ ...prev, [slide.id]: "saved" }));

    alert("Hero actualizado correctamente");
  };

  const handleDelete = async (slideId: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta imagen?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "hero", slideId));

    setSlides((prev) => prev.filter((slide) => slide.id !== slideId));

    alert("Imagen eliminada correctamente");
  };

  const handleLogout = async () => {
    if (
      hasUnsavedChanges &&
      !confirm(
        "Tienes cambios sin guardar. ¿Seguro que quieres cerrar sesión sin guardarlos?",
      )
    ) {
      return;
    }

    await signOut(auth);
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] p-8">
        <p className="font-bold text-neutral-700">Cargando Hero...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <Link
          to="/admin"
          onClick={(e) => {
            if (
              hasUnsavedChanges &&
              !confirm(
                "Tienes cambios sin guardar. ¿Seguro que quieres salir sin guardarlos?",
              )
            ) {
              e.preventDefault();
            }
          }}
          className="inline-flex items-center gap-2 mb-6 text-neutral-700 hover:text-yellow-700 font-bold transition"
        >
          ← Volver al panel
        </Link>

        <h1 className="text-4xl font-black text-neutral-950 mb-2">
          Administrar Hero
        </h1>

        <p className="text-neutral-600 mb-6">
          Agrega, cambia u oculta las imágenes principales de la página de inicio.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              if (!showCreateForm) {
                const nextOrder = slides.length
                  ? Math.max(...slides.map((s) => s.order)) + 1
                  : 0;
                setNewSlide((prev) => ({ ...prev, order: nextOrder }));
              }
              setShowCreateForm(!showCreateForm);
            }}
            className="bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
          >
            {showCreateForm ? "Cancelar" : "Agregar imagen al Hero"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-white border border-neutral-200 text-neutral-950 px-6 py-3 rounded-full font-bold hover:border-red-500 hover:text-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-5 md:p-6 shadow-lg shadow-black/5 mb-8">
            <h2 className="text-2xl font-black text-neutral-950 mb-5">
              Nueva imagen
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="ID ejemplo: 001"
                value={newSlide.id}
                onChange={(e) =>
                  setNewSlide({ ...newSlide, id: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Título"
                value={newSlide.title}
                onChange={(e) =>
                  setNewSlide({ ...newSlide, title: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Posición en el Hero
                </label>

                <input
                  type="number"
                  value={newSlide.order}
                  onChange={(e) =>
                    setNewSlide({
                      ...newSlide,
                      order: Number(e.target.value),
                    })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <select
                value={newSlide.active ? "true" : "false"}
                onChange={(e) =>
                  setNewSlide({
                    ...newSlide,
                    active: e.target.value === "true",
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              >
                <option value="true">Visible</option>
                <option value="false">Oculta</option>
              </select>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Imagen
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-white"
                />

                {newSlide.image && (
                  <img
                    src={newSlide.image}
                    alt="Vista previa"
                    className="mt-4 w-full h-52 object-cover rounded-2xl border border-neutral-200"
                  />
                )}
              </div>

              <button
                onClick={handleCreateSlide}
                className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition"
              >
                Guardar imagen
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-white border border-neutral-200 rounded-3xl p-4 md:p-6 shadow-lg shadow-black/5"
            >
              <div className="grid md:grid-cols-[260px_1fr] gap-5">
                <div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-40 object-cover rounded-2xl bg-neutral-100 border border-neutral-200"
                  />

                  <label className="mt-3 block text-center bg-neutral-950 text-white px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-600 transition text-sm">
                    Cambiar imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, slide.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Título
                    </label>

                    <input
                      value={slide.title}
                      onChange={(e) =>
                        handleChange(slide.id, "title", e.target.value)
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Posición en el Hero
                    </label>

                    <input
                      type="number"
                      value={slide.order}
                      onChange={(e) =>
                        handleChange(slide.id, "order", Number(e.target.value))
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Estado
                    </label>

                    <select
                      value={slide.active ? "true" : "false"}
                      onChange={(e) =>
                        handleChange(
                          slide.id,
                          "active",
                          e.target.value === "true",
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    >
                      <option value="true">Visible</option>
                      <option value="false">Oculta</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      {saveStatus[slide.id] === "dirty" && (
                        <p className="text-sm font-bold text-neutral-400">
                          Cambios sin guardar
                        </p>
                      )}

                      {saveStatus[slide.id] === "saved" && (
                        <p className="text-sm font-bold text-green-600">
                          ✓ Cambios guardados
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                      >
                        Eliminar imagen
                      </button>

                      <button
                        onClick={() => handleSave(slide)}
                        className="bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
                      >
                        Guardar cambios
                      </button>
                    </div>
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