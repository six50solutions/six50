"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Animated ledger counter — counts up when scrolled into view. */
export function Counter({ to, className }: { to: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.textContent = String(to);
            return;
        }
        const obj = { v: 0 };
        const tween = gsap.to(obj, {
            v: to,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
            },
        });
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [to]);

    return (
        <span ref={ref} className={className}>
            0
        </span>
    );
}
