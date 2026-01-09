'use server';

export type CopilotResponse = {
    text: string;
    mapAction?: MapAction;
    planAction?: PlanAction;
    evidenceAction?: EvidenceAction;
};

export type MapAction = {
    type: 'FILTER' | 'HIGHLIGHT_ZONE' | 'SHOW_ROUTES_TIME' | 'RESET' | 'SIMULATE_SCENARIO' | 'SHOW_POSTS';
    payload: any;
};

export type PlanAction = {
    type: 'CREATE_TASK' | 'UPDATE_VARS' | 'DEPLOY_RESOURCES';
    title: string;
    data: any;
};

export type EvidenceAction = {
    type: 'SHOW_FILE';
    fileId: string;
};

export async function chatWithCopilot(message: string): Promise<CopilotResponse> {
    const msg = message.toLowerCase();

    // Default response
    let response: CopilotResponse = {
        text: "I analyze bandobast data. Ask me to show units, highlight risks, compare years, or plan resources.",
    };

    // --- MAP ACTIONS ---

    if (msg.includes("high risk") && msg.includes("adgaon")) {
        response.text = "I've filtered the map to show only **HIGH Risk** units under **Adgaon Police Station**. \n\nFound 3 critical units: \n1. **Sarvajanik Mitra Mandal** (Crowd: 8k)\n2. **Adgaon Naka Group** (History of disputes)\n3. **Market Yard Mandal** (Traffic sensitive)";
        response.mapAction = {
            type: "FILTER",
            payload: { riskTier: "HIGH", psName: "Adgaon" }
        };
    }
    else if (msg.includes("bhadrakali") && msg.includes("1km")) {
        response.text = "Highlighting a **1km radius** around **Bhadrakali Ghat**. \n\nThere are **12 event units** in this zone, with 2 overlapping procession routes between 18:00-19:00. Recommendation: Deploy 2 extra QRT teams at the boundary.";
        response.mapAction = {
            type: "HIGHLIGHT_ZONE",
            payload: { lat: 19.9975, lng: 73.7898, radius: 1000, label: "Bhadrakali Safety Zone" }
        };
    }
    else if (msg.includes("route") && (msg.includes("6pm") || msg.includes("18:00"))) {
        response.text = "Showing routes active between **18:00 - 21:00**. \n\nDetected **Critical Overlap** at **Panchavati Chowk** where Route A and Route B merge. \n\nDisplayed on map in **Red**.";
        response.mapAction = {
            type: "SHOW_ROUTES_TIME",
            payload: { timeStart: "18:00", timeEnd: "21:00", highlightOverlap: true }
        };
    }

    // --- SCENARIO / PLANNING ACTIONS ---

    else if (msg.includes("stampede") && msg.includes("scenario")) {
        response.text = "Simulating **Stampede Prevention** scenario at Ramkund. \n\n**Triggers:** Crowd density > 6 pax/sq.m. \n**Response:** Activate Red Alert, Open Gate 4. \n\nI have overlaid the evacuation routes on the map and drafted a deployment plan.";
        response.mapAction = {
            type: "SIMULATE_SCENARIO",
            payload: { scenarioType: "STAMPEDE", zoneId: "ramkund-zone" }
        };
        response.planAction = {
            type: "DEPLOY_RESOURCES",
            title: "Deploy Stampede Response Team",
            data: {
                teams: ["QRT-Alpha", "Medical-1"],
                location: "Ramkund Gates"
            }
        };
    }
    else if (msg.includes("water") || msg.includes("supply")) {
        response.text = "Calculating water requirements. \n\nBased on 1200 staff deployed in **Panchavati**, we need **2400 bottles** per shift (2 bottles/pax). \n\n**Action:** Drafted supply request for Central Stores.";
        response.planAction = {
            type: "CREATE_TASK",
            title: "Approve Water Supply Request",
            data: {
                item: "Water Bottle (1L)",
                quantity: 2400,
                cost: 36000
            }
        };
    }
    else if (msg.includes("force") || msg.includes("staff")) {
        response.text = "Showing current **Staff Deployment**. \n\nTotal Pers: 3500 \n- Officers: 150\n- Constables: 2800\n- Home Guards: 550\n\nGap Analysis: **Gangapur PS** is short by 20 constables based on crowd density thumb rules.";
        response.mapAction = {
            type: "SHOW_POSTS",
            payload: { showVacant: true }
        };
    }

    // --- GENERIC ---

    else if (msg.includes("compare") && msg.includes("2022")) {
        response.text = "Comparing **2022 vs 2024**: \n\n- **Crowd**: +15% increase in 2024 (4.8L vs 4.0L)\n- **Incidents**: +1 reported (3 vs 2)\n- **Resource Efficiency**: Improved. Per-capita police ratio dropped but incident response time improved by 12%.";
    }
    else if (msg.includes("reset") || msg.includes("clear")) {
        response.text = "Resetting map view to default.";
        response.mapAction = { type: "RESET", payload: {} };
    }
    else if (msg.includes("high risk")) {
        response.text = "Filtering map to show **ALL High Risk** units across the city.";
        response.mapAction = { type: "FILTER", payload: { riskTier: "HIGH" } };
    }

    return response;
}
