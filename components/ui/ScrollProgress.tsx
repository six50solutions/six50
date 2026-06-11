"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Gold-to-blue reading progress hairline pinned to the top of the viewport. */
export function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const tween = gsap.to(el, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        });
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left scale-x-0"
            style={{ background: "linear-gradient(90deg, #E8B44C, #6BA8FF)" }}
        />
    );
}
