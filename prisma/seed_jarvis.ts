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

    // 3. Scenario Plans
    const scenarios = [
        {
            title: 'Stampede Prevention',
            type: 'STAMPEDE',
            severity: 'L3',
            triggers: 'Crowd density > 6 pax/sq.m',
            steps: ['Activate Red Alert', 'Stop entry', 'Deploy QRT', 'Open emergency exits'],
            checklist: ['Megaphones', 'Keys to Gates', 'Ambulance']
        },
        {
            title: 'Flash Flood',
            type: 'RAIN',
            severity: 'L3',
            triggers: 'Water > Red Mark',
            steps: ['Evacuate Ghats', 'Cut Power', 'Sirens ON'],
            checklist: ['Life Jackets', 'Boats']
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
