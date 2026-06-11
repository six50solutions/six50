"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
    children: React.ReactNode;
    glow?: "gold" | "blue";
    className?: string;
}

/** Card whose border glow follows the pointer — gold for finance, blue for AI. */
export function SpotlightCard({ children, glow = "gold", className }: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: React.PointerEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    return (
        <div
            ref={ref}
            data-glow={glow}
            onPointerMove={onMove}
            className={cn(
                "spotlight-card rounded-md border border-line-strong bg-gradient-to-b from-ink-800 to-ink-900 transition-colors duration-300 hover:border-paper/30",
                className
            )}
        >
            {children}
        </div>
    );
}
