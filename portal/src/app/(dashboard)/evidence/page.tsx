'use client';

import { useState, useEffect } from 'react';

interface EvidenceFile {
    id: string;
    title: string;
    description: string | null;
    category: string;
    stageTag: string;
    fileUrl: string;
    fileType: string;
    tags: string;
    uploadedAt: string;
    policeStation?: { psName: string } | null;
}

const categories = ['ALL', 'LETTER', 'ANNEXURE', 'PDF', 'DOC', 'IMAGE', 'PPT', 'REPORT'];
const stages = ['ALL', 'STAGE_1', 'STAGE_2', 'STAGE_3', 'STAGE_4', 'STAGE_5', 'STAGE_6', 'STAGE_7'];

export default function EvidencePage() {
    const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedStage, setSelectedStage] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvidence, setSelectedEvidence] = useState<EvidenceFile | null>(null);

    useEffect(() => {
        fetch('/api/evidence')
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                setEvidence(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredEvidence = evidence.filter(e => {
        if (selectedCategory !== 'ALL' && e.category !== selectedCategory) return false;
        if (selectedStage !== 'ALL' && e.stageTag !== selectedStage) return false;
        if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'PDF': return '📄';
            case 'DOC': return '📝';
            case 'IMAGE': return '🖼️';
            case 'PPT': return '📊';
            case 'LETTER': return '✉️';
            case 'ANNEXURE': return '📎';
            case 'REPORT': return '📋';
            default: return '📁';
        }
    };

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Evidence Library</h1>
                <p className="section-subtitle">
                    All documentation, letters, and supporting evidence
                </p>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search evidence..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="input w-auto"
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                            className="input w-auto"
                        >
                            {stages.map(s => (
                                <option key={s} value={s}>{s === 'ALL' ? 'All Stages' : s.replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Evidence Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="card animate-pulse">
                            <div className="h-32 bg-gray-200 rounded mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : filteredEvidence.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredEvidence.map(e => (
                        <div
                            key={e.id}
                            className="card card-hover cursor-pointer"
                            onClick={() => setSelectedEvidence(e)}
                        >
                            <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg mb-3 flex items-center justify-center text-4xl">
                                {getCategoryIcon(e.category)}
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{e.title}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">{e.category}</span>
                                <span className="stage-indicator text-[10px] px-2 py-0.5">
                                    {e.stageTag.replace('_', ' ')}
                                </span>
                            </div>
                            {e.policeStation && (
                                <p className="text-xs text-gray-400 mt-2">{e.policeStation.psName}</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card">
                    <div className="empty-state py-12">
                        <div className="empty-state-icon">📁</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Evidence Found</h3>
                        <p className="text-sm text-gray-500">
                            {searchQuery || selectedCategory !== 'ALL' || selectedStage !== 'ALL'
                                ? 'Try adjusting your filters'
                                : 'Evidence files have not been uploaded yet'}
                        </p>
                    </div>
                </div>
            )}

            {/* Preview Drawer */}
            {selectedEvidence && (
                <>
                    <div className="drawer-overlay" onClick={() => setSelectedEvidence(null)} />
                    <div className="drawer open">
                        <div className="flex flex-col h-full">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Evidence Preview</h3>
                                <button
                                    onClick={() => setSelectedEvidence(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-4">
                                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                                    {selectedEvidence.fileType.includes('image') ? (
                                        <img src={selectedEvidence.fileUrl} alt={selectedEvidence.title} className="max-h-full max-w-full object-contain" />
                                    ) : selectedEvidence.fileType.includes('pdf') ? (
                                        <iframe src={selectedEvidence.fileUrl} className="w-full h-full" title={selectedEvidence.title} />
                                    ) : (
                                        <div className="text-center">
                                            <span className="text-6xl mb-4 block">{getCategoryIcon(selectedEvidence.category)}</span>
                                            <p className="text-sm text-gray-500">Preview not available</p>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">{selectedEvidence.title}</h2>
                                {selectedEvidence.description && (
                                    <p className="text-sm text-gray-600 mb-4">{selectedEvidence.description}</p>
                                )}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500">Category:</span>
                                        <span className="font-medium">{selectedEvidence.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500">Stage:</span>
                                        <span className="stage-indicator">{selectedEvidence.stageTag.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500">Uploaded:</span>
                                        <span>{new Date(selectedEvidence.uploadedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={selectedEvidence.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary flex-1"
                                    >
                                        Open File
                                    </a>
                                    <a
                                        href={selectedEvidence.fileUrl}
                                        download
                                        className="btn btn-secondary flex-1"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
