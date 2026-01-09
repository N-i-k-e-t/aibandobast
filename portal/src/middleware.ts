import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

// Routes that don't require authentication
const publicRoutes = ['/login', '/api/auth/login', '/api/auth/logout'];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Allow public routes
    if (publicRoutes.some(route => path.startsWith(route))) {
        return NextResponse.next();
    }

    // Allow static files and Next.js internals
    if (
        path.startsWith('/_next') ||
        path.startsWith('/favicon') ||
        path.includes('.')
    ) {
        return NextResponse.next();
    }

    // Check for session
    const session = request.cookies.get('session')?.value;

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const parsed = await decrypt(session);

    if (!parsed || new Date(parsed.expires) < new Date()) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
