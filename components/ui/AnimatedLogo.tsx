"use client";

/** Mono wordmark: six50. with the 50 + period in gold (the ledger point). */
export function AnimatedLogo() {
    return (
        <span className="font-mono text-lg font-medium tracking-[0.02em] text-paper">
            six<span className="text-gold-500">50</span>
            <span className="text-gold-500">.</span>
        </span>
    );
}
