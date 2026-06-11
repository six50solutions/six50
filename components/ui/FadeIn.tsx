"use client";

import { Reveal } from "./Reveal";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    duration?: number; // kept for backward compatibility; Reveal manages timing
}

/** Back-compat wrapper: legacy FadeIn now routes through the GSAP Reveal. */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
    return (
        <Reveal delay={delay} className={className}>
            {children}
        </Reveal>
    );
}
