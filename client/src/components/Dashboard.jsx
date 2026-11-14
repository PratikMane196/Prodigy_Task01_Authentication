import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../services/api";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        getDashboardData(token)
            .then((res) => {
                if (res.success && res.user) {
                    setUser(res.user);
                } else {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#070b19] text-white">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }

    const displayName = user?.name || "User";

    return (
        <div className="min-h-[calc(100vh-73px)] bg-[#070b19] p-6 md:p-10 text-white">
            <div className="mx-auto max-w-5xl space-y-6">
                
                {/* Top Banner */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">AUTHENTICATED SESSION</span>
                        </div>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="rounded-xl border border-red-500/30 bg-red-600/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* System Status Card */}
                    <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">System Status</h2>
                        
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                            <p className="text-sm font-semibold text-emerald-400">
                                Welcome, {displayName}!
                            </p>
                        </div>

                        <div className="space-y-1 pt-2 text-sm text-slate-300">
                            <p><strong className="text-slate-400">User ID:</strong> <code className="rounded bg-slate-800 px-2 py-0.5 text-xs text-indigo-300 font-mono">{user?.id}</code></p>
                            <p><strong className="text-slate-400">Email:</strong> <span className="text-slate-200">{user?.email}</span></p>
                            <p><strong className="text-slate-400">Role:</strong> <span className="text-indigo-400 capitalize font-medium">{user?.role}</span></p>
                        </div>
                    </div>

                    {/* Security Token Card */}
                    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Security Token</h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Your session is protected using a cryptographically signed JWT stored securely in browser storage.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                            <span>JWT Active</span>
                            <span className="text-emerald-400 font-semibold">Verified</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}