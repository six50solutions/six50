import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-paper mb-8">Privacy Policy</h1>
                        <p className="text-fog mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                        <div className="space-y-8 text-fog leading-relaxed">
                            <section>
                                <h2 className="text-xl font-semibold text-paper mb-4">1. Introduction</h2>
                                <p>
                                    At six50 solutions LLC ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-paper mb-4">2. Information We Collect</h2>
                                <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                                    <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-paper mb-4">3. Use of Your Information</h2>
                                <p>
                                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    <li>Provide, operate, and maintain our website and services.</li>
                                    <li>Improve, personalize, and expand our website and services.</li>
                                    <li>Understand and analyze how you use our website.</li>
                                    <li>Develop new products, services, features, and functionality.</li>
                                    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-paper mb-4">4. Security of Your Information</h2>
                                <p>
                                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-paper mb-4">5. AI Chat Assistant ("Dylan")</h2>
                                <p className="mb-4">
                                    Our website includes an AI-powered chat assistant named Dylan. Dylan is an automated system, not a human. We disclose this in the chat interface, and we design Dylan to identify itself as an AI if asked. This section explains how chat interactions are handled.
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>What is processed:</strong> The messages you type into the chat, and any contact details you choose to provide (such as name, email, phone, company, goal, and timeline).</li>
                                    <li><strong>How it is processed:</strong> Chat messages are transmitted to Anthropic, our AI service provider, to generate responses. Anthropic acts as a processor of this data; its handling is governed by its own commercial terms and privacy documentation.</li>
                                    <li><strong>Lead information:</strong> If you provide contact details through the chat or its form, they are sent to the six50 team by email so we can follow up on your inquiry. They are not sold or shared with third parties for marketing.</li>
                                    <li><strong>Retention:</strong> Chat conversations are not stored in a database by six50. Your conversation history exists in your browser session and is cleared when you leave the site. Lead details you submit are retained as business correspondence.</li>
                                    <li><strong>What not to share:</strong> Please do not submit sensitive personal information through the chat, including financial account numbers, government identifiers, or health information. Dylan is instructed to decline such information.</li>
                                    <li><strong>Accuracy:</strong> AI-generated responses may contain errors and do not constitute professional, legal, financial, or accounting advice. For engagement-specific guidance, contact us directly.</li>
                                    <li><strong>Human review and accountability:</strong> We log technical metadata about chat usage (such as timestamps, token counts, and model version) for reliability, cost, and quality monitoring. We review the assistant's configuration on a recurring basis and maintain a change log of its instructions. Questions or corrections can be directed to us via the Contact page.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-paper mb-4">6. Contact Us</h2>
                                <p>
                                    If you have questions or comments about this Privacy Policy, please contact us at:
                                </p>
                                <p className="mt-4">
                                    six50 solutions LLC<br />
                                    <Link href="/contact" className="text-gold-500 hover:underline">Contact Page</Link>
                                </p>
                            </section>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
