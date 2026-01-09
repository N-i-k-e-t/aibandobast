'use client';

import { useState } from 'react';

const playbooks = [
    {
        id: 'bandobast',
        name: 'Bandobast Planning Checklist',
        icon: '📋',
        items: [
            { label: 'Collect all mandal registration forms', done: true },
            { label: 'Verify mandal addresses against records', done: true },
            { label: 'Assign risk tiers to all units', done: true },
            { label: 'Map all units with GPS coordinates', done: true },
            { label: 'Confirm volunteer counts', done: false },
            { label: 'Document CCTV availability', done: false },
            { label: 'Verify permission status', done: false },
            { label: 'Prepare PS-wise summaries', done: true },
            { label: 'Generate final bandobast plan', done: false },
        ],
        mistakes: [
            'Not verifying addresses in person before finalizing',
            'Relying solely on historical data without current year verification',
            'Missing deadline for permission status update',
        ],
        evidenceTypes: ['Registration Forms', 'Address Verification Reports', 'GPS Mapping Sheets']
    },
    {
        id: 'risk',
        name: 'Risk Assessment Checklist',
        icon: '⚠️',
        items: [
            { label: 'Review past incident history', done: true },
            { label: 'Assess crowd size estimates', done: true },
            { label: 'Check sensitive location proximity', done: true },
            { label: 'Evaluate route complexity', done: false },
            { label: 'Verify volunteer adequacy', done: false },
            { label: 'Document special considerations', done: true },
            { label: 'Assign final risk tier', done: true },
            { label: 'Review with senior officers', done: false },
        ],
        mistakes: [
            'Underestimating crowd sizes based on mandal claims',
            'Not considering weather and timing factors',
            'Ignoring minor past incidents',
        ],
        evidenceTypes: ['Incident Reports', 'Crowd Estimation Reports', 'Risk Assessment Forms']
    },
    {
        id: 'route',
        name: 'Route Planning Checklist',
        icon: '🛤️',
        items: [
            { label: 'Map all procession routes', done: true },
            { label: 'Identify bottleneck points', done: true },
            { label: 'Calculate route distances', done: true },
            { label: 'Estimate timing windows', done: false },
            { label: 'Plan traffic diversions', done: false },
            { label: 'Coordinate with traffic police', done: false },
            { label: 'Mark emergency access points', done: true },
            { label: 'Test route accessibility', done: false },
        ],
        mistakes: [
            'Not accounting for multiple processions on same route',
            'Ignoring construction or road work',
            'Underestimating time for large processions',
        ],
        evidenceTypes: ['Route Maps', 'Traffic Plans', 'Coordination Letters']
    },
    {
        id: 'ghat',
        name: 'Ghat Safety Checklist',
        icon: '🏞️',
        items: [
            { label: 'Verify ghat structural safety', done: true },
            { label: 'Assess water depth and conditions', done: true },
            { label: 'Plan crowd barriers', done: false },
            { label: 'Arrange rescue equipment', done: false },
            { label: 'Deploy lifeguards/swimmers', done: false },
            { label: 'Setup medical first aid', done: true },
            { label: 'Install lighting for night operations', done: false },
            { label: 'Coordinate with municipal corporation', done: true },
        ],
        mistakes: [
            'Not testing equipment before event day',
            'Insufficient lighting for night immersions',
            'Inadequate crowd control at peak hours',
        ],
        evidenceTypes: ['Ghat Inspection Reports', 'Safety Certificates', 'Equipment Lists']
    },
    {
        id: 'coordination',
        name: 'Inter-Department Coordination Checklist',
        icon: '🤝',
        items: [
            { label: 'Coordinate with Municipal Corporation', done: true },
            { label: 'Liaise with Traffic Police', done: true },
            { label: 'Inform Fire Department', done: true },
            { label: 'Coordinate with Health Department', done: false },
            { label: 'Brief Electricity Department', done: false },
            { label: 'Inform District Administration', done: true },
            { label: 'Media coordination meeting', done: false },
            { label: 'Final inter-department briefing', done: false },
        ],
        mistakes: [
            'Last-minute coordination leaving no time for adjustments',
            'Not documenting verbal agreements',
            'Missing key stakeholders in meetings',
        ],
        evidenceTypes: ['Meeting Minutes', 'Coordination Letters', 'MOU Documents']
    }
];

