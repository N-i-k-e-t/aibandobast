import { prisma } from '@/lib/db';
import OverviewClient from './OverviewClient';

export default async function OverviewPage() {
    // Fetch data from database
    let stats = {
        totalUnits: 0,
        totalPoliceStations: 0,
        totalRoutes: 0,
        totalGhats: 0,
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0,
        totalEvidenceFiles: 0,
    };

    let latestUploads: { id: string; title: string; category: string; uploadedAt: Date; stageTag: string }[] = [];
    let decisionNotes: { id: string; stageTag: string; title: string }[] = [];

    try {
        // Get counts
        stats.totalUnits = await prisma.eventUnit.count();
        stats.totalPoliceStations = await prisma.policeStation.count();
        stats.totalRoutes = await prisma.route.count();
        stats.totalGhats = await prisma.ghat.count();
        stats.totalEvidenceFiles = await prisma.evidenceFile.count();

        // Risk tier counts
        stats.highRiskCount = await prisma.eventUnit.count({ where: { riskTier: 'HIGH' } });
        stats.mediumRiskCount = await prisma.eventUnit.count({ where: { riskTier: 'MEDIUM' } });
        stats.lowRiskCount = await prisma.eventUnit.count({ where: { riskTier: 'LOW' } });

        // Latest uploads
        latestUploads = await prisma.evidenceFile.findMany({
            take: 5,
            orderBy: { uploadedAt: 'desc' },
            select: { id: true, title: true, category: true, uploadedAt: true, stageTag: true },
        });

        // Decision notes
        decisionNotes = await prisma.decisionNote.findMany({
            orderBy: { stageTag: 'asc' },
            select: { id: true, stageTag: true, title: true },
        });
    } catch (error) {
        console.error('Database error:', error);
    }

    return <OverviewClient stats={stats} latestUploads={latestUploads} decisionNotes={decisionNotes} />;
}
