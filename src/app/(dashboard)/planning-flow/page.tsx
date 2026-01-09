'use client';

import { useState, useEffect } from 'react';

const stages = [
    { tag: 'STAGE_1', name: 'Ground Reality & Inputs', icon: '📊' },
    { tag: 'STAGE_2', name: 'Risk-Based Thinking', icon: '⚠️' },
    { tag: 'STAGE_3', name: 'Spatial & Jurisdictional Mapping (GIS)', icon: '🗺️' },
    { tag: 'STAGE_4', name: 'Route & Time Window Logic', icon: '🛤️' },
    { tag: 'STAGE_5', name: 'Ghat & Terminal Planning', icon: '🏞️' },
    { tag: 'STAGE_6', name: 'Resource & Bandobast Planning', icon: '👮' },
    { tag: 'STAGE_7', name: 'Outputs & Documentation', icon: '📄' },
];

interface DecisionNote {
    id: string;
    stageTag: string;
    title: string;
    whatWeHad: string;
    whatWeConsidered: string;
    whyWeDecided: string;
    evidenceLinks: string;
    aiGisAssistNote: string | null;
}

interface Evidence {
    id: string;
    title: string;
    category: string;
    fileUrl: string;
}

export default function PlanningFlowPage() {
    const [selectedStage, setSelectedStage] = useState('STAGE_1');
    const [decisionNotes, setDecisionNotes] = useState<DecisionNote[]>([]);
    const [evidence, setEvidence] = useState<Evidence[]>([]);
    const [explainMode, setExplainMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleExplainModeChange = (e: CustomEvent) => {
            setExplainMode(e.detail);
        };
        window.addEventListener('explainModeChange', handleExplainModeChange as EventListener);
        return () => window.removeEventListener('explainModeChange', handleExplainModeChange as EventListener);
    }, []);

    useEffect(() => {
        // Fetch decision notes and evidence
        Promise.all([
            fetch('/api/decision-notes').then(r => r.ok ? r.json() : []),
            fetch('/api/evidence').then(r => r.ok ? r.json() : [])
        ]).then(([notes, evid]) => {
            setDecisionNotes(notes);
            setEvidence(evid);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const currentNote = decisionNotes.find(n => n.stageTag === selectedStage);
    const currentStage = stages.find(s => s.tag === selectedStage);
    const stageEvidence = evidence.filter(e => {
        if (!currentNote) return false;
        const links = JSON.parse(currentNote.evidenceLinks || '[]');
        return links.includes(e.id);
    });

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Planning Flow</h1>
                <p className="section-subtitle">
                    Step-by-step decision documentation with rationale
                </p>
            </div>

            <div className="flex gap-6">
                {/* Stage Selector */}
                <div className="w-72 flex-shrink-0">
                    <div className="card p-4">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Stages</h2>
                        <div className="space-y-2">
                            {stages.map((stage, index) => {
                                const hasNote = decisionNotes.some(n => n.stageTag === stage.tag);
                                const isSelected = selectedStage === stage.tag;
                                return (
                                    <button
                                        key={stage.tag}
                                        onClick={() => setSelectedStage(stage.tag)}
                                        className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 ${isSelected
                                                ? 'bg-[#1e3a5f] text-white'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <span className="text-lg">{stage.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-bold ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                                                    Stage {index + 1}
                                                </span>
                                                {hasNote && (
                                                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-green-400' : 'bg-green-500'}`} />
                                                )}
                                            </div>
                                            <p className={`text-sm font-medium mt-0.5 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                                {stage.name}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Stage Detail */}
                <div className="flex-1">
                    {loading ? (
                        <div className="card">
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ) : currentNote ? (
                        <div className="space-y-6">
                            <div className="card">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{currentStage?.icon}</span>
                                    <div>
                                        <h2 className="text-xl font-semibold text-[#1e3a5f]">{currentNote.title}</h2>
                                        <p className="text-sm text-gray-500">{currentStage?.name}</p>
                                    </div>
                                </div>

                                {/* What We Had */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs">📋</span>
                                        What We Had
                                    </h3>
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentNote.whatWeHad}</p>
                                    </div>
                                </div>

                                {/* What We Considered */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 bg-amber-100 rounded flex items-center justify-center text-xs">🤔</span>
                                        What We Considered
                                    </h3>
                                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentNote.whatWeConsidered}</p>
                                    </div>
                                </div>

                                {/* Why We Decided */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-xs">✅</span>
                                        Why We Decided
                                    </h3>
                                    <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentNote.whyWeDecided}</p>
                                    </div>
                                </div>

                                {/* AI/GIS Assistance Note */}
                                {currentNote.aiGisAssistNote && (
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <span className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-xs">🤖</span>
                                            AI/GIS Assistance
                                        </h3>
                                        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentNote.aiGisAssistNote}</p>
                                        </div>
                                    </div>
                                )}

                                {explainMode && (
                                    <div className="explain-block">
                                        <div className="explain-block-title">Understanding This Stage</div>
                                        <p className="text-sm text-gray-600">
                                            Each stage in the planning flow documents the inputs available, the factors considered during
                                            decision-making, and the rationale for the final decision. This creates an auditable trail
                                            that can be reviewed for accountability and institutional learning.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Evidence Attached */}
                            {stageEvidence.length > 0 && (
                                <div className="card">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Evidence Attached</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {stageEvidence.map(e => (
                                            <a
                                                key={e.id}
                                                href={e.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <p className="text-sm font-medium text-gray-900 truncate">{e.title}</p>
                                                <p className="text-xs text-gray-500">{e.category}</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="card">
                            <div className="empty-state py-12">
                                <div className="empty-state-icon">📝</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Decision Note for This Stage</h3>
                                <p className="text-sm text-gray-500">
                                    Decision notes for {currentStage?.name} have not been documented yet.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