export default function PlaybooksPage() {
    const [activeTab, setActiveTab] = useState('bandobast');
    const currentPlaybook = playbooks.find(p => p.id === activeTab);

    // Calculate progress (only for checklist tabs)
    const completedCount = currentPlaybook?.items.filter(i => i.done).length || 0;
    const totalCount = currentPlaybook?.items.length || 0;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Playbooks</h1>
                <p className="section-subtitle">
                    Standard checklists, thresholds, and thumb rules for bandobast planning
                </p>
            </div>

            {/* Tabs */}
            <div className="tabs mb-0 overflow-x-auto">
                {playbooks.map(playbook => (
                    <button
                        key={playbook.id}
                        onClick={() => setActiveTab(playbook.id)}
                        className={`tab whitespace-nowrap ${activeTab === playbook.id ? 'active' : ''}`}
                    >
                        <span className="mr-2">{playbook.icon}</span>
                        {playbook.name}
                    </button>
                ))}
                <button
                    onClick={() => setActiveTab('thumb_rules')}
                    className={`tab whitespace-nowrap ${activeTab === 'thumb_rules' ? 'active' : ''}`}
                >
                    <span className="mr-2">📏</span>
                    Thresholds & Thumb Rules
                </button>
            </div>

            {activeTab === 'thumb_rules' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Crowd Monitor */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-2xl">👥</span> Crowd Thresholds
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                <span className="font-medium text-green-900">Small</span>
                                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">0 – 500</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                                <span className="font-medium text-amber-900">Medium</span>
                                <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">501 – 2,500</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                <span className="font-medium text-red-900">Large</span>
                                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">2,501+</span>
                            </div>
                        </div>
                    </div>

                    {/* Risk Tier Boundaries */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-2xl">⚠️</span> Risk Tier Boundaries
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                <span className="font-medium text-green-900">LOW Risk</span>
                                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Score 0 – 34</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                                <span className="font-medium text-amber-900">MEDIUM Risk</span>
                                <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">Score 35 – 64</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                <span className="font-medium text-red-900">HIGH Risk</span>
                                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Score 65+</span>
                            </div>
                        </div>
                    </div>

                    {/* Operational Thumb Rules */}
                    <div className="lg:col-span-2">
                        <div className="card">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">⚡</span> Operational Thumb Rules
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-2">Chokepoint Rule</h3>
                                    <p className="text-sm text-gray-700">
                                        Every identified chokepoint must have <strong className="text-blue-700">+1 Static Point</strong> and barrier/rope management team.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-2">Overlap Rule</h3>
                                    <p className="text-sm text-gray-700">
                                        If 2+ routes overlap within the same time window ⇒ <strong className="text-blue-700">Stagger Time</strong> OR <strong className="text-blue-700">Add Merge Control Points</strong>.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-2">Compliance Rule</h3>
                                    <p className="text-sm text-gray-700">
                                        Pending permissions = <strong className="text-red-700">Increased Supervision</strong> + <strong className="text-red-700">Restricted Time Window</strong>.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-2">Terminal Safety Rule</h3>
                                    <p className="text-sm text-gray-700">
                                        Terminals (Ghats) require <strong className="text-blue-700">Extra Control Points</strong> + <strong className="text-blue-700">Medical</strong> + <strong className="text-blue-700">Queue Holding Areas</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : currentPlaybook ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Checklist */}
                    <div className="lg:col-span-2">
                        <div className="card">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <span>{currentPlaybook.icon}</span>
                                    {currentPlaybook.name}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {completedCount}/{totalCount} completed
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Checklist Items */}
                            <div className="space-y-2">
                                {currentPlaybook.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 p-3 rounded-lg ${item.done ? 'bg-green-50' : 'bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.done
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-gray-300'
                                            }`}>
                                            {item.done && (
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm ${item.done ? 'text-gray-700' : 'text-gray-900'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Common Mistakes */}
                        <div className="card">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-amber-500">⚠️</span>
                                Common Mistakes to Avoid
                            </h3>
                            <ul className="space-y-2">
                                {currentPlaybook.mistakes.map((mistake, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-red-500 mt-0.5">•</span>
                                        {mistake}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recommended Evidence */}
                        <div className="card">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-blue-500">📎</span>
                                Recommended Evidence
                            </h3>
                            <div className="space-y-2">
                                {currentPlaybook.evidenceTypes.map((type, i) => (
                                    <div key={i} className="px-3 py-2 bg-blue-50 rounded-lg text-sm text-gray-700">
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
