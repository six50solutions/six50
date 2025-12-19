"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TransformationVisual() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Cycle Duration: 14 seconds
    // 0-4s: Wide Scatter
    // 4-8s: Aggregation & Microscope Focus
    // 8s: SNAP
    // 8-12s: Quantum Waves (Expansion)
    // 12-14s: Reset

    const cycleDuration = 14;
    const particleCount = 100;

    const particles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        // Start: Way off screen
        startX: (Math.random() - 0.5) * 1500,
        startY: (Math.random() - 0.5) * 1200,
        // Center Jitter
        jitterX: (Math.random() - 0.5) * 40,
        jitterY: (Math.random() - 0.5) * 40,
    }));

    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col items-center justify-center">
            {/* Background Texture - Deep Space / Quantum Field */}
            <motion.div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"
                animate={{
                    scale: [2, 1, 1, 1, 2],
                    opacity: [0, 0.5, 1, 0.2, 0],
                }}
                transition={{
                    duration: cycleDuration,
                    times: [0, 0.3, 0.55, 0.8, 1],
                    repeat: Infinity
                }}
            />

            {/* Focusing HUD Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: cycleDuration, times: [0.2, 0.3, 0.57, 0.6], repeat: Infinity }}
            >
                {/* Crosshairs */}
                <div className="absolute w-full h-px bg-gold-500/10" />
                <div className="absolute h-full w-px bg-gold-500/10" />

                {/* Brackets */}
                <div className="w-64 h-64 border border-gold-500/20 rounded-full flex items-center justify-center relative">
                    <motion.div
                        className="absolute text-[10px] font-mono text-gold-500 uppercase tracking-widest bg-slate-950 px-2 -top-3"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        Focusing...
                    </motion.div>
                </div>
            </motion.div>

            {/* Particles - Absorb into Singularity */}
            <div className="absolute inset-0 flex items-center justify-center">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-slate-400"
                        style={{ width: "2px", height: "2px" }}
                        animate={{
                            x: [p.startX, p.jitterX, 0], // Pull -> Jitter -> Center (No blast out)
                            y: [p.startY, p.jitterY, 0],
                            opacity: [0, 1, 1, 0], // Visible -> Dense -> Gone at snap
                            scale: [1, 1.5, 0.5, 0],
                            backgroundColor: ["#94a3b8", "#fbbf24", "#ffffff"]
                        }}
                        transition={{
                            duration: cycleDuration,
                            times: [0, 0.4, 0.55, 0.58], // Vanish right at 0.58s
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            {/* Quantum Waves Output */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Multiple concentric waves expanding */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={`wave-${i}`}
                        className="absolute rounded-full border border-gold-500/50"
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        animate={{
                            width: ["0px", "800px"],
                            height: ["0px", "800px"],
                            opacity: [0, 1, 0],
                            borderWidth: ["2px", "1px"]
                        }}
                        transition={{
                            duration: 3, // Expansion speed
                            delay: 8 + (i * 0.4), // Staggered start at snap (approx 8s mark is 0.57*14 = 7.98s)
                            // Actually let's map precise times to cycle. 
                            // If cycle is 14s, snap is at 0.57 (8s). 
                            // We need to animate precisely within the cycle duration or use a separate key for loop?
                            // Framer motion loop is easier if mapped to percentage.
                            // 0.58 starts expansion.
                            times: [0, 1], // Relative to the duration below
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatDelay: cycleDuration - 3 // Wait for next cycle
                        }}
                    // Wait... standard animate/transition expects consistent cycle.
                    // Let's use the main cycle mapping.
                    />
                ))}

                {/*  Re-implementing Waves using the main cycle mapping for sync */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={`main-wave-${i}`}
                        className="absolute rounded-full border border-gold-500"
                        style={{ transform: "translate(-50%, -50%)" }}
                        animate={{
                            width: ["0%", "0%", "150%"],
                            height: ["0%", "0%", "150%"],
                            opacity: [0, 1, 0],
                            borderWidth: ["0px", "2px", "0px"]
                        }}
                        transition={{
                            duration: cycleDuration,
                            times: [0, 0.57 + (i * 0.02), 0.8 + (i * 0.05)], // Start staggered after snap
                            ease: "easeOut",
                            repeat: Infinity
                        }}
                    />
                ))}

                {/* Core Flash */}
                <motion.div
                    className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,1)] z-20"
                    animate={{
                        scale: [0, 0, 5, 0],
                        opacity: [0, 0, 1, 0]
                    }}
                    transition={{
                        duration: cycleDuration,
                        times: [0, 0.55, 0.57, 0.6],
                        ease: "easeOut",
                        repeat: Infinity
                    }}
                />
            </div>

            {/* Text Reveal - Appearing through the waves */}
            <motion.div
                className="relative z-30 text-center mix-blend-screen"
                animate={{
                    opacity: [0, 0, 0, 1, 1, 0],
                    scale: [0.9, 0.9, 0.9, 1, 1, 1.1],
                    filter: ["blur(10px)", "blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(5px)"]
                }}
                transition={{
                    duration: cycleDuration,
                    times: [0, 0.6, 0.62, 0.7, 0.9, 1],
                    repeat: Infinity
                }}
            >
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                    Where clarity triggers <span className="text-gold-500">transformation.</span>
                </h3>
            </motion.div>

        </div>
    );
}
