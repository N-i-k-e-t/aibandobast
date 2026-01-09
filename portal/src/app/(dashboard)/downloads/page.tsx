import { getManifest } from '@/lib/data';

export default function DownloadsPage() {
    const manifest = getManifest();

    const curatedPacks = [
        {
            title: "Historical Analysis Pack (2015-2024)",
            description: "A comprehensive PDF containing data analysis of the last 10 years of festivals.",
            icon: "📊",
            files: manifest.filter(m => m.filename.includes('2015-2024') || m.filename.includes('History'))
        },
        {
            title: "Police Station Deployment Packs",
            description: "Ready-to-print PDFs for individual police station commanders.",
            icon: "👮",
            files: manifest.filter(m => m.category === 'PS Pack').slice(0, 10)
        },
        {
            title: "GIS & Mapping Overlays",
            description: "KML files for export to Google Earth or other GIS software.",
            icon: "🗺️",
            files: manifest.filter(m => m.category === 'KML')
        },
        {
            title: "Mandal & Patrol Documentation",
            description: "Volunteer lists, mandal registrations with QR link references.",
            icon: "📜",
            files: manifest.filter(m => m.category === 'Mandal List')
        }
    ];

    return (
        <div className="page-container">
            <div className="mb-8">
                <h1 className="section-title">Curated Download Packs</h1>
                <p className="text-gray-500">
                    Ready-to-use documents and data exports for on-field commanders and administrative review.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {curatedPacks.map((pack, i) => (
                    <div key={i} className="card p-8 flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-sm border border-slate-100 italic">
                                {pack.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#1e3a5f]">{pack.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">{pack.description}</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-2 mb-6">
                            {pack.files.length > 0 ? (
                                pack.files.slice(0, 5).map(file => (
                                    <div key={file.file_id} className="flex items-center justify-between p-2 rounded bg-gray-50 text-xs">
                                        <span className="truncate flex-1 mr-4">{file.filename}</span>
                                        <a
                                            href={`/api/files/${file.file_id}`}
                                            download
                                            className="text-blue-600 font-bold hover:underline"
                                        >
                                            Download
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 italic">No files available in this category yet.</p>
                            )}
                            {pack.files.length > 5 && (
                                <p className="text-[10px] text-gray-400 text-center">+{pack.files.length - 5} more files</p>
                            )}
                        </div>

                        <button className="btn btn-secondary w-full text-sm py-3 border-2 border-dashed">
                            Generate Bulk Zip (Archive)
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 className="font-bold text-blue-900">Need a custom data export?</h3>
                    <p className="text-sm text-blue-700">Contact the portal administrator for specific year or PS-wise datasets.</p>
                </div>
                <a href="mailto:niketpatil1624@gmail.com" className="btn btn-primary">Request Custom Pack</a>
            </div>
        </div>
    );
}
