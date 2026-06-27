import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const services = [
  {
    id: "001",
    title: "Corte Caballero",
    price: "$200",
    description: "Corte moderno con acabado profesional.",
    image:
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1200",
    active: true,
    order: 1,
  },
  {
    id: "002",
    title: "Corte Dama",
    price: "$300",
    description: "Diseño personalizado para cualquier estilo.",
    image:
      "https://speedy.uenicdn.com/adf7e2ae-79b7-4c2d-a086-36e2f65cef5e/c1024_a/image/upload/v1567705538/category/shutterstock_653296774.jpg",
    active: true,
    order: 2,
  },
  {
    id: "003",
    title: "Barba",
    price: "$150",
    description: "Perfilado y definición profesional.",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1200",
    active: true,
    order: 3,
  },
];

export async function seedServices() {
  for (const service of services) {
    await setDoc(doc(db, "services", service.id), service);
  }

  console.log("Servicios agregados correctamente");
}

export async function deleteServices() {
  const snapshot = await getDocs(collection(db, "services"));

  for (const item of snapshot.docs) {
    await deleteDoc(doc(db, "services", item.id));
  }

  console.log("Servicios eliminados correctamente");
}