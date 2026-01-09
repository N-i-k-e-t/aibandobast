'use client';

import { useState, useEffect } from 'react';

interface ArchiveYear {
    id: string;
    year: number;
    eventName: string;
    totalUnits: number;
    totalRoutes: number;
    totalGhats: number;
    totalPoliceStations: number;
    estimatedCrowd: number;
    incidentsReported: number;
    resourcesDeployed: number;
    notes: string | null;
    documentsJson: string;
}

const years = Array.from({ length: 11 }, (_, i) => 2015 + i);

export default function ArchivePage() {
    const [archiveData, setArchiveData] = useState<ArchiveYear[]>([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [compareMode, setCompareMode] = useState(false);
    const [compareYear, setCompareYear] = useState(2024);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/archive')
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                setArchiveData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const selectedData = archiveData.find(d => d.year === selectedYear);
    const compareData = archiveData.find(d => d.year === compareYear);

    const getChangeIndicator = (current: number, previous: number) => {
        if (current > previous) return { icon: '↑', color: 'text-green-500', percent: ((current - previous) / previous * 100).toFixed(1) };
        if (current < previous) return { icon: '↓', color: 'text-red-500', percent: ((previous - current) / previous * 100).toFixed(1) };
        return { icon: '→', color: 'text-gray-500', percent: '0' };
    };

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">10-Year Archive</h1>
                <p className="section-subtitle">
                    Historical data from 2015 to 2025
                </p>
            </div>

            {/* Year Selector */}
            <div className="card mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">Year:</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="input w-auto"
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={compareMode}
                                onChange={(e) => setCompareMode(e.target.checked)}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Compare Mode</span>
                        </label>

                        {compareMode && (
                            <select
                                value={compareYear}
                                onChange={(e) => setCompareYear(Number(e.target.value))}
                                className="input w-auto"
                            >
                                {years.filter(y => y !== selectedYear).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="card">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Summary Table */}
                    <div className="card mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>{selectedYear}</th>
                                        {compareMode && <th>{compareYear}</th>}
                                        {compareMode && <th>Change</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { label: 'Total Event Units', key: 'totalUnits' },
                                        { label: 'Total Routes', key: 'totalRoutes' },
                                        { label: 'Total Ghats', key: 'totalGhats' },
                                        { label: 'Police Stations', key: 'totalPoliceStations' },
                                        { label: 'Estimated Crowd', key: 'estimatedCrowd' },
                                        { label: 'Incidents Reported', key: 'incidentsReported' },
                                        { label: 'Resources Deployed', key: 'resourcesDeployed' },
                                    ].map(metric => {
                                        const currentValue = selectedData ? (selectedData[metric.key as keyof ArchiveYear] as number) : 0;
                                        const compareValue = compareData ? (compareData[metric.key as keyof ArchiveYear] as number) : 0;
                                        const change = compareMode && compareValue ? getChangeIndicator(currentValue, compareValue) : null;

                                        return (
                                            <tr key={metric.key}>
                                                <td className="font-medium">{metric.label}</td>
                                                <td>{currentValue.toLocaleString()}</td>
                                                {compareMode && <td>{compareValue.toLocaleString()}</td>}
                                                {compareMode && (
                                                    <td className={change?.color}>
                                                        {change ? `${change.icon} ${change.percent}%` : '-'}
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Trend Charts Placeholder */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="card">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Crowd Trend</h3>
                            <div className="h-48 bg-gradient-to-t from-blue-100 to-white rounded-lg flex items-end justify-around px-4 pb-4">
                                {years.slice(-5).map(y => {
                                    const data = archiveData.find(d => d.year === y);
                                    const height = data ? Math.min((data.estimatedCrowd / 1000000) * 100, 100) : 20;
                                    return (
                                        <div key={y} className="flex flex-col items-center gap-2">
                                            <div
                                                className="w-8 bg-blue-500 rounded-t transition-all"
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-xs text-gray-500">{y}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Incident Trend</h3>
                            <div className="h-48 bg-gradient-to-t from-amber-100 to-white rounded-lg flex items-end justify-around px-4 pb-4">
                                {years.slice(-5).map(y => {
                                    const data = archiveData.find(d => d.year === y);
                                    const height = data ? Math.min(data.incidentsReported * 10, 100) : 20;
                                    return (
                                        <div key={y} className="flex flex-col items-center gap-2">
                                            <div
                                                className="w-8 bg-amber-500 rounded-t transition-all"
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-xs text-gray-500">{y}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resource Trend</h3>
                            <div className="h-48 bg-gradient-to-t from-green-100 to-white rounded-lg flex items-end justify-around px-4 pb-4">
                                {years.slice(-5).map(y => {
                                    const data = archiveData.find(d => d.year === y);
                                    const height = data ? Math.min((data.resourcesDeployed / 100) * 100, 100) : 20;
                                    return (
                                        <div key={y} className="flex flex-col items-center gap-2">
                                            <div
                                                className="w-8 bg-green-500 rounded-t transition-all"
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-xs text-gray-500">{y}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attached Documents for {selectedYear}</h2>
                        {selectedData ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {JSON.parse(selectedData.documentsJson || '[]').length > 0 ? (
                                    JSON.parse(selectedData.documentsJson).map((doc: { title: string; url: string }, i: number) => (
                                        <a
                                            key={i}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-2xl mb-2 block">📄</span>
                                            <span className="text-sm font-medium text-gray-900">{doc.title}</span>
                                        </a>
                                    ))
                                ) : (
                                    <div className="col-span-full empty-state py-8">
                                        <div className="empty-state-icon">📁</div>
                                        <p className="text-sm text-gray-500">No documents attached for this year</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state py-8">
                                <div className="empty-state-icon">📊</div>
                                <p className="text-sm text-gray-500">No archive data available for {selectedYear}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
