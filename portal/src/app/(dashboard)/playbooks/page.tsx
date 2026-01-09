'use client';

import { useState } from 'react';

const tabs = [
    { id: 'CHECKLIST', name: 'Checklists' },
    { id: 'SCENARIOS', name: 'Scenario Library' },
];

const checklists = [
    {
        title: "Standard Bandobast Checklist",
        items: [
            "Verify mandal permissions & police clearance",
            "Confirm availability of CCTV coverage at main junctions",
            "Coordinate fire tender positioning with Fire Dept",
            "Medical team readiness at Ramkund and Tapovan",
            "Establish wireless communication relay points"
        ]
    },
    {
        title: "Ghat Safety & Immersion",
        items: [
            "Divers and life-boats deployed every 200m",
            "Lighting tower checks (back-up fuel verified)",
            "Barricade integrity check at river bank",
            "Megaphone/Public Announcement system test",
            "Separate entry/exit flow for VIPs and public"
        ]
    }
];

const scenarios = [
    {
        title: "Scenario Alpha: Heavy Rainfall during Peak",
        trigger: "Precipitation > 50mm within 2 hours on Day 10.",
        actions: [
            "Halt processions at designated 'Safe Zones'",
            "Divert lower-priority mandals to covered areas",
            "Activate emergency drainage clearing team",
            "Update public via automated Radio/App alerts"
        ],
        severity: "HIGH"
    },
    {
        title: "Scenario Beta: Medical Emergency in Crowd",
        trigger: "Heart rate monitor alert or crowd-crush report.",
        actions: [
            "Dispatch QRT team to coordinates immediately",
            "Clear 'Green Corridor' for ambulance movement",
            "Redirect pedestrian flow to bypass the incident",
            "Activate nearest hospital 'Code Red' protocol"
        ],
        severity: "CRITICAL"
    }
];

export default function PlaybooksPage() {
    const [activeTab, setActiveTab] = useState('CHECKLIST');

    return (
        <div className="page-container">
            <div className="mb-8">
                <h1 className="section-title">Playbook Library</h1>
                <p className="text-gray-500">
                    Pre-calculated response protocols for a predictable and safe festival environment.
                </p>
            </div>

            <div className="flex border-b border-gray-200 mb-8 space-x-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {activeTab === 'CHECKLIST' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {checklists.map((list, i) => (
                        <div key={i} className="card p-8">
                            <h3 className="text-lg font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
                                <span className="p-2 bg-blue-50 rounded-lg">✅</span> {list.title}
                            </h3>
                            <ul className="space-y-4">
                                {list.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3 group">
                                        <div className="w-5 h-5 rounded border border-gray-300 flex-shrink-0 mt-0.5 group-hover:border-blue-500 transition-colors"></div>
                                        <span className="text-sm text-gray-600 leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {scenarios.map((sc, i) => (
                        <div key={i} className={`card p-8 border-l-8 ${sc.severity === 'CRITICAL' ? 'border-l-red-600' : 'border-l-amber-500'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{sc.title}</h3>
                                    <p className="text-sm text-red-600 font-bold mt-1">Status: {sc.severity}</p>
                                </div>
                                <span className="btn btn-secondary btn-sm">Simulate →</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Trigger Event</h4>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{sc.trigger}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Immediate Responses</h4>
                                    <ul className="space-y-2">
                                        {sc.actions.map((act, j) => (
                                            <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                                {act}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
