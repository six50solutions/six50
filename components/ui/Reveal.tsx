"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

/** GSAP scroll-triggered reveal. Replaces FadeIn across the redesign. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(el, { opacity: 1, y: 0 });
            return;
        }
        const tween = gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
        });
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [delay]);

    return (
        <div ref={ref} className={`gsap-reveal ${className ?? ""}`}>
            {children}
        </div>
    );
}
