import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // navigator.sendBeacon sends typically as text/plain or similar, so we parse text manually
    // to be safe against Content-Type variations.
    const bodyText = await req.text();
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (e) {
      body = {};
    }

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
