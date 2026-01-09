import { PrismaClient } from '@prisma/client';

export async function seedJarvisData(prisma: PrismaClient, eventId: string, psId: string) {
    console.log('--- STARTING JARVIS SEEDING ---');

    // 1. Config Thresholds
    await prisma.configThreshold.createMany({
        data: [
            { category: 'RISK', key: 'HIGH_RISK_CROWD_LIMIT', value: 5000, unit: 'people', description: 'Crowd size > 5000 is High Risk' },
            { category: 'SUPPLY', key: 'WATER_BOTTLES_PER_PAX', value: 2, unit: 'bottles/shift', description: 'Water bottles per staff per shift' },
            { category: 'STAFFING', key: 'CONSTABLE_PER_1000_CROWD', value: 5, unit: 'ratio', description: 'Target ratio of police to crowd' },
            { category: 'RESPONSE', key: 'QRT_RESPONSE_TIME_MIN', value: 5, unit: 'minutes', description: 'Max allowed QRT response time' },
        ]
    });

    // 2. Supply Items
    await prisma.supplyItem.createMany({
        data: [
            { itemName: 'Water Bottle (1L)', category: 'WATER', unitCost: 15 },
            { itemName: 'Meal Packet (Veg)', category: 'FOOD', unitCost: 80 },
            { itemName: 'Meal Packet (Jain)', category: 'FOOD', unitCost: 90 },
            { itemName: 'Metal Barricade', category: 'BARRICADE', unitCost: 0 },
            { itemName: 'First Aid Kit', category: 'MEDICAL', unitCost: 500 },
            { itemName: 'Megaphone', category: 'TECH', unitCost: 2000 },
        ]
    });

    // 3. Scenario Plans (10 Scenarios Total)
    const scenarios = [
        {
            title: 'Stampede Prevention',
            type: 'STAMPEDE',
            severity: 'L3',
            triggers: 'Crowd density > 6 pax/sq.m at bottlenecks.',
            steps: ['Activate Red Alert', 'Stop entry at holding areas', 'Deploy QRT for crowd splitting', 'Open emergency exit lanes'],
            checklist: ['Megaphones working', 'Exit gates unlocked', 'Ambulance ready']
        },
        {
            title: 'Flash Flood / Heavy Rain',
            type: 'RAIN',
            severity: 'L3',
            triggers: 'River water level rises above Danger Mark.',
            steps: ['Evacuate Ghats immediately', 'Cut off power to Ghat lights', 'Deploy diver teams', 'Issue Siren Alert'],
            checklist: ['Life jackets', 'Boats upstream', 'Search lights active']
        },
        {
            title: 'Drowning Incident',
            type: 'DROWNING',
            severity: 'L3',
            triggers: 'Multiple persons reported in water beyond safety rope.',
            steps: ['Diver deployment', 'Stop further immersion', 'Secure current ghat section', 'Medical team to reach river bank'],
            checklist: ['Oxygen cylinders', 'Stretchers', 'Diving gear']
        },
        {
            title: 'Fire Outbreak',
            type: 'FIRE',
            severity: 'L3',
            triggers: 'Smoke detected in mandal or temporary stalls.',
            steps: ['Evacuate nearby structures', 'Fire tender to reach spot', 'Cut mains power', 'Create fire break'],
            checklist: ['Extinguishers', 'Water tankers', 'Hydrant keys']
        },
        {
            title: 'Communal Clash',
            type: 'CLASH',
            severity: 'L3',
            triggers: 'Stone pelting or heated verbal altercation between groups.',
            steps: ['Immediate Lathi Charge (if required)', 'Isolate the spot', 'Detain instigators', 'Internet shutdown request'],
            checklist: ['Riot gear', 'Tear gas', 'Videography teams']
        },
        {
            title: 'Route Blockage',
            type: 'ROUTE_BLOCK',
            severity: 'L2',
            triggers: 'Vehicle breakdown or sit-in protest on main route.',
            steps: ['Divert all processions to Plan B', 'Towing crane deployment', 'Negotiate with group', 'Clear path'],
            checklist: ['Cranes', 'Diverge boards', 'Loudspeakers']
        },
        {
            title: 'Power Failure',
            type: 'POWER',
            severity: 'L2',
            triggers: 'Total blackout in sensitive zone at night.',
            steps: ['Activate Silent GenSets', 'Manual patrolling with torches', 'Secure jewelry/valuables', 'Reassurance shouting'],
            checklist: ['Fuel for GenSets', 'High-beam torches', 'Wireless sets charged']
        },
        {
            title: 'VIP Overlap',
            type: 'VIP',
            severity: 'L2',
            triggers: 'VIP arrival coinciding with peak crowd window.',
            steps: ['Freeze crowd movement for 3 mins', 'Fast-track VIP carcade', 'Resume normal flow', 'DCP escort'],
            checklist: ['Clearance radio', 'Escort vehicles', 'Frisking kits']
        },
        {
            title: 'Medical Cluster (Heat/Disease)',
            type: 'MEDICAL',
            severity: 'L2',
            triggers: 'Multiple faints/collapses in a 50m radius.',
            steps: ['OMR (On Map Response) for doctor', 'Water distribution', 'Shade creation', 'Ambulance evacuation'],
            checklist: ['Water packs', 'ORS packets', 'Portable fans']
        },
        {
            title: 'Ghat Overload',
            type: 'GHAT_LOAD',
            severity: 'L2',
            triggers: 'Wait time for immersion exceeds 4 hours.',
            steps: ['Divert to secondary ghats', 'Holding area activation', 'CPRO Announcement', 'Sequential release'],
            checklist: ['Token system', 'Queue barricades', 'Rest areas']
        }
    ];

    for (const sc of scenarios) {
        await prisma.scenarioPlan.create({
            data: {
                eventId: eventId,
                scenarioType: sc.type,
                title: sc.title,
                triggers: sc.triggers,
                severity: sc.severity,
                responseSteps: JSON.stringify(sc.steps),
                resourceChecklist: JSON.stringify(sc.checklist)
            }
        });
    }

    // 4. Deployment Post
    await prisma.deploymentPost.create({
        data: {
            eventId: eventId,
            psId: psId,
            postName: 'Ramkund Watchtower',
            postType: 'WATCHTOWER',
            requiredPax: 4,
            riskTier: 'HIGH',
            latitude: 20.0073,
            longitude: 73.7914
        }
    });

    console.log('✅ JARVIS Seed Complete');
}
