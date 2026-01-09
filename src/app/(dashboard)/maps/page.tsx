'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Declare google global to avoid TS build errors
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
    encodedPolyline: string | null;
}

interface Zone {
    id: string;
    zoneName: string;
    riskTier: string;
    polygonGeojson: string;
}

export default function MapsPage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [layers, setLayers] = useState({
        units: true,
        routes: true,
        ghats: true,
        zones: true,
    });
    const [units, setUnits] = useState<EventUnit[]>([]);
    const [ghats, setGhats] = useState<Ghat[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<{ type: string; data: EventUnit | Ghat | Route | Zone } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const markersRef = useRef<any[]>([]);
    const polylinesRef = useRef<any[]>([]);
    const polygonsRef = useRef<any[]>([]);

    // Initialize map
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
        if (!apiKey || !mapRef.current) {
            console.log('Google Maps API key not configured or map container not ready');
            return;
        }

        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places', 'geometry'],
        }) as any;

        loader.load().then(() => {
            const google = (window as any).google;
            if (!google) return;

            const mapInstance = new google.maps.Map(mapRef.current!, {
                center: { lat: 19.9975, lng: 73.7898 }, // Nashik center
                zoom: 12,
                styles: [
                    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
                    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
                ],
            });
            setMap(mapInstance);
        }).catch((err: any) => console.error('Google Maps failed to load:', err));
    }, []);

    // Fetch data
    useEffect(() => {
        Promise.all([
            fetch('/api/event-units').then(r => r.ok ? r.json() : []),
            fetch('/api/ghats').then(r => r.ok ? r.json() : []),
            fetch('/api/routes').then(r => r.ok ? r.json() : []),
            fetch('/api/zones').then(r => r.ok ? r.json() : []),
        ]).then(([u, g, r, z]) => {
            setUnits(u);
            setGhats(g);
            setRoutes(r);
            setZones(z);
        });
    }, []);

    // Update markers
    const updateMarkers = useCallback(() => {
        if (!map) return;
        const google = (window as any).google;
        if (!google) return;

        // Clear existing markers
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];
        polylinesRef.current.forEach(p => p.setMap(null));
        polylinesRef.current = [];
        polygonsRef.current.forEach(p => p.setMap(null));
        polygonsRef.current = [];

        // Event Units
        if (layers.units) {
            units.filter(u => u.latitude && u.longitude).forEach(unit => {
                const color = unit.riskTier === 'HIGH' ? '#ef4444' : unit.riskTier === 'MEDIUM' ? '#f59e0b' : '#22c55e';
                const marker = new google.maps.Marker({
                    position: { lat: unit.latitude!, lng: unit.longitude! },
                    map,
                    title: unit.unitName,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: color,
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
                        strokeColor: '#fff',
                        strokeWeight: 2,
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
                        path: [
                            { lat: route.startLat, lng: route.startLng },
                            { lat: route.endLat, lng: route.endLng },
                        ],
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
            zones.forEach(zone => {
                try {
                    const geojson = JSON.parse(zone.polygonGeojson);
                    const coords = geojson.coordinates?.[0]?.map((c: number[]) => ({ lat: c[1], lng: c[0] }));
                    if (coords) {
                        const color = zone.riskTier === 'HIGH' ? '#ef4444' : zone.riskTier === 'MEDIUM' ? '#f59e0b' : '#22c55e';
                        const polygon = new google.maps.Polygon({
                            paths: coords,
                            strokeColor: color,
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: color,
                            fillOpacity: 0.2,
                            map,
                        });
                        polygon.addListener('click', () => setSelectedEntity({ type: 'zone', data: zone }));
                        polygonsRef.current.push(polygon);
                    }
                } catch (e) {
                    console.error('Invalid zone geojson:', e);
                }
            });
        }
    }, [map, layers, units, ghats, routes, zones]);

    useEffect(() => {
        updateMarkers();
    }, [updateMarkers]);

    const handleExportKML = async (type: 'city' | 'ps') => {
        const url = type === 'city' ? '/api/kml?groupBy=city' : '/api/kml?groupBy=ps';
        window.open(url, '_blank');
    };

    return (
        <div className="page-container h-[calc(100vh-180px)]">
            <div className="flex gap-6 h-full">
                {/* Map */}
                <div className="flex-1 relative">
                    <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden bg-gray-100" />

                    {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="text-center p-8">
                                <div className="text-6xl mb-4">🗺️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Google Maps Not Configured</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your .env.local file
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Layer Controls */}
                    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Layers</h3>
                        <div className="space-y-2">
                            {[
                                { key: 'units', label: 'Event Units', color: 'bg-green-500' },
                                { key: 'routes', label: 'Routes', color: 'bg-purple-500' },
                                { key: 'ghats', label: 'Ghats', color: 'bg-blue-500' },
                                { key: 'zones', label: 'Zones', color: 'bg-amber-500' },
                            ].map(layer => (
                                <label key={layer.key} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={layers[layer.key as keyof typeof layers]}
                                        onChange={(e) => setLayers(prev => ({ ...prev, [layer.key]: e.target.checked }))}
                                        className="rounded border-gray-300"
                                    />
                                    <span className={`w-3 h-3 rounded-full ${layer.color}`} />
                                    <span className="text-sm text-gray-700">{layer.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Export Buttons */}
                    <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                        <button onClick={() => handleExportKML('city')} className="btn btn-primary text-sm">
                            📥 Export City KML
                        </button>
                        <button onClick={() => handleExportKML('ps')} className="btn btn-secondary text-sm">
                            📥 Export PS KML
                        </button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-80 flex-shrink-0 flex flex-col gap-4">
                    {/* Search */}
                    <div className="card p-4">
                        <input
                            type="text"
                            placeholder="Search location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>

                    {/* Selected Entity Details */}
                    <div className="card flex-1 overflow-auto">
                        {selectedEntity ? (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900 capitalize">{selectedEntity.type}</h3>
                                    <button onClick={() => setSelectedEntity(null)} className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {selectedEntity.type === 'unit' && (
                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900">{(selectedEntity.data as EventUnit).unitName}</h4>
                                        <div className={`badge badge-${(selectedEntity.data as EventUnit).riskTier.toLowerCase()}`}>
                                            {(selectedEntity.data as EventUnit).riskTier} Risk
                                        </div>
                                        <p className="text-sm text-gray-600">{(selectedEntity.data as EventUnit).address}</p>
                                        <p className="text-sm text-gray-500">PS: {(selectedEntity.data as EventUnit).policeStation.psName}</p>
                                    </div>
                                )}

                                {selectedEntity.type === 'ghat' && (
                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900">{(selectedEntity.data as Ghat).ghatName}</h4>
                                        <p className="text-sm text-gray-600">{(selectedEntity.data as Ghat).address}</p>
                                    </div>
                                )}

                                {selectedEntity.type === 'route' && (
                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900">{(selectedEntity.data as Route).routeName}</h4>
                                    </div>
                                )}

                                {selectedEntity.type === 'zone' && (
                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900">{(selectedEntity.data as Zone).zoneName}</h4>
                                        <div className={`badge badge-${(selectedEntity.data as Zone).riskTier.toLowerCase()}`}>
                                            {(selectedEntity.data as Zone).riskTier} Risk
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state py-8">
                                <div className="empty-state-icon">📍</div>
                                <p className="text-sm text-gray-500">Click on a map marker to view details</p>
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="card p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Risk Legend</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-sm text-gray-700">Low Risk</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500" />
                                <span className="text-sm text-gray-700">Medium Risk</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-sm text-gray-700">High Risk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
