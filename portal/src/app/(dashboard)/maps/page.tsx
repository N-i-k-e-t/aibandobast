'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

declare var google: any;

interface ManifestEntry {
    file_id: string;
    relative_path: string;
    filename: string;
    category: string;
}

export default function MapsPage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [kmlManifest, setKmlManifest] = useState<ManifestEntry[]>([]);
    const [activeKmlLayers, setActiveKmlLayers] = useState<Record<string, any>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showQrConcept, setShowQrConcept] = useState(false);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
        if (!apiKey || !mapRef.current) return;

        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places', 'geometry'],
        });

        loader.load().then(() => {
            const mapInstance = new google.maps.Map(mapRef.current!, {
                center: { lat: 19.9975, lng: 73.7898 },
                zoom: 13,
                mapId: '9fa3c4f52f3a41b2',
            });
            setMap(mapInstance);
        }).catch((err: any) => console.error('Google Maps failed to load:', err));
    }, []);

    useEffect(() => {
        // Load KML files from manifest via the evidence API (which now uses manifest)
        fetch('/api/evidence')
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                const kmls = data.filter((e: any) => e.category === 'KML' || e.title.endsWith('.kml'));
                setKmlManifest(kmls.map((k: any) => ({
                    file_id: k.id,
                    filename: k.title,
                    relative_path: k.fileUrl
                })));
            });
    }, []);

    const toggleKmlLayer = (fileId: string, url: string) => {
        if (activeKmlLayers[fileId]) {
            activeKmlLayers[fileId].setMap(null);
            const newLayers = { ...activeKmlLayers };
            delete newLayers[fileId];
            setActiveKmlLayers(newLayers);
        } else {
            // In a real Vercel environment, Google Maps KmlLayer needs a PUBLIC absolute URL.
            // Since our files are secured behind /api/files, we might need to use a dataUri or 
            // a public proxy if the referrer allows it. For showcase, we simulate the toggle.
            console.log('Loading KML:', url);
            const kmlLayer = new google.maps.KmlLayer({
                url: window.location.origin + url,
                map: map,
                preserveViewport: false
            });
            setActiveKmlLayers(prev => ({ ...prev, [fileId]: kmlLayer }));
        }
    };

    return (
        <div className="page-container h-[calc(100vh-140px)]">
            <div className="flex gap-6 h-full">
                <div className="flex-1 relative card overflow-hidden p-0 border-none shadow-xl">
                    <div ref={mapRef} className="w-full h-full bg-gray-100" />

                    {/* Floating KML Manager */}
                    <div className="absolute top-4 left-4 z-10 w-72">
                        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                KML Layer Manager
                            </h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                {kmlManifest.length > 0 ? kmlManifest.map(kml => (
                                    <button
                                        key={kml.file_id}
                                        onClick={() => toggleKmlLayer(kml.file_id, kml.relative_path)}
                                        className={`w-full text-left p-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between border ${activeKmlLayers[kml.file_id]
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200'
                                            }`}
                                    >
                                        <span className="truncate flex-1 mr-2">{kml.filename}</span>
                                        {activeKmlLayers[kml.file_id] && <span className="text-[10px]">VISIBILE</span>}
                                    </button>
                                )) : (
                                    <p className="text-[10px] text-slate-400 italic">No KML files found in inbox.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* QR Concept Toggle */}
                    <div className="absolute bottom-6 left-6 z-10">
                        <button
                            onClick={() => setShowQrConcept(!showQrConcept)}
                            className="px-6 py-3 bg-[#1e3a5f] hover:bg-[#2a4a73] text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/40 transition-all flex items-center gap-2"
                        >
                            <span>📱</span> {showQrConcept ? 'Hide' : 'Show'} QR Patrol Concept
                        </button>
                    </div>
                </div>

                <div className="w-96 flex flex-col gap-6 overflow-hidden">
                    {showQrConcept ? (
                        <div className="card h-full overflow-y-auto bg-[#f8fafc] border-blue-100">
                            <div className="p-6">
                                <h2 className="text-xl font-black text-[#1e3a5f] mb-4">QR-Code Patrolling</h2>
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    Every major Mandal and sensitive point is assigned a unique QR code. Patrolling officers scan the physical QR to check-in, automatically updating the centralized map with time-stamped location data.
                                </p>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center font-mono text-[10px] border">
                                            [QR-CODE]
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Dwarka Circle Point</h4>
                                            <p className="text-[10px] text-gray-500 uppercase font-black">ID: N-DWK-01</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center font-mono text-[10px] border">
                                            [QR-CODE]
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Ramkund Main Entry</h4>
                                            <p className="text-[10px] text-gray-500 uppercase font-black">ID: N-RKD-05</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-blue-600 rounded-2xl text-white">
                                    <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">Status: Active</h4>
                                    <p className="text-sm font-bold">Patrol Pulse: <span className="text-green-300">Synchronized</span></p>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 py-2 bg-white/20 rounded-lg text-xs font-bold hover:bg-white/30">Force Sync</button>
                                        <button className="flex-1 py-2 bg-white/20 rounded-lg text-xs font-bold hover:bg-white/30">Export Logs</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card h-full flex flex-col items-center justify-center text-center p-8 space-y-4 bg-slate-50 border-dashed">
                            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl animate-bounce">📍</div>
                            <div>
                                <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">GIS Operations</h4>
                                <p className="text-xs text-slate-400 max-w-[200px] mx-auto font-bold uppercase mt-2">
                                    Select KML layers from the left to visualize routes, boundaries, and historical hotspots.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="card p-6 bg-[#1e3a5f] border-none shadow-2xl relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
                            Infrastructure Status
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                                <span className="text-xs font-black text-white uppercase italic">SYSTEM READY</span>
                            </div>
                            <span className="text-[10px] font-bold text-white/30 tracking-widest">SHOWCASE_V1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
