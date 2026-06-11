import { Reveal } from "@/components/ui/Reveal";
import { LedgerHead } from "@/components/ui/LedgerHead";
import { Magnetic } from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowRight, Calculator, PieChart, BarChart3, FileCheck, CheckCircle2, LineChart } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ServiceSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Fractional CFO & Accounting Services",
  description: "Fractional CFO, accounting, controller services, financial readiness, and transaction support for $2M-$50M businesses. Big Four rigor without the full-time hire.",
  alternates: { canonical: "https://six50.io/accounting" },
  openGraph: {
    title: "Fractional CFO & Accounting Services | six50",
    description: "Clean books, real reporting, and CFO-level thinking without the full-time hire. Serving founder-led and PE-backed businesses in Chicago.",
    url: "https://six50.io/accounting",
  },
};

const services = [
  {
    icon: Calculator,
    title: "Fractional CFO Services",
    desc: "Strategic financial leadership on a part-time, retainer basis. We sit alongside your leadership team to manage cash flow, build forecasts, prepare for fundraising or financing, oversee your accounting function, and make sure your numbers are actually telling you something useful.",
    note: "Ideal for companies between $2M and $50M in revenue navigating growth, investment, or operational complexity.",
  },
  {
    icon: PieChart,
    title: "Accounting & Controller Services",
    desc: "Clean, accurate, and timely books managed by a CPA with deep operational experience. We go beyond data entry — we own your month-end close, reconciliations, financial reporting, and compliance so you always know where you stand.",
    note: "Whether you need to clean up years of messy books or build a proper accounting function from scratch, we've done it before.",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting & Dashboard Buildout",
    desc: "Most business owners are working off spreadsheets that take hours to update and still don't give them a clear picture. We design and build reporting systems — connected, automated, and tailored to the metrics that actually matter — so you have real-time visibility without the manual work.",
  },
  {
    icon: FileCheck,
    title: "Financial Readiness & Transaction Support",
    desc: "Preparing for a fundraise, acquisition, or bank financing? We get your financials in shape, documentation organized, and your story told clearly. A former Big Four professional in your corner during diligence is the advantage most small businesses don't think to get until it's too late.",
  },
  {
    icon: LineChart,
    title: "Strategic Financial Guidance",
    desc: "You've built something worth protecting. We provide the financial foresight to help you make major decisions with confidence — whether you need to optimize costs, prepare for a sale, or navigate complex growing pains.",
  },
];

export default function AccountingServicesPage() {
  return (
    <>
      <ServiceSchema name="Fractional CFO & Accounting Services" description="Big Four financial rigor without the full-time hire. Fractional CFO, accounting, and transaction support." url="https://six50.io/accounting" />
      <div className="flex flex-col pt-20">
        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-20 md:px-12 md:pt-28">
          <Reveal>
            <p className="mb-7 flex items-center gap-3.5 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-fog">
              <span className="inline-block h-px w-9 bg-gold-500" />
              Service line · finance &amp; accounting
            </p>
          </Reveal>
          <Reveal>
            <h1 className="font-display max-w-[16ch] text-[clamp(2.6rem,6.5vw,5.2rem)]">
              Financial <em className="serif-accent text-gold-500">clarity.</em>
              <br />
              Built for growing businesses.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-fog">
              Fractional CFO and accounting services for companies that have outgrown basic
              bookkeeping but aren&apos;t ready for a full-time finance hire. Big Four rigor and
              C-suite financial thinking — without the cost of a full-time CFO.
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

        {/* The gap we fill */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
          <Reveal>
            <p className="mx-auto max-w-[62ch] text-center text-lg leading-relaxed text-fog md:text-xl">
              Most growing businesses hit the same wall. The numbers are technically getting
              recorded, but nobody&apos;s really watching them. Decisions get made on gut feel,
              cash flow surprises you, and the idea of a board meeting or bank conversation
              feels harder than it should.{" "}
              <strong className="font-medium text-paper">That&apos;s the gap we fill.</strong>
            </p>
          </Reveal>
        </section>

        {/* What we offer */}
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <LedgerHead no="001" title="What we offer" tail="From clean books to the boardroom" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.1}>
                <SpotlightCard glow="gold" className="flex h-full flex-col p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-line bg-ink-700 text-gold-500">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mb-4 text-xl">{s.title}</h3>
                  <p className="flex-grow leading-relaxed text-fog">{s.desc}</p>
                  {s.note && (
                    <p className="mt-5 border-t border-line pt-4 font-mono text-[0.78rem] leading-relaxed text-fog-2">
                      {s.note}
                    </p>
                  )}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why six50 */}
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <LedgerHead no="002" title="Why six50" tail="Big Four rigor · SMB scale" />
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display max-w-[16ch] text-[clamp(2rem,4.5vw,3.2rem)]">
                  Enterprise discipline, brought down to{" "}
                  <em className="serif-accent text-gold-500">your size.</em>
                </h2>
              </Reveal>
              <Reveal>
                <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-fog">
                  Our founder spent 15 years at a Big Four firm advising some of the largest
                  organizations in the world. The financial discipline, reporting standards,
                  and strategic thinking that come with that experience don&apos;t have to be
                  reserved for enterprise companies. We built six50 to bring that same rigor
                  to businesses that can actually feel the impact of it.
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
              Let&apos;s talk about your <em className="serif-accent text-gold-500">numbers.</em>
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
