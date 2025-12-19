import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function CareersPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Join the <span className="text-gold-500">six50</span> Team
                        </h1>
                        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                            We are always looking for exceptional talent to help us redefine enterprise consulting through data and AI.
                        </p>
                    </div>
                </FadeIn>
            </Section>

            <Section className="bg-slate-50">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Current Openings</h2>
                        <p className="text-slate-600 mb-8">
                            We don't have any specific roles open at this moment, but we are always interested in connecting with brilliant minds.
                        </p>
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100">
                            <h3 className="font-semibold text-slate-800 mb-2">General Application</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                If you believe you can make an impact at six50, we want to hear from you. Send us your resume and a brief introduction.
                            </p>
                            <Button href="/contact" variant="primary">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
