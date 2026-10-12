import { NextResponse } from "next/server";
import { checkCredentials, createSession, PORTAL_COOKIE, SESSION_SECONDS } from "@/lib/portal-auth";

export async function POST(request: Request) {
    let email = "";
    let password = "";
    try {
        const body = await request.json();
        email = typeof body.email === "string" ? body.email : "";
        password = typeof body.password === "string" ? body.password : "";
    } catch {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    if (!(await checkCredentials(email, password))) {
        // Small fixed delay slows down password guessing.
        await new Promise((r) => setTimeout(r, 600));
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(PORTAL_COOKIE, await createSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: SESSION_SECONDS,
        path: "/",
    });
    return res;
}
