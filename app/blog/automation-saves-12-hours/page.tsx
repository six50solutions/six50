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
                                <span className="text-gold-500">Operations & Efficiency</span>
                                <span>•</span>
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 3 min read</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                2 Cents from six50: One Automation That Saves 12 Hours a Week
                            </h1>
                        </header>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h3 className="font-bold text-slate-900">TL;DR</h3>
                            <p className="bg-slate-50 p-6 border-l-4 border-gold-500 text-slate-700 italic rounded-r-sm">
                                Automating internal approvals (quotes, discounts, invoices, POs) saves 8–15 hours/week and reduces delays by 30–50% — with minimal tech changes.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Take</h3>
                            <p>
                                Approvals are invisible time sinks.
                            </p>
                            <p>
                                Every “Can you take a look at this?” email adds friction, delay, and frustration — especially when approvals live in inboxes or Slack threads.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Numbers</h3>
                            <p>Across multiple clients:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li><strong>8–15 hours/week</strong> lost waiting on approvals</li>
                                <li><strong>30–50%</strong> delay in deal or invoice cycles</li>
                                <li><strong>3–5</strong> people involved per approval</li>
                                <li><strong>0</strong> audit trail when questions arise</li>
                            </ul>
                            <p className="mt-6">
                                This is low-hanging fruit.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">What This Means for Operators</h3>
                            <p>Faster approvals mean:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Faster revenue recognition</li>
                                <li>Fewer internal bottlenecks</li>
                                <li>Less context switching for leaders</li>
                            </ul>
                            <p className="mt-6">
                                And no — this doesn’t require complex workflow software.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">Our 2 Cents</h3>
                            <p>Start simple:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Define approval thresholds</li>
                                <li>Route decisions automatically</li>
                                <li>Capture a timestamped decision trail</li>
                            </ul>
                            <p className="mt-6">
                                If approvals aren’t tracked, they’re broken.
                            </p>

                            <div className="bg-slate-900 text-white p-8 rounded-sm mt-16 text-center">
                                <h4 className="text-xl font-bold text-gold-500 mb-4">Not sure where approvals are slowing you down?</h4>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    six50 maps approval flows and automates the worst offenders.
                                </p>
                                <Button href="/contact" variant="white">
                                    Book a free process review
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
