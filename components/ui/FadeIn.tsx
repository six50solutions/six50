"use client";

import { motion } from "framer-motion";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 0.8, className }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }} // Elegant ease-out
            className={className}
        >
            {children}
        </motion.div>
    );
}
