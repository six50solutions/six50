"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed convergence: the finance and AI circles drift together
 * as the visitor scrolls, and "six50" materializes in the intersection.
 */
export function Venn() {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = ref.current;
        if (!svg) return;
        const cFin = svg.querySelector("#cFin");
        const cAI = svg.querySelector("#cAI");
        const tFin = svg.querySelector("#tFin");
        const tAI = svg.querySelector("#tAI");
        const tSix = svg.querySelector("#tSix");
        if (!cFin || !cAI || !tFin || !tAI || !tSix) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(cFin, { attr: { cx: 185 } });
            gsap.set(cAI, { attr: { cx: 335 } });
            gsap.set(tFin, { attr: { x: 150 } });
            gsap.set(tAI, { attr: { x: 370 } });
            gsap.set(tSix, { opacity: 1 });
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: { trigger: svg, start: "top 75%", end: "top 30%", scrub: 0.6 },
        });
        tl.fromTo(cFin, { attr: { cx: 90 } }, { attr: { cx: 185 } }, 0)
            .fromTo(cAI, { attr: { cx: 430 } }, { attr: { cx: 335 } }, 0)
            .fromTo(tFin, { attr: { x: 90 } }, { attr: { x: 150 } }, 0)
            .fromTo(tAI, { attr: { x: 430 } }, { attr: { x: 370 } }, 0)
            .to(tSix, { opacity: 1, duration: 0.3 }, 0.75);

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <svg
            ref={ref}
            viewBox="0 0 520 360"
            role="img"
            aria-label="Diagram: finance and AI circles overlapping, six50 at the intersection"
            className="mx-auto block w-full max-w-[520px]"
        >
            <circle id="cFin" cx="90" cy="180" r="120" fill="rgba(232,180,76,.07)" stroke="#E8B44C" strokeWidth="1.2" />
            <circle id="cAI" cx="430" cy="180" r="120" fill="rgba(107,168,255,.07)" stroke="#6BA8FF" strokeWidth="1.2" />
            <text id="tFin" x="90" y="186" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="2" fill="#8A93A6">FINANCE</text>
            <text id="tAI" x="430" y="186" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="2" fill="#8A93A6">AI</text>
            <text id="tSix" x="260" y="186" textAnchor="middle" className="font-mono" fontSize="14" letterSpacing="1" fill="#EAE7DE" opacity="0">six50</text>
        </svg>
    );
}
