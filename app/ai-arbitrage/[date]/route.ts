import { NextRequest, NextResponse } from "next/server";
import { NEWSLETTER_DISCLAIMER } from "@/lib/newsletter-disclaimer";

const SUPABASE_URL = "https://isoahjpwdklvqbkzucca.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzb2FoanB3ZGtsdnFia3p1Y2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MjI1NjQsImV4cCI6MjEwMDI5ODU2NH0.hr18MS7KQ6xVRVultukhuE63vnt5WDDxPDPaKR0__Hk";

export const revalidate = 300;

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ date: string }> }
  ) {
    const { date } = await params;

    const notFoundHtml =
      "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Issue not found</title></head><body style=\"font-family:Arial,Helvetica,sans-serif;padding:80px 20px;text-align:center;background:#faf8f3;color:#0b0f19;\"><h1>Issue not found</h1><p style=\"color:#5b6373;\">This AI Arbitrage issue may not be published yet, or the link is incorrect.</p></body></html>";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return new NextResponse(notFoundHtml, {
                  status: 404,
                  headers: { "Content-Type": "text/html; charset=utf-8" },
                });
        }

    const res = await fetch(
          `${SUPABASE_URL}/rest/v1/ai_arbitrage_issues?issue_date=eq.${date}&select=html_content&limit=1`,
          {
                  headers: {
                            apikey: SUPABASE_ANON_KEY,
                            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                          },
                  next: { revalidate: 300 },
                }
        );

    if (!res.ok) {
          return new NextResponse(notFoundHtml, {
                  status: 404,
                  headers: { "Content-Type": "text/html; charset=utf-8" },
                });
        }

    const rows = (await res.json()) as { html_content: string }[];

    if (!rows || rows.length === 0) {
          return new NextResponse(notFoundHtml, {
                  status: 404,
                  headers: { "Content-Type": "text/html; charset=utf-8" },
                });
        }

    // Always append the not-advice / not-a-CPA-firm disclaimer to published issues.
    // Darken two template colors that fail WCAG AA contrast on the light background.
    const raw = rows[0].html_content
      .replace(/#b8873a/gi, "#7f5a1c")
      .replace(/#8890a0/gi, "#5f6676")
      // ...except the masthead strip, which sits on the dark ink background.
      .replace(/(\.masthead-strip\{[^}]*?color:)#5f6676/, "$1#8890a0");
    const idx = raw.lastIndexOf("</body>");
    const html = raw.includes("Disclaimer:</strong> The AI Arbitrage")
      ? raw
      : idx >= 0
        ? raw.slice(0, idx) + NEWSLETTER_DISCLAIMER + raw.slice(idx)
        : raw + NEWSLETTER_DISCLAIMER;

    return new NextResponse(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
  }
