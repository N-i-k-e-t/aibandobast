'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stage {
    tag: string;
    name: string;
    had: string;
    considered: string;
    why: string;
    tools: string[];
}

interface Props {
    stages: Stage[];
    linkedFiles: any[]; // simplify types for brevity
}

export default function PlanningFlowClient({ stages, linkedFiles }: Props) {
    const [explainMode, setExplainMode] = useState(false);

    useEffect(() => {
        const handleExplainModeChange = (e: any) => setExplainMode(e.detail);
        window.addEventListener('explainModeChange', handleExplainModeChange as EventListener);
        return () => window.removeEventListener('explainModeChange', handleExplainModeChange as EventListener);
    }, []);

    return (
        <div className="page-container">
            <div className="mb-10">
                <h1 className="section-title text-[#144272]">7-Stage Bandobast Planning Protocol</h1>
                <p className="text-gray-500 max-w-3xl">
                    The end-to-end journey from raw ground data to the final Strategic Deployment Scheme.
                </p>
            </div>

            <div className="space-y-12 pb-20">
                {stages.map((stage, idx) => {
                    const files = linkedFiles.filter(m => m.stage_tag === stage.tag).slice(0, 3);
                    return (
                        <div key={stage.tag} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative group">
                            <div className="lg:col-span-1 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-2xl bg-[#1e3a5f] text-white flex items-center justify-center font-black shadow-lg">
                                    {idx + 1}
                                </div>
                                <div className="flex-1 w-0.5 bg-slate-200 mt-4 group-last:hidden h-24" />
                            </div>

                            <div className="lg:col-span-8">
                                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">{stage.name}</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">What we had</p>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{stage.had}</p>
                                    </div>
                                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">What we considered</p>
                                        <p className="text-sm text-blue-700 leading-relaxed font-medium">{stage.considered}</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Why we decided</p>
                                    <p className="text-lg font-bold text-gray-800 leading-snug">{stage.why}</p>
                                </div>

                                {explainMode && (
                                    <div className="mb-8 p-6 bg-amber-50 rounded-2xl border border-amber-200 animate-in fade-in duration-500">
                                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 text-center">Narrative Logic Overlay</p>
                                        <p className="text-xs text-amber-800 leading-relaxed text-center italic">
                                            "In this stage, the transition from raw historical data to tactical insights is critical. We used custom layout-aware OCR to ensure that the hand-drawn maps of {stage.tag} were correctly digitized into the KML manifest. This allows for Stage 3 mapping to be 100% accurate."
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {stage.tools.map(tool => (
                                        <span key={tool} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase rounded-lg">
                                            ⚙️ {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="card bg-[#f8fafc] border-slate-200 p-6">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Linked Evidence</h4>
                                    <div className="space-y-3">
                                        {files.length > 0 ? files.map(file => (
                                            <Link
                                                key={file.file_id}
                                                href={`/api/files/${file.file_id}`}
                                                target="_blank"
                                                className="block p-3 bg-white rounded-xl border border-slate-100 hover:border-blue-300 transition-colors shadow-sm"
                                            >
                                                <p className="text-[10px] font-bold text-gray-900 truncate">{file.filename}</p>
                                            </Link>
                                        )) : (
                                            <p className="text-[10px] text-gray-400 italic">No files linked to this stage.</p>
                                        )}
                                        <Link href="/evidence" className="text-[10px] font-black text-blue-600 hover:underline uppercase block text-center mt-2">
                                            View Library →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
