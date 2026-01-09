import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const ghats = await prisma.ghat.findMany();
        return NextResponse.json(ghats);
    } catch (error) {
        console.error('Error fetching ghats:', error);
        return NextResponse.json([]);
    }
}
