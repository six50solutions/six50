import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { ArrowRight, Bot, Cpu, ShieldCheck, Calculator, CheckCircle2, LayoutTemplate, LineChart, Users, Workflow } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn duration={1.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 mb-8 max-w-5xl">
              We Help Growing Businesses <br />
              <span className="text-gold-500">Run Smarter.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} duration={1}>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
              Six50 combines financial expertise and AI-driven automation to give founder-led and PE-backed businesses the clarity, efficiency, and strategic edge that used to be reserved for companies ten times your size.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} duration={1}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Book a Free 30-Minute Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Threshold Moment 1 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

      {/* The Problem We Solve Section */}
      <Section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-800 mb-6">
              The <span className="text-gold-500">Problem</span> We Solve
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Most growing businesses are stuck in the same place. The finances are a mess or a mystery. The team is buried in manual work. And the tools that could help feel out of reach - too complex, too expensive, or too disconnected from how the business actually runs.
            </p>
            <p className="text-2xl font-semibold text-slate-800">
              We fix all three.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* What We Do Section */}
      <Section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-800 mb-6">
                What We Do
              </h2>
              <p className="text-slate-600 text-xl font-medium">
                Two core offerings. One firm. Built to work together.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Offering 1 */}
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Financial Leadership & Accounting</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Clean books, real reporting, and CFO-level thinking - without the full-time hire. We bring Big Four rigor to businesses that need financial clarity and someone who can actually own the numbers.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Fractional CFO
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Accounting & Controller Services
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Financial Readiness
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Transaction Support
                  </div>
                </div>
                <Link href="/accounting">
                  <Button variant="outline" className="w-full">Explore Financial Services</Button>
                </Link>
              </div>
            </FadeIn>

            {/* Offering 2 */}
            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">AI & Automation Implementation</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  We design and build the systems that eliminate your manual work - custom dashboards, workflow automation, and AI-powered tools tailored to how your business actually operates.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Workflow Automation
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Custom Reporting & Dashboards
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> AI Integration
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gold-500" /> Process Design
                  </div>
                </div>
                <Link href="/services">
                  <Button variant="outline" className="w-full">Explore AI Services</Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Social Proof Stats Bar */}
      <Section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700">
              <div className="py-4 md:py-0 px-4">
                <p className="text-xl md:text-2xl font-bold">15+ years of Big Four experience</p>
              </div>
              <div className="py-4 md:py-0 px-4">
                <p className="text-xl md:text-2xl font-bold">Serving $2M–$50M businesses</p>
              </div>
              <div className="py-4 md:py-0 px-4">
                <p className="text-xl md:text-2xl font-bold">Fractional CFO + AI - under one roof</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Why It Works Better Together */}
      <Section dark className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                  Why It Works Better Together
                </h2>
                <div className="w-12 h-1 bg-gold-500 mb-8" />
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Most businesses hire a bookkeeper and a separate tech consultant and end up with two people who don't talk to each other.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  We sit at the <span className="text-white font-semibold">intersection of finance and technology</span> - which means when we automate your reporting or build your dashboard, we understand what the numbers mean and what decisions they need to drive. That's a different kind of result.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <ShieldCheck className="w-8 h-8 text-gold-500 shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-lg">Financial Rigor</h4>
                      <p className="text-slate-400 text-sm">We ensure accuracy and integrity in your automated processes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Cpu className="w-8 h-8 text-gold-500 shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-lg">Intelligent Systems</h4>
                      <p className="text-slate-400 text-sm">We build technology that supports solid business outcomes.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gold-500/10 rounded-3xl blur-2xl" />
                <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-6">Who We Work With</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                    We work with a small number of clients at a time - typically founder-led or private equity-backed businesses between $2M and $50M in revenue that are serious about getting their operations and finances under control.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    If you're at an inflection point - growing fast, preparing for a transaction, or just tired of not having visibility into your own business - we should talk.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "$2M–$50M in revenue",
                      "Founder-led or PE-backed businesses",
                      "Experiencing rapid growth or complexity",
                      "Preparing for a transaction or fundraise"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-gold-500 mr-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Packaging Section */}
      <Section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-800 mb-6">
                Structured Offerings
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Simple, transparent engagement models designed for impact.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-gold-500 transition-colors h-full flex flex-col">
                <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-600">Entry Offer</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Digital Clarity Assessment</h3>
                <p className="text-slate-600 mb-8 text-sm h-12">
                  A comprehensive review of your current tech stack, workflows, and AI opportunities.
                </p>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> Process mapping
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> Workflow analysis
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> AI opportunity assessment
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> 30-day roadmap
                  </div>
                </div>
                <Button className="w-full" variant="outline" href="/contact">Learn More</Button>
              </div>
            </FadeIn>

            {/* Package 2 */}
            <FadeIn delay={0.2}>
              <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
                </div>
                <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">Implementation</div>
                <h3 className="text-2xl font-bold text-white mb-4">Automation & AI Build</h3>
                <p className="text-slate-300 mb-8 text-sm h-12">
                  Project-based execution to deploy specific systems and workflows.
                </p>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-gold-500" /> CRM implementation
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-gold-500" /> Dashboard build
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-gold-500" /> AI chatbot rollout
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-gold-500" /> Workflow automation
                  </div>
                </div>
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-white border-transparent" href="/contact">Get Started</Button>
              </div>
            </FadeIn>

            {/* Package 3 */}
            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-gold-500 transition-colors h-full flex flex-col">
                <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-600">Recurring</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Ongoing Advisor</h3>
                <p className="text-slate-600 mb-8 text-sm h-12">
                  Continuous optimization and strategic support to ensure long-term success.
                </p>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> Continuous optimization
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> KPI monitoring
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> New AI integrations
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" /> Strategic advisory
                  </div>
                </div>
                <Button className="w-full" variant="outline" href="/contact">Contact Us</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <div className="py-24 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Ready to see what's actually possible?</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
              In 30 minutes, we'll tell you exactly where your biggest financial and operational gaps are and what it would take to fix them. <br /><br />
              No pitch. No fluff. Just clarity.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white border-transparent">
                Book a Free 30-Minute Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
