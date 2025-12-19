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
                                    In science, approximately <strong>650 nanometers</strong> marks the edge of human vision — the point where information becomes visible and interpretable.
                                </p>
                                <p>
                                    In complex systems, <strong>thresholds</strong> are where incremental improvement turns into fundamental change.
                                </p>
                                <p>
                                    six50 lives at that intersection. We help organizations move past AI experimentation into clarity, confidence, and execution.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px] bg-slate-900 rounded-sm overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF3333] to-transparent shadow-[0_0_15px_rgba(255,51,51,0.8)]" />
                            <p className="absolute bottom-4 right-4 text-xs text-white/50 font-mono">λ ≈ 650nm</p>
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
