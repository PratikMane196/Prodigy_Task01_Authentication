import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            if (data.success) {
                setMessage("Registration successful! You can now log in.");
            } else {
                setMessage(data.message || "Registration failed.");
            }
        } catch (err) {
            setMessage("Server error during registration.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Create Account</h2>
                {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
                    Register
                </button>
            </form>
        </div>
    );
}