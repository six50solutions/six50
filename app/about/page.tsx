import { TransformationVisual } from "@/components/ui/TransformationVisual";
import { Reveal } from "@/components/ui/Reveal";
import { LedgerHead } from "@/components/ui/LedgerHead";
import { ShieldCheck, BarChart3, Zap, Users } from "lucide-react";
import type { Metadata } from "next";
import { PersonSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About",
  description: "six50 exists at the intersection of clarity and transformation. Founded by Adil Ghazali, CPA (15+ years PwC), we help businesses see clearly enough to act and act boldly enough to transform.",
  alternates: { canonical: "https://six50.io/about" },
  openGraph: {
    title: "About six50 | AI & Financial Consulting Firm",
    description: "Founded by Adil Ghazali, CPA. 15+ years PwC experience in financial services transformation. Chicago-based, serving founder-led and PE-backed businesses nationally.",
    url: "https://six50.io/about",
  },
};

const differentiators = [
  { title: "Clarity over hype", desc: "No buzzwords, no AI theater. Just results.", icon: BarChart3 },
  { title: "Transformation over experimentation", desc: "Built for production, not just proofs of concept.", icon: Zap },
  { title: "Human-centered AI", desc: "Judgment, controls, and trust embedded in every system.", icon: Users },
  { title: "Enterprise-grade execution", desc: "Designed for real businesses with real constraints.", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <div className="flex flex-col pt-20">
        {/* Hero / Philosophy */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-20 md:px-12 md:pt-28">
          <Reveal>
            <p className="mb-7 flex items-center gap-3.5 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-fog">
              <span className="inline-block h-px w-9 bg-gold-500" />
              About six50
            </p>
          </Reveal>
          <Reveal>
            <h1 className="font-display max-w-[18ch] text-[clamp(2.6rem,6.5vw,5.2rem)]">
              Where clarity triggers{" "}
              <em className="serif-gradient">transformation.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-[54ch] text-xl leading-relaxed text-fog md:text-2xl">
              AI doesn&apos;t fail because the technology isn&apos;t powerful enough. It fails
              because organizations can&apos;t see clearly enough to act.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-fog-2">
              six50 exists at the threshold where clarity becomes transformation — helping
              organizations turn complex data, emerging technology, and operational
              constraints into trusted, measurable impact.
            </p>
          </Reveal>
        </section>

        {/* Why 650 */}
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <LedgerHead no="001" title="Why six50" tail="λ ≈ 650nm · T ≈ 650°C" />
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-8">
              <Reveal>
                <div className="border-l-2 border-gold-500 pl-6">
                  <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-gold-500">
                    650 nanometers — perception &amp; clarity
                  </h3>
                  <p className="mt-3 leading-relaxed text-fog">
                    ~650 nm sits in the red portion of the visible light spectrum, near the
                    upper boundary of what the human eye can clearly perceive. It represents
                    the point where invisible data turns into a signal humans can see,
                    understand, and act on.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="border-l-2 border-blue-500 pl-6">
                  <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-blue-500">
                    650°C — the transformation threshold
                  </h3>
                  <p className="mt-3 leading-relaxed text-fog">
                    In materials science, this temperature range is where structural changes
                    occur and bonds reorganize. It represents the energy required to
                    fundamentally change structure, not just optimize the surface.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="leading-relaxed text-fog">
                  We exist at the intersection of these two concepts:{" "}
                  <strong className="font-medium text-paper">clarity and transformation.</strong>{" "}
                  We help organizations see clearly enough to act, and act boldly enough to
                  transform.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <div className="relative flex h-64 min-h-[300px] items-center justify-center overflow-hidden rounded-md border border-line-strong bg-ink-950 md:h-full">
                <TransformationVisual />
                <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-1 font-mono text-xs text-paper/50">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    λ ≈ 650nm (Clarity)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500 delay-75" />
                    T ≈ 650°C (Change)
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* How we're different */}
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <LedgerHead no="002" title="How we're different" tail="Four commitments" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.1}>
                <div className="flex h-full gap-5 rounded-md border border-line bg-ink-800/60 p-7 transition-colors hover:border-line-strong">
                  <item.icon className="h-8 w-8 flex-shrink-0 text-gold-500" />
                  <div>
                    <h3 className="font-display mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-fog">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-32 pt-12 text-center md:px-12">
          <LedgerHead no="003" title="Our philosophy" tail="AI is only valuable when it is —" />
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Understandable", "Trusted", "Governed", "Executable"].map((val, i) => (
              <Reveal key={val} delay={i * 0.08}>
                <div className="cursor-default rounded-md border border-line p-5 font-mono text-sm uppercase tracking-[0.08em] text-paper transition-colors hover:border-gold-500 hover:text-gold-500">
                  {val}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mx-auto max-w-2xl border-t border-line pt-14">
              <h3 className="mb-6 font-mono text-sm uppercase tracking-[0.18em] text-fog-2">
                Who we work with
              </h3>
              <ul className="space-y-3 text-fog">
                <li>Financial services and regulated industries</li>
                <li>Healthcare and operations-driven organizations</li>
                <li>Mid-market and enterprise teams modernizing legacy systems</li>
              </ul>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
