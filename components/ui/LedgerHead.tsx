import { Reveal } from "./Reveal";

interface LedgerHeadProps {
    no: string;
    title: string;
    tail?: string;
    className?: string;
}

/** Ledger-entry section header: 001 / TITLE / annotation. */
export function LedgerHead({ no, title, tail, className }: LedgerHeadProps) {
    return (
        <Reveal className={`mb-10 md:mb-16 ${className ?? ""}`}>
            <div className="ledger-head">
                <span className="font-mono text-[0.8rem] tracking-[0.08em] text-gold-500">{no}</span>
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.18em] text-fog">
                    {title}
                </span>
                <span className="flex-1" />
                {tail && (
                    <span className="hidden font-mono text-[0.72rem] tracking-[0.08em] text-fog-2 sm:inline">
                        {tail}
                    </span>
                )}
            </div>
        </Reveal>
    );
}
