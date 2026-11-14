import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser(formData);
            
            if (data.success && data.token) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setError(data.message || "Invalid email or password.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Unable to connect to the server. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4 py-12 overflow-hidden">
            {/* Decorative background glow circles for extra visual depth */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-white/20">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 text-white shadow-lg">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-500">Sign in to access your secure dashboard</p>
                </div>

                {error && (
                    <div className="mt-6 rounded-xl bg-red-50 p-4 border border-red-200 text-sm font-medium text-red-600 shadow-sm animate-bounce">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-gray-900 shadow-inner focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-gray-900 shadow-inner focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:from-violet-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all transform active:scale-[0.98]"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold text-indigo-600 hover:text-pink-600 transition-colors underline decoration-2 underline-offset-4">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}