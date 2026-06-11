import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { LocalBusinessSchema } from "@/components/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { LedgerHead } from "@/components/ui/LedgerHead";
import { Reveal } from "@/components/ui/Reveal";
import { Strike } from "@/components/ui/Strike";
import { Counter } from "@/components/ui/Counter";
import { Venn } from "@/components/ui/Venn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { Checklist } from "@/components/home/Checklist";

export const metadata: Metadata = {
  title: "Chicago AI Automation & Fractional CFO Consulting",
  description: "six50 combines Big Four financial expertise and AI-driven automation to help founder-led and PE-backed businesses ($2M-$50M) run smarter. Based in Chicago.",
  alternates: { canonical: "https://six50.io" },
  openGraph: {
    title: "six50 | Chicago AI Automation & Fractional CFO Consulting",
    description: "Big Four financial rigor meets AI automation. Fractional CFO, accounting, and AI implementation for growing businesses.",
    url: "https://six50.io",
  },
};

const finServices = ["Fractional CFO", "Accounting & Controller", "Financial Readiness", "Transaction Support"];
const aiServices = ["Workflow Automation", "Reporting & Dashboards", "AI Integration", "Process Design"];

const offers = [
  {
    kind: "Entry offer",
    title: "Digital Clarity Assessment",
    desc: "A comprehensive review of your tech stack, workflows, and AI opportunities.",
    items: ["Process mapping", "Workflow analysis", "AI opportunity assessment", "30-day roadmap"],
    cta: "Learn more",
    popular: false,
  },
  {
    kind: "Implementation",
    title: "Automation & AI Build",
    desc: "Project-based execution to deploy specific systems and workflows.",
    items: ["CRM implementation", "Dashboard build", "AI chatbot rollout", "Workflow automation"],
    cta: "Get started",
    popular: true,
  },
  {
    kind: "Recurring",
    title: "Ongoing Advisor",
    desc: "Continuous optimization and strategic support for long-term success.",
    items: ["Continuous optimization", "KPI monitoring", "New AI integrations", "Strategic advisory"],
    cta: "Contact us",
    popular: false,
  },
];

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <div className="flex flex-col">
        <HomeHero />

        {/* 001 — THE PROBLEM */}
        <section id="problem" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <LedgerHead no="001" title="The problem we solve" tail="DR — what's broken" />
          <Reveal>
            <h2 className="font-display max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">
              Most growing businesses are stuck in the{" "}
              <em className="serif-accent text-gold-500">same place.</em>
            </h2>
          </Reveal>

          <div className="mt-4 flex flex-col">
            {[
              { no: "a.", pre: "The finances are a ", strike: "mess or a mystery", post: ".", fix: "→ clean books, real reporting" },
              { no: "b.", pre: "The team is buried in ", strike: "manual work", post: ".", fix: "→ automated workflows" },
              { no: "c.", pre: "The right tools feel ", strike: "out of reach", post: " — too complex, too expensive, too disconnected.", fix: "→ systems built for you" },
            ].map((p, i) => (
              <Reveal key={p.no}>
                <div className="grid grid-cols-[36px_1fr] items-baseline gap-4 border-b border-line py-8 md:grid-cols-[64px_1fr] md:gap-6">
                  <span className="font-mono text-[0.85rem] text-fog-2">{p.no}</span>
                  <p className="max-w-[34ch] text-[clamp(1.25rem,2.6vw,1.9rem)] leading-snug">
                    {p.pre}
                    <Strike fix={p.fix} index={i}>{p.strike}</Strike>
                    {p.post}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="font-display mt-10 text-[clamp(1.4rem,3vw,2.2rem)]">
              We fix <em className="serif-accent text-gold-500">all three.</em>
            </p>
          </Reveal>
        </section>

        {/* 002 — WHAT WE DO */}
        <section id="services" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <LedgerHead no="002" title="What we do" tail="Two offerings · one firm" />
          <Reveal>
            <h2 className="font-display mb-10 max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">
              Two core offerings. Built to{" "}
              <em className="serif-accent text-gold-500">work together.</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <SpotlightCard glow="gold" className="flex h-full min-h-[430px] flex-col gap-5 p-7 md:p-10">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold-500">
                  Financial leadership
                </span>
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)]">
                  Financial Leadership &amp; Accounting
                </h3>
                <p className="max-w-[46ch] text-fog">
                  Clean books, real reporting, and CFO-level thinking — without the full-time
                  hire. Big Four rigor for businesses that need someone who can actually own
                  the numbers.
                </p>
                <div className="mt-auto flex flex-wrap gap-2.5">
                  {finServices.map((s) => (
                    <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.74rem] text-fog transition-colors hover:border-gold-500 hover:text-gold-500">
                      {s}
                    </span>
                  ))}
                </div>
                <Link href="/accounting" className="group mt-3 inline-flex w-fit items-center gap-2.5 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-paper">
                  Explore financial services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.12}>
              <SpotlightCard glow="blue" className="flex h-full min-h-[430px] flex-col gap-5 p-7 md:p-10">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-blue-500">
                  Intelligent systems
                </span>
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)]">
                  AI &amp; Automation Implementation
                </h3>
                <p className="max-w-[46ch] text-fog">
                  We design and build the systems that eliminate your manual work — custom
                  dashboards, workflow automation, and AI-powered tools tailored to how your
                  business actually operates.
                </p>
                <div className="mt-auto flex flex-wrap gap-2.5">
                  {aiServices.map((s) => (
                    <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.74rem] text-fog transition-colors hover:border-blue-500 hover:text-blue-500">
                      {s}
                    </span>
                  ))}
                </div>
                <Link href="/services" className="group mt-3 inline-flex w-fit items-center gap-2.5 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-paper">
                  Explore AI services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* stats band */}
          <Reveal className="mt-16">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:grid-cols-3">
              <div className="bg-ink-800 px-7 py-8">
                <div className="font-mono text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium tabular-nums">
                  <Counter to={15} /><span className="text-gold-500">+</span> yrs
                </div>
                <div className="mt-1.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-fog-2">
                  Big Four experience
                </div>
              </div>
              <div className="bg-ink-800 px-7 py-8">
                <div className="font-mono text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium tabular-nums">
                  $<Counter to={2} />M–$<Counter to={50} />M
                </div>
                <div className="mt-1.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-fog-2">
                  Client revenue range
                </div>
              </div>
              <div className="bg-ink-800 px-7 py-8">
                <div className="font-mono text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium tabular-nums">
                  <Counter to={2} /> <span className="text-gold-500">×</span> <Counter to={1} />
                </div>
                <div className="mt-1.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-fog-2">
                  Disciplines, one roof
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 003 — WHY TOGETHER */}
        <section id="approach" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <LedgerHead no="003" title="Why it works better together" tail="CR — the intersection" />
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <Reveal>
              <Venn />
            </Reveal>
            <div>
              <Reveal>
                <h2 className="font-display max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">
                  Most firms give you a bookkeeper{" "}
                  <em className="serif-accent text-gold-500">or</em> a tech consultant.
                </h2>
              </Reveal>
              <Reveal>
                <p className="mt-6 max-w-[56ch] text-lg text-fog">
                  They don&apos;t talk to each other. We sit at the intersection — so when we
                  automate your reporting or build your dashboard, we understand what the
                  numbers mean and what decisions they need to drive.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-5">
                <Reveal>
                  <div className="grid grid-cols-[14px_1fr] items-start gap-4">
                    <span className="mt-2 h-[9px] w-[9px] rounded-full bg-gold-500" />
                    <div>
                      <h4 className="font-medium">Financial rigor</h4>
                      <p className="text-sm text-fog">Accuracy and integrity built into every automated process.</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid grid-cols-[14px_1fr] items-start gap-4">
                    <span className="mt-2 h-[9px] w-[9px] rounded-full bg-blue-500" />
                    <div>
                      <h4 className="font-medium">Intelligent systems</h4>
                      <p className="text-sm text-fog">Technology engineered to drive real business outcomes.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 004 — WHO WE WORK WITH */}
        <section id="fit" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <LedgerHead no="004" title="Who we work with" tail="Deliberately few clients" />
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">
                  A small number of clients, taken{" "}
                  <em className="serif-accent text-gold-500">seriously.</em>
                </h2>
              </Reveal>
              <Reveal>
                <p className="mt-6 max-w-[56ch] text-lg text-fog">
                  If you&apos;re at an inflection point — growing fast, preparing for a
                  transaction, or tired of not having visibility into your own business — we
                  should talk.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <Checklist
                items={[
                  "$2M–$50M in revenue",
                  "Founder-led or PE-backed",
                  "Rapid growth or rising complexity",
                  "Preparing for a transaction or fundraise",
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* 005 — ENGAGEMENTS */}
        <section id="engagements" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <LedgerHead no="005" title="Structured offerings" tail="Simple · transparent · built for impact" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.1}>
                <article
                  className={`flex h-full flex-col gap-4 rounded-md border bg-ink-800 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 ${
                    o.popular ? "border-gold-500/45" : "border-line-strong hover:border-paper/30"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fog-2">
                    <span>{o.kind}</span>
                    {o.popular && (
                      <span className="rounded-sm bg-gold-500 px-2 py-1 text-[0.66rem] tracking-[0.12em] text-ink-900">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-[1.35rem]">{o.title}</h3>
                  <p className="text-sm text-fog">{o.desc}</p>
                  <ul className="mb-5 mt-1 grid gap-2.5">
                    {o.items.map((it) => (
                      <li key={it} className="flex items-baseline gap-3 font-mono text-[0.82rem] text-fog">
                        <span className="text-gold-500">→</span> {it}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-auto rounded-[3px] border px-4 py-3.5 text-center font-mono text-[0.8rem] uppercase tracking-[0.08em] transition-colors ${
                      o.popular
                        ? "border-gold-500 bg-gold-500 text-ink-900 hover:bg-gold-400"
                        : "border-line-strong text-paper hover:border-gold-500 hover:bg-gold-100 hover:text-gold-500"
                    }`}
                  >
                    {o.cta}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-32 pt-16 text-center md:px-12">
          <Reveal>
            <h2 className="font-display mx-auto mb-7 max-w-[20ch] text-[clamp(2.2rem,6vw,4.4rem)]">
              Ready to see what&apos;s{" "}
              <em className="serif-accent text-gold-500">actually possible?</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mb-10 max-w-[56ch] text-lg text-fog">
              In 30 minutes, we&apos;ll tell you exactly where your biggest financial and
              operational gaps are — and what it would take to fix them.
            </p>
          </Reveal>
          <Reveal>
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-[3px] bg-gold-500 px-8 py-4 font-mono text-sm uppercase tracking-[0.05em] text-ink-900 transition-colors hover:bg-gold-400"
              >
                Book a free 30-minute call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </Reveal>
          <Reveal>
            <p className="mt-7 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-fog-2">
              No pitch. No fluff. Just clarity.
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
