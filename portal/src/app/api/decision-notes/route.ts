import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const notes = await prisma.decisionNote.findMany({
            orderBy: { stageTag: 'asc' },
        });
        return NextResponse.json(notes);
    } catch (error) {
        console.error('Error fetching decision notes:', error);
        return NextResponse.json([]);
    }
}
