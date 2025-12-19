import { TransformationVisual } from "@/components/ui/TransformationVisual";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { ShieldCheck, BarChart3, Zap, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero / Philosophy */}
            <Section>
                <FadeIn>
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-8 tracking-tight">
                            Where clarity triggers <span className="text-slate-400">transformation.</span>
                        </h1>
                        <div className="w-24 h-1 bg-gold-500 mb-12" />

                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
                            AI doesn’t fail because the technology isn’t powerful enough. It fails because organizations can’t see clearly enough to act.
                        </p>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            six50 exists at the threshold where clarity becomes transformation — helping organizations turn complex data, emerging technology, and operational constraints into trusted, measurable impact.
                        </p>
                    </div>
                </FadeIn>
            </Section>

            {/* The Metaphor: Why 650 */}
            <Section className="bg-slate-50">
                <FadeIn>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-6">Why six50?</h2>
                            <div className="space-y-6 text-slate-600 leading-loose">
                                <p>
                                    <strong>650 Nanometers = Human Perception & Clarity</strong><br />
                                    ~650 nm sits in the red portion of the visible light spectrum, near the upper boundary of what the human eye can clearly perceive. It represents the point where invisible data turns into a signal humans can see, understand, and act on.
                                </p>
                                <p>
                                    <strong>650°C = The Transformation Threshold</strong><br />
                                    In materials science, this temperature range is where structural changes occur and bonds reorganize. It represents the energy required to fundamentally change structure, not just optimize the surface.
                                </p>
                                <p>
                                    <strong>Why six50?</strong><br />
                                    We exist at the intersection of these two concepts: <strong>Clarity and Transformation.</strong> We help organizations see clearly enough to act, and act boldly enough to transform.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px] bg-slate-900 rounded-sm overflow-hidden flex items-center justify-center border border-slate-800">
                            <TransformationVisual />
                            <div className="absolute bottom-4 right-4 text-xs font-mono text-white/50 z-10 flex flex-col items-end gap-1">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    λ ≈ 650nm (Clarity)
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse delay-75" />
                                    T ≈ 650°C (Change)
                                </span>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* How We're Different */}
            <Section>
                <FadeIn>
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How We’re Different</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Clarity over hype", desc: "No buzzwords, no AI theater. Just results.", icon: BarChart3 },
                            { title: "Transformation over experimentation", desc: "Built for production, not just proofs of concept.", icon: Zap },
                            { title: "Human-centered AI", desc: "Judgment, controls, and trust embedded in every system.", icon: Users },
                            { title: "Enterprise-grade execution", desc: "Designed for real businesses with real constraints.", icon: ShieldCheck },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all rounded-sm">
                                <item.icon className="w-8 h-8 text-gold-500 flex-shrink-0" />

                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </Section>

            {/* Philosophy & Partners */}
            <Section dark className="text-center">
                <FadeIn>
                    <h2 className="text-white text-3xl font-bold mb-12">Our Philosophy</h2>
                    <p className="text-slate-300 text-lg mb-8">AI is only valuable when it is:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {["Understandable", "Trusted", "Governed", "Executable"].map((val) => (
                            <div key={val} className="p-4 border border-slate-700 rounded-sm text-white font-medium hover:border-gold-500 hover:text-gold-500 transition-colors cursor-default">
                                {val}
                            </div>
                        ))}
                    </div>

                    <div className="max-w-2xl mx-auto border-t border-slate-800 pt-16">
                        <h3 className="text-slate-400 text-sm uppercase tracking-widest mb-6">Who We Work With</h3>
                        <ul className="text-slate-300 space-y-3">
                            <li>Financial services and regulated industries</li>
                            <li>Healthcare and operations-driven organizations</li>
                            <li>Mid-market and enterprise teams modernizing legacy systems</li>
                        </ul>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
