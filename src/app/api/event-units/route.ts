import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const units = await prisma.eventUnit.findMany({
            include: {
                policeStation: { select: { psName: true } },
            },
        });
        return NextResponse.json(units);
    } catch (error) {
        console.error('Error fetching event units:', error);
        return NextResponse.json([]);
    }
}
