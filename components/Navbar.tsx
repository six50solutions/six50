"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper wrappers since Lucide icons are sometimes tricky as direct JSX children in some contexts, but usually fine.
const MenuWrapper = () => <Menu className="w-6 h-6" />;
const XWrapper = () => <X className="w-6 h-6" />;

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    if (pathname === "/login") return null;

    const navLinks = [
        { name: "About", href: "/about" },
        { 
            name: "Services", 
            href: "#",
            subLinks: [
                { name: "AI & Automation Implementation", href: "/services" },
                { name: "Financial Leadership and Accounting", href: "/accounting" }
            ]
        },
        { name: "Products", href: "/projects" },
        { name: "Insights", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled || isOpen ? "bg-[#FDFBF7]/90 backdrop-blur-md border-slate-200 py-4 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="block relative z-50">
                    <AnimatedLogo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        link.subLinks ? (
                            <div key={link.name} className="relative group py-2">
                                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors focus:outline-none">
                                    {link.name}
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:-rotate-180" />
                                </button>
                                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="w-72 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden py-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                                        {link.subLinks.map(subLink => (
                                            <Link key={subLink.name} href={subLink.href} className="block px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-gold-600 transition-colors border-b border-slate-50 last:border-0 whitespace-normal">
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <Button href="/login" variant="primary" size="sm">
                        Client Portal
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800 p-2 z-50 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <XWrapper /> : <MenuWrapper />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-[#FDFBF7] border-b border-slate-200"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.subLinks ? (
                                        <div className="flex flex-col space-y-2 py-2 border-b border-slate-100">
                                            <span className="text-lg font-medium text-slate-900">{link.name}</span>
                                            <div className="pl-4 flex flex-col space-y-3 mt-2">
                                                {link.subLinks.map(subLink => (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-base font-medium text-slate-600 hover:text-gold-600 transition-colors block"
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-lg font-medium text-slate-700 hover:text-gold-600 transition-colors py-2 border-b border-slate-100 last:border-0"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4">
                                <Button href="/login" variant="primary" size="lg" className="w-full justify-center">
                                    Client Portal
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
