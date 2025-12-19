"use client";

export function AnimatedLogo() {
    return (
        <div className="flex items-center">
            <svg width="180" height="40" viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" className="w-auto h-10 md:h-12">
                <defs>
                    {/* Animated left-to-right transforming gradient: Navy -> Gold -> Navy */}
                    <linearGradient id="goldShift" x1="0%" y1="0%" x2="200%" y2="0%">
                        <stop offset="0%" stopColor="#0F172A">
                            <animate attributeName="offset" values="-1; 0" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="40%" stopColor="#0F172A">
                            <animate attributeName="offset" values="-0.6; 0.4" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#D4AF37">
                            <animate attributeName="offset" values="-0.5; 0.5" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="60%" stopColor="#0F172A">
                            <animate attributeName="offset" values="-0.4; 0.6" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#0F172A">
                            <animate attributeName="offset" values="0; 1" dur="3s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>

                {/* Unified six50 text with custom font stack including Space Grotesk */}
                <text
                    x="40"
                    y="92"
                    fontFamily="'Space Grotesk', Inter, sans-serif"
                    fontSize="76"
                    fontWeight="600"
                    letterSpacing="-1"
                    fill="url(#goldShift)"
                >
                    six50
                </text>
            </svg>
        </div>
    );
}
