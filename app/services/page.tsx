import { Reveal } from "@/components/ui/Reveal";
import { LedgerHead } from "@/components/ui/LedgerHead";
import { Magnetic } from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowRight, CheckCircle2, LayoutTemplate, Workflow, Bot, Users, LineChart } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ServiceSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI & Automation Services",
  description: "Custom workflow automation, AI integration, operational dashboards, and process design for founder-led and PE-backed businesses. Built for production, not just proofs of concept.",
  alternates: { canonical: "https://six50.io/services" },
  openGraph: {
    title: "AI & Automation Services | six50",
    description: "We design and build systems that eliminate manual work: AI agents, automated dashboards, CRM implementation, and workflow automation.",
    url: "https://six50.io/services",
  },
};

const services = [
  {
    icon: LayoutTemplate,
    title: "Digital Product Strategy & Development",
    desc: "Turn ideas into working digital assets. We design and build tailored digital solutions aligned to your business goals.",
    items: ["Web design & development", "App prototypes & mockups", "Client portals & dashboards"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation & Process Engineering",
    desc: "Eliminate manual work. Reduce friction. Increase control. We analyze your current processes and redesign them using automation.",
    items: ["Workflow mapping", "CRM implementation", "Automated lead intake"],
  },
  {
    icon: Bot,
    title: "AI Strategy & Use Case Implementation",
    desc: "Move beyond hype. We help businesses identify and deploy AI where it actually adds value.",
    items: ["AI-powered reporting", "Chatbots & call agents", "Document summarization"],
  },
  {
    icon: Users,
    title: "Digital Tool Adoption & Team Enablement",
    desc: "Technology only works if people use it. We don't just build systems — we ensure adoption.",
    items: ["Tool selection", "Training workshops", "SOP documentation"],
  },
  {
    icon: LineChart,
    title: "Practical Tech Strategy",
    desc: "We help you figure out exactly which AI tools and systems make sense for your business — so you don't waste money on hype. We build a clear roadmap to safely deploy technology that drives growth.",
    items: ["Tech stack planning", "Data security & privacy", "Custom rollout roadmaps"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <ServiceSchema name="AI & Automation Implementation" description="Custom workflow automation, AI integration, and operational dashboards for growing businesses." url="https://six50.io/services" />
      <div className="flex flex-col pt-20">
        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-20 md:px-12 md:pt-28">
          <Reveal>
            <p className="mb-7 flex items-center gap-3.5 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-fog">
              <span className="inline-block h-px w-9 bg-blue-500" />
              Service line · AI &amp; automation
            </p>
          </Reveal>
          <Reveal>
            <h1 className="font-display max-w-[16ch] text-[clamp(2.6rem,6.5vw,5.2rem)]">
              Intelligent <em className="serif-accent text-blue-500">systems.</em>
              <br />
              Built for growing businesses.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-fog">
              We help organizations move past AI experimentation into clarity, confidence, and
              execution — where insight becomes action and systems actually change. Technical
              rigor and strategic thinking for businesses that need automation built for
              production, not proofs of concept.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-[3px] bg-gold-500 px-7 py-4 font-mono text-sm uppercase tracking-[0.05em] text-ink-900 transition-colors hover:bg-gold-400"
                >
                  Schedule a call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        {/* What we offer */}
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <LedgerHead no="001" title="What we offer" tail="Five capabilities · one build team" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.1}>
                <SpotlightCard glow="blue" className="flex h-full flex-col p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-line bg-ink-700 text-blue-500">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mb-4 text-xl">{s.title}</h3>
                  <p className="mb-6 flex-grow leading-relaxed text-fog">{s.desc}</p>
                  <ul className="space-y-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start font-mono text-[0.82rem] text-fog">
                        <CheckCircle2 className="mr-2.5 mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why six50 */}
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <LedgerHead no="002" title="Why six50" tail="Finance × intelligence" />
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display max-w-[16ch] text-[clamp(2rem,4.5vw,3.2rem)]">
                  Built by people who understand the{" "}
                  <em className="serif-accent text-gold-500">numbers.</em>
                </h2>
              </Reveal>
              <Reveal>
                <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-fog">
                  Our team sits at the rare intersection of deep financial expertise and
                  cutting-edge technology deployment. We don&apos;t build technology for the sake
                  of it — we build systems that drive real business outcomes, backed by the
                  rigor of enterprise-grade control frameworks.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <div className="rounded-md border border-line-strong bg-ink-800 p-8">
                <h3 className="font-display mb-4 flex items-center text-xl">
                  <CheckCircle2 className="mr-3 h-6 w-6 text-gold-500" /> A note on pricing
                </h3>
                <p className="leading-relaxed text-fog">
                  Engagements are structured as monthly retainers or fixed-scope projects
                  depending on your needs.
                  <br />
                  <br />
                  We work with a small number of clients at a time intentionally — so if
                  you&apos;re working with us, you have our full attention.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-32 pt-12 text-center md:px-12">
          <Reveal>
            <h2 className="font-display mx-auto mb-6 max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">
              Let&apos;s talk about your <em className="serif-accent text-blue-500">systems.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mb-10 max-w-[52ch] text-lg leading-relaxed text-fog">
              Book a free 30-minute call to walk through where you are and what you actually
              need. No pitch, no pressure — just a straight conversation.
            </p>
          </Reveal>
          <Reveal>
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-[3px] bg-gold-500 px-8 py-4 font-mono text-sm uppercase tracking-[0.05em] text-ink-900 transition-colors hover:bg-gold-400"
              >
                Schedule a call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </Reveal>
        </section>
      </div>
    </>
  );
}
