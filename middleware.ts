
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect /portal routes
    if (path.startsWith('/portal')) {
        const authCookie = request.cookies.get('six50_auth');
        if (!authCookie || authCookie.value !== 'true') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/portal/:path*'],
};
