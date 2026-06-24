import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin/productos");
        } catch (error) {
            console.error(error);
            alert("Correo o contraseña incorrectos");
        }
    };

    return (

        <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">

            <Link
                to="/"
                className="absolute top-6 left-6 inline-flex items-center gap-2 text-neutral-700 hover:text-yellow-700 font-bold transition"
            >
                ← Volver al inicio
            </Link>
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white border border-neutral-200 rounded-3xl p-6 shadow-xl shadow-black/5"
            >
                <img
                    src="/logofondonegro.png"
                    alt="KAM Barber Salón"
                    className="w-28 h-28 mx-auto mb-4 object-contain"
                />
                <h1 className="text-3xl font-black text-neutral-950 mb-2">
                    Admin
                </h1>

                <p className="text-neutral-500 mb-6">
                    Inicia sesión para administrar productos.
                </p>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600"
                />

                <button className="w-full bg-neutral-950 text-white py-3 rounded-xl font-black hover:bg-yellow-600 transition">
                    Entrar
                </button>


            </form>
        </main>
    );
}