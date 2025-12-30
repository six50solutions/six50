import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Lightweight privacy-friendly logging
        console.log("six50_track", {
            action: body.action || "unknown",
            path: body.path || null,
            ref: body.ref || null,
            ts: body.ts || Date.now()
        });

        return new NextResponse(null, { status: 204 });
    } catch (e) {
        return new NextResponse(null, { status: 204 });
    }
}
