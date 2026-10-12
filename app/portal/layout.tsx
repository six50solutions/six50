
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { LayoutDashboard, FileText, Calendar, Files, LogOut, MessageSquare, ArrowLeft } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
        { name: "Scope of Work", href: "/portal/scope", icon: FileText },
        { name: "Timeline", href: "/portal/timeline", icon: Calendar },
        { name: "Documents", href: "/portal/documents", icon: Files },
    ];

    return (
        <div className="min-h-screen bg-ink-800 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-ink-900 text-paper flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-line-strong">
                    <Link href="/portal" className="block" aria-label="six50 Client Portal home">
                        <AnimatedLogo />
                        <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fog">
                            Client Portal
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? "bg-gold-500 text-ink-900"
                                        : "text-fog-2 hover:bg-ink-800 hover:text-paper"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-line-strong">
                    <Link
                        href="/"
                        className="mb-4 flex items-center gap-3 rounded-md px-4 py-2 text-sm text-fog hover:bg-ink-800 hover:text-paper transition-colors"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        Back to website
                    </Link>
                    <div className="flex items-center gap-3 mb-4 px-4">
                        <div className="w-8 h-8 rounded-full bg-gold-500 text-ink-900 flex items-center justify-center text-xs font-bold">
                            AG
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Adil Ghazali</p>
                            <p className="text-xs text-fog truncate">Client account</p>
                        </div>
                    </div>
                    <form action="/api/logout" method="post">
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                            <LogOut size={16} aria-hidden="true" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
