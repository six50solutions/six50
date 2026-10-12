// Appended to every AI Arbitrage issue served from the database.
export const NEWSLETTER_DISCLAIMER = "<div style=\"max-width:680px;margin:40px auto 24px;padding:16px 20px;border-top:1px solid #d9d4c7;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:#4a5160;\"><strong>Disclaimer:</strong> The AI Arbitrage is published by six50 solutions LLC for general information only. It is not investment, financial, tax, accounting, or legal advice, and nothing in it is a recommendation to buy, sell, or hold any security. Content reflects the authors&rsquo; opinions and publicly reported information as of the issue date, may contain errors, and is not updated. Do your own research and consult a qualified professional before making decisions. six50 solutions LLC is not a licensed CPA firm. We do not provide audit, review, compilation, or other attest services, or any other services that require a CPA firm license, and our services are not performed in the capacity of a certified public accountant. See our <a href=\"https://six50.io/terms\" style=\"color:#4a5160\">Terms of Use</a> and <a href=\"https://six50.io/privacy\" style=\"color:#4a5160\">Privacy Policy</a>.</div>";

/**
 * Applied to every AI Arbitrage page as it is served, so issues published by the
 * daily pipeline stay compliant even if their source HTML does not include these:
 *  - darkens two template colors that fail WCAG AA contrast on light backgrounds
 *  - removes the CPA title from firm marketing copy (six50 is not a CPA firm)
 *  - appends the not-investment-advice / not-a-CPA-firm disclaimer
 */
export function applyNewsletterCompliance(raw: string): string {
    let html = raw
        .replace(/#b8873a/gi, "#7f5a1c")
        .replace(/#8890a0/gi, "#5f6676")
        // ...except the masthead strip, which sits on the dark ink background.
        .replace(/(\.masthead-strip\{[^}]*?color:)#5f6676/, "$1#8890a0")
        .replace(/Adil Ghazali,\s*CPA/g, "Adil Ghazali");
    if (!html.includes("Disclaimer:</strong> The AI Arbitrage")) {
        const idx = html.lastIndexOf("</body>");
        html = idx >= 0 ? html.slice(0, idx) + NEWSLETTER_DISCLAIMER + html.slice(idx) : html + NEWSLETTER_DISCLAIMER;
    }
    return html;
}
