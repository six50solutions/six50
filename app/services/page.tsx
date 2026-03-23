import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, LayoutTemplate, Workflow, Bot, Users, LineChart } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="pt-20 flex flex-col">
            {/* Hero Section */}
            <Section className="bg-slate-50 border-b border-slate-200">
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
                            Intelligent <span className="text-gold-500">Systems.</span><br />
                            Built for Growing Businesses.
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            We design and build tailored digital solutions aligned to your business goals.
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
                                We help organizations move past AI experimentation into clarity, confidence, and execution - where insight becomes action and systems actually change.
                            </p>
                            <p>
                                Six50 brings technical rigor and strategic thinking to businesses that need robust AI and workflow automation implementations — helping you scale efficiently.
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <FadeIn delay={0.1}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <LayoutTemplate className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Digital Product Strategy & Development</h3>
                                <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
                                    Turn ideas into working digital assets. We design and build tailored digital solutions aligned to your business goals.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Web design & development</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> App prototypes & mockups</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Client portals & dashboards</li>
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Service 2 */}
                        <FadeIn delay={0.2}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <Workflow className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Workflow Automation & Process Engineering</h3>
                                <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
                                    Eliminate manual work. Reduce friction. Increase control. We analyze your current processes and redesign them using automation.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Workflow mapping</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> CRM implementation</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Automated lead intake</li>
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Service 3 */}
                        <FadeIn delay={0.3}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">AI Strategy & Use Case Implementation</h3>
                                <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
                                    Move beyond hype. We help businesses identify and deploy AI where it actually adds value.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> AI-powered reporting</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Chatbots & call agents</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Document summarization</li>
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Service 4 */}
                        <FadeIn delay={0.4}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Digital Tool Adoption & Team Enablement</h3>
                                <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
                                    Technology only works if people use it. We don't just build systems - we ensure adoption.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Tool selection</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Training workshops</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> SOP documentation</li>
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Service 5 */}
                        <FadeIn delay={0.5}>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-gold-500">
                                    <LineChart className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Practical Tech Strategy</h3>
                                <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
                                    We help you figure out exactly which AI tools and systems make sense for your business - so you don't waste money on hype. We build a clear roadmap to safely deploy technology that drives growth.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Tech stack planning</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Data security & privacy</li>
                                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Custom rollout roadmaps</li>
                                </ul>
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
                                    Our team sits at the rare intersection of deep financial expertise and cutting-edge technology deployment.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    We don't build technology for the sake of it. We build systems that drive real business outcomes, backed by the rigor of enterprise-grade control frameworks, to businesses that are ready to scale securely.
                                </p>
                            </div>
                            <div className="md:w-1/2 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                                    <CheckCircle2 className="w-6 h-6 mr-3 text-gold-500" /> A note on pricing
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Engagements are structured as monthly retainers or fixed-scope projects depending on your needs. <br /><br />
                                    We work with a small number of clients at a time intentionally - so if you're working with us, you have our full attention.
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
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Let's talk about your systems.</h2>
                        <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                            Book a free 30-minute call to walk through where you are and what you actually need. No pitch, no pressure - just a straight conversation.
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
