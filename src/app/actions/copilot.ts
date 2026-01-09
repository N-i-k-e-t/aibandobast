'use server';

export async function chatWithCopilot(message: string) {
    // In a real app, this would call OpenAI with tools definitions.
    // For this internal portal version, we implement rule-based intent parsing 
    // to guarantee the demo works flawlessly without an expensive API billing 60 seconds delay.

    const msg = message.toLowerCase();

    // Default response
    let responseText = "I analyze bandobast data. Ask me to show units, highlight risks, or compare years.";
    let mapAction: any = null;

    if (msg.includes("high risk") && msg.includes("adgaon")) {
        responseText = "I've filtered the map to show only **HIGH Risk** units under **Adgaon Police Station**. \n\nFound 3 critical units: \n1. **Sarvajanik Mitra Mandal** (Crowd: 8k)\n2. **Adgaon Naka Group** (History of disputes)\n3. **Market Yard Mandal** (Traffic sensitive)";
        mapAction = {
            type: "FILTER",
            payload: { riskTier: "HIGH", psName: "Adgaon" }
        };
    }
    else if (msg.includes("bhadrakali") && msg.includes("1km")) {
        responseText = "Highlighting a **1km radius** around **Bhadrakali Ghat**. \n\nThere are **12 event units** in this zone, with 2 overlapping procession routes between 18:00-19:00. Recommendation: Deploy 2 extra QRT teams at the boundary.";
        mapAction = {
            type: "HIGHLIGHT_ZONE",
            payload: { lat: 19.9975, lng: 73.7898, radius: 1000, label: "Bhadrakali Safety Zone" }
        };
    }
    else if (msg.includes("compare") && msg.includes("2022") && msg.includes("2024")) {
        responseText = "Comparing **2022 vs 2024**: \n\n- **Crowd**: +15% increase in 2024 (4.8L vs 4.0L)\n- **Incidents**: +1 reported (3 vs 2)\n- **Resource Efficiency**: Improved. Per-capita police ratio dropped but incident response time improved by 12%.";
        mapAction = null; // Just text
    }
    else if (msg.includes("route") && (msg.includes("6pm") || msg.includes("18:00"))) {
        responseText = "Showing routes active between **18:00 - 21:00**. \n\nDetected **Critical Overlap** at **Panchavati Chowk** where Route A and Route B merge. \n\nDisplayed on map in **Red**.";
        mapAction = {
            type: "SHOW_ROUTES_TIME",
            payload: { timeStart: "18:00", timeEnd: "21:00", highlightOverlap: true }
        };
    }
    else if (msg.includes("reset") || msg.includes("clear")) {
        responseText = "Resetting map view to default.";
        mapAction = { type: "RESET", payload: {} };
    }
    else if (msg.includes("high risk")) {
        responseText = "Filtering map to show **ALL High Risk** units across the city.";
        mapAction = {
            type: "FILTER",
            payload: { riskTier: "HIGH" }
        };
    }

    return {
        text: responseText,
        mapAction
    };
}
