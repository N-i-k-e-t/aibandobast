'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
    totalUnits: number;
    totalPoliceStations: number;
    totalRoutes: number;
    totalGhats: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    totalEvidenceFiles: number;
    resourceDemand: number;
    resourceAvailable: number;
}

interface Upload {
    id: string;
    title: string;
    category: string;
    uploadedAt: Date;
    stageTag: string;
}

interface DecisionNote {
    id: string;
    stageTag: string;
    title: string;
}

interface RiskUnit {
    id: string;
    unitName: string;
    riskTier: string;
    score: number;
}

interface HeavyRoute {
    id: string;
    routeName: string;
    notes: string | null;
}

interface CrowdedGhat {
    id: string;
    ghatName: string;
    capacityEst: number;
}

interface TrendPoint {
    year: number;
    crowd: number;
    incidents: number;
}

interface Props {
    stats: Stats;
    latestUploads: Upload[];
    decisionNotes: DecisionNote[];
    topRiskUnits: RiskUnit[];
    heavyRoutes: HeavyRoute[];
    crowdedGhats: CrowdedGhat[];
    trendData: TrendPoint[];
}

const stages = [
    { tag: 'STAGE_1', name: 'Ground Reality & Inputs', description: 'Initial data collection and ground surveys' },
    { tag: 'STAGE_2', name: 'Risk-Based Thinking', description: 'Risk assessment and classification' },
    { tag: 'STAGE_3', name: 'Spatial & Jurisdictional Mapping', description: 'GIS-based area mapping' },
    { tag: 'STAGE_4', name: 'Route & Time Window Logic', description: 'Procession route planning' },
    { tag: 'STAGE_5', name: 'Ghat & Terminal Planning', description: 'Immersion point logistics' },
    { tag: 'STAGE_6', name: 'Resource & Bandobast Planning', description: 'Personnel and resource allocation' },
    { tag: 'STAGE_7', name: 'Outputs & Documentation', description: 'Final documentation and reports' },
];

