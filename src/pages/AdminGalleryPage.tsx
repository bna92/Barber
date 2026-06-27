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
import { GalleryImage } from "../types/gallery";

const cloudName = "df7in528r";
const uploadPreset = "barberia_unsigned";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newImage, setNewImage] = useState({
    id: "",
    image: "",
    active: true,
    order: 0,
  });

  const loadImages = async () => {
    const q = query(collection(db, "gallery"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    const data: GalleryImage[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<GalleryImage, "id">),
    }));

    setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleChange = (
    id: string,
    field: keyof GalleryImage,
    value: string | number | boolean,
  ) => {
    setImages((prev) =>
      prev.map((image) =>
        image.id === id ? { ...image, [field]: value } : image,
      ),
    );
  };

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageId?: string,
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

      if (imageId) {
        await updateDoc(doc(db, "gallery", imageId), {
          image: imageUrl,
        });

        setImages((prev) =>
          prev.map((image) =>
            image.id === imageId ? { ...image, image: imageUrl } : image,
          ),
        );

        alert("Imagen actualizada correctamente");
        return;
      }

      setNewImage((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      alert("Imagen subida correctamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("No se pudo subir la imagen.");
    }
  };

  const handleCreateImage = async () => {
    if (!newImage.id || !newImage.image) {
      alert("Completa ID e imagen.");
      return;
    }

    await setDoc(doc(db, "gallery", newImage.id), {
      image: newImage.image,
      active: newImage.active,
      order: Number(newImage.order),
    });

    alert("Imagen agregada correctamente");

    setNewImage({
      id: "",
      image: "",
      active: true,
      order: 0,
    });

    setShowCreateForm(false);
    loadImages();
  };

  const handleSave = async (image: GalleryImage) => {
    await updateDoc(doc(db, "gallery", image.id), {
      image: image.image,
      active: image.active,
      order: Number(image.order),
    });

    alert("Imagen actualizada correctamente");
  };

  const handleDelete = async (imageId: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta imagen?");

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "gallery", imageId));

    setImages((prev) => prev.filter((image) => image.id !== imageId));

    alert("Imagen eliminada correctamente");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] p-8">
        <p className="font-bold text-neutral-700">Cargando galería...</p>
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
          Administrar galería
        </h1>

        <p className="text-neutral-600 mb-6">
          Agrega, cambia, oculta o elimina imágenes de nuestros trabajos.
        </p>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mb-6 bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
        >
          {showCreateForm ? "Cancelar" : "Agregar imagen"}
        </button>

        {showCreateForm && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-5 md:p-6 shadow-lg shadow-black/5 mb-8">
            <h2 className="text-2xl font-black text-neutral-950 mb-5">
              Nueva imagen
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="ID ejemplo: 001"
                value={newImage.id}
                onChange={(e) =>
                  setNewImage({ ...newImage, id: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Posición"
                value={newImage.order}
                onChange={(e) =>
                  setNewImage({
                    ...newImage,
                    order: Number(e.target.value),
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <select
                value={newImage.active ? "true" : "false"}
                onChange={(e) =>
                  setNewImage({
                    ...newImage,
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

                {newImage.image && (
                  <img
                    src={newImage.image}
                    alt="Vista previa"
                    className="mt-4 w-full h-52 object-cover rounded-2xl border border-neutral-200"
                  />
                )}
              </div>

              <button
                onClick={handleCreateImage}
                className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition"
              >
                Guardar imagen
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white border border-neutral-200 rounded-3xl p-4 md:p-6 shadow-lg shadow-black/5"
            >
              <div className="grid md:grid-cols-[260px_1fr] gap-5">
                <div>
                  <img
                    src={image.image}
                    alt="Galería"
                    className="w-full h-40 object-cover rounded-2xl bg-neutral-100 border border-neutral-200"
                  />

                  <label className="mt-3 block text-center bg-neutral-950 text-white px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-600 transition text-sm">
                    Cambiar imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, image.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Posición en galería
                    </label>

                    <input
                      type="number"
                      value={image.order}
                      onChange={(e) =>
                        handleChange(image.id, "order", Number(e.target.value))
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Estado
                    </label>

                    <select
                      value={image.active ? "true" : "false"}
                      onChange={(e) =>
                        handleChange(
                          image.id,
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

                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                    >
                      Eliminar imagen
                    </button>

                    <button
                      onClick={() => handleSave(image)}
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