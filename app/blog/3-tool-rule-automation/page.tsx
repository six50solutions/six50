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
                                <span className="text-gold-500">Automation Strategy</span>
                                <span>•</span>
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 3 min read</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                2 Cents from six50: The 3-Tool Rule That Keeps Automation from Failing
                            </h1>
                        </header>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h3 className="font-bold text-slate-900">TL;DR</h3>
                            <p className="bg-slate-50 p-6 border-l-4 border-gold-500 text-slate-700 italic rounded-r-sm">
                                Automation stacks with more than 3 core tools see adoption drop by 40%. Fewer tools = higher usage, lower failure rates.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Take</h3>
                            <p>
                                More tools don’t mean more capability.<br />
                                <strong>They mean more confusion.</strong>
                            </p>
                            <p>
                                Automation collapses when people don’t know where to work, check status, or fix errors.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Numbers</h3>
                            <p>Common patterns we see:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li><strong>5–7</strong> tools for one workflow</li>
                                <li><strong>40%</strong> drop in adoption after 60 days</li>
                                <li><strong>2</strong> systems holding conflicting data</li>
                                <li>No clear “system of truth”</li>
                            </ul>
                            <p className="mt-6">
                                Complexity kills automation.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">What This Means for Operators</h3>
                            <p>The best stacks:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Have one primary system</li>
                                <li>Use lightweight automation</li>
                                <li>Avoid overlapping features</li>
                            </ul>
                            <p className="mt-6">
                                Simple systems scale better than clever ones.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">Our 2 Cents</h3>
                            <p>Audit your stack:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Identify your system of record</li>
                                <li>Remove duplicate tools</li>
                                <li>Automate around it, not over it</li>
                            </ul>
                            <p className="mt-6">
                                Less is faster.
                            </p>

                            <div className="bg-slate-900 text-white p-8 rounded-sm mt-16 text-center">
                                <h4 className="text-xl font-bold text-gold-500 mb-4">Want a second set of eyes on your stack?</h4>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    six50 helps simplify automation without ripping and replacing systems.
                                </p>
                                <Button href="/contact" variant="white">
                                    Book a free review
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
