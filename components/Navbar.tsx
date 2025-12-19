"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-[#FDFBF7]/90 backdrop-blur-md border-slate-200 py-4 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="block">
                    <AnimatedLogo />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        About
                    </Link>
                    <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Services
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Contact
                    </Link>
                    <Button variant="primary" size="sm">
                        Client Portal
                    </Button>
                </div>

                {/* Mobile Menu Button would go here */}
            </div>
        </nav>
    );
}
