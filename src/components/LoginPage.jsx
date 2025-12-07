import React, { useState } from "react";
import {
    Lock,
    LogIn,
    Loader2,
    AlertCircle,
    ExternalLink,
    User,
    KeyRound,
} from "lucide-react";

const API_URL = "https://api-ar-umkm-97qh.vercel.app/api";

export default function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log("🔍 Intip Respon Server:", data); // Cek console kalo masih error

            // KITA CARI TOKENNYA SAMPE KETEMU! 🧐
            // Kadang backend naruh di 'data.token', kadang di 'data.data.token'
            const token = data.token || data.data?.token;

            if (res.ok && token) {
                // SUKSES BENERAN!
                localStorage.setItem("authToken", token);
                onLoginSuccess();
            } else {
                // GAGAL (Atau Token gak ketemu)
                setError(data.message || "Login gagal atau Token tidak ditemukan!");
            }
        } catch (err) {
            console.error(err);
            setError("Gagal koneksi ke server. Cek internet kamu!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-10 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white mb-4 shadow-lg shadow-indigo-200">
                        <Lock size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Masukin kredensial Admin buat akses Dashboard.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <KeyRound size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-rose-50 text-rose-500 text-sm p-4 rounded-xl border border-rose-100 flex items-start gap-3 animate-shake">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <>
                                <LogIn size={20} />
                                <span>Masuk Dashboard</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-sm mb-2">Bukan Admin?</p>
                    <a
                        href="/shop.html"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline decoration-2 underline-offset-2 transition-colors"
                    >
                        <ExternalLink size={14} />
                        Lihat Katalog User (WebAR)
                    </a>
                </div>
            </div>

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
        </div>
    );
}
