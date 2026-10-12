import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PORTAL_COOKIE, verifySession } from "@/lib/portal-auth";

export async function middleware(request: NextRequest) {
    // Protect /portal routes with a signed, expiring session cookie.
    if (request.nextUrl.pathname.startsWith("/portal")) {
        const ok = await verifySession(request.cookies.get(PORTAL_COOKIE)?.value);
        if (!ok) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/portal/:path*"],
};
