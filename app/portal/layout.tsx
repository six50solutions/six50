
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Calendar, Files, LogOut, MessageSquare } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
        { name: "Scope of Work", href: "/portal/scope", icon: FileText },
        { name: "Timeline", href: "/portal/timeline", icon: Calendar },
        { name: "Documents", href: "/portal/documents", icon: Files },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-gold-500/50 flex items-center justify-center">
                            <span className="font-bold text-white text-xs">650</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Client Portal</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? "bg-gold-500 text-slate-900"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4 px-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                            AG
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Adil Ghazali</p>
                            <p className="text-xs text-slate-500 truncate">adilghazali@yahoo.com</p>
                        </div>
                    </div>
                    <Link
                        href="/login"
                        onClick={() => {
                            // clear cookie (mock logout by navigation for MVP, ideal is API call)
                            document.cookie = "six50_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
