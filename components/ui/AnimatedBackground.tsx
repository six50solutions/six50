"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
    type Particle = {
        id: number;
        top: string;
        left: string;
        delay: number;
        duration: number;
    };

    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(
            [...Array(40)].map((_, i) => ({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                delay: Math.random() * 5,
                duration: 15 + Math.random() * 10,
            }))
        );
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#FDFBF7]">
            {/* Base Background Color explicitly set to handle layer issues */}

            {/* Orb 1 - Antique Gold - Top Left - HIGHER OPACITY */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#C5A065] rounded-full blur-[100px]"
            />

            {/* Orb 2 - Deep Navy - Bottom Right - HIGHER OPACITY */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#0F172A] rounded-full blur-[120px]"
            />

            {/* Orb 3 - Light Accent - Center/Off-center - MORE VISIBLE */}
            <motion.div
                animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-[#E5D4B3] rounded-full blur-[90px]"
            />

            {/* Floating Particles - MORE PROMINENT & NUMEROUS */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-2 h-2 bg-gold-600/60 rounded-full shadow-[0_0_10px_rgba(197,160,101,0.4)]"
                    style={{ top: p.top, left: p.left }}
                    animate={{
                        y: [-30, 30, -30],
                        x: [-20, 20, -20],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
}
