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
                                <span className="text-gold-500">Strategy & AI</span>
                                <span>•</span>
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 3 min read</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                2 Cents from six50: Why 70% of “AI Projects” Never Pay Off
                            </h1>
                        </header>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h3 className="font-bold text-slate-900">TL;DR</h3>
                            <p className="bg-slate-50 p-6 border-l-4 border-gold-500 text-slate-700 italic rounded-r-sm">
                                Most AI initiatives fail because they automate activity, not outcomes. Projects tied to a measurable metric (hours, dollars, or error rate) are 3× more likely to deliver ROI within 90 days.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Take</h3>
                            <p>
                                AI isn’t failing businesses.<br />
                                <strong>Bad project selection is.</strong>
                            </p>
                            <p>
                                Too many teams start with:<br />
                                “What can AI do for us?”
                            </p>
                            <p>
                                Instead of:<br />
                                “Where are we losing time or money today?”
                            </p>
                            <p>
                                When AI is treated like a feature instead of a fix, it becomes shelfware.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Numbers</h3>
                            <p>What we see most often:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li><strong>70%</strong> of AI pilots stall after the proof-of-concept</li>
                                <li><strong>2–3</strong> tools added with no owner or success metric</li>
                                <li><strong>0</strong> defined ROI beyond “efficiency”</li>
                                <li><strong>90+ days</strong> before leadership questions the investment</li>
                            </ul>
                            <p className="mt-6">
                                AI doesn’t fail fast. It fails quietly.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">What This Means for Operators</h3>
                            <p>If you can’t answer:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>What gets better?</li>
                                <li>By how much?</li>
                                <li>By when?</li>
                            </ul>
                            <p className="mt-6">
                                …then the project is already at risk.
                            </p>
                            <p>
                                The best AI wins start small, focused, and boring.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">Our 2 Cents</h3>
                            <p>Before approving any AI initiative:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Tie it to one business metric</li>
                                <li>Define success in 30, 60, or 90 days</li>
                                <li>Assign a single owner</li>
                            </ul>
                            <p className="mt-6">
                                No metric = no momentum.
                            </p>

                            <div className="bg-slate-900 text-white p-8 rounded-sm mt-16 text-center">
                                <h4 className="text-xl font-bold text-gold-500 mb-4">Want help picking the right AI use case?</h4>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    six50 helps businesses identify automations that actually pay off — fast.
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
