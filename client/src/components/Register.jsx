import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await registerUser(formData);
            if (data.success) {
                navigate("/login");
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-61px)] items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                    GET STARTED
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
                    Create account
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                    Register a new ProdigyAuth account.
                </p>

                {error && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Pratik Mane"
                            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-700">Email</label>
                        <input
                            type="email"
                            placeholder="pratik@gmail.com"
                            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-zinc-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-zinc-900 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}