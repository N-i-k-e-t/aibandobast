import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const supplyPlans = await prisma.supplyPlan.findMany({
            include: { item: true }
        });
        return NextResponse.json(supplyPlans);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch supply plans' }, { status: 500 });
    }
}
