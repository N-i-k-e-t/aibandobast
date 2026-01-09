import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SESSION_SECRET || 'default-secret-key-change-in-production';
const key = new TextEncoder().encode(secretKey);

export interface SessionPayload {
    user: string;
    expires: Date;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
    return await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}

export async function createSession(user: string): Promise<void> {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user, expires });

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export function validateCredentials(username: string, password: string): boolean {
    const validUser = process.env.ADMIN_USER || 'cpofficenashik2025';
    const validPass = process.env.ADMIN_PASS || 'CPOFFICE@nashik2025';
    return username === validUser && password === validPass;
}

export async function updateSession(request: NextRequest): Promise<NextResponse | null> {
    const session = request.cookies.get('session')?.value;
    if (!session) return null;

    const parsed = await decrypt(session);
    if (!parsed) return null;

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const newSession = await encrypt({ ...parsed, expires });

    const response = NextResponse.next();
    response.cookies.set('session', newSession, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    return response;
}
