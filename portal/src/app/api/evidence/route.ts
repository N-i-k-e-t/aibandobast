import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const evidence = await prisma.evidenceFile.findMany({
            orderBy: { uploadedAt: 'desc' },
            include: {
                policeStation: { select: { psName: true } },
            },
        });
        return NextResponse.json(evidence);
    } catch (error) {
        console.error('Error fetching evidence:', error);
        return NextResponse.json([]);
    }
}
