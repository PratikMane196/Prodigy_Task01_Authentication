import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function Navbar() {
    const token = localStorage.getItem("token");

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-md">
            <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 font-bold text-white shadow-md">
                    M
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                    MERN<span className="text-indigo-400">Auth</span>
                </span>
            </Link>

            <div className="flex items-center gap-3">
                {token ? (
                    <button 
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="rounded-lg bg-slate-800 border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
                    >
                        Sign Out
                    </button>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                            Sign In
                        </Link>
                        <Link 
                            to="/register" 
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                        >
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}