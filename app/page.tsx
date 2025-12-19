import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { ArrowRight, BarChart3, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn duration={1.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-800 mb-8 max-w-5xl">
              Where clarity <br />
              triggers <span className="text-slate-400">transformation.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} duration={1}>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-10">
              six50 exists at the threshold where particular clarity becomes measurable change. Turning complex data into trusted impact.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} duration={1}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="group">
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>


      </section>

      {/* Threshold Moment 1 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

      {/* Value Proposition */}
      <Section>
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 mb-6">
                Move past experimentation.
              </h2>
              <p className="text-slate-600 mb-6 leading-loose">
                In science, 650 nanometers marks the edge of human vision. We live at that intersection—where information becomes visible, interpretable, and actionable.
              </p>
              <div className="w-12 h-1 bg-gold-500" />
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="p-8 border-l border-slate-200 hover:border-gold-500 transition-colors duration-500">
                <BarChart3 className="w-8 h-8 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Clarity Over Hype</h3>
                <p className="text-slate-500 text-sm leading-relaxed">No AI theater. We focus on identifying what truly matters, separating signal from noise.</p>
              </div>
              <div className="p-8 border-l border-slate-200 hover:border-gold-500 transition-colors duration-500">
                <ShieldCheck className="w-8 h-8 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Trusted Execution</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Human-centered AI with judgment, controls, and trust embedded in every workflow.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Dark Section - Services Preview */}
      <Section dark>
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-white">Capabilities</h2>
            <div className="w-full h-px bg-slate-700" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12">
          <FadeIn delay={0.1}>
            <div className="group">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gold-500 transition-colors">Clarity</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                AI opportunity assessments and signal analysis to identify high-impact levers.
              </p>
              <Link href="/services" className="inline-flex items-center text-slate-500 group-hover:text-white transition-colors">
                Explore <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="group">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gold-500 transition-colors">Threshold Design</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Architecting systems, workflows, and control frameworks ready for change.
              </p>
              <Link href="/services" className="inline-flex items-center text-slate-500 group-hover:text-white transition-colors">
                Explore <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="group">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gold-500 transition-colors">Transformation</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Deploying automation and intelligent agents for measurable operational reality.
              </p>
              <Link href="/services" className="inline-flex items-center text-slate-500 group-hover:text-white transition-colors">
                Explore <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Threshold Moment 2 - minimalist quote */}
      <Section className="py-32 md:py-48 bg-slate-50">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-4xl font-light text-slate-800 leading-tight mb-8">
              "The threshold of innovation is not crossed by chance, but by deliberate, calculated steps into the unknown."
            </blockquote>
            <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">The six50 Standard</p>
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <div className="py-24 border-t border-slate-200">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Let's cross the threshold.</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
              If you’re ready to move from experimentation to execution, we’re ready to help.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Get in Touch
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
