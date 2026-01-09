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

interface Props {
    stats: Stats;
    latestUploads: Upload[];
    decisionNotes: DecisionNote[];
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

export default function OverviewClient({ stats, latestUploads, decisionNotes }: Props) {
    const [explainMode, setExplainMode] = useState(false);

    useEffect(() => {
        const handleExplainModeChange = (e: CustomEvent) => {
            setExplainMode(e.detail);
        };
        window.addEventListener('explainModeChange', handleExplainModeChange as EventListener);
        return () => window.removeEventListener('explainModeChange', handleExplainModeChange as EventListener);
    }, []);

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* What This Portal Demonstrates */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">What This Portal Demonstrates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium text-gray-900">What</h3>
                                </div>
                                <p className="text-sm text-gray-600">Complete bandobast planning documentation for Ganpati Utsav 2025 with all evidence and decisions recorded.</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium text-gray-900">How</h3>
                                </div>
                                <p className="text-sm text-gray-600">Step-by-step 7-stage planning flow with inputs, considerations, and outputs at each stage.</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium text-gray-900">Why</h3>
                                </div>
                                <p className="text-sm text-gray-600">Decision rationale documented for every major choice, ensuring transparency and accountability.</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium text-gray-900">AI + GIS</h3>
                                </div>
                                <p className="text-sm text-gray-600">AI provided assistive analysis; GIS enabled spatial visualization. All decisions made by officers.</p>
                            </div>
                        </div>

                        {explainMode && (
                            <div className="explain-block mt-4">
                                <div className="explain-block-title">Why This Structure Matters</div>
                                <p className="text-sm text-gray-600">
                                    This portal provides a transparent audit trail for bandobast planning. By documenting what was done,
                                    how it was done, and why decisions were taken, we enable institutional learning, evaluation by
                                    oversight bodies, and continuous improvement in future planning cycles.
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

            {/* Planning Flow Timeline */}
            <div className="card mt-6">
                <h2 className="text-lg font-semibold text-[#1e3a5f] mb-6">Planning Flow Timeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {stages.map((stage, index) => {
                        const hasNote = decisionNotes.some(n => n.stageTag === stage.tag);
                        return (
                            <Link
                                key={stage.tag}
                                href={`/planning-flow?stage=${stage.tag}`}
                                className={`relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${hasNote ? 'border-[#1e3a5f] bg-[#1e3a5f]/5' : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className={`absolute -top-3 left-4 px-2 py-0.5 text-xs font-bold rounded ${hasNote ? 'bg-[#1e3a5f] text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    Stage {index + 1}
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 mt-2 mb-1 line-clamp-2">{stage.name}</h3>
                                <p className="text-xs text-gray-500 line-clamp-2">{stage.description}</p>
                                {hasNote && (
                                    <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Documented
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {explainMode && (
                    <div className="explain-block mt-6">
                        <div className="explain-block-title">Understanding the 7-Stage Planning Flow</div>
                        <p className="text-sm text-gray-600">
                            Bandobast planning follows a structured 7-stage approach: gathering ground reality, applying risk-based
                            thinking, mapping jurisdictions with GIS, planning routes and timing, organizing ghats, allocating
                            resources, and generating final documentation. Each stage builds on the previous, creating a comprehensive
                            and auditable planning record.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
