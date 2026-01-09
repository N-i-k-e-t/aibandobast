import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const archiveYears = await prisma.archiveYear.findMany({
            orderBy: { year: 'desc' },
        });
        return NextResponse.json(archiveYears);
    } catch (error) {
        console.error('Error fetching archive:', error);
        return NextResponse.json([]);
    }
}
