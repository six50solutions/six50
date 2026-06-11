import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "white";
    size?: "sm" | "md" | "lg";
    href?: string;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    href,
    ...props
}: ButtonProps) {
    const classes = cn(
        "inline-flex items-center justify-center rounded-[3px] font-mono uppercase tracking-[0.06em] transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900",
        // Variants — gold = primary action, hairline = secondary
        variant === "primary" && "bg-gold-500 text-ink-900 hover:bg-gold-400 border border-transparent",
        variant === "outline" && "bg-transparent text-paper border border-line-strong hover:border-gold-500 hover:bg-gold-100",
        variant === "white" && "bg-paper text-ink-900 border border-transparent hover:bg-white",
        // Sizes
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-sm",
        className
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {props.children}
            </Link>
        );
    }

    return <button className={classes} {...props} />;
}
