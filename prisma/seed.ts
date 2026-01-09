import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Clean existing data
    await prisma.auditLog.deleteMany();
    await prisma.decisionNote.deleteMany();
    await prisma.evidenceFile.deleteMany();
    await prisma.zone.deleteMany();
    await prisma.route.deleteMany();
    await prisma.eventUnit.deleteMany();
    await prisma.ghat.deleteMany();
    await prisma.policeStation.deleteMany();
    await prisma.event.deleteMany();
    await prisma.archiveYear.deleteMany();

    console.log('✅ Cleaned existing data');

    // Create Event
    const event = await prisma.event.create({
        data: {
            eventName: 'Ganpati Utsav 2025',
            eventYear: 2025,
            eventType: 'RELIGIOUS_FESTIVAL',
            city: 'Nashik',
            startDate: new Date('2025-08-27'),
            endDate: new Date('2025-09-07'),
            description: 'Annual Ganpati festival celebration in Nashik city with processions and immersions',
        },
    });
    console.log('✅ Created event:', event.eventName);

    // Create Police Stations
    const policeStations = await Promise.all([
        prisma.policeStation.create({
            data: {
                psName: 'Panchavati Police Station',
                divisionName: 'Nashik City',
                city: 'Nashik',
                state: 'Maharashtra',
                contactPhone: '0253-2573100',
                contactEmail: 'panchavati.ps@mahapolice.gov.in',
            },
        }),
        prisma.policeStation.create({
            data: {
                psName: 'Gangapur Police Station',
                divisionName: 'Nashik City',
                city: 'Nashik',
                state: 'Maharashtra',
                contactPhone: '0253-2573200',
                contactEmail: 'gangapur.ps@mahapolice.gov.in',
            },
        }),
        prisma.policeStation.create({
            data: {
                psName: 'Nashik Road Police Station',
                divisionName: 'Nashik City',
                city: 'Nashik',
                state: 'Maharashtra',
                contactPhone: '0253-2573300',
                contactEmail: 'nashikroad.ps@mahapolice.gov.in',
            },
        }),
    ]);
    console.log('✅ Created', policeStations.length, 'police stations');

    // Create Ghats
    const ghats = await Promise.all([
        prisma.ghat.create({
            data: {
                eventId: event.id,
                ghatName: 'Ramkund Ghat',
                address: 'Ramkund, Panchavati, Nashik',
                latitude: 20.0063,
                longitude: 73.7904,
                capacityEst: 5000,
                notes: 'Primary immersion point at sacred Ramkund',
            },
        }),
        prisma.ghat.create({
            data: {
                eventId: event.id,
                ghatName: 'Godavari Ghat',
                address: 'Godavari River, Nashik',
                latitude: 19.9975,
                longitude: 73.7898,
                capacityEst: 3000,
                notes: 'Secondary immersion point near Godavari',
            },
        }),
    ]);
    console.log('✅ Created', ghats.length, 'ghats');

    // Create Event Units (Mandals)
    const eventUnits = await Promise.all([
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[0].id,
                unitName: 'Shree Ganesh Mandal Panchavati',
                unitType: 'SARVAJANIK',
                headName: 'Ramesh Patil',
                headPhone: '9876543210',
                address: 'Main Road, Panchavati',
                landmark: 'Near Kalaram Temple',
                latitude: 20.0073,
                longitude: 73.7914,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.95,
                crowdMin: 5000,
                crowdMax: 8000,
                riskTier: 'HIGH',
                sensitiveFlag: false,
                pastIncidentFlag: true,
                pastIncidentNotes: 'Minor crowd control issue in 2023',
                volunteersCount: 50,
                cctvAvailable: true,
                cctvCount: 4,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[0].id,
                unitName: 'Kalaram Ganesh Seva Mandal',
                unitType: 'SARVAJANIK',
                headName: 'Suresh Joshi',
                headPhone: '9876543211',
                address: 'Kalaram Temple Road',
                landmark: 'Opposite State Bank',
                latitude: 20.0068,
                longitude: 73.7925,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.92,
                crowdMin: 3000,
                crowdMax: 5000,
                riskTier: 'MEDIUM',
                volunteersCount: 30,
                cctvAvailable: true,
                cctvCount: 2,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[0].id,
                unitName: 'Saptashrungi Mandal',
                unitType: 'SARVAJANIK',
                headName: 'Vijay More',
                headPhone: '9876543212',
                address: 'Saptashrungi Galli, Panchavati',
                latitude: 20.0055,
                longitude: 73.7892,
                geocodeSource: 'MANUAL',
                crowdMin: 1000,
                crowdMax: 2000,
                riskTier: 'LOW',
                volunteersCount: 15,
                cctvAvailable: false,
                permissionsStatus: 'PENDING',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[1].id,
                unitName: 'Gangapur Sarvajanik Ganeshotsav',
                unitType: 'SARVAJANIK',
                headName: 'Mahesh Kulkarni',
                headPhone: '9876543213',
                address: 'Gangapur Road',
                landmark: 'Near Gangapur Bus Stand',
                latitude: 19.9888,
                longitude: 73.7756,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.88,
                crowdMin: 4000,
                crowdMax: 6000,
                riskTier: 'HIGH',
                sensitiveFlag: true,
                pastIncidentFlag: false,
                volunteersCount: 40,
                cctvAvailable: true,
                cctvCount: 3,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[1].id,
                unitName: 'Jai Maharaj Mandal',
                unitType: 'SARVAJANIK',
                headName: 'Anil Shinde',
                headPhone: '9876543214',
                address: 'College Road, Gangapur',
                latitude: 19.9923,
                longitude: 73.7812,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.91,
                crowdMin: 2000,
                crowdMax: 3500,
                riskTier: 'MEDIUM',
                volunteersCount: 25,
                cctvAvailable: true,
                cctvCount: 2,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[1].id,
                unitName: 'Shivaji Nagar Ganesh Mandal',
                unitType: 'SARVAJANIK',
                headName: 'Prakash Gaikwad',
                headPhone: '9876543215',
                address: 'Shivaji Nagar',
                latitude: 19.9945,
                longitude: 73.7834,
                geocodeSource: 'MANUAL',
                crowdMin: 800,
                crowdMax: 1500,
                riskTier: 'LOW',
                volunteersCount: 12,
                cctvAvailable: false,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[2].id,
                unitName: 'Nashik Road Ganeshotsav Mandal',
                unitType: 'SARVAJANIK',
                headName: 'Deepak Wagh',
                headPhone: '9876543216',
                address: 'Station Road, Nashik Road',
                landmark: 'Near Railway Station',
                latitude: 19.9634,
                longitude: 73.8456,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.94,
                crowdMin: 3500,
                crowdMax: 5500,
                riskTier: 'MEDIUM',
                pastIncidentFlag: true,
                pastIncidentNotes: 'Traffic congestion issues in 2022',
                volunteersCount: 35,
                cctvAvailable: true,
                cctvCount: 4,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[2].id,
                unitName: 'Railway Colony Mandal',
                unitType: 'RESIDENTIAL',
                headName: 'Kiran Pawar',
                headPhone: '9876543217',
                address: 'Railway Colony, Nashik Road',
                latitude: 19.9612,
                longitude: 73.8423,
                geocodeSource: 'MANUAL',
                crowdMin: 500,
                crowdMax: 1000,
                riskTier: 'LOW',
                volunteersCount: 10,
                cctvAvailable: false,
                permissionsStatus: 'APPROVED',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[2].id,
                unitName: 'Bytco Point Ganesh Utsav',
                unitType: 'SARVAJANIK',
                headName: 'Sachin Jadhav',
                headPhone: '9876543218',
                address: 'Bytco Point, Nashik Road',
                latitude: 19.9678,
                longitude: 73.8512,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.87,
                crowdMin: 2500,
                crowdMax: 4000,
                riskTier: 'MEDIUM',
                volunteersCount: 28,
                cctvAvailable: true,
                cctvCount: 2,
                permissionsStatus: 'PENDING',
            },
        }),
        prisma.eventUnit.create({
            data: {
                eventId: event.id,
                psId: policeStations[2].id,
                unitName: 'Dwarka Ganesh Mandal',
                unitType: 'SARVAJANIK',
                headName: 'Rajendra Nikam',
                headPhone: '9876543219',
                address: 'Dwarka Circle, Nashik Road',
                landmark: 'Near Dwarka Hotel',
                latitude: 19.9701,
                longitude: 73.8478,
                geocodeSource: 'GOOGLE_GEOCODING',
                geocodeConfidence: 0.93,
                crowdMin: 6000,
                crowdMax: 9000,
                riskTier: 'HIGH',
                sensitiveFlag: true,
                pastIncidentFlag: true,
                pastIncidentNotes: 'Large crowd gathering, requires special attention',
                volunteersCount: 60,
                cctvAvailable: true,
                cctvCount: 6,
                permissionsStatus: 'APPROVED',
            },
        }),
    ]);
    console.log('✅ Created', eventUnits.length, 'event units');

    // Create Routes
    const routes = await Promise.all([
        prisma.route.create({
            data: {
                eventId: event.id,
                psId: policeStations[0].id,
                routeName: 'Panchavati Main Route',
                routeType: 'VISARJAN',
                startLabel: 'Panchavati Chowk',
                startLat: 20.0073,
                startLng: 73.7914,
                endLabel: 'Ramkund Ghat',
                endLat: 20.0063,
                endLng: 73.7904,
                unitId: eventUnits[0].id,
                ghatId: ghats[0].id,
                timeStart: '18:00',
                timeEnd: '22:00',
                distanceKm: 1.2,
                durationMin: 90,
                notes: 'Main procession route from Panchavati to Ramkund',
            },
        }),
        prisma.route.create({
            data: {
                eventId: event.id,
                psId: policeStations[1].id,
                routeName: 'Gangapur to Godavari Route',
                routeType: 'VISARJAN',
                startLabel: 'Gangapur Main Road',
                startLat: 19.9888,
                startLng: 73.7756,
                endLabel: 'Godavari Ghat',
                endLat: 19.9975,
                endLng: 73.7898,
                unitId: eventUnits[3].id,
                ghatId: ghats[1].id,
                timeStart: '16:00',
                timeEnd: '20:00',
                distanceKm: 2.5,
                durationMin: 120,
                notes: 'Secondary route via main highway',
            },
        }),
    ]);
    console.log('✅ Created', routes.length, 'routes');

    // Create Zone
    const zone = await prisma.zone.create({
        data: {
            eventId: event.id,
            psId: policeStations[0].id,
            zoneName: 'Ramkund High Security Zone',
            zoneType: 'HIGH_SECURITY',
            riskTier: 'HIGH',
            polygonGeojson: JSON.stringify({
                type: 'Polygon',
                coordinates: [[
                    [73.789, 20.005],
                    [73.792, 20.005],
                    [73.792, 20.008],
                    [73.789, 20.008],
                    [73.789, 20.005],
                ]],
            }),
            notes: 'High security zone around Ramkund during peak hours',
        },
    });
    console.log('✅ Created zone:', zone.zoneName);

    // Create Evidence Files
    const evidenceFiles = await Promise.all([
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                psId: policeStations[0].id,
                stageTag: 'STAGE_1',
                category: 'LETTER',
                title: 'Mandal Registration Forms - Panchavati',
                description: 'Consolidated registration forms from all mandals in Panchavati jurisdiction',
                tags: JSON.stringify(['registration', 'mandal', 'panchavati']),
                fileUrl: '/uploads/mandal_registration_panchavati.pdf',
                fileType: 'application/pdf',
                uploadedAt: new Date('2025-06-15T10:00:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_2',
                category: 'REPORT',
                title: 'Risk Assessment Report 2025',
                description: 'Comprehensive risk assessment for all event units',
                tags: JSON.stringify(['risk', 'assessment', 'analysis']),
                fileUrl: '/uploads/risk_assessment_2025.pdf',
                fileType: 'application/pdf',
                uploadedAt: new Date('2025-07-01T14:30:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_3',
                category: 'IMAGE',
                title: 'GIS Mapping - City Overview',
                description: 'GIS-generated map showing all mandal locations with risk tiers',
                tags: JSON.stringify(['gis', 'map', 'spatial']),
                fileUrl: '/uploads/gis_city_map.png',
                fileType: 'image/png',
                uploadedAt: new Date('2025-07-10T09:15:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_3',
                category: 'KML',
                title: 'Ghat & Route Coordinates',
                description: 'Raw KML data for field units',
                tags: JSON.stringify(['gis', 'coordinates', 'raw-data']),
                fileUrl: '/uploads/sample_coordinates.kml',
                fileType: 'application/vnd.google-earth.kml+xml',
                uploadedAt: new Date('2025-07-11T16:45:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_4',
                category: 'PPT',
                title: 'Route Planning Presentation',
                description: 'Slide deck for commissioner review meeting regarding route selections',
                tags: JSON.stringify(['route', 'presentation', 'planning']),
                fileUrl: '/uploads/presentation_deck.pptx',
                fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                uploadedAt: new Date('2025-07-20T11:00:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_5',
                category: 'DOC',
                title: 'Ghat Safety Protocols',
                description: 'Draft safety guidelines for ghat duty officers',
                tags: JSON.stringify(['ghat', 'safety', 'draft']),
                fileUrl: '/uploads/notes.docx',
                fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                uploadedAt: new Date('2025-08-01T13:20:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_4',
                category: 'PDF',
                title: 'Route Planning Document',
                description: 'Detailed route plans with timing windows',
                tags: JSON.stringify(['route', 'planning', 'timing']),
                fileUrl: '/uploads/route_planning.pdf',
                fileType: 'application/pdf',
                uploadedAt: new Date('2025-08-05T15:00:00Z'),
            },
        }),
        prisma.evidenceFile.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_7',
                category: 'ANNEXURE',
                title: 'Final Bandobast Order',
                description: 'Official bandobast order with all annexures',
                tags: JSON.stringify(['bandobast', 'order', 'final']),
                fileUrl: '/uploads/final_bandobast_order.pdf',
                fileType: 'application/pdf',
                uploadedAt: new Date('2025-08-25T10:00:00Z'),
            },
        }),
    ]);
    console.log('✅ Created', evidenceFiles.length, 'evidence files');

    // Create Decision Notes
    const decisionNotes = await Promise.all([
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_1',
                title: 'Ground Inputs',
                whatWeHad: 'Mandal lists, PS boundaries, past files, routes, ghat list.',
                whatWeConsidered: 'Completeness of data, potential duplicates, format consistency across police stations.',
                whyWeDecided: 'Establishing an official-first register reduces disputes later and creates a verifiable base for all downstream planning. We prioritized ground verification to eliminate "ghost" mandals.',
                evidenceLinks: JSON.stringify([evidenceFiles[0].id]),
                aiGisAssistNote: 'AI tools assisted in standardizing mandal names and identifying duplicates across 10 years of records.',
            },
        }),
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_2',
                title: 'Risk Thinking',
                whatWeHad: 'Crowd estimates, history notes of past incidents, and sensitivity flags (proximity to schools/hospitals).',
                whatWeConsidered: 'We applied a weighted scoring model (Crowd 30%, Route 20%, Sensitivity 15%, History 20%) to avoid single-factor bias.',
                whyWeDecided: 'Tiering units into LOW, MEDIUM, and HIGH allows for defensible and fair deployment of limited resources. It removes subjectivity from security allocations.',
                evidenceLinks: JSON.stringify([evidenceFiles[1].id]),
                aiGisAssistNote: 'Automated risk scoring identified 3 high-risk outliers that would have been missed by manual review.',
            },
        }),
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_3',
                title: 'GIS Mapping',
                whatWeHad: 'Verified addresses, route paths, and ghat locations.',
                whatWeConsidered: 'Spatial accuracy, interoperability with field devices, and ability to share layers with municipal corporation.',
                whyWeDecided: 'Visualizing data on maps reveals pinch points and overlaps that text lists hide. KML exports enable cross-team operational clarity.',
                evidenceLinks: JSON.stringify([evidenceFiles[2].id, evidenceFiles[3].id]),
                aiGisAssistNote: 'GIS analysis automatically flagged 2 zones where route density exceeded safe evacuation limits.',
            },
        }),
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_4',
                title: 'Route & Time Planning',
                whatWeHad: 'Alternative route options, junction lists, and requested timing windows.',
                whatWeConsidered: 'Chokepoints, concurrent route overlaps, and peak-time load on key arteries.',
                whyWeDecided: 'We selected routes with the lowest conflict potential and implemented a staggered timing strategy to prevent gridlock at major junctions.',
                evidenceLinks: JSON.stringify([evidenceFiles[6].id, evidenceFiles[4].id]),
                aiGisAssistNote: 'Route simulation predicted a 40% congestion reduction by shifting 3 major processions by 30 minutes.',
            },
        }),
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_5',
                title: 'Terminal/Ghat Planning',
                whatWeHad: 'Ghat capacity estimates and historical access patterns.',
                whatWeConsidered: 'Entry/exit segregation needs, lighting adequacy, and safety resource availability (swimmers/boats).',
                whyWeDecided: 'Concentrating resources at terminals deals with the highest convergence risk. Segregated lanes prevent stampedes during immersion peaks.',
                evidenceLinks: JSON.stringify([evidenceFiles[5].id]),
                aiGisAssistNote: 'Capacity modeling suggested extending the holding area at Ramkund by 50 meters to handle peak flow.',
            },
        }),
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_6',
                title: 'Resource Planning',
                whatWeHad: 'Risk tier list, identified chokepoints, and total available force strength.',
                whatWeConsidered: 'The need for static coverage at critical points versus mobile reserves for flexibility.',
                whyWeDecided: 'A layered model (Static + Mobile + Reserve) ensures baseline security while retaining the ability to respond to dynamic incidents.',
                evidenceLinks: JSON.stringify([]),
                aiGisAssistNote: 'Optimization algorithms suggested a 15% shift of personnel from static duties to QRTs for better response times.',
            },
        }),
        prisma.decisionNote.create({
            data: {
                eventId: event.id,
                stageTag: 'STAGE_7',
                title: 'Outputs & Documentation',
                whatWeHad: 'All approved plans from previous layers.',
                whatWeConsidered: 'Traceability of decisions and speed of retrieval during the event.',
                whyWeDecided: 'Comprehensive documentation (Annexures, Duty Charts, KMLs) reduces confusion on the ground and ensures full legal compliance.',
                evidenceLinks: JSON.stringify([evidenceFiles[7].id]),
                aiGisAssistNote: 'Automated report generation compiled 200+ pages of annexures in minutes, ensuring zero clerical errors.',
            },
        }),
    ]);
    console.log('✅ Created', decisionNotes.length, 'decision notes');

    // Create Archive Years
    const archiveYears = await Promise.all([
        prisma.archiveYear.create({
            data: {
                year: 2025,
                eventName: 'Ganpati Utsav 2025',
                totalUnits: 10,
                totalRoutes: 2,
                totalGhats: 2,
                totalPoliceStations: 3,
                estimatedCrowd: 500000,
                incidentsReported: 0,
                resourcesDeployed: 2500,
                notes: 'Current year - planning in progress',
            },
        }),
        prisma.archiveYear.create({
            data: {
                year: 2024,
                eventName: 'Ganpati Utsav 2024',
                totalUnits: 245,
                totalRoutes: 45,
                totalGhats: 5,
                totalPoliceStations: 8,
                estimatedCrowd: 480000,
                incidentsReported: 3,
                resourcesDeployed: 2400,
                notes: 'Successful event with minor incidents',
            },
        }),
        prisma.archiveYear.create({
            data: {
                year: 2023,
                eventName: 'Ganpati Utsav 2023',
                totalUnits: 238,
                totalRoutes: 42,
                totalGhats: 5,
                totalPoliceStations: 8,
                estimatedCrowd: 450000,
                incidentsReported: 5,
                resourcesDeployed: 2300,
                notes: 'Post-COVID return to normal scale',
            },
        }),
        prisma.archiveYear.create({
            data: {
                year: 2022,
                eventName: 'Ganpati Utsav 2022',
                totalUnits: 220,
                totalRoutes: 38,
                totalGhats: 5,
                totalPoliceStations: 8,
                estimatedCrowd: 400000,
                incidentsReported: 2,
                resourcesDeployed: 2100,
                notes: 'Scaled-up from COVID restrictions',
            },
        }),
        prisma.archiveYear.create({
            data: {
                year: 2021,
                eventName: 'Ganpati Utsav 2021',
                totalUnits: 150,
                totalRoutes: 25,
                totalGhats: 3,
                totalPoliceStations: 8,
                estimatedCrowd: 200000,
                incidentsReported: 1,
                resourcesDeployed: 1500,
                notes: 'COVID-restricted event',
            },
        }),
        prisma.archiveYear.create({
            data: {
                year: 2020,
                eventName: 'Ganpati Utsav 2020',
                totalUnits: 100,
                totalRoutes: 15,
                totalGhats: 2,
                totalPoliceStations: 8,
                estimatedCrowd: 100000,
                incidentsReported: 0,
                resourcesDeployed: 1000,
                notes: 'Minimal celebrations due to COVID pandemic',
            },
        }),
        prisma.archiveYear.create({
            data: {
                year: 2019,
                eventName: 'Ganpati Utsav 2019',
                totalUnits: 260,
                totalRoutes: 48,
                totalGhats: 5,
                totalPoliceStations: 8,
                estimatedCrowd: 520000,
                incidentsReported: 4,
                resourcesDeployed: 2500,
                notes: 'Peak pre-COVID event',
            },
        }),
    ]);
    console.log('✅ Created', archiveYears.length, 'archive years');

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
