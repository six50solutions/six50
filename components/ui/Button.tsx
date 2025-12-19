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
        "inline-flex items-center justify-center rounded-sm font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        // Variants
        variant === "primary" && "bg-slate-800 text-white hover:bg-slate-900 shadow-sm border border-transparent",
        variant === "outline" && "bg-transparent text-slate-800 border-slate-300 hover:border-slate-800 border",
        variant === "white" && "bg-white text-slate-900 border border-transparent hover:bg-slate-50 shadow-md",
        // Sizes
        size === "sm" && "px-4 py-2 text-xs uppercase tracking-wide",
        size === "md" && "px-6 py-3 text-sm tracking-wide",
        size === "lg" && "px-8 py-4 text-sm font-semibold uppercase tracking-wider",
        className
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {props.children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props} />
    );
}
