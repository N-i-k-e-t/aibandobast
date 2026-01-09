'use client';

const downloads = [
    {
        id: 'final-plan',
        title: 'Final Bandobast Plan 2025',
        description: 'Complete bandobast plan document for Ganpati Utsav 2025',
        icon: '📋',
        format: 'PDF',
        size: '2.4 MB',
        available: true,
    },
    {
        id: 'annexures',
        title: 'Annexures Package',
        description: 'All annexures and supporting documents in one package',
        icon: '📎',
        format: 'ZIP',
        size: '15.2 MB',
        available: true,
    },
    {
        id: 'ps-kml',
        title: 'PS-wise KML Package',
        description: 'Google Earth KML files organized by police station',
        icon: '🗺️',
        format: 'ZIP',
        size: '1.8 MB',
        available: true,
    },
    {
        id: 'city-kml',
        title: 'City KML',
        description: 'Complete city-wide KML file with all markers and zones',
        icon: '🌍',
        format: 'KML',
        size: '450 KB',
        available: true,
    },
    {
        id: 'evaluation-pack',
        title: 'Evaluation Pack',
        description: 'Complete documentation package for evaluation and audit',
        icon: '✅',
        format: 'ZIP',
        size: '25.6 MB',
        available: false,
    },
    {
        id: 'statistics-report',
        title: 'Statistics Report',
        description: 'Comprehensive statistics and analytics report',
        icon: '📊',
        format: 'PDF',
        size: '1.2 MB',
        available: false,
    },
];

export default function DownloadsPage() {
    const handleDownload = (id: string) => {
        // For KML downloads, redirect to API
        if (id === 'city-kml') {
            window.open('/api/kml?groupBy=city', '_blank');
        } else if (id === 'ps-kml') {
            window.open('/api/kml?groupBy=ps&format=zip', '_blank');
        } else {
            // Placeholder for other downloads
            alert('This download will be available once files are uploaded.');
        }
    };

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Downloads</h1>
                <p className="section-subtitle">
                    Download official documents, KML files, and reports
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloads.map(download => (
                    <div
                        key={download.id}
                        className={`card ${download.available ? 'card-hover cursor-pointer' : 'opacity-60'}`}
                        onClick={() => download.available && handleDownload(download.id)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl flex-shrink-0">{download.icon}</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 mb-1">{download.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">{download.description}</p>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                        {download.format}
                                    </span>
                                    <span className="text-xs text-gray-400">{download.size}</span>
                                    {!download.available && (
                                        <span className="text-xs text-amber-600">Coming soon</span>
                                    )}
                                </div>
                            </div>
                            {download.available && (
                                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Export Section */}
            <div className="card mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Export</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => window.open('/api/kml?groupBy=city&include=units', '_blank')}
                        className="btn btn-secondary justify-start"
                    >
                        <span className="text-lg mr-2">📍</span>
                        Export Units KML
                    </button>
                    <button
                        onClick={() => window.open('/api/kml?groupBy=city&include=routes', '_blank')}
                        className="btn btn-secondary justify-start"
                    >
                        <span className="text-lg mr-2">🛤️</span>
                        Export Routes KML
                    </button>
                    <button
                        onClick={() => window.open('/api/kml?groupBy=city&include=ghats', '_blank')}
                        className="btn btn-secondary justify-start"
                    >
                        <span className="text-lg mr-2">🏞️</span>
                        Export Ghats KML
                    </button>
                    <button
                        onClick={() => window.open('/api/kml?groupBy=city&include=zones', '_blank')}
                        className="btn btn-secondary justify-start"
                    >
                        <span className="text-lg mr-2">🔲</span>
                        Export Zones KML
                    </button>
                </div>
            </div>
        </div>
    );
}
