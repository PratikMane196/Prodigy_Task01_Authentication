import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function Navbar() {
    const token = localStorage.getItem("token");

    const handleSignOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <header className="border-b border-zinc-200/80 bg-[#FAFAFA]">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                {/* Brand Logo */}
                <Link to={token ? "/dashboard" : "/login"} className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white">
                        P
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-zinc-900">
                        ProdigyAuth
                    </span>
                </Link>

                {/* Right Action */}
                <div className="flex items-center gap-3">
                    {token ? (
                        <button
                            onClick={handleSignOut}
                            className="rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-900"
                        >
                            Sign out
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:text-zinc-900"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-zinc-800"
                            >
                                Create account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900 antialiased">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}