import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, LegalList, legalLink } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
    title: "Terms of Use",
    description: "Terms governing use of the six50.io website, AI assistant, and online tools.",
    alternates: { canonical: "https://six50.io/terms" },
};

const EFFECTIVE_DATE = "October 12, 2026";
const CONTACT_EMAIL = "contact@six50.io";

export default function TermsPage() {
    return (
        <LegalPage
            title="Terms of Use"
            effectiveDate={EFFECTIVE_DATE}
            intro={
                <p>
                    These Terms of Use (&ldquo;Terms&rdquo;) govern your use of six50.io (the &ldquo;Site&rdquo;),
                    including our AI chat assistant, assessments, diagnostics, and client portal, operated by six50
                    solutions LLC, an Illinois limited liability company (&ldquo;six50,&rdquo; &ldquo;we,&rdquo; or
                    &ldquo;us&rdquo;). By using the Site, you agree to these Terms and to our{" "}
                    <Link href="/privacy" className={legalLink}>Privacy Policy</Link>. If you do not agree, please do
                    not use the Site.
                </p>
            }
        >
            <LegalSection id="not-cpa-firm" title="1. six50 is not a CPA firm">
                <p>
                    six50 solutions LLC is not a licensed certified public accounting (CPA) firm and is not registered
                    or licensed as one in Illinois or any other jurisdiction. We do not provide audit, review,
                    compilation, examination, agreed-upon procedures, or other attest services; we do not issue
                    reports or opinions on financial statements; and we do not provide any other service that by law
                    may be offered only by a licensed CPA firm or performed by a licensed CPA in that capacity.
                    Our services are business, finance, operations, and technology consulting and are not
                    performed in the capacity of a certified public accountant. No accountant-client privilege or CPA
                    professional relationship arises from working with six50. If you need attest or other licensed
                    CPA services, please engage a licensed CPA firm.
                </p>
            </LegalSection>

            <LegalSection id="no-advice" title="2. Information only, not professional advice">
                <p>
                    Content on the Site, including articles, checklists, playbooks, assessment scores, and responses
                    from our AI assistant, is general information for business audiences. It is not accounting, tax,
                    audit, legal, investment, or financial advice, and it is not a CPA service, and it is not tailored to your circumstances. Do not
                    rely on it as a substitute for advice from a qualified professional who knows your situation.
                </p>
            </LegalSection>

            <LegalSection id="no-relationship" title="3. No client relationship from using the Site">
                <p>
                    Using the Site, completing an assessment, chatting with our AI assistant, booking a call, or
                    sending us information does not create a client or advisory relationship with six50 or any of its
                    personnel. A client relationship begins only when both parties sign a
                    written engagement agreement, which will define the scope, fees, and terms of the services.
                    Please do not send confidential information until an engagement agreement is in place.
                </p>
            </LegalSection>

            <LegalSection id="tools" title="4. AI assistant, assessments, and diagnostics">
                <LegalList>
                    <li>
                        Dylan, our chat assistant, is an automated AI system, not a person. Its responses are generated
                        automatically and may be inaccurate, incomplete, or out of date.
                    </li>
                    <li>
                        Scores, readiness levels, and recommendations from our assessments and diagnostics are
                        automated estimates based only on the answers you provide. They are starting points for
                        conversation, not findings, opinions, or assurances of any kind.
                    </li>
                    <li>
                        You are responsible for decisions you make based on these tools. Do not enter sensitive
                        personal information, account numbers, or confidential third-party information.
                    </li>
                    <li>
                        Do not attempt to manipulate, overload, or extract the system instructions of the assistant,
                        or use it for anything other than learning about six50&rsquo;s services.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection id="acceptable-use" title="5. Eligibility and acceptable use">
                <p>
                    The Site is intended for business use by adults. You must be at least 18 years old to use the
                    Site or submit information through it.
                </p>
                <p>You agree not to:</p>
                <LegalList>
                    <li>use the Site in violation of any law or the rights of others;</li>
                    <li>submit false information or information about another person without their permission;</li>
                    <li>attempt to gain unauthorized access to the Site, the client portal, or related systems;</li>
                    <li>introduce malware or interfere with the Site&rsquo;s operation or security;</li>
                    <li>scrape, copy, or republish Site content in bulk, or use automated means to submit forms.</li>
                </LegalList>
            </LegalSection>

            <LegalSection id="portal" title="6. Client portal">
                <p>
                    Portal access is provided only to clients. Keep your credentials confidential and tell us promptly
                    if you believe they have been compromised. Materials in the portal are confidential and are
                    governed by your engagement agreement.
                </p>
            </LegalSection>

            <LegalSection id="ip" title="7. Intellectual property">
                <p>
                    The Site and its content, including text, graphics, logos, the six50 name, frameworks, and
                    software, are owned by six50 or its licensors and are protected by intellectual property laws. You
                    may view and print pages for your own internal business reference. Any other copying,
                    modification, distribution, or commercial use requires our written permission.
                </p>
            </LegalSection>

            <LegalSection id="third-party" title="8. Third-party links and services">
                <p>
                    The Site may link to or rely on third-party websites and services. We do not control and are not
                    responsible for their content, policies, or availability.
                </p>
            </LegalSection>

            <LegalSection id="disclaimer" title="9. Disclaimer of warranties">
                <p>
                    The Site and all content and tools are provided &ldquo;as is&rdquo; and &ldquo;as
                    available.&rdquo; To the fullest extent permitted by law, six50 disclaims all warranties, express
                    or implied, including warranties of merchantability, fitness for a particular purpose, accuracy,
                    and non-infringement. We do not warrant that the Site will be uninterrupted or error-free.
                </p>
            </LegalSection>

            <LegalSection id="liability" title="10. Limitation of liability">
                <p>
                    To the fullest extent permitted by law, six50 and its members, employees, and contractors will not
                    be liable for any indirect, incidental, special, consequential, or punitive damages, or for lost
                    profits, revenue, or data, arising from your use of the Site or its content and tools. Our total
                    liability for any claim arising from use of the Site is limited to one hundred U.S. dollars
                    ($100). This section does not limit liability under a signed engagement agreement, which is
                    governed by that agreement.
                </p>
            </LegalSection>

            <LegalSection id="indemnity" title="11. Indemnification">
                <p>
                    You agree to indemnify and hold six50 harmless from claims arising out of your misuse of the Site
                    or your violation of these Terms.
                </p>
            </LegalSection>

            <LegalSection id="law" title="12. Governing law and venue">
                <p>
                    These Terms are governed by the laws of the State of Illinois, without regard to its conflict of
                    law rules. Any dispute arising from these Terms or your use of the Site will be brought
                    exclusively in the state or federal courts located in Illinois, and you consent to their
                    jurisdiction.
                </p>
            </LegalSection>

            <LegalSection id="general" title="13. General">
                <p>
                    If any part of these Terms is found unenforceable, the rest remains in effect. Our failure to
                    enforce a provision is not a waiver. We may update these Terms by posting a new version with a new
                    effective date; continued use of the Site after that date means you accept the updated Terms.
                </p>
            </LegalSection>

            <LegalSection id="contact" title="14. Contact">
                <p>
                    Questions about these Terms: <a href={`mailto:${CONTACT_EMAIL}`} className={legalLink}>{CONTACT_EMAIL}</a>.
                </p>
            </LegalSection>
        </LegalPage>
    );
}
