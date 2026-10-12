import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { applyNewsletterCompliance } from "@/lib/newsletter-disclaimer";

export const runtime = "nodejs";

// Serves /ai-arbitrage/*.html (via a rewrite in next.config.ts) so every issue,
// including ones the daily pipeline commits later, gets the compliance transform.
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
    const { file } = await params;
    if (!/^[A-Za-z0-9_-]+\.html$/.test(file)) {
        return new NextResponse("Not found", { status: 404 });
    }
    try {
        const raw = await readFile(path.join(process.cwd(), "public", "ai-arbitrage", file), "utf8");
        return new NextResponse(applyNewsletterCompliance(raw), {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600" },
        });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}
