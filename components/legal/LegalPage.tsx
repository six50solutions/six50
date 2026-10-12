import { Section } from "@/components/ui/Section";
import type { ReactNode } from "react";

/** Shared shell for the legal pages (privacy, terms, accessibility). */
export function LegalPage({
    title,
    effectiveDate,
    intro,
    children,
}: {
    title: string;
    effectiveDate: string;
    intro?: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="pt-20">
            <Section>
                <article className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-paper mb-4">{title}</h1>
                    <p className="text-fog mb-8">
                        Effective date: <time>{effectiveDate}</time>
                    </p>
                    {intro && <div className="text-fog leading-relaxed mb-10 space-y-4">{intro}</div>}
                    <div className="space-y-10 text-fog leading-relaxed">{children}</div>
                </article>
            </Section>
        </div>
    );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        <section aria-labelledby={id} className="space-y-4">
            <h2 id={id} className="text-xl font-semibold text-paper">
                {title}
            </h2>
            {children}
        </section>
    );
}

export function LegalList({ children }: { children: ReactNode }) {
    return <ul className="list-disc pl-5 space-y-2">{children}</ul>;
}

export const legalLink = "text-gold-500 underline underline-offset-2 hover:text-gold-400";
