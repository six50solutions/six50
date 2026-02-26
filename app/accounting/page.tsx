import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calculator, PieChart, BarChart3, FileCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AccountingServicesPage() {
    return (
        <div className="pt-20 flex flex-col">
            {/* Hero Section */}
            <Section className="bg-slate-50 border-b border-slate-200">
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
                            Financial <span className="text-gold-500">Clarity.</span><br />
                            Built for Growing Businesses.
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            Fractional CFO and accounting services for companies that have outgrown basic bookkeeping but aren't ready for a full-time finance hire.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="group">
                                    Schedule a Call
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* Introduction */}
            <Section className="py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-lg text-slate-700 leading-relaxed space-y-6 text-center">
                            <p>
                                Most growing businesses hit the same wall. The numbers are technically getting recorded, but nobody's really watching them. Decisions get made on gut feel, cash flow surprises you, and the idea of a board meeting or bank conversation feels harder than it should. <strong>That's the gap we fill.</strong>
                            </p>
                            <p>
                                Six50 brings Big Four accounting rigor and C-suite financial thinking to businesses that need real financial leadership — without the cost of a full-time CFO.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* What We Offer */}
            <Section className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto px-6 md:px-12">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                                What We Offer
                            </h2>
                            <div className="w-24 h-1 bg-gold-500 mx-auto" />
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Service 1 */}
                        <FadeIn delay={0.1}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Fractional CFO Services</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Strategic financial leadership on a part-time, retainer basis. We sit alongside your leadership team to manage cash flow, build forecasts, prepare for fundraising or financing, oversee your accounting function, and make sure your numbers are actually telling you something useful.
                                </p>
                                <p className="text-sm text-slate-400 mt-4 font-medium">Ideal for companies between $2M and $50M in revenue navigating growth, investment, or operational complexity.</p>
                            </div>
                        </FadeIn>

                        {/* Service 2 */}
                        <FadeIn delay={0.2}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <PieChart className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Accounting & Controller Services</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Clean, accurate, and timely books managed by a CPA with deep operational experience. We go beyond data entry — we own your month-end close, reconciliations, financial reporting, and compliance so you always know where you stand.
                                </p>
                                <p className="text-sm text-slate-400 mt-4 font-medium">Whether you need to clean up years of messy books or build a proper accounting function from scratch, we've done it before.</p>
                            </div>
                        </FadeIn>

                        {/* Service 3 */}
                        <FadeIn delay={0.3}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Financial Reporting & Dashboard Buildout</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Most business owners are working off spreadsheets that take hours to update and still don't give them a clear picture. We design and build reporting systems — connected, automated, and tailored to the metrics that actually matter for your business — so you have real-time visibility without the manual work.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Service 4 */}
                        <FadeIn delay={0.4}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <FileCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Financial Readiness & Transaction Support</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Preparing for a fundraise, acquisition, or bank financing? We get your financials in shape, documentation organized, and your story told clearly. Having a former Big Four professional in your corner during a transaction or due diligence process is the kind of advantage most small businesses don't think to get until it's too late.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </Section>

            {/* Why Six50 */}
            <Section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <FadeIn>
                        <div className="md:flex gap-16 items-center">
                            <div className="md:w-1/2 mb-10 md:mb-0">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-800 mb-6">
                                    Why Six50
                                </h2>
                                <div className="w-12 h-1 bg-gold-500 mb-8" />
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    Our founder spent 15 years at a Big Four firm advising some of the largest organizations in the world.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    The financial discipline, reporting standards, and strategic thinking that come with that experience don't have to be reserved for enterprise companies. We built Six50 to bring that same level of rigor to businesses that need it most — and can actually feel the impact of it.
                                </p>
                            </div>
                            <div className="md:w-1/2 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                                    <CheckCircle2 className="w-6 h-6 mr-3 text-gold-500" /> A note on pricing
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Engagements are structured as monthly retainers or fixed-scope projects depending on your needs. <br /><br />
                                    We work with a small number of clients at a time intentionally — so if you're working with us, you have our full attention.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* CTA */}
            <Section className="py-24 border-t border-slate-200 bg-slate-50">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Let's talk about your numbers.</h2>
                        <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                            Book a free 30-minute call to walk through where you are and what you actually need. No pitch, no pressure — just a straight conversation.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white border-transparent">
                                Schedule a Call
                            </Button>
                        </Link>
                    </FadeIn>
                </div>
            </Section>
        </div>
    );
}
