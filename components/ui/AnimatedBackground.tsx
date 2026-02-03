"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
            [...Array(30)].map((_, i) => ({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                delay: Math.random() * 5,
                duration: 15 + Math.random() * 10,
            }))
        );
    }, []);

    const [scatteredParticles, setScatteredParticles] = useState<number[]>([]);
    const [clickCount, setClickCount] = useState(0);

    const isEnergyMode = clickCount >= 10;

    useEffect(() => {
        if (isEnergyMode) {
            const timer = setTimeout(() => {
                setClickCount(0);
                setScatteredParticles([]);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [isEnergyMode]);

    const handleScatter = (id: number) => {
        if (!isEnergyMode) {
            setScatteredParticles((prev) => [...prev, id]);
            setClickCount((prev) => prev + 1);
        }
    };

    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <>
            {/* BACKGROUND LAYER - Orbs & Base Color (GLOBAL) */}
            <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-10 transition-colors duration-1000 ${isEnergyMode ? 'bg-slate-900' : 'bg-[#FDFBF7]'}`}>
                {/* Orb 1 - Antique Gold - Top Left */}
                <motion.div
                    animate={isEnergyMode ? {
                        scale: [1, 2, 1],
                        opacity: [0.5, 0.8, 0.5],
                        rotate: 360,
                    } : {
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: isEnergyMode ? 5 : 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[100px] transition-colors duration-1000 ${isEnergyMode ? 'bg-[#FFD700]' : 'bg-[#C5A065]'}`}
                />

                {/* Orb 2 - Deep Navy - Bottom Right */}
                <motion.div
                    animate={isEnergyMode ? {
                        scale: [1, 2, 1],
                        opacity: [0.5, 0.8, 0.5],
                        rotate: -360,
                    } : {
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{
                        duration: isEnergyMode ? 5 : 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className={`absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] transition-colors duration-1000 ${isEnergyMode ? 'bg-[#00FFFF]' : 'bg-[#0F172A]'}`}
                />

                {/* Orb 3 - Light Accent */}
                <motion.div
                    animate={isEnergyMode ? {
                        scale: [0.5, 1.5, 0.5],
                        opacity: [0.2, 0.6, 0.2],
                    } : {
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.15, 0.3, 0.15],
                        x: [0, 50, 0],
                    }}
                    transition={{
                        duration: isEnergyMode ? 3 : 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className={`absolute top-[20%] right-[20%] w-[500px] h-[500px] rounded-full blur-[90px] transition-colors duration-1000 ${isEnergyMode ? 'bg-white' : 'bg-[#E5D4B3]'}`}
                />
            </div>

            {/* INTERACTIVE LAYER - Particles (HOME PAGE ONLY) */}
            {isHomePage && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
                    {particles.map((p) => {
                        const isScattered = scatteredParticles.includes(p.id);

                        return (
                            <motion.div
                                key={p.id}
                                className={`absolute rounded-full cursor-pointer pointer-events-auto transition-all duration-500`}
                                style={{
                                    top: p.top,
                                    left: p.left,
                                    width: isEnergyMode ? "2px" : (p.id % 3 === 0 ? "12px" : p.id % 2 === 0 ? "8px" : "4px"),
                                    height: isEnergyMode ? "100px" : (p.id % 3 === 0 ? "12px" : p.id % 2 === 0 ? "8px" : "4px"),
                                    backgroundColor: isEnergyMode ? "#fff" : (p.id % 5 === 0 ? "#C5A065" : "rgba(197, 160, 101, 0.6)"),
                                    boxShadow: isEnergyMode ? "0 0 20px 2px #FFD700" : "0 0 15px rgba(197,160,101,0.6)",
                                }}
                                animate={isEnergyMode ? {
                                    y: [-1200, 1200], // High velocity beams going DOWN
                                    opacity: [0, 1, 0],
                                    scaleY: [1, 1.5, 1],
                                } : isScattered ? {
                                    x: (Math.random() - 0.5) * 1000,
                                    y: (Math.random() - 0.5) * 1000,
                                    opacity: 0,
                                    scale: 0
                                } : {
                                    y: [-40, 40, -40],
                                    x: [-30, 30, -30],
                                    opacity: [0.4, 1, 0.4],
                                    scale: [1, 1.3, 1],
                                    scaleY: 1,
                                }}
                                transition={isEnergyMode ? {
                                    duration: 0.2 + Math.random() * 0.3, // VERY FAST
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 0.5
                                } : isScattered ? {
                                    duration: 0.8,
                                    ease: "easeOut"
                                } : {
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: p.delay,
                                }}
                                onTap={() => handleScatter(p.id)}
                                whileHover={!isEnergyMode ? { scale: 1.5 } : {}}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
