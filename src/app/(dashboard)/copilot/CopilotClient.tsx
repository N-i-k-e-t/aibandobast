'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { chatWithCopilot, CopilotResponse, MapAction, PlanAction } from '../../actions/copilot';

declare var google: any;

export default function CopilotClient() {
    const [messages, setMessages] = useState<{
        role: 'user' | 'assistant',
        content: string,
        action?: MapAction | PlanAction
    }[]>([
        { role: 'assistant', content: "Hello Officer. I am JARVIS. I can filter maps, simulate scenarios, plan resources, and highlight risks. Try asking: 'Simulate stampede scenario' or 'Plan water for Panchavati'." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Map state
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const markersRef = useRef<any[]>([]);
    const circlesRef = useRef<any[]>([]);

    // Initialize Map
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
            version: 'weekly',
            libraries: ['places', 'geometry'],
        });

        loader.load().then(() => {
            if (!mapRef.current) return;
            const mapInstance = new google.maps.Map(mapRef.current, {
                center: { lat: 19.9975, lng: 73.7898 },
                zoom: 12,
                styles: [
                    { featureType: 'poi', stylers: [{ visibility: 'off' }] }
                ]
            });
            setMap(mapInstance);
            loadMockMarkers(mapInstance);
        }).catch(e => console.error("Map load error", e));
    }, []);

    const loadMockMarkers = (mapInstance: any) => {
        const units = [
            { lat: 20.0073, lng: 73.7914, title: 'Ramkund', risk: 'HIGH', ps: 'Panchavati' },
            { lat: 19.95, lng: 73.80, title: 'Adgaon Naka', risk: 'HIGH', ps: 'Adgaon' },
            { lat: 19.96, lng: 73.81, title: 'Sarvajanik Mitra Mandal', risk: 'HIGH', ps: 'Adgaon' },
            { lat: 19.9975, lng: 73.7898, title: 'Bhadrakali Point', risk: 'MEDIUM', ps: 'Bhadrakali' },
        ];

        units.forEach(u => {
            const marker = new google.maps.Marker({
                position: { lat: u.lat, lng: u.lng },
                map: mapInstance,
                title: u.title,
                metadata: { risk: u.risk, ps: u.ps },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: u.risk === 'HIGH' ? '#ef4444' : '#f59e0b',
                    fillOpacity: 0.9,
                    strokeWeight: 1,
                    scale: 8,
                }
            });
            markersRef.current.push(marker);
        });
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const result = await chatWithCopilot(userMsg);

            // If there's an action, we attach it to the message for approval
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: result.text,
                action: result.mapAction || result.planAction
            }]);

            // Auto-execute purely visual map actions if desired, 
            // but for "Plan" actions we wait for click.
            if (result.mapAction && map) {
                executeMapAction(result.mapAction);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered a system error." }]);
        } finally {
            setLoading(false);
        }
    };

    const executeMapAction = (action: MapAction) => {
        if (!map) return;
        console.log("Executing Action:", action);

        if (action.type === 'FILTER') {
            const { riskTier, psName } = action.payload;
            markersRef.current.forEach(marker => {
                const meta = marker.metadata;
                let visible = true;
                if (riskTier && meta.risk !== riskTier) visible = false;
                if (psName && meta.ps !== psName) visible = false;
                marker.setVisible(visible);
            });
            fitBoundsToVisible();
        }
        else if (action.type === 'HIGHLIGHT_ZONE') {
            const { lat, lng, radius } = action.payload;
            circlesRef.current.forEach(c => c.setMap(null));

            const circle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.15,
                map,
                center: { lat, lng },
                radius: radius
            });
            circlesRef.current.push(circle);
            map.panTo({ lat, lng });
            map.setZoom(14);
        }
        else if (action.type === 'SIMULATE_SCENARIO') {
            // Draw evacuation arrows (mock)
            const line = new google.maps.Polyline({
                path: [{ lat: 20.0073, lng: 73.7914 }, { lat: 20.0080, lng: 73.7920 }],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 4,
                icons: [{ icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW }, offset: '100%' }],
                map: map
            });
            map.setZoom(16);
            map.panTo({ lat: 20.0073, lng: 73.7914 });
            alert(`SCENARIO SIMULATION STARTED: ${action.payload.scenarioType}`);
        }
        else if (action.type === 'RESET') {
            markersRef.current.forEach(m => m.setVisible(true));
            circlesRef.current.forEach(c => c.setMap(null));
            map.setZoom(12);
            map.setCenter({ lat: 19.9975, lng: 73.7898 });
        }
    };

    const fitBoundsToVisible = () => {
        const bounds = new google.maps.LatLngBounds();
        let count = 0;
        markersRef.current.forEach(m => {
            if (m.getVisible()) {
                bounds.extend(m.getPosition());
                count++;
            }
        });
        if (count > 0) map.fitBounds(bounds);
    };

    const handleApproveAction = (action: any) => {
        if (action.type === 'DEPLOY_RESOURCES' || action.type === 'CREATE_TASK') {
            alert(`Action Approved: ${action.title}\nData written to Deployment Plan.`);
            // In real app, call server action to write to DB
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Left: Chat */}
            <div className="w-1/3 min-w-[350px] bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <span>🤖</span> JARVIS Copilot
                    </h2>
                    <p className="text-xs text-gray-500">Assistive Intelligence • Command Center</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user'
                                    ? 'bg-[#1e3a5f] text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                }`}>
                                {m.content}
                            </div>

                            {/* Action Approval Card */}
                            {m.action && m.role === 'assistant' && (
                                <div className="mt-2 ml-1 max-w-[85%] bg-blue-50 border border-blue-100 rounded-lg p-3 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">Suggested Action</div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-800 mb-2">{(m.action as any).title || m.action.type}</div>

                                    {(m.action as any).data && (
                                        <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto mb-3">
                                            {JSON.stringify((m.action as any).data, null, 2)}
                                        </pre>
                                    )}

                                    <button
                                        onClick={() => handleApproveAction(m.action)}
                                        className="btn btn-sm bg-blue-600 text-white w-full text-xs py-1 hover:bg-blue-700"
                                    >
                                        Approve & Execute
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-bl-none shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask JARVIS..."
                            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-2 p-1.5 bg-[#1e3a5f] text-white rounded-lg hover:bg-blue-900 disabled:opacity-50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Right: Map */}
            <div className="flex-1 relative bg-gray-100">
                <div ref={mapRef} className="w-full h-full" />
                {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                        <div className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-sm">
                            <div className="text-4xl mb-4">⚠️</div>
                            <h3 className="font-bold text-gray-900 mb-2">Map API Key Missing</h3>
                            <p className="text-sm text-gray-600 mb-4">Please configure NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env.local to enable the Copilot Map.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
