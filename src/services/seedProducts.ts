import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const products = [
  {
    id: "pomada-matte",
    nombre: "Pomada Matte",
    precio: 180,
    descripcion: "Fijación media y acabado natural.",
    imagen:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200",
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1200",
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1200",
    ],
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

  {
    id: "aceite-barba",
    nombre: "Aceite para barba",
    precio: 220,
    descripcion: "Hidrata, suaviza y da brillo a la barba.",
    imagen:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200",
    ],
    stock: 10,
    activo: true,
    categoria: "barba",
  },

  {
    id: "shampoo-profesional",
    nombre: "Shampoo profesional",
    precio: 250,
    descripcion: "Limpieza profunda para uso diario.",
    imagen:
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1200",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
    ],
    stock: 8,
    activo: true,
    categoria: "cabello",
  },

  {
    id: "cera-fijacion-fuerte",
    nombre: "Cera Fijación Fuerte",
    precio: 190,
    descripcion: "Máxima fijación para estilos duraderos.",
    imagen:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200",
    ],
    stock: 12,
    activo: true,
    categoria: "cabello",
  },

  {
    id: "gel-profesional",
    nombre: "Gel Profesional",
    precio: 170,
    descripcion: "Control total con acabado brillante.",
    imagen:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200",
    ],
    stock: 20,
    activo: true,
    categoria: "cabello",
  },

  {
    id: "balsamo-barba",
    nombre: "Bálsamo para Barba",
    precio: 210,
    descripcion: "Nutrición profunda y control del vello facial.",
    imagen:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200",
    ],
    stock: 14,
    activo: true,
    categoria: "barba",
  },

  {
    id: "peine-carbono",
    nombre: "Peine de Carbono",
    precio: 90,
    descripcion: "Resistente al calor y antiestático.",
    imagen:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200",
    ],
    stock: 25,
    activo: true,
    categoria: "accesorios",
  },

  {
    id: "cepillo-barba",
    nombre: "Cepillo para Barba",
    precio: 140,
    descripcion: "Ideal para desenredar y dar forma.",
    imagen:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200",
    ],
    stock: 18,
    activo: true,
    categoria: "barba",
  },

  {
    id: "spray-texturizador",
    nombre: "Spray Texturizador",
    precio: 230,
    descripcion: "Volumen y textura para estilos modernos.",
    imagen:
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1200",
    ],
    stock: 11,
    activo: true,
    categoria: "cabello",
  },

  {
    id: "acondicionador-premium",
    nombre: "Acondicionador Premium",
    precio: 260,
    descripcion: "Suavidad y protección profesional.",
    imagen:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1200",
    ],
    stock: 9,
    activo: true,
    categoria: "cabello",
  },
];

export async function seedProducts() {
  for (const product of products) {
    await setDoc(doc(db, "productos", product.id), {
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      imagen: product.imagen,
      imagenes: product.imagenes,
      stock: product.stock,
      activo: product.activo,
      categoria: product.categoria,
    });
  }

  console.log("Productos agregados correctamente");
}
