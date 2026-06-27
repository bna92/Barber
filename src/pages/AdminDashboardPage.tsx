import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { seedHero } from "../services/seedHero";
import { seedServices } from "../services/seedServices";
import { seedGallery } from "../services/seedGallery";
import { seedTikTok } from "../services/seedTiktok";

const adminSections = [
    {
        title: "Productos",
        description: "Agregar, editar, ocultar o eliminar productos.",
        path: "/admin/productos",
        icon: "🛍️",
    },
    {
        title: "Hero",
        description: "Administrar imágenes principales del inicio.",
        path: "/admin/hero",
        icon: "✨",
    },
    {
        title: "Servicios",
        description: "Editar servicios, precios, textos e imágenes.",
        path: "/admin/servicios",
        icon: "✂️",
    },
    {
        title: "Nuestros trabajos",
        description: "Agregar o quitar imágenes de la galería.",
        path: "/admin/galeria",
        icon: "📸",
    },
    {
        title: "TikTok",
        description: "Administrar videos, títulos y enlaces.",
        path: "/admin/tiktok",
        icon: "🎥",
    },
];

export default function AdminDashboardPage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/admin/login");
    };

    return (
        <main className="min-h-screen bg-[#faf7f2] p-4 md:p-8">


            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-neutral-950">
                            Panel de administración
                        </h1>

                        <p className="text-neutral-600 mt-3">
                            Selecciona la sección que deseas administrar.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-white border border-neutral-200 text-neutral-950 px-6 py-3 rounded-full font-bold hover:border-red-500 hover:text-red-600 transition w-fit"
                    >
                        Cerrar sesión
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {adminSections.map((section) => (
                        <Link
                            key={section.path}
                            to={section.path}
                            className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-lg shadow-black/5 hover:-translate-y-1 hover:shadow-xl transition"
                        >
                            <div className="text-4xl mb-5">{section.icon}</div>

                            <h2 className="text-2xl font-black text-neutral-950">
                                {section.title}
                            </h2>

                            <p className="text-neutral-600 mt-3 leading-relaxed">
                                {section.description}
                            </p>

                            <span className="inline-flex mt-6 text-yellow-700 font-black">
                                Administrar →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}