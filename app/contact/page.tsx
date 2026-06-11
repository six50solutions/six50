import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Book a Free 30-Minute Call",
  description: "Book a free 30-minute call with six50. Honest assessment of your financial and operational gaps. No pitch. No fluff. Just clarity.",
  alternates: { canonical: "https://six50.io/contact" },
  openGraph: {
    title: "Book a Free Call | six50",
    description: "30 minutes. Honest assessment of your financial and operational gaps. No pitch.",
    url: "https://six50.io/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto min-h-[80vh] w-full max-w-7xl px-6 pb-32 pt-40 md:px-12">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="mb-7 flex items-center gap-3.5 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-fog">
            <span className="inline-block h-px w-9 bg-gold-500" />
            Contact · 30 minutes · no pitch
          </p>
        </Reveal>
        <Reveal>
          <h1 className="font-display mb-4 text-[clamp(2.4rem,5.5vw,4rem)]">
            Let&apos;s find your <em className="serif-accent text-gold-500">gaps.</em>
          </h1>
        </Reveal>
        <Reveal>
          <p className="mb-12 text-lg text-fog">
            Reach out to discuss how we can help you cross the threshold. We respond within
            24 hours.
          </p>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
