'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

declare var google: any;

interface EventUnit {
    id: string;
    unitName: string;
    latitude: number | null;
    longitude: number | null;
    riskTier: string;
    address: string | null;
    policeStation: { psName: string };
}

interface Ghat {
    id: string;
    ghatName: string;
    latitude: number;
    longitude: number;
    address: string | null;
    capacityEst: number | null;
}

interface Route {
    id: string;
    routeName: string;
    startLat: number | null;
    startLng: number | null;
    endLat: number | null;
    endLng: number | null;
    routeType: string;
    timeStart: string | null;
    timeEnd: string | null;
}

interface Zone {
    id: string;
    zoneName: string;
    riskTier: string;
    polygonGeojson: string;
    zoneType: string;
}

interface DeploymentPost {
    id: string;
    postName: string;
    postType: string;
    latitude: number | null;
    longitude: number | null;
    riskTier: string;
    requiredPax: number;
}

export default function MapsPage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [layers, setLayers] = useState({
        units: true,
        routes: true,
        ghats: true,
        zones: true,
        posts: true,
    });

    const [units, setUnits] = useState<EventUnit[]>([]);
    const [ghats, setGhats] = useState<Ghat[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [posts, setPosts] = useState<DeploymentPost[]>([]);

    const [selectedEntity, setSelectedEntity] = useState<{ type: string; data: any } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const markersRef = useRef<any[]>([]);
    const polylinesRef = useRef<any[]>([]);
    const polygonsRef = useRef<any[]>([]);

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
                mapId: '9fa3c4f52f3a41b2', // Added for better rendering if available
                styles: [
                    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
                    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
                ],
            });
            setMap(mapInstance);
        }).catch((err: any) => console.error('Google Maps failed to load:', err));
    }, []);

    useEffect(() => {
        Promise.all([
            fetch('/api/event-units').then(r => r.ok ? r.json() : []),
            fetch('/api/ghats').then(r => r.ok ? r.json() : []),
            fetch('/api/routes').then(r => r.ok ? r.json() : []),
            fetch('/api/zones').then(r => r.ok ? r.json() : []),
            fetch('/api/deployment-posts').then(r => r.ok ? r.json() : []),
        ]).then(([u, g, r, z, p]) => {
            setUnits(u); setGhats(g); setRoutes(r); setZones(z); setPosts(p);
        });
    }, []);

    const updateMapElements = useCallback(() => {
        if (!map || !google) return;

        // Clear existing
        markersRef.current.forEach(m => m.setMap(null)); markersRef.current = [];
        polylinesRef.current.forEach(p => p.setMap(null)); polylinesRef.current = [];
        polygonsRef.current.forEach(p => p.setMap(null)); polygonsRef.current = [];

        const search = searchQuery.toLowerCase();

        // Units
        if (layers.units) {
            units
                .filter(u => u.latitude !== null && u.longitude !== null)
                .filter(u => u.unitName.toLowerCase().includes(search))
                .forEach(unit => {
                    const marker = new google.maps.Marker({
                        position: { lat: unit.latitude!, lng: unit.longitude! },
                        map,
                        title: unit.unitName,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: unit.riskTier === 'HIGH' ? '#ef4444' : '#f59e0b',
                            fillOpacity: 0.9,
                            strokeColor: '#fff',
                            strokeWeight: 2,
                            scale: 10,
                        },
                    });
                    marker.addListener('click', () => setSelectedEntity({ type: 'unit', data: unit }));
                    markersRef.current.push(marker);
                });
        }

        // Posts (JARVIS Deployment)
        if (layers.posts) {
            posts
                .filter(p => p.latitude !== null && p.longitude !== null)
                .filter(p => p.postName.toLowerCase().includes(search))
                .forEach(post => {
                    const marker = new google.maps.Marker({
                        position: { lat: post.latitude!, lng: post.longitude! },
                        map,
                        title: post.postName,
                        icon: {
                            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                            fillColor: '#1e3a5f',
                            fillOpacity: 1,
                            anchor: new google.maps.Point(12, 24),
                            strokeColor: '#fff',
                            strokeWeight: 2,
                            scale: 1.5,
                        },
                    });
                    marker.addListener('click', () => setSelectedEntity({ type: 'post', data: post }));
                    markersRef.current.push(marker);
                });
        }

        // Ghats
        if (layers.ghats) {
            ghats
                .filter(g => g.ghatName.toLowerCase().includes(search))
                .forEach(ghat => {
                    const marker = new google.maps.Marker({
                        position: { lat: ghat.latitude, lng: ghat.longitude },
                        map,
                        title: ghat.ghatName,
                        icon: {
                            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                            fillColor: '#3b82f6',
                            fillOpacity: 0.9,
                            strokeColor: '#fff',
                            strokeWeight: 1,
                            scale: 8,
                        },
                    });
                    marker.addListener('click', () => setSelectedEntity({ type: 'ghat', data: ghat }));
                    markersRef.current.push(marker);
                });
        }

        // Routes
        if (layers.routes) {
            routes
                .filter(r => r.routeName.toLowerCase().includes(search))
                .forEach(route => {
                    if (route.startLat !== null && route.startLng !== null && route.endLat !== null && route.endLng !== null) {
                        const polyline = new google.maps.Polyline({
                            path: [{ lat: route.startLat, lng: route.startLng }, { lat: route.endLat, lng: route.endLng }],
                            strokeColor: '#8b5cf6',
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                            map,
                        });
                        polyline.addListener('click', () => setSelectedEntity({ type: 'route', data: route }));
                        polylinesRef.current.push(polyline);
                    }
                });
        }

        // Zones
        if (layers.zones) {
            zones
                .filter(z => z.zoneName.toLowerCase().includes(search))
                .forEach(zone => {
                    try {
                        const geo = JSON.parse(zone.polygonGeojson);
                        const coords = geo.coordinates?.[0]?.map((c: any) => ({ lat: c[1], lng: c[0] }));
                        if (coords && coords.length > 0) {
                            const polygon = new google.maps.Polygon({
                                paths: coords,
                                fillColor: zone.riskTier === 'HIGH' ? '#ef4444' : '#f59e0b',
                                fillOpacity: 0.2,
                                strokeColor: zone.riskTier === 'HIGH' ? '#b91c1c' : '#b45309',
                                strokeWeight: 2,
                                map,
                            });
                            polygon.addListener('click', () => setSelectedEntity({ type: 'zone', data: zone }));
                            polygonsRef.current.push(polygon);
                        }
                    } catch (e) { }
                });
        }

    }, [map, layers, units, ghats, routes, zones, posts, searchQuery]);

    useEffect(() => { updateMapElements(); }, [updateMapElements]);

    return (
        <div className="page-container h-[calc(100vh-140px)]">
            <div className="flex gap-6 h-full">
                <div className="flex-1 relative card overflow-hidden p-0 border-none shadow-xl">
                    <div ref={mapRef} className="w-full h-full bg-gray-100" />

                    <div className="absolute top-4 left-4 z-10 space-y-2">
                        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 w-64">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                Map Operations Control
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'posts', label: 'Deployment Posts', color: 'bg-[#1e3a5f]' },
                                    { key: 'units', label: 'Event Units', color: 'bg-red-500' },
                                    { key: 'routes', label: 'Routes', color: 'bg-purple-500' },
                                    { key: 'ghats', label: 'Ghats', color: 'bg-blue-500' },
                                    { key: 'zones', label: 'Zones', color: 'bg-amber-500' },
                                ].map(layer => (
                                    <label key={layer.key} className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={layers[layer.key as keyof typeof layers]}
                                                onChange={(e) => setLayers(prev => ({ ...prev, [layer.key]: e.target.checked }))}
                                                className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                                            />
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${layer.color} shadow-sm`} />
                                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{layer.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 z-10 flex gap-3">
                        <button className="px-6 py-3 bg-[#1e3a5f] hover:bg-[#2a4a73] text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/40 transition-all flex items-center gap-2">
                            <span>�️</span> Export Strategic KML
                        </button>
                    </div>
                </div>

                <div className="w-96 flex flex-col gap-6">
                    <div className="card p-2 bg-white/50 backdrop-blur">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                            <input
                                placeholder="Search tactical assets..."
                                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="card flex-1 overflow-y-auto bg-slate-50/80 border-slate-200">
                        {selectedEntity ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-black text-[10px] tracking-widest uppercase">
                                        Asset Details: {selectedEntity.type}
                                    </span>
                                    <button onClick={() => setSelectedEntity(null)} className="w-8 h-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-full transition-colors">✕</button>
                                </div>

                                <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight">
                                    {selectedEntity.data.unitName || selectedEntity.data.postName || selectedEntity.data.routeName || selectedEntity.data.ghatName || selectedEntity.data.zoneName}
                                </h2>

                                <div className="space-y-3">
                                    {selectedEntity.type === 'post' && (
                                        <>
                                            <DetailItem label="Post Type" value={selectedEntity.data.postType} />
                                            <DetailItem label="Force Required" value={`${selectedEntity.data.requiredPax} PAX`} highlight />
                                            <DetailItem label="Risk Tier" value={selectedEntity.data.riskTier} color={selectedEntity.data.riskTier === 'HIGH' ? 'text-red-600' : 'text-green-600'} />
                                        </>
                                    )}
                                    {selectedEntity.type === 'unit' && (
                                        <>
                                            <DetailItem label="Police Station" value={selectedEntity.data.policeStation?.psName} />
                                            <DetailItem label="Risk Profile" value={selectedEntity.data.riskTier} color={selectedEntity.data.riskTier === 'HIGH' ? 'text-red-600' : 'text-green-600'} />
                                            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Address Location</p>
                                                <p className="text-sm font-bold text-slate-700">{selectedEntity.data.address || 'No address provided'}</p>
                                            </div>
                                        </>
                                    )}
                                    {selectedEntity.type === 'ghat' && (
                                        <>
                                            <DetailItem label="Immersion Capacity" value={`${selectedEntity.data.capacityEst || 2000} per hour`} highlight />
                                            <DetailItem label="Status" value="OPERATIONAL" color="text-green-600" />
                                        </>
                                    )}
                                    {selectedEntity.type === 'route' && (
                                        <>
                                            <DetailItem label="Route Type" value={selectedEntity.data.routeType} />
                                            <DetailItem label="Window" value={`${selectedEntity.data.timeStart} - ${selectedEntity.data.timeEnd}`} highlight />
                                        </>
                                    )}
                                    {selectedEntity.type === 'zone' && (
                                        <>
                                            <DetailItem label="Zone Category" value={selectedEntity.data.zoneType} />
                                            <DetailItem label="Admin Risk" value={selectedEntity.data.riskTier} highlight />
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl animate-bounce">�️</div>
                                <div>
                                    <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">Intelligence Map</h4>
                                    <p className="text-xs text-slate-400 max-w-[200px] mx-auto font-bold uppercase mt-2">Tap any asset on the map to view technical specs and resource gaps.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="card p-6 bg-[#1e3a5f] border-none shadow-2xl relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
                            System Connectivity
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                                <span className="text-xs font-black text-white uppercase italic">PRISMA SYNCED</span>
                            </div>
                            <span className="text-[10px] font-bold text-white/30 tracking-widest">v2.4.1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, highlight, color }: { label: string, value: string, highlight?: boolean, color?: string }) {
    return (
        <div className={`flex justify-between items-center p-4 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md cursor-default`}>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
            <span className={`text-sm font-black ${highlight ? 'text-blue-600' : (color || 'text-slate-900')}`}>{value || 'N/A'}</span>
        </div>
    );
}
