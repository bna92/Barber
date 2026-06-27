import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const tiktokVideos = [
  {
    id: "001",
    user: "KAM BARBER SALÓN",
    profile: "https://www.tiktok.com/@usuario",
    title: "Corte caballero moderno",
    description:
      "Corte moderno con acabado profesional, estilo limpio y fresco para cualquier ocasión.",
    tags: "#barberia #fade #cortecaballero #fyp #parati",
    video: "/videos/corte1.mp4",
    link: "https://www.tiktok.com/@usuario/video/VIDEO_ID",
    active: true,
    order: 1,
  },
  {
    id: "002",
    user: "KAM BARBER SALÓN",
    profile: "https://www.tiktok.com/@usuario",
    title: "Corte dama premium",
    description:
      "Diseño personalizado para resaltar tu estilo con un acabado elegante.",
    tags: "#cortedama #cabello #estilo #belleza #parati",
    video: "/videos/corte2.mp4",
    link: "https://www.tiktok.com/@usuario/video/VIDEO_ID",
    active: true,
    order: 2,
  },
];

export async function seedTikTok() {
  for (const video of tiktokVideos) {
    await setDoc(doc(db, "tiktok_videos", video.id), video);
  }

  console.log("Videos TikTok agregados correctamente");
}

export async function deleteTikTok() {
  const snapshot = await getDocs(collection(db, "tiktok_videos"));

  for (const item of snapshot.docs) {
    await deleteDoc(doc(db, "tiktok_videos", item.id));
  }

  console.log("Videos TikTok eliminados correctamente");
}