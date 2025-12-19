"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export function SignalNoiseHero() {
    const [isClient, setIsClient] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const sequence = async () => {
                // Phase 1: Noise (already running via initial props)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Phase 2: Resolve to Line (Signal)
                await controls.start("line");

                // Phase 3: Form 650 (Logo/Brand Moment)
                await controls.start("brand");
            };
            sequence();
        }
    }, [isClient, controls]);

    if (!isClient) return null;

    // Generate particles
    const particleCount = 80;
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
    }));

    // Define target positions for "650" shape approximately
    // We can't easily map exact pixels without a map, so we'll do a simplified "Signal Line" -> "Pulse" -> "Logo Fade In" approach
    // or purely abstract: Noise -> Horizon Line -> Pulse

    // Let's go with: Noise -> Horizon Line -> The "six50" text fades in cleanly above it while line glows.
    // The user prompt: "Noise -> signal -> six50 logo appears"

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Background Noise Grid - Low contrast */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Drifting Particles */}
            {particles.map((p, i) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-slate-400"
                    initial={{
                        x: `${p.initialX}%`,
                        y: `${p.initialY}%`,
                        width: "2px",
                        height: "2px",
                        opacity: 0.2,
                        filter: "blur(2px)",
                    }}
                    animate={controls}
                    variants={{
                        line: {
                            x: `${(i / particleCount) * 100}%`, // Spread across width
                            y: "50%", // Center line
                            opacity: [0.2, 0.4, 0.8],
                            filter: "blur(0px)",
                            scale: 1,
                            backgroundColor: "#fbbf24", // gold
                            transition: { duration: 2, ease: "easeInOut", delay: Math.random() * 1 }
                        },
                        brand: {
                            // Pulse effect or subtle wave once in line
                            y: ["50%", "48%", "50%", "52%", "50%"],
                            opacity: 0.6,
                            transition: {
                                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.05 },
                                opacity: { duration: 1 }
                            }
                        }
                    }}
                    transition={{
                        // Default random drift for initial state
                        x: { repeat: Infinity, repeatType: "reverse", duration: 10 + Math.random() * 10 },
                        y: { repeat: Infinity, repeatType: "reverse", duration: 10 + Math.random() * 10 },
                    }}
                />
            ))}

            {/* Central Line appearing from particles */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={controls}
                variants={{
                    line: { scaleX: 1, opacity: 0.5, transition: { duration: 1.5, delay: 1.5 } },
                    brand: { scaleX: 1, opacity: 0.3 }
                }}
            />


        </div>
    );
}
