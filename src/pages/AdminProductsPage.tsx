import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { Product } from "../types/product";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<Record<string, "dirty" | "saved">>({});

  const [showCreateForm, setShowCreateForm] = useState(false);

  const hasUnsavedChanges = Object.values(saveStatus).some(
    (status) => status === "dirty",
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const [newProduct, setNewProduct] = useState({
    id: "",
    nombre: "",
    precio: 0,
    precioMayoreo: 0,
    cantidadMayoreo: 0,
    descripcion: "",
    imagen: "",
    imagenes: [] as string[],
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

      const cloudName = "df7in528r";
      const uploadPreset = "barberia_unsigned";

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

      if (!response.ok) {
        throw new Error("Error al subir imagen");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      if (productId) {
        await updateDoc(doc(db, "productos", productId), {
          imagen: imageUrl,
        });

        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId ? { ...product, imagen: imageUrl } : product,
          ),
        );

        alert("Imagen actualizada correctamente");
        return;
      }

      setNewProduct((prev) => ({
        ...prev,
        imagen: imageUrl,
      }));

      alert("Imagen subida correctamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("No se pudo subir la imagen.");
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const cloudName = "df7in528r";
    const uploadPreset = "barberia_unsigned";

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

    if (!response.ok) {
      throw new Error("Error al subir imagen");
    }

    const data = await response.json();
    return data.secure_url as string;
  };

  const handleAddGalleryImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    productId?: string,
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const imageUrl = await uploadToCloudinary(file);

      if (productId) {
        await updateDoc(doc(db, "productos", productId), {
          imagenes: arrayUnion(imageUrl),
        });

        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  imagenes: [...(product.imagenes ?? []), imageUrl],
                }
              : product,
          ),
        );

        alert("Imagen agregada a la galería del producto");
        return;
      }

      setNewProduct((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, imageUrl],
      }));

      alert("Imagen agregada a la galería");
    } catch (error) {
      console.error("Error subiendo imagen de galería:", error);
      alert("No se pudo subir la imagen.");
    }
  };

  const handleRemoveGalleryImage = async (
    productId: string,
    imageUrl: string,
  ) => {
    await updateDoc(doc(db, "productos", productId), {
      imagenes: arrayRemove(imageUrl),
    });

    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              imagenes: (product.imagenes ?? []).filter(
                (url) => url !== imageUrl,
              ),
            }
          : product,
      ),
    );
  };

  const handleRemoveNewProductGalleryImage = (imageUrl: string) => {
    setNewProduct((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((url) => url !== imageUrl),
    }));
  };

  const handleCreateProduct = async () => {
    if (!newProduct.id || !newProduct.nombre || !newProduct.categoria) {
      alert("Completa ID, nombre y categoría.");
      return;
    }

    const existing = await getDoc(doc(db, "productos", newProduct.id));

    if (existing.exists()) {
      alert(
        `Ya existe un producto con el ID "${newProduct.id}". Usa otro ID distinto.`,
      );
      return;
    }

    await setDoc(doc(db, "productos", newProduct.id), {
      nombre: newProduct.nombre,
      precio: Number(newProduct.precio),
      precioMayoreo: Number(newProduct.precioMayoreo),
      cantidadMayoreo: Number(newProduct.cantidadMayoreo),
      descripcion: newProduct.descripcion,
      imagen: newProduct.imagen,
      imagenes: newProduct.imagenes,
      inStock: newProduct.inStock,
      activo: newProduct.activo,
      categoria:
        newProduct.categoria.charAt(0).toUpperCase() +
        newProduct.categoria.slice(1).toLowerCase(),
      order: Number(newProduct.order),
    });

    alert("Producto agregado correctamente");

    setNewProduct({
      id: "",
      nombre: "",
      precio: 0,
      precioMayoreo: 0,
      cantidadMayoreo: 0,
      descripcion: "",
      imagen: "",
      imagenes: [],
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

    setSaveStatus((prev) => ({ ...prev, [id]: "dirty" }));
  };

  const handleSave = async (product: Product) => {
    const productRef = doc(db, "productos", product.id);

    await updateDoc(productRef, {
      nombre: product.nombre,
      precio: Number(product.precio),
      precioMayoreo: Number(product.precioMayoreo) || 0,
      cantidadMayoreo: Number(product.cantidadMayoreo) || 0,
      descripcion: product.descripcion,
      categoria:
        product.categoria.charAt(0).toUpperCase() +
        product.categoria.slice(1).toLowerCase(),
      imagen: product.imagen,
      inStock: product.inStock,
      activo: product.activo,
      order: Number(product.order),
    });

    setSaveStatus((prev) => ({ ...prev, [product.id]: "saved" }));

    alert("Producto actualizado correctamente");
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este producto?");

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "productos", productId));

    setProducts((prev) => prev.filter((product) => product.id !== productId));

    alert("Producto eliminado correctamente");
  };

  const handleDeleteAllProducts = async () => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar TODOS los productos? Esta acción no se puede deshacer.",
    );

    if (!confirmDelete) return;

    for (const product of products) {
      await deleteDoc(doc(db, "productos", product.id));
    }

    setProducts([]);

    alert("Todos los productos fueron eliminados");
  };

  const handleLogout = async () => {
    if (
      hasUnsavedChanges &&
      !confirm(
        "Tienes cambios sin guardar. ¿Seguro que quieres cerrar sesión sin guardarlos?",
      )
    ) {
      return;
    }

    await signOut(auth);
    navigate("/admin/login");
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
      <Link
        to="/admin"
        onClick={(e) => {
          if (
            hasUnsavedChanges &&
            !confirm(
              "Tienes cambios sin guardar. ¿Seguro que quieres salir sin guardarlos?",
            )
          ) {
            e.preventDefault();
          }
        }}
        className="inline-flex items-center gap-2 mb-6 text-neutral-700 hover:text-yellow-700 font-bold transition"
      >
        ← Volver al panel
      </Link>
      <div className="max-w-[1300px] mx-auto">
        <h1 className="text-4xl font-black text-neutral-950 mb-2">
          Administrar productos
        </h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              if (!showCreateForm) {
                const nextOrder = products.length
                  ? Math.max(...products.map((p) => p.order)) + 1
                  : 0;
                setNewProduct((prev) => ({ ...prev, order: nextOrder }));
              }
              setShowCreateForm(!showCreateForm);
            }}
            className="bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
          >
            {showCreateForm ? "Cancelar" : "Agregar producto"}
          </button>

          <button
            onClick={handleDeleteAllProducts}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
          >
            Eliminar todos
          </button>

          <button
            onClick={handleLogout}
            className="bg-white border border-neutral-200 text-neutral-950 px-6 py-3 rounded-full font-bold hover:border-red-500 hover:text-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>

        <p className="text-neutral-600 mb-8">
          Edita nombre, imagen, precio, precio mayoreo, descripción, categoría, disponibilidad y estado.
        </p>



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

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Precio
                </label>

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
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Precio mayoreo (opcional)
                </label>

                <input
                  type="number"
                  placeholder="Precio mayoreo"
                  value={newProduct.precioMayoreo}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      precioMayoreo: Number(e.target.value),
                    })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Cantidad mínima para mayoreo
                </label>

                <input
                  type="number"
                  placeholder="Ej. 6"
                  value={newProduct.cantidadMayoreo}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      cantidadMayoreo: Number(e.target.value),
                    })
                  }
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

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

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Galería adicional (opcional, varias fotos del producto)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddGalleryImage(e)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-white"
                />

                {newProduct.imagenes.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {newProduct.imagenes.map((url) => (
                      <div key={url} className="relative">
                        <img
                          src={url}
                          alt="Imagen de galería"
                          className="w-20 h-20 object-cover rounded-xl border border-neutral-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewProductGalleryImage(url)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold hover:bg-red-700 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Posición en Catálogo
                </label>

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
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3"
                />
              </div>

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
                      Precio mayoreo
                    </label>
                    <input
                      type="number"
                      value={product.precioMayoreo ?? 0}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "precioMayoreo",
                          Number(e.target.value),
                        )
                      }
                      className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700">
                      Cantidad mínima para mayoreo
                    </label>
                    <input
                      type="number"
                      value={product.cantidadMayoreo ?? 0}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "cantidadMayoreo",
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
                      Posición en Catálogo
                    </label>

                    <input
                      type="number"
                      value={product.order}
                      onChange={(e) =>
                        handleChange(product.id, "order", Number(e.target.value))
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

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-neutral-700">
                      Galería adicional (fotos extra que se ven en la ficha del producto)
                    </label>

                    <div className="mt-2 flex flex-wrap gap-3">
                      {(product.imagenes ?? []).map((url) => (
                        <div key={url} className="relative">
                          <img
                            src={url}
                            alt="Imagen de galería"
                            className="w-20 h-20 object-cover rounded-xl border border-neutral-200"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveGalleryImage(product.id, url)
                            }
                            className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold hover:bg-red-700 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <label className="w-20 h-20 flex items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 text-neutral-500 text-xs font-bold cursor-pointer hover:border-yellow-600 hover:text-yellow-700 transition text-center px-1">
                        + Agregar
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleAddGalleryImage(e, product.id)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      {saveStatus[product.id] === "dirty" && (
                        <p className="text-sm font-bold text-neutral-400">
                          Cambios sin guardar
                        </p>
                      )}

                      {saveStatus[product.id] === "saved" && (
                        <p className="text-sm font-bold text-green-600">
                          ✓ Cambios guardados
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition cursor-pointer"
                      >
                        Eliminar producto
                      </button>

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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
