"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

export function Footer() {
    const pathname = usePathname();
    if (pathname === "/login" || pathname === "/card" || pathname?.startsWith("/portal")) return null;

    return (
        <footer className="relative z-[2] bg-ink-900/70 backdrop-blur-md border-t border-line py-16">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-sm">
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4" aria-label="six50 home">
                            <AnimatedLogo />
                        </Link>
                        <p className="text-fog max-w-xs leading-relaxed">
                            Built for founder-led and PE-backed businesses ready to run like a real company.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-mono text-fog-2 mb-4 uppercase tracking-[0.18em] text-xs">Firm</h2>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-fog hover:text-paper transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="text-fog hover:text-paper transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="text-fog hover:text-paper transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-mono text-fog-2 mb-4 uppercase tracking-[0.18em] text-xs">Legal</h2>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-fog hover:text-paper transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-fog hover:text-paper transition-colors">Terms of Use</Link></li>
                            <li><Link href="/accessibility" className="text-fog hover:text-paper transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-mono text-fog-2 mb-4 uppercase tracking-[0.18em] text-xs">Location</h2>
                        <ul className="space-y-3 text-fog">
                            <li>Chicago area, Illinois</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-12 max-w-4xl text-xs leading-relaxed text-fog-2">
                    six50 solutions LLC is not a licensed CPA firm and does not provide audit, review, compilation, or
                    other attest services, or any service that requires a CPA license. Website content and AI assistant
                    responses are general information, not accounting, tax, legal, or investment advice.{" "}
                    <Link href="/terms#not-cpa-firm" className="underline hover:text-paper">Learn more</Link>.
                </p>

                <div className="mt-8 pt-8 border-t border-line flex flex-col md:flex-row justify-between gap-3 font-mono text-fog-2 text-xs tracking-[0.06em]">
                    <span>&copy; {new Date().getFullYear()} six50 solutions LLC. All rights reserved.</span>
                    <span className="uppercase">Finance × Intelligence</span>
                </div>
            </div>
        </footer>
    );
}
