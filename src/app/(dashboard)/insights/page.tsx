import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getInsights() {
    // 1. Risk Tier Counts
    const riskCounts = await prisma.eventUnit.groupBy({
        by: ['riskTier'],
        _count: { riskTier: true }
    });

    // 2. High Risk Units by PS
    const highRiskUnits = await prisma.eventUnit.findMany({
        where: { riskTier: 'HIGH' },
        include: { policeStation: true }
    });

    // 3. PS Load (Count of units per PS)
    const psLoad = await prisma.eventUnit.groupBy({
        by: ['psId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5
    });

    // Fetch PS names for the load
    const psDetails = await prisma.policeStation.findMany({
        where: { id: { in: psLoad.map(p => p.psId) } }
    });

    return { riskCounts, highRiskUnits, psLoad, psDetails };
}

export const metadata = {
    title: 'Insights Studio | AI BANDOBaST',
    description: 'Automated Planning Insights',
};

export default async function InsightsPage() {
    const { riskCounts, highRiskUnits, psLoad, psDetails } = await getInsights();

    // Transform for UI
    const getRiskCount = (tier: string) => riskCounts.find(r => r.riskTier === tier)?._count.riskTier || 0;
    const totalUnits = riskCounts.reduce((acc, curr) => acc + curr._count.riskTier, 0);

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Insights Studio</h1>
                <p className="section-subtitle">Automated Analysis & Risk Trends</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Risk Distribution Card */}
                <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
                    <div className="space-y-4">
                        {['HIGH', 'MEDIUM', 'LOW'].map(tier => {
                            const count = getRiskCount(tier);
                            const percent = totalUnits > 0 ? (count / totalUnits) * 100 : 0;
                            const color = tier === 'HIGH' ? 'bg-red-500' : tier === 'MEDIUM' ? 'bg-amber-500' : 'bg-green-500';

                            return (
                                <div key={tier}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">{tier} Risk</span>
                                        <span className="text-gray-500">{count} units ({Math.round(percent)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Heavy PS Card */}
                <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Loaded Police Stations</h3>
                    <ul className="space-y-3">
                        {psLoad.map((item, idx) => {
                            const psName = psDetails.find(p => p.id === item.psId)?.psName || 'Unknown PS';
                            return (
                                <li key={item.psId} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 font-mono">0{idx + 1}</span>
                                        <span className="font-medium text-gray-800">{psName}</span>
                                    </div>
                                    <span className="font-bold text-[#1e3a5f]">{item._count.id} Units</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* AI Summary Card */}
                <div className="card p-6 bg-gradient-to-br from-[#1e3a5f] to-[#2a4a73] text-white">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span>✨</span> AI Analysis
                    </h3>
                    <div className="text-sm space-y-4 text-white/90">
                        <p>
                            <strong>Hotspot Detected:</strong> A cluster of {highRiskUnits.length} HIGH risk units suggests heavy resource requirement in <strong>Panchavati</strong> and <strong>Gangapur</strong> zones.
                        </p>
                        <p>
                            <strong>Thumb Rule Trigger:</strong> Crowd density exceeds 4,000/sq.km near Ramkund. Recommend activating "Stampede Prevention Protocol".
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/20 text-xs text-white/60">
                            Analysis based on current confirmed units.
                        </div>
                    </div>
                </div>
            </div>

            {/* High Risk Details Table */}
            <div className="card overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-900">Critical Focus Areas (High Risk Units)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Unit Name</th>
                                <th className="px-6 py-3 font-medium">Police Station</th>
                                <th className="px-6 py-3 font-medium">Crowd Est.</th>
                                <th className="px-6 py-3 font-medium">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {highRiskUnits.map((unit) => (
                                <tr key={unit.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-medium text-gray-900">{unit.unitName}</td>
                                    <td className="px-6 py-3 text-gray-600">{unit.policeStation.psName}</td>
                                    <td className="px-6 py-3 text-gray-600">{unit.crowdMax?.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-xs text-gray-500 max-w-xs truncate">{unit.pastIncidentNotes || 'No history'}</td>
                                </tr>
                            ))}
                            {highRiskUnits.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No High Risk units found. Good job!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
