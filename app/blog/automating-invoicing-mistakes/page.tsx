import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

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
                                <span className="text-gold-500">Operations & Finance</span>
                                <span>•</span>
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 4 min read</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                2 Cents from six50: The $3,200/Month Mistake Hiding in Manual Invoicing
                            </h1>
                        </header>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h3 className="font-bold text-slate-900">TL;DR</h3>
                            <p className="bg-slate-50 p-6 border-l-4 border-gold-500 text-slate-700 italic rounded-r-sm">
                                Businesses lose $2,500–$4,000 per month not because customers won’t pay — but because invoices are sent late, followed up inconsistently, or not tracked at all. Fixing this usually takes &lt; 7 days and pays for itself within 30 days.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Take</h3>
                            <p>
                                Manual invoicing feels harmless.<br />
                                <strong>It isn’t.</strong>
                            </p>
                            <p>
                                Most small and mid-sized businesses don’t have a revenue problem — they have a timing problem. Invoices go out late. Follow-ups are manual. Payments sit in inboxes waiting for someone to remember to nudge the customer.
                            </p>
                            <p>
                                That delay quietly strangles cash flow.
                            </p>
                            <p>
                                And the worst part?<br />
                                The fix is boring, cheap, and wildly effective — which is why it’s usually ignored.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">The Numbers</h3>
                            <p>Here’s what we typically see during a six50 process review:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li><strong>7–12 days</strong> average delay between work completion and invoice sent</li>
                                <li><strong>25–40%</strong> of invoices paid late due to missing reminders</li>
                                <li><strong>$2,500–$4,000/month</strong> trapped in receivables for $1–10M businesses</li>
                                <li><strong>5–8 hours/week</strong> spent checking, chasing, and reconciling payments</li>
                            </ul>
                            <p className="mt-6">
                                None of this is a customer issue.<br />
                                It’s a systems issue.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">What This Means for Operators</h3>
                            <p>
                                Cash flow volatility isn’t solved by more sales — it’s solved by predictability.
                            </p>
                            <p>When invoicing and follow-ups are automated:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Payments arrive faster</li>
                                <li>Forecasting becomes reliable</li>
                                <li>Owners stop acting as collections agents</li>
                            </ul>
                            <p className="mt-6">
                                And no — this does not require a full ERP, AI overhaul, or new finance team.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">Our 2 Cents (What to Do Instead)</h3>
                            <p>Start here:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Trigger invoices automatically when work is marked complete</li>
                                <li>Schedule follow-ups at Day 3, 7, and 14 — no human involvement</li>
                                <li>Track one metric: average days to payment</li>
                            </ul>
                            <p className="mt-6">
                                If you reduce payment time by even 5 days, most businesses feel it immediately.
                            </p>

                            <h3 className="font-bold text-slate-900 mt-12 mb-4">One Real Example</h3>
                            <p>A services business with ~$90K/month in revenue:</p>
                            <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
                                <li>Cut invoice send time from 10 days → <strong>same day</strong></li>
                                <li>Reduced late payments by <strong>32%</strong></li>
                                <li>Improved cash position by <strong>$38K</strong> in the first quarter</li>
                            </ul>
                            <p className="mt-6 font-medium text-slate-900">
                                No new customers.<br />
                                No new hires.<br />
                                Just fewer gaps.
                            </p>

                            <div className="bg-slate-900 text-white p-8 rounded-sm mt-16 text-center">
                                <h4 className="text-xl font-bold text-gold-500 mb-4">Curious what this looks like for your business?</h4>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    six50 offers a free 30-minute AI & process review to identify where cash, time, or effort is leaking — and what to automate first.
                                </p>
                                <Button href="/contact" variant="white">
                                    Book your review here
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
