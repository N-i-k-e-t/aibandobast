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
}

interface Route {
    id: string;
    routeName: string;
    startLat: number | null;
    startLng: number | null;
    endLat: number | null;
    endLng: number | null;
}

interface Zone {
    id: string;
    zoneName: string;
    riskTier: string;
    polygonGeojson: string;
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
                zoom: 12,
                styles: [
                    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
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
        if (!map) return;

        // Clear existing
        markersRef.current.forEach(m => m.setMap(null)); markersRef.current = [];
        polylinesRef.current.forEach(p => p.setMap(null)); polylinesRef.current = [];
        polygonsRef.current.forEach(p => p.setMap(null)); polygonsRef.current = [];

        // Units
        if (layers.units) {
            units.filter(u => u.latitude && u.longitude).forEach(unit => {
                const marker = new google.maps.Marker({
                    position: { lat: unit.latitude!, lng: unit.longitude! },
                    map,
                    title: unit.unitName,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: unit.riskTier === 'HIGH' ? '#ef4444' : '#f59e0b',
                        fillOpacity: 0.9,
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
            posts.filter(p => p.latitude && p.longitude).forEach(post => {
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
            ghats.forEach(ghat => {
                const marker = new google.maps.Marker({
                    position: { lat: ghat.latitude, lng: ghat.longitude },
                    map,
                    title: ghat.ghatName,
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        fillColor: '#3b82f6',
                        fillOpacity: 0.9,
                        scale: 8,
                    },
                });
                marker.addListener('click', () => setSelectedEntity({ type: 'ghat', data: ghat }));
                markersRef.current.push(marker);
            });
        }

        // Routes
        if (layers.routes) {
            routes.forEach(route => {
                if (route.startLat && route.startLng && route.endLat && route.endLng) {
                    const polyline = new google.maps.Polyline({
                        path: [{ lat: route.startLat, lng: route.startLng }, { lat: route.endLat, lng: route.endLng }],
                        strokeColor: '#8b5cf6',
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
            zones.forEach(zone => {
                try {
                    const coords = JSON.parse(zone.polygonGeojson).coordinates?.[0]?.map((c: any) => ({ lat: c[1], lng: c[0] }));
                    if (coords) {
                        const polygon = new google.maps.Polygon({
                            paths: coords,
                            fillColor: zone.riskTier === 'HIGH' ? '#ef4444' : '#f59e0b',
                            fillOpacity: 0.2,
                            strokeWeight: 1,
                            map,
                        });
                        polygon.addListener('click', () => setSelectedEntity({ type: 'zone', data: zone }));
                        polygonsRef.current.push(polygon);
                    }
                } catch (e) { }
            });
        }

    }, [map, layers, units, ghats, routes, zones, posts]);

    useEffect(() => { updateMapElements(); }, [updateMapElements]);

    return (
        <div className="page-container h-[calc(100vh-140px)]">
            <div className="flex gap-6 h-full">
                <div className="flex-1 relative card overflow-hidden p-0 border-none shadow-xl">
                    <div ref={mapRef} className="w-full h-full bg-gray-100" />

                    <div className="absolute top-4 left-4 z-10 space-y-2">
                        <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Map Layers</h3>
                            <div className="space-y-2">
                                {[
                                    { key: 'posts', label: 'Deployment Posts', color: 'bg-[#1e3a5f]' },
                                    { key: 'units', label: 'Event Units', color: 'bg-red-500' },
                                    { key: 'routes', label: 'Routes', color: 'bg-purple-500' },
                                    { key: 'ghats', label: 'Ghats', color: 'bg-blue-500' },
                                    { key: 'zones', label: 'Zones', color: 'bg-amber-500' },
                                ].map(layer => (
                                    <label key={layer.key} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={layers[layer.key as keyof typeof layers]}
                                                onChange={(e) => setLayers(prev => ({ ...prev, [layer.key]: e.target.checked }))}
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>
                                        <span className={`w-2 h-2 rounded-full ${layer.color}`} />
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">{layer.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                        <button className="btn btn-primary shadow-xl">📥 Export Full KML</button>
                    </div>
                </div>

                <div className="w-96 flex flex-col gap-4">
                    <div className="card p-4">
                        <input
                            placeholder="Search units or posts..."
                            className="input bg-slate-50 border-none text-sm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="card flex-1 overflow-y-auto bg-slate-50/50">
                        {selectedEntity ? (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="badge bg-blue-100 text-blue-700 uppercase font-bold text-[10px]">{selectedEntity.type}</span>
                                    <button onClick={() => setSelectedEntity(null)} className="text-slate-400 hover:text-black transition-colors">✕</button>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 mb-2">
                                    {selectedEntity.data.unitName || selectedEntity.data.postName || selectedEntity.data.routeName || selectedEntity.data.ghatName || selectedEntity.data.zoneName}
                                </h2>

                                <div className="space-y-4">
                                    {selectedEntity.type === 'post' && (
                                        <>
                                            <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-100 italic text-sm">
                                                <span>Type:</span> <span className="font-bold">{selectedEntity.data.postType}</span>
                                            </div>
                                            <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-100 italic text-sm">
                                                <span>Required Pax:</span> <span className="font-bold text-blue-600">{selectedEntity.data.requiredPax}</span>
                                            </div>
                                            <div className={`p-3 rounded-lg border italic text-sm font-bold text-center ${selectedEntity.data.riskTier === 'HIGH' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-green-50 border-green-100 text-green-700'}`}>
                                                {selectedEntity.data.riskTier} RISK AREA
                                            </div>
                                        </>
                                    )}
                                    {selectedEntity.type === 'unit' && (
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
                                            <p className="text-sm text-slate-600"><strong>Address:</strong> {selectedEntity.data.address}</p>
                                            <p className="text-sm text-slate-600"><strong>Risk Tier:</strong> {selectedEntity.data.riskTier}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">📍</div>
                                <h4 className="font-bold text-slate-400">Tactical Map View</h4>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">Select any marker or layer to inspect coordinates and resource allocations.</p>
                            </div>
                        )}
                    </div>

                    <div className="card p-4 bg-[var(--color-primary-dark)] text-white">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Live Feed Status</h4>
                        <div className="flex items-center gap-2 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Connected to GIS Server
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
