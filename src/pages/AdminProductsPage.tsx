import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../services/firebase";
import { Product } from "../types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    id: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    imagen: "",
    inStock: true,
    activo: true,
    categoria: "",
    order: 0,
  });

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    productId?: string,
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);

      await uploadBytes(imageRef, file);

      const imageUrl = await getDownloadURL(imageRef);

      if (productId) {
        handleChange(productId, "imagen", imageUrl);
      } else {
        setNewProduct((prev) => ({
          ...prev,
          imagen: imageUrl,
        }));
      }

      alert("Imagen subida correctamente. Ahora presiona Guardar cambios.");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error subiendo imagen. Revisa la consola.");
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.id || !newProduct.nombre || !newProduct.categoria) {
      alert("Completa ID, nombre y categoría.");
      return;
    }

    await setDoc(doc(db, "productos", newProduct.id), {
      nombre: newProduct.nombre,
      precio: Number(newProduct.precio),
      descripcion: newProduct.descripcion,
      imagen: newProduct.imagen,
      inStock: newProduct.inStock,
      activo: newProduct.activo,
      categoria: newProduct.categoria,
      order: Number(newProduct.order),
    });

    alert("Producto agregado correctamente");

    setNewProduct({
      id: "",
      nombre: "",
      precio: 0,
      descripcion: "",
      imagen: "",
      inStock: true,
      activo: true,
      categoria: "",
      order: 0,
    });

    setShowCreateForm(false);
    loadProducts();
  };

  const loadProducts = async () => {
    const q = query(collection(db, "productos"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    const data: Product[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<Product, "id">),
    }));

    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (
    id: string,
    field: keyof Product,
    value: string | number | boolean,
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleSave = async (product: Product) => {
    const productRef = doc(db, "productos", product.id);

    await updateDoc(productRef, {
      nombre: product.nombre,
      precio: Number(product.precio),
      descripcion: product.descripcion,
      categoria: product.categoria,
      imagen: product.imagen,
      inStock: product.inStock,
      activo: product.activo,
    });

    alert("Producto actualizado correctamente");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] p-8">
        <p className="text-neutral-700 font-bold">Cargando productos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] p-4 md:p-8">
      <div className="max-w-[1300px] mx-auto">
        <h1 className="text-4xl font-black text-neutral-950 mb-2">
          Administrar productos
        </h1>

        <p className="text-neutral-600 mb-8">
          Edita nombre, precio, descripción, categoría y disponibilidad.
        </p>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mb-6 bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
        >
          {showCreateForm ? "Cancelar" : "Agregar producto"}
        </button>

        {showCreateForm && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-5 md:p-6 shadow-lg shadow-black/5 mb-8">
            <h2 className="text-2xl font-black text-neutral-950 mb-5">
              Nuevo producto
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="ID ejemplo: 056"
                value={newProduct.id}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, id: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Nombre"
                value={newProduct.nombre}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nombre: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Precio"
                value={newProduct.precio}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    precio: Number(e.target.value),
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Categoría"
                value={newProduct.categoria}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, categoria: e.target.value })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Imagen del producto
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-white"
                />

                {newProduct.imagen && (
                  <img
                    src={newProduct.imagen}
                    alt="Vista previa"
                    className="mt-4 w-32 h-32 object-cover rounded-2xl border border-neutral-200"
                  />
                )}
              </div>

              <input
                type="number"
                placeholder="Orden"
                value={newProduct.order}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    order: Number(e.target.value),
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              />

              <select
                value={newProduct.inStock ? "true" : "false"}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    inStock: e.target.value === "true",
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              >
                <option value="true">Disponible</option>
                <option value="false">Agotado</option>
              </select>

              <select
                value={newProduct.activo ? "true" : "false"}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    activo: e.target.value === "true",
                  })
                }
                className="border border-neutral-200 rounded-xl px-4 py-3"
              >
                <option value="true">Visible</option>
                <option value="false">Oculto</option>
              </select>

              <textarea
                placeholder="Descripción"
                value={newProduct.descripcion}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    descripcion: e.target.value,
                  })
                }
                rows={3}
                className="md:col-span-2 border border-neutral-200 rounded-xl px-4 py-3"
              />

              <button
                onClick={handleCreateProduct}
                className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition"
              >
                Guardar producto
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-neutral-200 rounded-3xl p-4 md:p-6 shadow-lg shadow-black/5"
            >
              <div className="grid md:grid-cols-[160px_1fr] gap-5">
                <div>
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-36 object-cover rounded-2xl bg-neutral-100 border border-neutral-200"
                  />

                  <label className="mt-3 block text-center bg-neutral-950 text-white px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-600 transition text-sm">
                    Cambiar imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, product.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Nombre
                    </label>
                    <input
                      value={product.nombre}
                      onChange={(e) =>
                        handleChange(product.id, "nombre", e.target.value)
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Precio
                    </label>
                    <input
                      type="number"
                      value={product.precio}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "precio",
                          Number(e.target.value),
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Categoría
                    </label>
                    <input
                      value={product.categoria}
                      onChange={(e) =>
                        handleChange(product.id, "categoria", e.target.value)
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Disponibilidad
                    </label>
                    <select
                      value={product.inStock ? "true" : "false"}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "inStock",
                          e.target.value === "true",
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    >
                      <option value="true">Disponible</option>
                      <option value="false">Agotado</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Estado
                    </label>
                    <select
                      value={product.activo ? "true" : "false"}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "activo",
                          e.target.value === "true",
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    >
                      <option value="true">Visible</option>
                      <option value="false">Oculto</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-neutral-700">
                      Descripción
                    </label>
                    <textarea
                      value={product.descripcion}
                      onChange={(e) =>
                        handleChange(product.id, "descripcion", e.target.value)
                      }
                      rows={3}
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button
                      onClick={() => handleSave(product)}
                      className="bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer"
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
