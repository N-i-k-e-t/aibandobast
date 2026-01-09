import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const INBOX_DIR = path.join(process.cwd(), 'data', 'inbox');
const OUTPUT_DIR = path.join(process.cwd(), 'data');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');
const METRICS_PATH = path.join(OUTPUT_DIR, 'metrics.json');

const PS_NAMES = [
    'Adgaon', 'Bhadrakali', 'Nashik Road', 'Panchavati', 'Gangapur',
    'Sarkarwada', 'Mumbai Naka', 'Mhasrul', 'Ambad', 'Indiranagar',
    'Upnagar', 'Satpur', 'Deolali Camp'
];

const STAGE_KEYWORDS: Record<string, string[]> = {
    'STAGE_1': ['intelligence', 'ground', 'reality', 'input', 'data', 'initial', 'survey', 'information'],
    'STAGE_2': ['risk', 'assessment', 'threat', 'classified', 'thinking', 'priority'],
    'STAGE_3': ['spatial', 'gis', 'map', 'jurisdictional', 'area', 'boundary'],
    'STAGE_4': ['route', 'time', 'window', 'procession', 'path', 'movement'],
    'STAGE_5': ['ghat', 'terminal', 'immersion', 'river', 'water', 'safety'],
    'STAGE_6': ['resource', 'personnel', 'allocation', 'deployment', 'staffing', 'bandobast'],
    'STAGE_7': ['output', 'document', 'final', 'report', 'outcome', 'summary']
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
    'PS Pack': ['PS', 'Pack', 'Station', 'Police Station'],
    'Data Analysis': ['Analysis', 'Comparison', 'History', 'Statistic', 'Insight'],
    'Mandal List': ['Mandal', 'QR', 'Registration'],
    'Dashboard': ['Dashboard', 'Metrics', 'Overview'],
    'Meeting': ['Meeting', 'Minute', 'Discussion', 'Order'],
    'Crime-incident': ['Crime', 'Incident', 'FIR', 'Case', 'CrPC'],
    'Final Report': ['Final', 'Executive', 'Official', 'Complete']
};

interface ManifestEntry {
    file_id: string;
    relative_path: string;
    filename: string;
    year: number;
    police_station: string;
    category: string;
    stage_tag: string;
    tags: string[];
    preview_type: 'pdf' | 'docx' | 'image' | 'kml' | 'other';
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

function buildManifest() {
    console.log('--- STARTING MANIFEST BUILD ---');

    if (!fs.existsSync(INBOX_DIR)) {
        console.error('Inbox directory not found:', INBOX_DIR);
        fs.mkdirSync(INBOX_DIR, { recursive: true });
        console.log('Created empty inbox directory.');
    }

    const files = getAllFiles(INBOX_DIR);
    const manifest: ManifestEntry[] = [];

    files.forEach((filePath) => {
        const filename = path.basename(filePath);
        const relPath = path.relative(path.join(process.cwd()), filePath).replace(/\\/g, '/');
        const ext = path.extname(filename).toLowerCase();

        // 1. Extract Year (2015-2025)
        let year = 2025; // Default
        const yearMatch = filename.match(/20(1[5-9]|2[0-5])/);
        if (yearMatch) year = parseInt(yearMatch[0]);

        // 2. Extract Police Station
        let ps = 'Nashik City';
        for (const name of PS_NAMES) {
            if (filename.toLowerCase().includes(name.toLowerCase())) {
                ps = name;
                break;
            }
        }

        // 3. Infer Category
        let category = 'Other';
        if (ext === '.kml') {
            category = 'KML';
        } else {
            for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
                if (keywords.some(k => filename.toLowerCase().includes(k.toLowerCase()))) {
                    category = cat;
                    break;
                }
            }
        }

        // 4. Infer Stage
        let stage = 'STAGE_1';
        for (const [s, keywords] of Object.entries(STAGE_KEYWORDS)) {
            if (keywords.some(k => filename.toLowerCase().includes(k.toLowerCase()))) {
                stage = s;
                break;
            }
        }

        // 5. Preview Type
        let previewType: ManifestEntry['preview_type'] = 'other';
        if (ext === '.pdf') previewType = 'pdf';
        else if (ext === '.docx' || ext === '.doc') previewType = 'docx';
        else if (['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext)) previewType = 'image';
        else if (ext === '.kml') previewType = 'kml';

        // 6. Tags
        const tags = [ps, category, stage, year.toString()].filter(t => t !== 'Other' && t !== 'Nashik City');

        manifest.push({
            file_id: uuidv4(),
            relative_path: relPath,
            filename,
            year,
            police_station: ps,
            category,
            stage_tag: stage,
            tags,
            preview_type: previewType
        });
    });

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`✅ Manifest generated with ${manifest.length} files.`);

    // METRICS
    const metrics = {
        totalFiles: manifest.length,
        filesByYear: {} as Record<number, number>,
        filesByPS: {} as Record<string, number>,
        filesByCategory: {} as Record<string, number>,
        filesByStage: {} as Record<string, number>
    };

    manifest.forEach(m => {
        metrics.filesByYear[m.year] = (metrics.filesByYear[m.year] || 0) + 1;
        metrics.filesByPS[m.police_station] = (metrics.filesByPS[m.police_station] || 0) + 1;
        metrics.filesByCategory[m.category] = (metrics.filesByCategory[m.category] || 0) + 1;
        metrics.filesByStage[m.stage_tag] = (metrics.filesByStage[m.stage_tag] || 0) + 1;
    });

    fs.writeFileSync(METRICS_PATH, JSON.stringify(metrics, null, 2));
    console.log('✅ Metrics generated.');
}

buildManifest();
