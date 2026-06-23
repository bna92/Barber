import { doc, setDoc, deleteDoc} from "firebase/firestore";
import { db } from "./firebase";

const products = [
    {
    id: "1",
    nombre: "Aretes/Anillos",
    precio: 180,
    descripcion: "",
    imagen:"/products/1.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  {
    id: "2",
    nombre: "Aretes/Anillos",
    precio: 180,
    descripcion: "",
    imagen:"/products/2.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

    {
    id: "3",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/3.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

    {
    id: "4",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/4.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

    {
    id: "5",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/5.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

    {
    id: "6",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/6.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

    {
    id: "7",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/7.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },

    {
    id: "8",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/8.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "9",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/9.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "10",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/10.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "11",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/11.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "12",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/12.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "13",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/13.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "14",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/14.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "15",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/15.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "16",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/16.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "17",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/17.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "18",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/18.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "19",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/19.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "20",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/20.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "21",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/21.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "22",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/22.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "23",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/23.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "24",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/24.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "25",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/25.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "26",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/26.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "27",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/27.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "28",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/28.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "29",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/29.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "30",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/30.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "31",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/31.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "32",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/32.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "33",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/33.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "34",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/34.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
    
    {
    id: "35",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/35.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "36",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/36.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "37",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/37.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "38",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/38.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "39",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/39.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
    
    {
    id: "40",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/40.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "41",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/41.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "42",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/42.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "43",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/43.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "44",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/44.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
    
    {
    id: "45",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/45.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "46",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/46.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "47",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/47.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "48",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/48.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "49",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/49.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
    
    {
    id: "50",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/50.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "51",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/51.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "52",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/52.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "53",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/53.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
  
    {
    id: "54",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/54.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
    
    {
    id: "55",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/55.jpeg",
    stock: 15,
    activo: true,
    categoria: "cabello",
  },
];

export async function seedProducts() {
  try {
    for (const product of products) {
      await setDoc(doc(db, "productos", product.id), {
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        imagen: product.imagen,
        stock: product.stock,
        activo: product.activo,
        categoria: product.categoria,
        order: Number(product.id),
      });

      console.log("Producto actualizado:", product.id, product.imagen);
    }

    console.log("Productos actualizados correctamente");
  } catch (error) {
    console.error("Error actualizando productos:", error);
  }
}


export async function deleteAllProducts() {
  try {
    for (const product of products) {
      await deleteDoc(doc(db, "productos", product.id));
      console.log(`Producto eliminado: ${product.id}`);
    }

    console.log("Todos los productos fueron eliminados");
  } catch (error) {
    console.error("Error eliminando productos:", error);
  }
}