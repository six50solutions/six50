"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 20);
            // hide on scroll down, return on scroll up
            setHidden(y > 140 && y > lastY.current);
            lastY.current = y;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
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
                { name: "AI and Automation", href: "/services" },
                { name: "Finance and Accounting", href: "/accounting" },
            ],
        },
        { name: "Products", href: "/projects" },
        { name: "Insights", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                hidden && !isOpen && "-translate-y-full",
                scrolled || isOpen
                    ? "bg-ink-900/70 backdrop-blur-xl border-line py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="block relative z-50">
                    <AnimatedLogo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) =>
                        link.subLinks ? (
                            <div key={link.name} className="relative group py-2">
                                <button className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.08em] text-fog group-hover:text-paper transition-colors focus:outline-none">
                                    {link.name}
                                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:-rotate-180" />
                                </button>
                                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="w-72 bg-ink-800 border border-line-strong shadow-2xl shadow-black/50 rounded-md overflow-hidden py-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                                        {link.subLinks.map((subLink) => (
                                            <Link
                                                key={subLink.name}
                                                href={subLink.href}
                                                className="block px-5 py-3 text-sm text-fog hover:bg-ink-700 hover:text-gold-500 transition-colors border-b border-line last:border-0 whitespace-normal"
                                            >
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
                                className="relative font-mono text-xs uppercase tracking-[0.08em] text-fog hover:text-paper transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                    <Button href="/login" variant="primary" size="sm">
                        Client Portal
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-paper p-2 z-50 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl border-b border-line"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.subLinks ? (
                                        <div className="flex flex-col space-y-2 py-2 border-b border-line">
                                            <span className="font-mono text-sm uppercase tracking-[0.08em] text-paper">{link.name}</span>
                                            <div className="pl-4 flex flex-col space-y-3 mt-2">
                                                {link.subLinks.map((subLink) => (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-base text-fog hover:text-gold-500 transition-colors block"
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
                                            className="block font-mono text-sm uppercase tracking-[0.08em] text-fog hover:text-gold-500 transition-colors py-2 border-b border-line last:border-0"
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
