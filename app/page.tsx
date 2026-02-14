import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { ArrowRight, BarChart3, Bot, CheckCircle2, Cpu, LayoutTemplate, LineChart, ShieldCheck, Users, Workflow } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn duration={1.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 mb-8 max-w-5xl">
              Design. Automate. <br />
              <span className="text-gold-500">Scale.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} duration={1}>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
              six50 helps growing businesses design and implement tailored digital and AI systems that improve efficiency, visibility, and scale. We combine strategy, automation, and intelligent tools to turn manual processes into high-performing digital workflows.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} duration={1}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="group">
                  View Our Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Threshold Moment 1 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

      {/* Services Section */}
      <Section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-16 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-800 mb-6">
                From Idea to <span className="text-gold-500">Intelligent System</span>.
              </h2>
              <p className="text-slate-600 text-lg">
                We design and build tailored digital solutions aligned to your business goals.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <LayoutTemplate className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Digital Product Strategy & Development</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Turn ideas into working digital assets. We design and build tailored digital solutions aligned to your business goals.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-slate-500">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Web design & development</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> App prototypes & mockups</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Client portals & dashboards</li>
                </ul>
              </div>
            </FadeIn>

            {/* Service 2 */}
            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Workflow Automation & Process Engineering</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Eliminate manual work. Reduce friction. Increase control. We analyze your current processes and redesign them using automation.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-slate-500">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Workflow mapping</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> CRM implementation</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Automated lead intake</li>
                </ul>
              </div>
            </FadeIn>

            {/* Service 3 */}
            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">AI Strategy & Use Case Implementation</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Move beyond hype. We help businesses identify and deploy AI where it actually adds value.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-slate-500">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> AI-powered reporting</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Chatbots & call agents</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Document summarization</li>
                </ul>
              </div>
            </FadeIn>

            {/* Service 4 */}
            <FadeIn delay={0.4}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Digital Tool Adoption & Team Enablement</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Technology only works if people use it. We don’t just build systems — we ensure adoption.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-slate-500">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Tool selection</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Training workshops</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> SOP documentation</li>
                </ul>
              </div>
            </FadeIn>

            {/* Service 5 */}
            <FadeIn delay={0.5}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 text-amber-600">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Strategic Advisory</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Leveraging deep risk and transformation background for high-level positioning and governance.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-slate-500">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Digital roadmaps</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Data governance</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gold-500 shrink-0" /> Risk & control frameworks</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Differentiator Section */}
      <Section dark className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                  The Real Differentiator
                </h2>
                <div className="w-12 h-1 bg-gold-500 mb-8" />
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Most AI consultants don't understand controls, financial implications, or governance. <span className="text-white font-semibold">We do.</span>
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <ShieldCheck className="w-8 h-8 text-gold-500 shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-lg">CPA + Risk + Controls Background</h4>
                      <p className="text-slate-400 text-sm">We bring financial lens and operational rigor to every technical implementation.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Cpu className="w-8 h-8 text-gold-500 shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-lg">AI-First Mindset</h4>
                      <p className="text-slate-400 text-sm">Strategic and hands-on builders who know how to deploy real AI use cases.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gold-500/10 rounded-3xl blur-2xl" />
                <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-6">Who We Serve</h3>
                  <ul className="space-y-4">
                    {[
                      "Small to mid-sized businesses ($1M–$50M)",
                      "Founder-led companies",
                      "Professional services firms",
                      "Agencies",
                      "E-commerce operators",
                      "Growing operators feeling operational strain"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-gold-500 mr-3" />
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
      <Section className="py-24">
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
                <Button className="w-full" variant="outline">Learn More</Button>
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
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-white border-transparent">Get Started</Button>
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
                <Button className="w-full" variant="outline">Contact Us</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <div className="py-24 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Ready to transform your business?</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
              If you’re ready to move from experimentation to execution, we’re ready to help.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Let's Talk
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
