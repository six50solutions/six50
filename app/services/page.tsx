import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { ArrowRight, Eye, Layers, Zap } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-8 tracking-tight">What We Do</h1>
                    <div className="w-24 h-1 bg-gold-500 mb-12" />
                    <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                        We help organizations move past AI experimentation into clarity, confidence, and execution — where insight becomes action and systems actually change.
                    </p>
                </FadeIn>
            </Section>

            {/* Pillar 1: Clarity */}
            <Section className="bg-slate-50 border-y border-slate-200">
                <FadeIn>
                    <div className="md:flex gap-12">
                        <div className="md:w-1/3 mb-8 md:mb-0">
                            <div className="w-12 h-12 bg-white rounded-sm shadow-sm flex items-center justify-center mb-6 text-gold-500">
                                <Eye size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">Clarity</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We cut through noise to identify what truly matters. Before transformation can begin, you must see the landscape clearly.
                            </p>
                        </div>
                        <div className="md:w-2/3 grid gap-6">
                            {[
                                "AI opportunity and readiness assessments",
                                "Signal vs. noise analysis across data and processes",
                                "Risk, control, and governance alignment"
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-gold-500">
                                    <h3 className="font-semibold text-slate-800">{item}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* Pillar 2: Threshold Design */}
            <Section>
                <FadeIn>
                    <div className="md:flex gap-12">
                        <div className="md:w-1/3 mb-8 md:mb-0">
                            <div className="w-12 h-12 bg-slate-100 rounded-sm shadow-sm flex items-center justify-center mb-6 text-slate-800">
                                <Layers size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">Threshold Design</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We design systems that are ready to change. Building the architecture that allows you to cross the threshold responsibly.
                            </p>
                        </div>
                        <div className="md:w-2/3 grid gap-6">
                            {[
                                "AI operating models and workflow design",
                                "Human-in-the-loop and control frameworks",
                                "Tool selection, integration, and architecture"
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-sm border-l-4 border-slate-400">
                                    <h3 className="font-semibold text-slate-800">{item}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* Pillar 3: Transformation */}
            <Section className="bg-slate-900 text-white">
                <FadeIn>
                    <div className="md:flex gap-12">
                        <div className="md:w-1/3 mb-8 md:mb-0">
                            <div className="w-12 h-12 bg-slate-800 rounded-sm shadow-sm flex items-center justify-center mb-6 text-gold-500">
                                <Zap size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Transformation</h2>
                            <p className="text-slate-400 leading-relaxed">
                                We turn insight into operational reality. Executing on the vision with precision and measurable impact.
                            </p>
                        </div>
                        <div className="md:w-2/3 grid gap-6">
                            {[
                                "Automation and intelligent agent deployment",
                                "Embedded AI in core business processes",
                                "Measurable rollout, adoption, and optimization"
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-800 p-6 rounded-sm border-l-4 border-gold-500">
                                    <h3 className="font-semibold text-white">{item}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </Section>

            <Section>
                <FadeIn>
                    <div className="bg-gold-500/10 p-12 rounded-sm text-center">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Ready to cross the threshold?</h2>
                        <span className="inline-flex items-center text-slate-600 font-medium hover:text-gold-500 transition-colors cursor-pointer group">
                            Start a conversation <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
