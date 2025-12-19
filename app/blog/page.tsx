import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogIndexPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Insights
                        </h1>
                        <p className="text-xl text-slate-600 mb-16 max-w-2xl">
                            Thoughts on strategy, efficiency, and the practical application of AI in the enterprise.
                        </p>

                        <div className="grid gap-8">
                            {/* Blog Post Card */}
                            <Link href="/blog/automating-invoicing-mistakes" className="group block">
                                <article className="border border-slate-200 rounded-sm p-8 hover:shadow-md transition-all bg-white">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <div className="text-xs font-semibold tracking-wider text-gold-500 uppercase mb-2">
                                                Operations & Finance
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-gold-600 transition-colors">
                                                2 Cents from six50: The $3,200/Month Mistake Hiding in Manual Invoicing
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed max-w-2xl mb-4">
                                                Businesses lose $2,500–$4,000 per month not because customers won’t pay — but because invoices are sent late. Fixing this takes less than 7 days.
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center text-sm font-medium text-slate-500 group-hover:text-gold-600 transition-colors">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>

                            {/* Why AI Projects Fail */}
                            <Link href="/blog/why-ai-projects-fail" className="group block">
                                <article className="border border-slate-200 rounded-sm p-8 hover:shadow-md transition-all bg-white">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <div className="text-xs font-semibold tracking-wider text-gold-500 uppercase mb-2">
                                                Strategy & AI
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-gold-600 transition-colors">
                                                2 Cents from six50: Why 70% of “AI Projects” Never Pay Off
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed max-w-2xl mb-4">
                                                Most AI initiatives fail because they automate activity, not outcomes. Projects tied to a measurable metric are 3× more likely to deliver ROI within 90 days.
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center text-sm font-medium text-slate-500 group-hover:text-gold-600 transition-colors">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>

                            {/* Automation Saves 12 Hours */}
                            <Link href="/blog/automation-saves-12-hours" className="group block">
                                <article className="border border-slate-200 rounded-sm p-8 hover:shadow-md transition-all bg-white">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <div className="text-xs font-semibold tracking-wider text-gold-500 uppercase mb-2">
                                                Operations & Efficiency
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-gold-600 transition-colors">
                                                2 Cents from six50: One Automation That Saves 12 Hours a Week
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed max-w-2xl mb-4">
                                                Automating internal approvals (quotes, discounts, invoices, POs) saves 8–15 hours/week and reduces delays by 30–50% — with minimal tech changes.
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center text-sm font-medium text-slate-500 group-hover:text-gold-600 transition-colors">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>

                            {/* 3 Tool Rule */}
                            <Link href="/blog/3-tool-rule-automation" className="group block">
                                <article className="border border-slate-200 rounded-sm p-8 hover:shadow-md transition-all bg-white">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <div className="text-xs font-semibold tracking-wider text-gold-500 uppercase mb-2">
                                                Automation Strategy
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-gold-600 transition-colors">
                                                2 Cents from six50: The 3-Tool Rule That Keeps Automation from Failing
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed max-w-2xl mb-4">
                                                Automation stacks with more than 3 core tools see adoption drop by 40%. Fewer tools = higher usage, lower failure rates.
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center text-sm font-medium text-slate-500 group-hover:text-gold-600 transition-colors">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>

                            {/* Faster Not Better */}
                            <Link href="/blog/faster-automation-not-better" className="group block">
                                <article className="border border-slate-200 rounded-sm p-8 hover:shadow-md transition-all bg-white">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <div className="text-xs font-semibold tracking-wider text-gold-500 uppercase mb-2">
                                                Process Optimization
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-gold-600 transition-colors">
                                                2 Cents from six50: Why Faster Automation Isn’t Always Better
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed max-w-2xl mb-4">
                                                Automating a broken process can make things worse. Teams that stabilize workflows first see 2× faster ROI and fewer rework cycles.
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center text-sm font-medium text-slate-500 group-hover:text-gold-600 transition-colors">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>

                            {/* Placeholder for future posts */}
                            {/* 
                            <article className="border border-slate-100 rounded-sm p-8 bg-slate-50 text-slate-400 text-center">
                                <p>More insights coming soon.</p>
                            </article> 
                            */}
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
