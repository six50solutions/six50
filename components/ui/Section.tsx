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
                dark ? "bg-slate-900 text-white" : "bg-transparent text-slate-800",
                className
            )}
        >
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {children}
            </div>
            {/* Subtle background flair for dark sections */}
            {dark && (
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-800/50 to-transparent pointer-events-none" />
            )}
        </section>
    );
}
