"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

/** Homepage hero: masked headline reveal, staggered entrance, field hint. */
export function HomeHero() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        const lines = root.querySelectorAll("[data-hero-line]");
        const items = root.querySelectorAll("[data-hero-item]");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set([lines, items], { yPercent: 0, opacity: 1, y: 0 });
            return;
        }

        gsap.set(lines, { yPercent: 110 });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(lines, { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.15).to(
            items,
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.18 },
            0.45
        );
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={ref}
            className="relative flex min-h-svh flex-col justify-center px-6 pt-28 md:px-12"
        >
            <div className="container mx-auto">
                <p
                    data-hero-item
                    className="mb-7 flex items-center gap-3.5 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-fog opacity-0 translate-y-[34px]"
                >
                    <span className="inline-block h-px w-9 bg-gold-500" />
                    six50 solutions · finance × intelligence · chicago, il
                </p>

                <h1
                    aria-label="We help growing businesses run smarter."
                    className="font-display mb-8 text-[clamp(2.6rem,7.2vw,6rem)]"
                >
                    <span className="block overflow-hidden">
                        <span data-hero-line className="block">
                            We help growing
                        </span>
                    </span>
                    <span className="block overflow-hidden">
                        <span data-hero-line className="block">
                            businesses run <em className="serif-gradient">smarter.</em>
                        </span>
                    </span>
                </h1>

                <p
                    data-hero-item
                    className="mb-10 max-w-[54ch] text-[clamp(1rem,1.7vw,1.2rem)] leading-relaxed text-fog opacity-0 translate-y-[34px]"
                >
                    Big Four financial rigor and AI-driven automation, under one roof — giving
                    founder-led and PE-backed businesses (
                    <b className="font-medium text-paper">$2M–$50M</b>) the clarity and edge
                    once reserved for companies ten times their size.
                </p>

                <div
                    data-hero-item
                    className="flex flex-wrap items-center gap-5 opacity-0 translate-y-[34px]"
                >
                    <Magnetic>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 rounded-[3px] bg-gold-500 px-7 py-4 font-mono text-sm uppercase tracking-[0.05em] text-ink-900 transition-colors hover:bg-gold-400"
                        >
                            Book a free 30-minute call
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-3 rounded-[3px] border border-line-strong px-7 py-4 font-mono text-sm uppercase tracking-[0.05em] text-paper transition-colors hover:border-gold-500 hover:bg-gold-100"
                        >
                            See what we build
                            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                        </Link>
                    </Magnetic>
                </div>

                <span
                    data-hero-item
                    className="mt-12 inline-flex select-none items-center gap-3 rounded-full border border-line px-4 py-2.5 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-fog-2 opacity-0 translate-y-[34px]"
                >
                    <span className="pulse-dot" />
                    Click anywhere — watch chaos become order
                </span>
            </div>

            <div
                aria-hidden="true"
                className="absolute bottom-9 left-6 hidden items-center gap-3 md:flex font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fog-2 md:left-12"
            >
                <span className="scroll-bar" />
                Scroll
            </div>
        </section>
    );
}
