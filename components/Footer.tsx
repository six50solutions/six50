"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    if (pathname === "/login") return null;

    return (
        <footer className="bg-[#F9F8F4] border-t border-slate-200 py-16">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 block mb-4">
                            six50
                        </Link>
                        <p className="text-slate-500 max-w-xs leading-relaxed">
                            Elevating enterprise strategy through data-driven insights and rigorous methodology. The new standard for modern consulting.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4 uppercase tracking-wider text-xs">Firm</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-slate-500 hover:text-slate-800 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="text-slate-500 hover:text-slate-800 transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="text-slate-500 hover:text-slate-800 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4 uppercase tracking-wider text-xs">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-slate-500 hover:text-slate-800 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-slate-500 hover:text-slate-800 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200 text-center md:text-left text-slate-400 text-xs">
                    &copy; {new Date().getFullYear()} six50 solutions LLC. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
