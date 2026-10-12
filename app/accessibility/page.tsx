import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, LegalList, legalLink } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
    title: "Accessibility Statement",
    description: "six50's commitment to an accessible website and how to report a barrier.",
    alternates: { canonical: "https://six50.io/accessibility" },
};

const EFFECTIVE_DATE = "October 12, 2026";
const CONTACT_EMAIL = "contact@six50.io";

export default function AccessibilityPage() {
    return (
        <LegalPage
            title="Accessibility Statement"
            effectiveDate={EFFECTIVE_DATE}
            intro={
                <p>
                    six50 solutions LLC wants everyone, including people with disabilities, to be able to use
                    six50.io. We are working to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level
                    AA, and we use WCAG 2.2 as our guide for new work.
                </p>
            }
        >
            <LegalSection id="measures" title="What we do">
                <LegalList>
                    <li>Semantic page structure with headings and landmarks, plus a &ldquo;Skip to main content&rdquo; link.</li>
                    <li>Full keyboard operation of navigation, forms, and our AI chat assistant, with visible focus indicators.</li>
                    <li>Labels on every form field and error messages that are announced to screen readers.</li>
                    <li>Text and controls that meet WCAG AA color contrast requirements.</li>
                    <li>Decorative animations are hidden from assistive technology and reduced when your device&rsquo;s &ldquo;reduce motion&rdquo; setting is on.</li>
                    <li>Chat replies from our AI assistant are announced to screen readers as they arrive.</li>
                    <li>Automated accessibility testing plus manual keyboard and screen reader checks when we make significant changes.</li>
                </LegalList>
            </LegalSection>

            <LegalSection id="limitations" title="Known limitations">
                <p>
                    Some older blog content and documents may not yet fully meet these standards, and third-party
                    content or tools we link to are outside our direct control. We are reviewing these and fixing
                    issues as we find them.
                </p>
            </LegalSection>

            <LegalSection id="feedback" title="Report a barrier or request an alternative format">
                <p>
                    If you have trouble using any part of the Site, or need information in a different format, please
                    email <a href={`mailto:${CONTACT_EMAIL}`} className={legalLink}>{CONTACT_EMAIL}</a> or use our{" "}
                    <Link href="/contact" className={legalLink}>contact form</Link>. Tell us the page and what went
                    wrong, and we will respond within two business days and work with you to provide the information
                    or service another way while we fix the issue.
                </p>
            </LegalSection>
        </LegalPage>
    );
}
