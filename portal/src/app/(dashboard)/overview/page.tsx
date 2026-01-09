import { prisma } from '@/lib/db';
import OverviewClient from './OverviewClient';

export const dynamic = 'force-dynamic';

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
        resourceDemand: 2500, // Estimated
        resourceAvailable: 2200, // Estimated (shortfall scenario)
    };

    let latestUploads: { id: string; title: string; category: string; uploadedAt: Date; stageTag: string }[] = [];
    let decisionNotes: { id: string; stageTag: string; title: string }[] = [];
    let topRiskUnits: { id: string; unitName: string; riskTier: string; score: number }[] = [];
    let heavyRoutes: { id: string; routeName: string; notes: string | null }[] = [];
    let crowdedGhats: { id: string; ghatName: string; capacityEst: number }[] = [];
    let trendData: { year: number; crowd: number; incidents: number }[] = [];

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

        // Hotspots (Top High Risk Units)
        const highRiskUnits = await prisma.eventUnit.findMany({
            where: { riskTier: 'HIGH' },
            orderBy: { crowdMax: 'desc' },
            take: 10,
            select: { id: true, unitName: true, riskTier: true, crowdMax: true },
        });
        topRiskUnits = highRiskUnits.map(u => ({
            id: u.id,
            unitName: u.unitName,
            riskTier: u.riskTier,
            score: 0.3 * ((u.crowdMax || 0) / 100) + 40 // Handle null crowdMax
        }));

        // Heavy Routes (proxy by duration)
        heavyRoutes = await prisma.route.findMany({
            orderBy: { durationMin: 'desc' },
            take: 5,
            select: { id: true, routeName: true, notes: true },
        });

        // Crowded Ghats
        const ghatsRes = await prisma.ghat.findMany({
            orderBy: { capacityEst: 'desc' },
            take: 5,
            select: { id: true, ghatName: true, capacityEst: true },
        });
        crowdedGhats = ghatsRes.map(g => ({
            id: g.id,
            ghatName: g.ghatName,
            capacityEst: g.capacityEst || 0 // Handle null capacityEst
        }));

        // Trend Data (Last 5 years)
        const archives = await prisma.archiveYear.findMany({
            orderBy: { year: 'asc' },
            take: 5,
            select: { year: true, estimatedCrowd: true, incidentsReported: true },
        });
        trendData = archives.map(a => ({
            year: a.year,
            crowd: a.estimatedCrowd,
            incidents: a.incidentsReported
        }));

    } catch (error) {
        console.error('Database error:', error);
    }

    return (
        <OverviewClient
            stats={stats}
            latestUploads={latestUploads}
            decisionNotes={decisionNotes}
            topRiskUnits={topRiskUnits}
            heavyRoutes={heavyRoutes}
            crowdedGhats={crowdedGhats}
            trendData={trendData}
        />
    );
}
