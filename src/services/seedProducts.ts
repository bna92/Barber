import { doc, setDoc, deleteDoc,  collection, getDocs,} from "firebase/firestore";
import { db } from "./firebase";

const products = [
    {
    id: "001",
    nombre: "Aretes/Anillos",
    precio: 180,
    descripcion: "",
    imagen:"/products/1.jpeg",
    inStock: true,
    activo: true,
    categoria: "Moda",
  },
  {
    id: "002",
    nombre: "Aretes/Anillos",
    precio: 180,
    descripcion: "",
    imagen:"/products/2.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },

    {
    id: "003",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/3.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },

    {
    id: "004",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/4.jpeg",
    inStock: true,
    activo: true,
    categoria: "Maquillaje",
  },

    {
    id: "005",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/5.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },

    {
    id: "006",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/6.jpeg",
    inStock: true,
    activo: true,
    categoria: "Moda",
  },

    {
    id: "007",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/7.jpeg",
    inStock: true,
    activo: true,
    categoria: "Moda",
  },

    {
    id: "008",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/8.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "009",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/9.jpeg",
    inStock: true,
    activo: true,
    categoria: "Barba",
  },
  
    {
    id: "010",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/10.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "011",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/11.jpeg",
    inStock: true,
    activo: true,
    categoria: "Maquillaje",
  },
  
    {
    id: "012",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/12.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "013",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/13.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "014",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/14.jpeg",
    inStock: true,
    activo: true,
    categoria: "Moda",
  },
  
    {
    id: "015",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/15.jpeg",
    inStock: true,
    activo: true,
    categoria: "Moda",
  },
  
    {
    id: "016",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/16.jpeg",
    inStock: true,
    activo: true,
    categoria: "Moda",
  },
  
    {
    id: "017",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/17.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "018",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/18.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "019",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/19.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
  
    {
    id: "020",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/20.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "021",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/21.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "022",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/22.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "023",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/23.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "024",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/24.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
  
    {
    id: "025",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/25.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
  
    {
    id: "026",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/26.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "027",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/27.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "028",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/28.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "029",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/29.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "030",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/30.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "031",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/31.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "032",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/32.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "033",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/33.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "034",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/34.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
    
    {
    id: "035",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/35.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "036",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/36.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "037",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/37.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "038",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/38.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "039",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/39.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
    
    {
    id: "040",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/40.jpeg",
    inStock: true,
    activo: true,
    categoria: "Barba",
  },
  
    {
    id: "041",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/41.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "042",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/42.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "043",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/43.jpeg",
    inStock: true,
    activo: true,
    categoria: "Barba",
  },
  
    {
    id: "044",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/44.jpeg",
    inStock: true,
    activo: true,
    categoria: "Barba",
  },
    
    {
    id: "045",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/45.jpeg",
    inStock: true,
    activo: true,
    categoria: "Barba",
  },
  
    {
    id: "046",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/46.jpeg",
    inStock: true,
    activo: true,
    categoria: "Barba",
  },
  
    {
    id: "047",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/47.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "048",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/48.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
  
    {
    id: "049",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/49.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
    
    {
    id: "050",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/50.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
  
    {
    id: "051",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/51.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "052",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/52.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cuidado de la Piel",
  },
  
    {
    id: "053",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/53.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
  
    {
    id: "054",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/54.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
    
    {
    id: "055",
    nombre: "",
    precio: 180,
    descripcion: "",
    imagen:"/products/55.jpeg",
    inStock: true,
    activo: true,
    categoria: "Cabello",
  },
];

export async function seedProducts() {
  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      await setDoc(doc(db, "productos", product.id), {
        nombre: product.nombre ?? "",
        precio: product.precio ?? 0,
        descripcion: product.descripcion ?? "",
        imagen: product.imagen ?? "",
        inStock: product.inStock ?? true,
        activo: product.activo ?? true,
        categoria: product.categoria ?? "Sin categoría",
        order: Number(product.id),
      });

      successCount++;
      console.log(`✅ Producto agregado: ${product.id}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Error en producto: ${product.id}`, product, error);
    }
  }

  console.log(`Proceso terminado. Agregados: ${successCount}. Errores: ${errorCount}.`);
}


export async function deleteAllProducts() {
  try {
    const snapshot = await getDocs(collection(db, "productos"));

    for (const productDoc of snapshot.docs) {
      await deleteDoc(doc(db, "productos", productDoc.id));
      console.log(`Producto eliminado: ${productDoc.id}`);
    }

    console.log("Todos los productos fueron eliminados");
  } catch (error) {
    console.error("Error eliminando productos:", error);
  }
}