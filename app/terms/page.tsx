import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Terms of Service</h1>
                        <p className="text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                        <div className="space-y-8 text-slate-600 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using the six50 Consulting website ("Site"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Site's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">2. Intellectual Property</h2>
                                <p>
                                    The Site and its original content, features, and functionality are owned by six50 Consulting and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">3. Use License</h2>
                                <p>
                                    Permission is granted to temporarily download one copy of the materials (information or software) on six50 Consulting's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    <li>modify or copy the materials;</li>
                                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                    <li>attempt to decompile or reverse engineer any software contained on six50 Consulting's website;</li>
                                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">4. Disclaimer</h2>
                                <p>
                                    The materials on six50 Consulting's website are provided on an 'as is' basis. six50 Consulting makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">5. Limitations</h2>
                                <p>
                                    In no event shall six50 Consulting or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on six50 Consulting's website, even if six50 Consulting or a six50 Consulting authorized representative has been notified orally or in writing of the possibility of such damage.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">6. Governing Law</h2>
                                <p>
                                    These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which six50 Consulting operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">7. Changes to Terms</h2>
                                <p>
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                                </p>
                            </section>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
