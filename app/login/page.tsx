"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import Link from "next/link";
import { useState } from "react";
import { AlertCircle, ArrowRight, Lock } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                window.location.href = '/portal';
            } else {
                alert("Invalid email or password");
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login error', error);
            setIsLoading(false);
            alert("An error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* Header */}
            <header className="p-6 md:p-8 flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-gold-500 transition-colors">
                            <span className="font-bold text-white text-xs">650</span>
                        </div>
                    </div>
                </Link>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Back to Website
                </Link>
            </header>

            {/* Login Form Container */}
            <div className="flex-grow flex items-center justify-center p-6">
                <FadeIn>
                    <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-lg backdrop-blur-sm shadow-2xl">
                        <div className="mb-10 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Client Portal</h1>
                            <p className="text-slate-400">Secure access for six50 partners.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-slate-700"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-gold-500 hover:text-gold-400 transition-colors">
                                        Forgot?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-slate-700"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gold-500 text-slate-900 font-bold py-3 mt-4 rounded-sm hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                            <p className="text-xs text-slate-500">
                                This portal is restricted to authorized personnel only.
                                <br />Access attempts are monitored and logged.
                            </p>
                            <div className="flex justify-center gap-2 mt-4 text-gold-500/20">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-[10px] font-mono tracking-widest">SECURE CONNECTION</span>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
