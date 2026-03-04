import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import gsap from "gsap";
import { FaUser, FaLock, FaEnvelope, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { login } from "../Redux/authSlice";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const formRef = useRef(null);

    // Fallback credentials for generic admin login check
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [isLogin]);

    const handleToggle = () => {
        setError("");
        // Animate out
        gsap.to(formRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                setIsLogin(!isLogin);
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name") || email.split("@")[0]; // Fallback name if login

        setTimeout(() => {
            // Admin Logic Check
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                dispatch(
                    login({
                        user: { name: "System Admin", email },
                        role: "admin",
                    })
                );
                navigate("/admin/dashboard");
            } else {
                // Standard User Login / Signup (Mocked)
                if (password.length < 6) {
                    setError("Password must be at least 6 characters.");
                    setIsLoading(false);
                    return;
                }

                dispatch(
                    login({
                        user: { name, email },
                        role: "user",
                    })
                );
                navigate("/");
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300"
        >
            {/* Background Animated Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Back to Home Button */}
            <Link
                to="/"
                className="fixed top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-100 dark:border-slate-700 rounded-full shadow-sm hover:shadow-md hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium text-gray-600 dark:text-gray-300"
            >
                <FaArrowLeft /> Back
            </Link>

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl shadow-xl mb-4 transform rotate-3 hover:rotate-6 transition-transform">
                        <span className="text-white font-bold text-2xl">SJ</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        {isLogin
                            ? "Sign in to access your portal"
                            : "Join SmartJob to find your dream role"}
                    </p>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden relative transition-colors duration-300">

                    {/* Animated Form Container */}
                    <div className="p-8" ref={formRef}>
                        {error && (
                            <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/20 backdrop-blur border border-red-100 dark:border-red-800/50 rounded-2xl flex items-center gap-3 transition-colors">
                                <div className="h-8 w-8 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors">
                                    !
                                </div>
                                <p className="text-red-600 dark:text-red-400 text-sm font-medium transition-colors">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3.5 pl-11 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                            required={!isLogin}
                                        />
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 text-gray-800 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                        required
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Password
                                    </label>
                                    {isLogin && (
                                        <a href="#" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                            Forgot?
                                        </a>
                                    )}
                                </div>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        required
                                    />
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                                    </div>
                                ) : isLogin ? (
                                    "Sign In"
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    type="button"
                                    onClick={handleToggle}
                                    className="ml-2 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors hover:underline outline-none"
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Admin Hint for testing */}
                    <div className="bg-gray-50/50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 p-4 shrink-0 transition-colors">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                            <FaShieldAlt />
                            <span>Admin accounts managed via system administrators.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
