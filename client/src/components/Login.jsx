import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 px-4 py-12">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 text-white shadow-md">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-extrabold text-zinc-900">Welcome Back</h2>
                    <p className="mt-1 text-xs text-zinc-500">Sign in to access your secure dashboard</p>
                </div>

                {error && (
                    <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-700">Email Address</label>
                        <input 
                            type="email" 
                            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-700">Password</label>
                        <input 
                            type="password" 
                            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-zinc-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}