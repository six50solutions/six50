import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, LegalList, legalLink } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How six50 solutions LLC collects, uses, and protects information on six50.io.",
    alternates: { canonical: "https://six50.io/privacy" },
};

const EFFECTIVE_DATE = "October 12, 2026";
const CONTACT_EMAIL = "contact@six50.io";

export default function PrivacyPolicyPage() {
    return (
        <LegalPage
            title="Privacy Policy"
            effectiveDate={EFFECTIVE_DATE}
            intro={
                <>
                    <p>
                        This Privacy Policy explains how six50 solutions LLC (&ldquo;six50,&rdquo; &ldquo;we,&rdquo;
                        &ldquo;our,&rdquo; or &ldquo;us&rdquo;), an Illinois limited liability company, collects, uses,
                        and shares information when you visit six50.io (the &ldquo;Site&rdquo;), use the tools on it,
                        or contact us.
                    </p>
                    <p>
                        <strong className="text-paper">The short version:</strong> we collect what you choose to give
                        us so we can respond to you. We do not sell your personal information, we do not use
                        advertising or cross-site tracking cookies, and we do not share your information for targeted
                        advertising.
                    </p>
                </>
            }
        >
            <LegalSection id="collect" title="1. Information we collect">
                <p>
                    <strong className="text-paper">Information you give us.</strong> We collect information only when
                    you choose to submit it:
                </p>
                <LegalList>
                    <li>
                        <strong className="text-paper">Contact form:</strong> your name, email address, and message.
                    </li>
                    <li>
                        <strong className="text-paper">Dylan, our AI chat assistant:</strong> the messages you type and,
                        if you choose to share them, your name, email, phone number, company, goal, and timeline.
                    </li>
                    <li>
                        <strong className="text-paper">Digital business card (&ldquo;Share My Info&rdquo;):</strong>{" "}
                        your name, email, phone number, job title, company, and any note you add.
                    </li>
                    <li>
                        <strong className="text-paper">Resource requests:</strong> your email address when you request
                        materials such as our AI playbook.
                    </li>
                    <li>
                        <strong className="text-paper">Assessments and diagnostics</strong> (for example, our AI Risk
                        Analyzer and diagnostic scan): your name, company name, email, and your answers about your
                        business, such as revenue range, workforce makeup, and the controls and processes you have in
                        place.
                    </li>
                    <li>
                        <strong className="text-paper">Client portal:</strong> the login credentials we issue to
                        clients.
                    </li>
                    <li>
                        <strong className="text-paper">Email and calls:</strong> whatever you include when you contact
                        us directly.
                    </li>
                </LegalList>
                <p>
                    <strong className="text-paper">Information collected automatically.</strong> Like most websites,
                    our hosting provider records standard server logs (such as IP address, browser type, pages
                    requested, and time of request) to operate and secure the Site. We also keep a basic log of a few
                    on-site actions (for example, which page a button was clicked on, the referring page, and a
                    timestamp) to understand how the Site is used. That log does not use cookies and does not identify
                    you. For diagnostic responses, we store a one-way scrambled (hashed) version of your IP address to
                    help prevent abuse, not the address itself.
                </p>
                <p>
                    <strong className="text-paper">What we do not collect.</strong> We do not use third-party
                    advertising, analytics, or social media tracking pixels. We do not collect biometric information.
                    Please do not send us sensitive information such as Social Security numbers, bank or card account
                    numbers, or health information through the Site.
                </p>
            </LegalSection>

            <LegalSection id="cookies" title="2. Cookies">
                <p>
                    We use only a small number of cookies that are strictly necessary for features you ask to use. We
                    do not use advertising or tracking cookies, so we do not show a cookie consent banner.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-line-strong">
                        <caption className="sr-only">Cookies used on six50.io</caption>
                        <thead className="bg-ink-800 text-paper">
                            <tr>
                                <th scope="col" className="text-left p-3 border-b border-line-strong">Cookie</th>
                                <th scope="col" className="text-left p-3 border-b border-line-strong">Purpose</th>
                                <th scope="col" className="text-left p-3 border-b border-line-strong">Lasts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border-b border-line font-mono">six50_diagnostic</td>
                                <td className="p-3 border-b border-line">Lets you resume a diagnostic you started</td>
                                <td className="p-3 border-b border-line">30 days</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono">six50_auth</td>
                                <td className="p-3">Keeps clients signed in to the client portal</td>
                                <td className="p-3">7 days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    You can block or delete cookies in your browser settings. If you do, the diagnostic will not
                    remember your progress and you will not be able to stay signed in to the portal.
                </p>
            </LegalSection>

            <LegalSection id="use" title="3. How we use information">
                <LegalList>
                    <li>To respond to your inquiry, schedule a call, and follow up about our services.</li>
                    <li>To deliver resources and assessment results you request.</li>
                    <li>To provide services to clients under an engagement agreement.</li>
                    <li>To operate, secure, troubleshoot, and improve the Site and our AI assistant.</li>
                    <li>
                        To send occasional relevant business emails. Every marketing email includes a way to
                        unsubscribe, and you can opt out at any time by emailing us.
                    </li>
                    <li>To comply with law, professional obligations, and to protect our rights.</li>
                </LegalList>
                <p>We do not use your information to make automated decisions that have legal or similarly significant effects on you.</p>
            </LegalSection>

            <LegalSection id="ai" title="4. Dylan, our AI chat assistant">
                <p>
                    Dylan is an automated AI system, not a human. We say so in the chat window, and Dylan is designed
                    to identify itself as an AI if asked. A notice next to the message box explains that messages are
                    sent to our AI provider; by sending a message, you consent to that processing. If you prefer not to
                    use the chat, you can reach us through the contact form or by email instead.
                </p>
                <LegalList>
                    <li>
                        <strong className="text-paper">How it works:</strong> your chat messages, including any contact
                        details you enter in the chat form, are sent to our AI provider, Anthropic, to generate
                        responses. Anthropic processes this data on our behalf under its commercial terms and does not
                        use it to train its models.
                    </li>
                    <li>
                        <strong className="text-paper">Lead details:</strong> if you share contact details, they are
                        emailed to the six50 team so we can follow up. They are not sold or shared with third parties
                        for their marketing.
                    </li>
                    <li>
                        <strong className="text-paper">Chat history:</strong> six50 does not save chat transcripts to a
                        database. The conversation lives in your browser tab and is cleared when you leave the Site. We
                        log technical metadata only (such as timestamps, token counts, and model version) to monitor
                        reliability, cost, and quality.
                    </li>
                    <li>
                        <strong className="text-paper">Accuracy:</strong> AI responses can be wrong and are not
                        professional, legal, tax, financial, or accounting advice. For guidance on your situation,
                        contact us directly.
                    </li>
                    <li>
                        <strong className="text-paper">Oversight:</strong> we review the assistant&rsquo;s instructions
                        on a recurring basis and keep a change log. You can send questions or corrections to{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className={legalLink}>{CONTACT_EMAIL}</a>.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection id="share" title="5. How we share information">
                <p>
                    We do not sell personal information, and we do not &ldquo;share&rdquo; it for cross-context
                    behavioral advertising as those terms are defined under state privacy laws. We share information
                    only with:
                </p>
                <LegalList>
                    <li>
                        <strong className="text-paper">Service providers</strong> that help us run the Site and our
                        business and are permitted to use the information only to provide services to us: Vercel
                        (website hosting), Anthropic (AI assistant), Supabase (secure database for form and assessment
                        submissions), Resend (email delivery), and the email, calendar, and workflow tools we use to
                        manage client relationships.
                    </li>
                    <li>
                        <strong className="text-paper">Legal and safety reasons:</strong> when required by law,
                        subpoena, or professional regulation, or to protect the rights, safety, and property of six50,
                        our clients, or others.
                    </li>
                    <li>
                        <strong className="text-paper">Business transfers:</strong> as part of a merger, acquisition,
                        or sale of assets, subject to this Policy.
                    </li>
                    <li>
                        <strong className="text-paper">With your direction:</strong> when you ask us to.
                    </li>
                </LegalList>
                <p>Our service providers may store and process information in the United States.</p>
            </LegalSection>

            <LegalSection id="clients" title="6. Client engagement information">
                <p>
                    Information our clients provide during an engagement (such as financial records, systems access,
                    and internal documents) is governed by the client&rsquo;s signed engagement agreement and by the
                    professional confidentiality standards that apply to our work, in addition to this Policy. Where
                    the two differ, the engagement agreement controls.
                </p>
            </LegalSection>

            <LegalSection id="retention" title="7. How long we keep information">
                <LegalList>
                    <li>Inquiries and leads: for as long as needed to respond and maintain a business relationship, generally up to three years after our last contact, unless you ask us to delete them sooner.</li>
                    <li>Assessment and diagnostic responses: up to three years, so we can reference results in follow-up conversations.</li>
                    <li>Client records: as required by the engagement agreement, professional standards, and law.</li>
                    <li>Server and technical logs: for a limited period set by our hosting provider.</li>
                </LegalList>
            </LegalSection>

            <LegalSection id="security" title="8. Security">
                <p>
                    We use reasonable administrative, technical, and physical safeguards, including encrypted
                    connections (HTTPS), access controls, and database security rules. No method of transmission or
                    storage is completely secure, so we cannot guarantee absolute security. If a security breach
                    affects your personal information, we will notify you as required by applicable law, including
                    the Illinois Personal Information Protection Act.
                </p>
            </LegalSection>

            <LegalSection id="rights" title="9. Your choices and rights">
                <p>Regardless of where you live, you can ask us to:</p>
                <LegalList>
                    <li>tell you what personal information we have about you and give you a copy;</li>
                    <li>correct information that is inaccurate;</li>
                    <li>delete your information, subject to legal and professional record-keeping requirements;</li>
                    <li>stop sending you marketing emails.</li>
                </LegalList>
                <p>
                    Residents of California and other states with consumer privacy laws may have additional rights
                    under those laws, and we will honor them where they apply. To make a request, email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={legalLink}>{CONTACT_EMAIL}</a>. We may need to
                    confirm your identity before acting on a request, and you may use an authorized agent. We respond
                    within 45 days and will not discriminate against you for exercising your rights.
                </p>
                <p>
                    <strong className="text-paper">Do Not Track and Global Privacy Control.</strong> We do not track
                    visitors across other websites, so there is no cross-site tracking to turn off. We treat a Global
                    Privacy Control signal from your browser as a valid request to opt out of any sale or sharing of
                    personal information.
                </p>
            </LegalSection>

            <LegalSection id="children" title="10. Children">
                <p>
                    The Site is intended for business professionals and is not directed to children under 16. We do
                    not knowingly collect personal information from children. If you believe a child has sent us
                    information, contact us and we will delete it.
                </p>
            </LegalSection>

            <LegalSection id="international" title="11. Visitors outside the United States">
                <p>
                    six50 is based in the United States, and information you submit is processed in the United
                    States. If you are located elsewhere, you may contact us to exercise any rights you have under
                    your local law.
                </p>
            </LegalSection>

            <LegalSection id="changes" title="12. Changes to this Policy">
                <p>
                    We may update this Policy as the Site and our practices change. We will post the updated version
                    here with a new effective date, and for material changes we will provide additional notice where
                    appropriate.
                </p>
            </LegalSection>

            <LegalSection id="contact" title="13. Contact us">
                <p>
                    six50 solutions LLC
                    <br />
                    Illinois, United States
                    <br />
                    Email: <a href={`mailto:${CONTACT_EMAIL}`} className={legalLink}>{CONTACT_EMAIL}</a>
                    <br />
                    Or use our <Link href="/contact" className={legalLink}>contact form</Link>.
                </p>
            </LegalSection>
        </LegalPage>
    );
}
