import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const heroSlides = [
  {
    id: "001",
    title: "Imagen principal",
    image: "/logofondonegro.png",
    active: true,
    order: 1,
  },
];

export async function seedHero() {
  for (const slide of heroSlides) {
    await setDoc(doc(db, "hero", slide.id), slide);
  }

  console.log("Hero agregado correctamente");
}

export async function deleteHero() {
  const snapshot = await getDocs(collection(db, "hero"));

  for (const item of snapshot.docs) {
    await deleteDoc(doc(db, "hero", item.id));
  }

  console.log("Hero eliminado correctamente");
}



