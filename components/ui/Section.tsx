import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    dark?: boolean;
}

export function Section({ children, className, id, dark = false }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative py-24 md:py-32 overflow-hidden",
                dark ? "bg-ink-800/60 border-y border-line text-paper" : "bg-transparent text-paper",
                className
            )}
        >
            <div className="container mx-auto px-6 md:px-12 relative z-10">{children}</div>
        </section>
    );
}
