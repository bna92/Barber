import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const galleryImages = [
  {
    id: "001",
    image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186",
    active: true,
    order: 1,
  },
  {
    id: "002",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    active: true,
    order: 2,
  },
  {
    id: "003",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
    active: true,
    order: 3,
  },
];

export async function seedGallery() {
  for (const image of galleryImages) {
    await setDoc(doc(db, "gallery", image.id), image);
  }

  console.log("Galería agregada correctamente");
}

export async function deleteGallery() {
  const snapshot = await getDocs(collection(db, "gallery"));

  for (const item of snapshot.docs) {
    await deleteDoc(doc(db, "gallery", item.id));
  }

  console.log("Galería eliminada correctamente");
}