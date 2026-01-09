import PlanningFlowClient from './PlanningFlowClient';
import { getManifest } from '@/lib/data';

const STAGES_PROTOCOL = [
    {
        tag: 'STAGE_1',
        name: 'Ground Reality & Inputs',
        had: 'Disconnected manual reports and legacy 10-year PDFs.',
        considered: 'Completeness of data, digitization accuracy, and field feedback.',
        why: 'To create a single source of truth for all historical facts.',
        tools: ['OCR Extraction', 'Manifest Auto-Indexing'],
    },
    {
        tag: 'STAGE_2',
        name: 'Risk-Based Thinking',
        had: 'Subjective risk perception by different officers.',
        considered: 'Incident historical frequency, communal sensitivity, and crowd volume.',
        why: 'To objectively categorize units into High/Med/Low risk tiers.',
        tools: ['Risk Assessment Engine', 'historical Trend Analysis'],
    },
    {
        tag: 'STAGE_3',
        name: 'Spatial & Jurisdictional Mapping',
        had: 'Overlapping boundaries and paper maps.',
        considered: 'Precise GPS coordinates of Mandals and Ghats.',
        why: 'To visualize the entire operational area in a single GIS pane.',
        tools: ['Google Maps KML Overlays', 'Polygon Boundary Mapping'],
    },
    {
        tag: 'STAGE_4',
        name: 'Route & Time Window Logic',
        had: 'Simultaneous movement leading to gridlock.',
        considered: 'Merging points, bottleneck widths, and historical timing peaks.',
        why: 'To de-conflict procession movements and ensure smooth flow.',
        tools: ['Route Overlap Detector', 'Timing Synchronizer'],
    },
    {
        tag: 'STAGE_5',
        name: 'Ghat & Terminal Planning',
        had: 'Overcrowding at immersion points.',
        considered: 'Bank capacity, lighting, medical point proximity.',
        why: 'To prevent stampedes and ensure safe immersion logistics.',
        tools: ['Capacity Calculator', 'Safety Buffer Logic'],
    },
    {
        tag: 'STAGE_6',
        name: 'Resource & Bandobast Planning',
        had: 'Ad-hoc personnel allocation.',
        considered: 'Staffing thumb rules and tier-based scaling.',
        why: 'To ensure optimal force deployment where risk is highest.',
        tools: ['Staffing Logic Engine', 'Deployment Post Map'],
    },
    {
        tag: 'STAGE_7',
        name: 'Outputs & Documentation',
        had: 'Scattered orders and fragmented communication.',
        considered: 'Transparency, accountability, and legal compliance.',
        why: 'To generate the final Executive Evidence Pack for future learning.',
        tools: ['Auto-Order Drafter', 'Showcase Portal Export'],
    }
];

export const dynamic = 'force-dynamic';

export default function PlanningFlowPage() {
    const manifest = getManifest();

    return (
        <PlanningFlowClient stages={STAGES_PROTOCOL} linkedFiles={manifest} />
    );
}
