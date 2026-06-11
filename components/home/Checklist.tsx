"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fit checklist with marks that draw themselves in on scroll. */
export function Checklist({ items }: { items: string[] }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        const marks = root.querySelectorAll<SVGPathElement>("[data-mark]");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(marks, { strokeDashoffset: 0 });
            return;
        }

        const tweens: gsap.core.Tween[] = [];
        marks.forEach((m, i) => {
            tweens.push(
                gsap.to(m, {
                    strokeDashoffset: 0,
                    duration: 0.55,
                    ease: "power2.out",
                    delay: i * 0.1,
                    scrollTrigger: { trigger: root, start: "top 80%" },
                })
            );
        });
        return () => {
            tweens.forEach((t) => {
                t.scrollTrigger?.kill();
                t.kill();
            });
        };
    }, []);

    return (
        <div ref={ref} className="grid border-t border-line-strong">
            {items.map((item) => (
                <div
                    key={item}
                    className="flex items-center gap-4 border-b border-line px-1 py-5 text-[1.05rem]"
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
                        <rect x="1" y="1" width="20" height="20" rx="3" stroke="#5A6376" />
                        <path
                            data-mark
                            d="M5.5 11.5l4 4 7-9"
                            stroke="#E8B44C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="24"
                            strokeDashoffset="24"
                        />
                    </svg>
                    {item}
                </div>
            ))}
        </div>
    );
}
