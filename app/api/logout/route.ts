import { NextResponse } from "next/server";
import { PORTAL_COOKIE } from "@/lib/portal-auth";

export async function POST(request: Request) {
    const res = NextResponse.redirect(new URL("/login", request.url), { status: 303 });
    res.cookies.set(PORTAL_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
    return res;
}