export default function OverviewClient({ stats, latestUploads, decisionNotes, topRiskUnits, heavyRoutes, crowdedGhats, trendData }: Props) {
    const [explainMode, setExplainMode] = useState(false);

    useEffect(() => {
        const handleExplainModeChange = (e: CustomEvent) => {
            setExplainMode(e.detail);
        };
        window.addEventListener('explainModeChange', handleExplainModeChange as EventListener);
        return () => window.removeEventListener('explainModeChange', handleExplainModeChange as EventListener);
    }, []);

    const resourceHealth = (stats.resourceAvailable / stats.resourceDemand) * 100;

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Overview</h1>
                <p className="section-subtitle">
                    AI BANDOBaST Portal — Ganpati Utsav 2025 Nashik
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                <div className="kpi-card">
                    <div className="kpi-value">{stats.totalUnits}</div>
                    <div className="kpi-label">Event Units</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-value">{stats.totalPoliceStations}</div>
                    <div className="kpi-label">Police Stations</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-value">{stats.totalRoutes}</div>
                    <div className="kpi-label">Routes</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-value">{stats.totalGhats}</div>
                    <div className="kpi-label">Ghats</div>
                </div>
                <div className="kpi-card border-l-4 border-l-red-500">
                    <div className="kpi-value text-red-500">{stats.highRiskCount}</div>
                    <div className="kpi-label">High Risk</div>
                </div>
                <div className="kpi-card border-l-4 border-l-amber-500">
                    <div className="kpi-value text-amber-500">{stats.mediumRiskCount}</div>
                    <div className="kpi-label">Medium Risk</div>
                </div>
                <div className="kpi-card border-l-4 border-l-green-500">
                    <div className="kpi-value text-green-500">{stats.lowRiskCount}</div>
                    <div className="kpi-label">Low Risk</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-value">{stats.totalEvidenceFiles}</div>
                    <div className="kpi-label">Evidence Files</div>
                </div>
            </div>

            {/* Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Hotspots */}
                <div className="card">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-red-500">🔥</span> Top Risk Hotspots
                    </h3>
                    <div className="space-y-3">
                        {topRiskUnits.slice(0, 5).map(unit => (
                            <div key={unit.id} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-100">
                                <span className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">{unit.unitName}</span>
                                <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                    {Math.round(unit.score)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resource Demand */}
                <div className="card">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-blue-500">👮</span> Resource Demand vs Availability
                    </h3>
                    <div className="flex flex-col h-full justify-center">
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-2xl font-bold text-gray-900">{stats.resourceAvailable.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">Available</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-1">
                            <div
                                className={`h-full rounded-full transition-all ${resourceHealth < 100 ? 'bg-red-500' : 'bg-green-500'}`}
                                style={{ width: `${Math.min(resourceHealth, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mb-4">
                            <span>Demand: {stats.resourceDemand.toLocaleString()}</span>
                            <span className={resourceHealth < 100 ? 'text-red-500 font-bold' : 'text-green-500'}>
                                {resourceHealth < 100 ? `${(stats.resourceDemand - stats.resourceAvailable)} Shortfall` : 'Adequate'}
                            </span>
                        </div>

                        <h4 className="text-xs font-semibold text-gray-700 mt-4 mb-2">Ghat Load (Capacity)</h4>
                        <div className="space-y-2">
                            {crowdedGhats.slice(0, 3).map(ghat => (
                                <div key={ghat.id} className="flex justify-between text-xs border-b border-dashed pb-1">
                                    <span>{ghat.ghatName}</span>
                                    <span className="font-mono font-bold">{ghat.capacityEst.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trends */}
                <div className="card">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-purple-500">📈</span> 5-Year Trends
                    </h3>
                    <div className="h-40 flex items-end justify-between px-2 gap-2">
                        {trendData.map(d => (
                            <div key={d.year} className="flex flex-col items-center w-full">
                                <div className="w-full flex gap-1 items-end justify-center h-full">
                                    <div
                                        className="w-3 bg-blue-400 rounded-t"
                                        style={{ height: `${(d.crowd / 600000) * 100}%` }}
                                        title={`Crowd: ${d.crowd}`}
                                    ></div>
                                    <div
                                        className="w-3 bg-amber-400 rounded-t"
                                        style={{ height: `${(d.incidents * 10) * 100}%` }} // Scaling incidents for visibility
                                        title={`Incidents: ${d.incidents}`}
                                    ></div>
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1">{d.year}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> Crowd</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full"></span> Incidents</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* What This Portal Demonstrates - Consolidated and smaller */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Planning Flow & Timeline</h2>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                            {stages.map((stage, index) => {
                                const hasNote = decisionNotes.some(n => n.stageTag === stage.tag);
                                return (
                                    <Link
                                        key={stage.tag}
                                        href={`/planning-flow?stage=${stage.tag}`}
                                        className={`relative p-2 rounded border hover:shadow-sm transition-all text-center flex flex-col items-center justify-center h-24 ${hasNote ? 'border-[#1e3a5f] bg-blue-50/50' : 'border-gray-200'
                                            }`}
                                    >
                                        <div className="text-xs font-bold text-gray-400 mb-1">Step {index + 1}</div>
                                        <div className="text-[10px] leading-tight font-medium text-gray-900">{stage.name}</div>
                                        {hasNote && <span className="mt-1 text-green-500 text-[10px]">✓</span>}
                                    </Link>
                                );
                            })}
                        </div>

                        {explainMode && (
                            <div className="explain-block mt-4">
                                <div className="explain-block-title">Why This Structure Matters</div>
                                <p className="text-sm text-gray-600">
                                    This portal provides a transparent audit trail for bandobast planning. By documenting what was done,
                                    how it was done, and why decisions were taken, we enable institutional learning and continuous improvement.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Latest Uploads */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Latest Uploads</h2>
                    {latestUploads.length > 0 ? (
                        <div className="space-y-3">
                            {latestUploads.map((upload) => (
                                <Link
                                    key={upload.id}
                                    href={`/evidence?id=${upload.id}`}
                                    className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{upload.title}</p>
                                            <p className="text-xs text-gray-500">{upload.category}</p>
                                        </div>
                                        <span className="stage-indicator text-[10px] px-2 py-1">
                                            <span className="stage-dot w-1.5 h-1.5"></span>
                                            {upload.stageTag.replace('_', ' ')}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state py-8">
                            <div className="empty-state-icon">📁</div>
                            <p className="text-sm text-gray-500">No uploads yet</p>
                        </div>
                    )}
                    <Link href="/evidence" className="btn btn-secondary w-full mt-4 text-sm">
                        View All Evidence
                    </Link>
                </div>
            </div>
        </div>
    );
}
