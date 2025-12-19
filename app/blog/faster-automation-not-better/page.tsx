import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default function BlogPost() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-3xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                        </Link>

                        <header className="mb-12">
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                                <span className="text-gold-500">Process Optimization</span>
                                <span>•</span>
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 3 min read</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                2 Cents from six50: Why Faster Automation Isn’t Always Better
                            </h1>
                        </header>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h3 className="font-bold text-slate-900">TL;DR</h3>
                            <p className="bg-slate-50 p-6 border-l-4 border-gold-500 text-slate-700 italic rounded-r-sm">
                                Automating a broken process can make things worse. Teams that stabilize workflows first see 2× faster ROI and fewer rework cycles.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Take</h3>
                            <p>
                                Speed amplifies structure.
                            </p>
                            <p>
                                If a process is unclear, inconsistent, or undocumented, automation doesn’t fix it — <strong>it hardens it.</strong>
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Numbers</h3>
                            <p>What happens when teams rush:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li><strong>2×</strong> rework in automated flows</li>
                                <li><strong>20–30%</strong> increase in exception handling</li>
                                <li>Delayed ROI beyond <strong>6 months</strong></li>
                                <li>Frustrated users who bypass the system</li>
                            </ul>
                            <p className="mt-6">
                                Automation should follow clarity.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">What This Means for Operators</h3>
                            <p>The fastest wins come from:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Clear handoffs</li>
                                <li>Defined inputs and outputs</li>
                                <li>Agreed-upon rules</li>
                            </ul>
                            <p className="mt-6">
                                AI works best on stable ground.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">Our 2 Cents</h3>
                            <p>Before automating:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Document the process in plain language</li>
                                <li>Fix obvious gaps</li>
                                <li>Automate the decision, not the chaos</li>
                            </ul>
                            <p className="mt-6">
                                Slow down once to speed up forever.
                            </p>

                            <div className="bg-slate-900 text-white p-8 rounded-sm mt-16 text-center">
                                <h4 className="text-xl font-bold text-gold-500 mb-4">Not sure if your process is automation-ready?</h4>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    six50 helps businesses stabilize before they automate.
                                </p>
                                <Button href="/contact" variant="white">
                                    Book a free AI & process review
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
