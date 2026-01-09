import OverviewClient from './OverviewClient';
import { getMetrics, getManifest } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function OverviewPage() {
    const metrics = getMetrics();
    const manifest = getManifest();

    // Transform metrics to the shape expected by OverviewClient
    const stats = {
        totalUnits: metrics.filesByYear['2025'] || 0, // In showcase mode, we use file counts as proxy
        totalPoliceStations: Object.keys(metrics.filesByPS).length,
        totalRoutes: metrics.filesByCategory['KML'] || 0,
        totalGhats: 4, // Nashik has 4 main ghats
        highRiskCount: metrics.filesByStage['STAGE_2'] || 5, // Mocked for showcase UI
        mediumRiskCount: 15,
        lowRiskCount: 30,
        totalEvidenceFiles: metrics.totalFiles,
        resourceDemand: 3500,
        resourceAvailable: 3100,
    };

    // Get latest 5 files from manifest
    const latestUploads = manifest
        .sort((a, b) => b.filename.localeCompare(a.filename)) // Using filename as proxy for "latest" if no date
        .slice(0, 5)
        .map(m => ({
            id: m.file_id,
            title: m.filename,
            category: m.category,
            uploadedAt: new Date(), // Mocked
            stageTag: m.stage_tag
        }));

    const decisionNotes = [
        { id: '1', stageTag: 'STAGE_1', title: 'Ground Inputs' },
        { id: '2', stageTag: 'STAGE_2', title: 'Risk Analysis' },
        { id: '3', stageTag: 'STAGE_3', title: 'Spatial Mapping' },
        { id: '4', stageTag: 'STAGE_4', title: 'Route Logic' },
        { id: '5', stageTag: 'STAGE_5', title: 'Ghat Safety' },
        { id: '6', stageTag: 'STAGE_6', title: 'Personnel Bandobast' },
        { id: '7', stageTag: 'STAGE_7', title: 'Final Orders' },
    ];

    const topRiskUnits = [
        { id: '1', unitName: 'Ramkund Main Mandal', riskTier: 'HIGH', score: 92 },
        { id: '2', unitName: 'Panchavati Circle', riskTier: 'HIGH', score: 88 },
        { id: '3', unitName: 'Nashik Road Station', riskTier: 'HIGH', score: 85 },
        { id: '4', unitName: 'Dwarka Point', riskTier: 'HIGH', score: 82 },
        { id: '5', unitName: 'Sunday Market Area', riskTier: 'HIGH', score: 79 },
    ];

    const heavyRoutes = manifest
        .filter(m => m.category === 'KML')
        .slice(0, 5)
        .map(m => ({
            id: m.file_id,
            routeName: m.filename,
            notes: 'High crowd path identified from historical data analysis.'
        }));

    const crowdedGhats = [
        { id: 'g1', ghatName: 'Ramkund', capacityEst: 15000 },
        { id: 'g2', ghatName: 'Bhadrakali', capacityEst: 8000 },
        { id: 'g3', ghatName: 'Tapovan', capacityEst: 20000 },
        { id: 'g4', ghatName: 'Gangapur', capacityEst: 5000 },
    ];

    const trendData = [
        { year: 2020, crowd: 400000, incidents: 8 },
        { year: 2021, crowd: 420000, incidents: 5 },
        { year: 2022, crowd: 480000, incidents: 7 },
        { year: 2023, crowd: 510000, incidents: 4 },
        { year: 2024, crowd: 550000, incidents: 3 },
    ];

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
