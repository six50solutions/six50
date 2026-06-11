"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StrikeProps {
    children: React.ReactNode; // the problem phrase
    fix: string; // the blue annotation that replaces it
    index?: number;
}

/**
 * The signature problem-section moment: a gold line strikes through the
 * problem phrase on scroll, and a blue annotation (the fix) appears above it.
 */
export function Strike({ children, fix, index = 0 }: StrikeProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const line = el.querySelector<HTMLElement>("[data-line]");
        const fixEl = el.querySelector<HTMLElement>("[data-fix]");
        if (!line || !fixEl) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(line, { scaleX: 1 });
            gsap.set(fixEl, { opacity: 1 });
            gsap.set(el, { color: "#5A6376" });
            return;
        }

        const tl = gsap
            .timeline({ scrollTrigger: { trigger: el, start: "top 72%" } })
            .to(line, { scaleX: 1, duration: 0.6, ease: "power3.inOut", delay: index * 0.12 })
            .to(el, { color: "#5A6376", duration: 0.4 }, "<0.2")
            .to(fixEl, { opacity: 1, y: -2, duration: 0.5, ease: "power2.out" }, "<0.15");

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [index]);

    return (
        <span ref={ref} className="relative whitespace-nowrap text-paper">
            <i
                data-line
                aria-hidden="true"
                className="absolute left-[-2%] top-[54%] h-[2px] w-[104%] origin-left scale-x-0 bg-gold-500"
            />
            <span
                data-fix
                className="block py-1 font-mono text-[0.62em] tracking-[0.06em] text-blue-500 opacity-0 md:absolute md:left-0 md:top-[-1.15em] md:whitespace-nowrap md:py-0"
            >
                {fix}
            </span>
            {children}
        </span>
    );
}
