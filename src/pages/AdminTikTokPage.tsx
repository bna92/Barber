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
import { TikTokVideo } from "../types/tiktok";

const cloudName = "df7in528r";
const uploadPreset = "barberia_unsigned";

export default function AdminTikTokPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newVideo, setNewVideo] = useState({
    id: "",
    user: "KAM BARBER SALÓN",
    profile: "",
    title: "",
    description: "",
    tags: "",
    video: "",
    link: "",
    active: true,
    order: 0,
  });

  const loadVideos = async () => {
    const q = query(collection(db, "tiktok_videos"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    const data: TikTokVideo[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<TikTokVideo, "id">),
    }));

    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleChange = (
    id: string,
    field: keyof TikTokVideo,
    value: string | number | boolean,
  ) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, [field]: value } : video,
      ),
    );
  };

  const handleUploadVideo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    videoId?: string,
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("resource_type", "video");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Error al subir video");

      const data = await response.json();
      const videoUrl = data.secure_url;

      if (videoId) {
        await updateDoc(doc(db, "tiktok_videos", videoId), {
          video: videoUrl,
        });

        setVideos((prev) =>
          prev.map((video) =>
            video.id === videoId ? { ...video, video: videoUrl } : video,
          ),
        );

        alert("Video actualizado correctamente");
        return;
      }

      setNewVideo((prev) => ({
        ...prev,
        video: videoUrl,
      }));

      alert("Video subido correctamente");
    } catch (error) {
      console.error("Error subiendo video:", error);
      alert("No se pudo subir el video.");
    }
  };

  const handleCreateVideo = async () => {
    try {
      if (!newVideo.id || !newVideo.title || !newVideo.video || !newVideo.link) {
        alert("Completa ID, título, video y enlace de TikTok.");
        return;
      }

      await setDoc(doc(db, "tiktok_videos", newVideo.id), {
        user: newVideo.user,
        profile: newVideo.profile,
        title: newVideo.title,
        description: newVideo.description,
        tags: newVideo.tags,
        video: newVideo.video,
        link: newVideo.link,
        active: newVideo.active,
        order: Number(newVideo.order),
      });

      alert("Video agregado correctamente");

      setNewVideo({
        id: "",
        user: "KAM BARBER SALÓN",
        profile: "",
        title: "",
        description: "",
        tags: "",
        video: "",
        link: "",
        active: true,
        order: 0,
      });

      setShowCreateForm(false);
      loadVideos();
    } catch (error) {
      console.error("Error creando video:", error);
      alert("No se pudo guardar el video.");
    }
  };

  const handleSave = async (video: TikTokVideo) => {
    await updateDoc(doc(db, "tiktok_videos", video.id), {
      user: video.user,
      profile: video.profile,
      title: video.title,
      description: video.description,
      tags: video.tags,
      video: video.video,
      link: video.link,
      active: video.active,
      order: Number(video.order),
    });

    alert("Video actualizado correctamente");
  };

  const handleDelete = async (videoId: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este video?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "tiktok_videos", videoId));
    setVideos((prev) => prev.filter((video) => video.id !== videoId));

    alert("Video eliminado correctamente");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] p-8">
        <p className="font-bold text-neutral-700">Cargando videos...</p>
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
          Administrar TikTok
        </h1>

        <p className="text-neutral-600 mb-6">
          Agrega, edita, oculta o elimina videos de la sección TikTok.
        </p>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mb-6 bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
        >
          {showCreateForm ? "Cancelar" : "Agregar video"}
        </button>

        {showCreateForm && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-5 md:p-6 shadow-lg shadow-black/5 mb-8">
            <h2 className="text-2xl font-black text-neutral-950 mb-5">
              Nuevo video
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="ID ejemplo: 001"
                value={newVideo.id}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, id: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Usuario"
                value={newVideo.user}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, user: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Link del perfil TikTok"
                value={newVideo.profile}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, profile: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Título"
                value={newVideo.title}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, title: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Link del video en TikTok"
                value={newVideo.link}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, link: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Posición"
                value={newVideo.order}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, order: Number(e.target.value) })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <select
                value={newVideo.active ? "true" : "false"}
                onChange={(e) =>
                  setNewVideo({
                    ...newVideo,
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
                  Video MP4
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleUploadVideo(e)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-white"
                />

                {newVideo.video && (
                  <video
                    src={newVideo.video}
                    controls
                    muted
                    className="mt-4 w-full max-h-[420px] object-cover rounded-2xl border border-neutral-200 bg-black"
                  />
                )}
              </div>

              <textarea
                placeholder="Descripción"
                value={newVideo.description}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, description: e.target.value })
                }
                rows={3}
                className="md:col-span-2 border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Tags ejemplo: #barberia #fade #fyp"
                value={newVideo.tags}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, tags: e.target.value })
                }
                className="md:col-span-2 border border-neutral-200 rounded-xl px-4 py-3"
              />

              <button
                onClick={handleCreateVideo}
                className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition"
              >
                Guardar video
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-neutral-200 rounded-3xl p-4 md:p-6 shadow-lg shadow-black/5"
            >
              <div className="grid md:grid-cols-[240px_1fr] gap-5">
                <div>
                  <video
                    src={video.video}
                    controls
                    muted
                    className="w-full h-80 object-cover rounded-2xl bg-black border border-neutral-200"
                  />

                  <label className="mt-3 block text-center bg-neutral-950 text-white px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-600 transition text-sm">
                    Cambiar video
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleUploadVideo(e, video.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    value={video.user}
                    onChange={(e) =>
                      handleChange(video.id, "user", e.target.value)
                    }
                    className="border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <input
                    value={video.profile}
                    onChange={(e) =>
                      handleChange(video.id, "profile", e.target.value)
                    }
                    className="border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <input
                    value={video.title}
                    onChange={(e) =>
                      handleChange(video.id, "title", e.target.value)
                    }
                    className="border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <input
                    value={video.link}
                    onChange={(e) =>
                      handleChange(video.id, "link", e.target.value)
                    }
                    className="border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    value={video.order}
                    onChange={(e) =>
                      handleChange(video.id, "order", Number(e.target.value))
                    }
                    className="border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <select
                    value={video.active ? "true" : "false"}
                    onChange={(e) =>
                      handleChange(
                        video.id,
                        "active",
                        e.target.value === "true",
                      )
                    }
                    className="border border-neutral-200 rounded-xl px-4 py-3"
                  >
                    <option value="true">Visible</option>
                    <option value="false">Oculto</option>
                  </select>

                  <textarea
                    value={video.description}
                    onChange={(e) =>
                      handleChange(video.id, "description", e.target.value)
                    }
                    rows={3}
                    className="md:col-span-2 border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <input
                    value={video.tags}
                    onChange={(e) =>
                      handleChange(video.id, "tags", e.target.value)
                    }
                    className="md:col-span-2 border border-neutral-200 rounded-xl px-4 py-3"
                  />

                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                    >
                      Eliminar video
                    </button>

                    <button
                      onClick={() => handleSave(video)}
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