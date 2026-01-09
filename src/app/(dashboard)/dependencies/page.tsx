'use client';

import { useState } from 'react';

export default function DependenciesPage() {
    const [activeTab, setActiveTab] = useState('graph');

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Planning Dependencies & Thumb Rules</h1>
                <p className="section-subtitle">
                    The logic engine: How data points connect to create "Zero-Loss" safety decisions
                </p>
            </div>

            {/* Tabs */}
            <div className="tabs mb-6 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('graph')}
                    className={`tab whitespace-nowrap ${activeTab === 'graph' ? 'active' : ''}`}
                >
                    <span className="mr-2">🕸️</span>
                    Dependency Graph
                </button>
                <button
                    onClick={() => setActiveTab('thresholds')}
                    className={`tab whitespace-nowrap ${activeTab === 'thresholds' ? 'active' : ''}`}
                >
                    <span className="mr-2">📏</span>
                    Thresholds & Math
                </button>
                <button
                    onClick={() => setActiveTab('triggers')}
                    className={`tab whitespace-nowrap ${activeTab === 'triggers' ? 'active' : ''}`}
                >
                    <span className="mr-2">⚡</span>
                    If-This-Then-That
                </button>
            </div>

            {/* Content Areas */}
            {activeTab === 'graph' && (
                <div className="card mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Micro-to-Micro Dependency Logic</h2>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 overflow-x-auto min-h-[400px] flex items-center justify-center relative">
                        {/* CSS Flowchart */}
                        <div className="flex gap-4 items-center scale-90 md:scale-100">
                            {/* Init */}
                            <div className="flex flex-col gap-4">
                                <div className="p-3 bg-blue-100 border border-blue-300 rounded text-xs w-32 text-center font-bold">Event Unit<br /><span className="font-normal text-[10px]">(Loc + Crowd)</span></div>
                            </div>
                            <div className="text-gray-400">&#8594;</div>
                            {/* Risk */}
                            <div className="flex flex-col gap-4">
                                <div className="p-3 bg-amber-100 border border-amber-300 rounded text-xs w-32 text-center font-bold">Risk Tier<br /><span className="font-normal text-[10px]">(Score Calculation)</span></div>
                            </div>
                            <div className="text-gray-400">&#8594;</div>
                            {/* Route */}
                            <div className="flex flex-col gap-4">
                                <div className="p-3 bg-indigo-100 border border-indigo-300 rounded text-xs w-32 text-center font-bold">Route Plan<br /><span className="font-normal text-[10px]">(Width + Overlap)</span></div>
                            </div>
                            <div className="text-gray-400">&#8594;</div>
                            {/* Derived */}
                            <div className="flex flex-col gap-2">
                                <div className="p-3 bg-purple-100 border border-purple-300 rounded text-xs w-36 text-center shadow-sm">Static Points</div>
                                <div className="p-3 bg-purple-100 border border-purple-300 rounded text-xs w-36 text-center shadow-sm">Mobile Patrols</div>
                                <div className="p-3 bg-purple-100 border border-purple-300 rounded text-xs w-36 text-center shadow-sm">Ghat Assignment</div>
                            </div>
                            <div className="text-gray-400">&#8594;</div>
                            {/* Output */}
                            <div className="p-3 bg-green-100 border border-green-300 rounded text-xs w-32 text-center font-bold">Final Bandobast<br /><span className="font-normal text-[10px]">(Duty Charts)</span></div>
                        </div>

                        {/* Annotations */}
                        <div className="absolute top-4 right-4 text-xs text-gray-400 italic border px-2 py-1 rounded">
                            *Arrows indicate automatic data flow in system
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">Why It Matters</h3>
                            <p className="text-blue-800">
                                This isn&apos;t just a list. If <strong>Crowd Estimates</strong> change, the <strong>Risk Tier</strong> auto-updates,
                                forcing a recalculation of <strong>Resource Needs</strong>. One change ripples through the entire plan.
                            </p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded border border-amber-100">
                            <h3 className="font-bold text-amber-900 mb-2">Critical Dependency Example</h3>
                            <p className="text-amber-800">
                                <strong>Route Overlap</strong> + <strong>Peak Time</strong> = <strong>Merge Control Point</strong>.
                                <br />
                                Before this system, overlaps were manually spotted (and often missed). Now, logic flags them instantly.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'thresholds' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Scoring Formula</h2>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner">
                            <p>// Risk Score Calculation</p>
                            <p>Score = </p>
                            <p className="pl-4">(Crowd_Score * 0.30) + </p>
                            <p className="pl-4">(Route_Complexity * 0.20) + </p>
                            <p className="pl-4">(Sensitivity_Flag * 0.15) + </p>
                            <p className="pl-4">(History_Score * 0.20) + </p>
                            <p className="pl-4">(Time_Window_Peak * 0.15)</p>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p><strong>Crowd Score:</strong> Normalized 0-100 based on min/max estimates.</p>
                            <p><strong>Route Complexity:</strong> Count of chokepoints / turns.</p>
                            <p><strong>History Score:</strong> Weighted sum of past 10-year incidents.</p>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Operational Thresholds</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>Trigger Level</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-medium">Crowd Density</td>
                                        <td>&gt; 2,500 / unit</td>
                                        <td className="text-red-600 font-bold">Risk Tier &rarr; HIGH</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Chokepoints</td>
                                        <td>&gt; 2 per route</td>
                                        <td className="text-blue-600 font-bold">+1 Static Team</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Permissions</td>
                                        <td>Pending</td>
                                        <td className="text-amber-600 font-bold">Restrict Timing</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">History</td>
                                        <td>2+ Past Incidents</td>
                                        <td className="text-red-600 font-bold">Senior Supervision</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'triggers' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Example 1 */}
                        <div className="card border-l-4 border-l-red-500">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900">Scenario: High Crowd in Narrow Lane</h3>
                                <span className="bg-red-100 text-red-800 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">Real-World Logic</span>
                            </div>
                            <div className="text-sm space-y-3">
                                <div className="p-2 bg-gray-50 rounded">
                                    <span className="text-gray-500 block text-xs mb-1">Observation</span>
                                    Unit A has <strong>Crowd est. 3000</strong> AND Route Segment Width is <strong>&lt; 4m</strong>.
                                </div>
                                <div className="flex justify-center text-gray-400">&#8595;</div>
                                <div className="p-2 bg-red-50 rounded border border-red-100">
                                    <span className="text-red-500 block text-xs mb-1">Dependency Triggered</span>
                                    <strong>RiskScore</strong> crosses <strong>HIGH (75)</strong> threshold.
                                </div>
                                <div className="flex justify-center text-gray-400">&#8595;</div>
                                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                                    <span className="text-blue-500 block text-xs mb-1">Auto-Decision</span>
                                    System mandates: <strong>2 Extra Static Points</strong> + <strong>QRT Deployment within 500m</strong>.
                                </div>
                            </div>
                        </div>

                        {/* Example 2 */}
                        <div className="card border-l-4 border-l-amber-500">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900">Scenario: Route Overlap Conflict</h3>
                                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">Space-Time Logic</span>
                            </div>
                            <div className="text-sm space-y-3">
                                <div className="p-2 bg-gray-50 rounded">
                                    <span className="text-gray-500 block text-xs mb-1">Observation</span>
                                    Route A and Route B intersect at <strong>Panchavati Chowk</strong> between <strong>18:00 - 19:00</strong>.
                                </div>
                                <div className="flex justify-center text-gray-400">&#8595;</div>
                                <div className="p-2 bg-amber-50 rounded border border-amber-100">
                                    <span className="text-amber-500 block text-xs mb-1">Dependency Triggered</span>
                                    <strong>Conflict Index</strong> = <strong>CRITICAL</strong>.
                                </div>
                                <div className="flex justify-center text-gray-400">&#8595;</div>
                                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                                    <span className="text-blue-500 block text-xs mb-1">Auto-Decision</span>
                                    System suggests: <strong>Time Stagger (Route B +30 min)</strong> OR <strong>Joint Merge Control Point</strong>.
                                </div>
                            </div>
                        </div>

                        {/* Example 3 */}
                        <div className="card border-l-4 border-l-purple-500">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900">Scenario: Pending Permissions</h3>
                                <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">Compliance Logic</span>
                            </div>
                            <div className="text-sm space-y-3">
                                <div className="p-2 bg-gray-50 rounded">
                                    <span className="text-gray-500 block text-xs mb-1">Observation</span>
                                    Unit C has <strong>Permissions = PENDING</strong> 48 hours before event.
                                </div>
                                <div className="flex justify-center text-gray-400">&#8595;</div>
                                <div className="p-2 bg-purple-50 rounded border border-purple-100">
                                    <span className="text-purple-500 block text-xs mb-1">Dependency Triggered</span>
                                    <strong>Uncertainty Risk</strong> increases.
                                </div>
                                <div className="flex justify-center text-gray-400">&#8595;</div>
                                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                                    <span className="text-blue-500 block text-xs mb-1">Auto-Decision</span>
                                    System mandates: <strong>Restricted Time Window</strong> + <strong>Compliance Patrol Assignment</strong>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
