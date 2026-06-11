"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Wraps a CTA so it leans toward the cursor and snaps back elastically. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (
            window.matchMedia("(hover: none)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
            return;

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            gsap.to(el, {
                x: (e.clientX - r.left - r.width / 2) * 0.25,
                y: (e.clientY - r.top - r.height / 2) * 0.35,
                duration: 0.4,
                ease: "power3.out",
            });
        };
        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.45)" });
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return (
        <div ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
            {children}
        </div>
    );
}
