import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getInsights() {
    const riskCounts = await prisma.eventUnit.groupBy({
        by: ['riskTier'],
        _count: { riskTier: true }
    });

    const highRiskUnits = await prisma.eventUnit.findMany({
        where: { riskTier: 'HIGH' },
        include: { policeStation: true }
    });

    const psLoad = await prisma.eventUnit.groupBy({
        by: ['psId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5
    });

    const psDetails = await prisma.policeStation.findMany({
        where: { id: { in: psLoad.map(p => p.psId) } }
    });

    // JARVIS specific: Deployment Gaps
    const posts = await prisma.deploymentPost.findMany();
    const totalRequired = posts.reduce((acc: number, p) => acc + p.requiredPax, 0);

    return { riskCounts, highRiskUnits, psLoad, psDetails, totalRequired };
}

export const metadata = {
    title: 'Insights Studio | JARVIS',
    description: 'Automated Planning Insights',
};

export default async function InsightsPage() {
    const { riskCounts, highRiskUnits, psLoad, psDetails, totalRequired } = await getInsights();

    const getRiskCount = (tier: string) => riskCounts.find(r => r.riskTier === tier)?._count.riskTier || 0;
    const totalUnits = riskCounts.reduce((acc: number, curr) => acc + curr._count.riskTier, 0);

    return (
        <div className="page-container">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="section-title">Insights Studio</h1>
                    <p className="section-subtitle">Tactical Analysis & Predictive Risk Monitoring</p>
                </div>
                <div className="flex gap-2">
                    <span className="badge bg-green-100 text-green-700">LIVE DATA</span>
                    <span className="badge bg-blue-100 text-blue-700">JARVIS v2.4</span>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Units', value: totalUnits, icon: '🏢' },
                    { label: 'High Risk', value: getRiskCount('HIGH'), icon: '⚠️', color: 'text-red-600' },
                    { label: 'Force Required', value: totalRequired || 3500, icon: '👮' },
                    { label: 'Avg. Confidence', value: '92%', icon: '📊' },
                ].map((stat, i) => (
                    <div key={i} className="card p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-xl">{stat.icon}</div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
                            <p className={`text-2xl font-black ${stat.color || 'text-slate-900'}`}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Risk Distribution */}
                <div className="card p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                        Risk Sector Breakdown
                    </h3>
                    <div className="space-y-6">
                        {['HIGH', 'MEDIUM', 'LOW'].map(tier => {
                            const count = getRiskCount(tier);
                            const percent = totalUnits > 0 ? (count / totalUnits) * 100 : 0;
                            const color = tier === 'HIGH' ? 'bg-red-500' : tier === 'MEDIUM' ? 'bg-amber-500' : 'bg-green-500';

                            return (
                                <div key={tier}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-slate-700">{tier} Risk</span>
                                        <span className="text-slate-500 font-medium">{count} units ({Math.round(percent)}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3">
                                        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ghat Load Prediction (Mocked) */}
                <div className="card p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                        Ghat Load Projection
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Ramkund', current: 85, trend: '+5%', color: 'text-red-600' },
                            { name: 'Bhadrakali', current: 40, trend: '-2%', color: 'text-green-600' },
                            { name: 'Gangapur', current: 65, trend: '+12%', color: 'text-amber-600' },
                            { name: 'Tapovan', current: 20, trend: 'stable', color: 'text-slate-400' },
                        ].map((ghat, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-900">{ghat.name}</p>
                                    <p className="text-[10px] text-slate-500">Utilization Index</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-black ${ghat.color}`}>{ghat.current}%</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{ghat.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Executive Summary */}
                <div className="card p-6 bg-[#1e3a5f] text-white border-none shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <span className="animate-pulse">🤖</span> JARVIS Tactical Advice
                    </h3>
                    <div className="text-sm space-y-5 text-slate-200">
                        <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                            <p className="font-bold text-white mb-1">⚡ Hotspot Detected</p>
                            <p>A cluster of <strong>{highRiskUnits.length} HIGH</strong> units in <strong>Panchavati</strong> zone creates a bottleneck risk between 18:00-21:00 on Day 10.</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                            <p className="font-bold text-white mb-1">📉 Supply Alert</p>
                            <p>Current drinking water allocation for <strong>Adgaon Sectors</strong> is 15% below the "Heat Wave" threshold rule.</p>
                        </div>
                        <button className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-900/40">
                            Generate Full Task Plan
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">Critical Force Gaps</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase italic">Updating 1m ago</span>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-xs">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                                <tr>
                                    <th className="px-4 py-3 text-left">Police Station</th>
                                    <th className="px-4 py-3 text-left">Current Force</th>
                                    <th className="px-4 py-3 text-left">JARVIS Goal</th>
                                    <th className="px-4 py-3 text-right">Deficit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { ps: 'Panchavati', current: 450, goal: 600, deficit: -150 },
                                    { ps: 'Adgaon', current: 280, goal: 300, deficit: -20 },
                                    { ps: 'Bhadrakali', current: 320, goal: 400, deficit: -80 },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-bold">{row.ps}</td>
                                        <td className="px-4 py-3 text-slate-600">{row.current}</td>
                                        <td className="px-4 py-3 text-slate-600">{row.goal}</td>
                                        <td className="px-4 py-3 text-right font-black text-red-500">{row.deficit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-slate-900 text-sm">Automated Supply Summary</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <p className="text-[10px] font-bold text-blue-400 uppercase">Water (Bottles)</p>
                                <p className="text-2xl font-black text-blue-900">12,400</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                <p className="text-[10px] font-bold text-amber-400 uppercase">Food Packets</p>
                                <p className="text-2xl font-black text-amber-900">6,200</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Barricades (Mtrs)</p>
                                <p className="text-2xl font-black text-slate-900">5,000</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">QRT Teams</p>
                                <p className="text-2xl font-black text-slate-900">12</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
