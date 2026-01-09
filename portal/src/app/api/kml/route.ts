import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// KML Style definitions
const KML_STYLES = `
  <Style id="risk_low">
    <IconStyle>
      <color>ff00ff00</color>
      <scale>1.0</scale>
      <Icon><href>http://maps.google.com/mapfiles/kml/paddle/grn-circle.png</href></Icon>
    </IconStyle>
    <LabelStyle><color>ff00ff00</color></LabelStyle>
  </Style>
  <Style id="risk_medium">
    <IconStyle>
      <color>ff00a5ff</color>
      <scale>1.0</scale>
      <Icon><href>http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png</href></Icon>
    </IconStyle>
    <LabelStyle><color>ff00a5ff</color></LabelStyle>
  </Style>
  <Style id="risk_high">
    <IconStyle>
      <color>ff0000ff</color>
      <scale>1.2</scale>
      <Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon>
    </IconStyle>
    <LabelStyle><color>ff0000ff</color></LabelStyle>
  </Style>
  <Style id="ghat">
    <IconStyle>
      <color>ffff0000</color>
      <scale>1.0</scale>
      <Icon><href>http://maps.google.com/mapfiles/kml/shapes/water.png</href></Icon>
    </IconStyle>
  </Style>
  <Style id="route">
    <LineStyle>
      <color>ff8b00ff</color>
      <width>4</width>
    </LineStyle>
  </Style>
  <Style id="zone_low">
    <PolyStyle>
      <color>4000ff00</color>
      <outline>1</outline>
    </PolyStyle>
    <LineStyle><color>ff00ff00</color><width>2</width></LineStyle>
  </Style>
  <Style id="zone_medium">
    <PolyStyle>
      <color>4000a5ff</color>
      <outline>1</outline>
    </PolyStyle>
    <LineStyle><color>ff00a5ff</color><width>2</width></LineStyle>
  </Style>
  <Style id="zone_high">
    <PolyStyle>
      <color>400000ff</color>
      <outline>1</outline>
    </PolyStyle>
    <LineStyle><color>ff0000ff</color><width>2</width></LineStyle>
  </Style>
`;

function escapeXml(str: string | null | undefined): string {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateUnitPlacemark(unit: {
    unitName: string;
    latitude: number | null;
    longitude: number | null;
    riskTier: string;
    address: string | null;
    headName: string | null;
    crowdMin: number | null;
    crowdMax: number | null;
}): string {
    if (!unit.latitude || !unit.longitude) return '';

    const styleId = `risk_${unit.riskTier.toLowerCase()}`;
    return `
    <Placemark>
      <name>${escapeXml(unit.unitName)}</name>
      <description><![CDATA[
        <strong>Risk Tier:</strong> ${unit.riskTier}<br/>
        <strong>Address:</strong> ${escapeXml(unit.address)}<br/>
        <strong>Head:</strong> ${escapeXml(unit.headName)}<br/>
        <strong>Crowd Estimate:</strong> ${unit.crowdMin || 0} - ${unit.crowdMax || 0}
      ]]></description>
      <styleUrl>#${styleId}</styleUrl>
      <Point>
        <coordinates>${unit.longitude},${unit.latitude},0</coordinates>
      </Point>
    </Placemark>`;
}

function generateGhatPlacemark(ghat: {
    ghatName: string;
    latitude: number;
    longitude: number;
    address: string | null;
    capacityEst: number | null;
}): string {
    return `
    <Placemark>
      <name>${escapeXml(ghat.ghatName)}</name>
      <description><![CDATA[
        <strong>Type:</strong> Immersion Point<br/>
        <strong>Address:</strong> ${escapeXml(ghat.address)}<br/>
        <strong>Capacity:</strong> ${ghat.capacityEst || 'N/A'}
      ]]></description>
      <styleUrl>#ghat</styleUrl>
      <Point>
        <coordinates>${ghat.longitude},${ghat.latitude},0</coordinates>
      </Point>
    </Placemark>`;
}

function generateRoutePlacemark(route: {
    routeName: string;
    startLat: number | null;
    startLng: number | null;
    endLat: number | null;
    endLng: number | null;
    startLabel: string | null;
    endLabel: string | null;
    distanceKm: number | null;
}): string {
    if (!route.startLat || !route.startLng || !route.endLat || !route.endLng) return '';

    return `
    <Placemark>
      <name>${escapeXml(route.routeName)}</name>
      <description><![CDATA[
        <strong>Start:</strong> ${escapeXml(route.startLabel)}<br/>
        <strong>End:</strong> ${escapeXml(route.endLabel)}<br/>
        <strong>Distance:</strong> ${route.distanceKm || 'N/A'} km
      ]]></description>
      <styleUrl>#route</styleUrl>
      <LineString>
        <coordinates>
          ${route.startLng},${route.startLat},0
          ${route.endLng},${route.endLat},0
        </coordinates>
      </LineString>
    </Placemark>`;
}

function generateZonePlacemark(zone: {
    zoneName: string;
    riskTier: string;
    polygonGeojson: string;
}): string {
    try {
        const geojson = JSON.parse(zone.polygonGeojson);
        const coords = geojson.coordinates?.[0];
        if (!coords) return '';

        const coordString = coords.map((c: number[]) => `${c[0]},${c[1]},0`).join(' ');
        const styleId = `zone_${zone.riskTier.toLowerCase()}`;

        return `
      <Placemark>
        <name>${escapeXml(zone.zoneName)}</name>
        <description><![CDATA[
          <strong>Type:</strong> Zone<br/>
          <strong>Risk Tier:</strong> ${zone.riskTier}
        ]]></description>
        <styleUrl>#${styleId}</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>${coordString}</coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>`;
    } catch {
        return '';
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const groupBy = searchParams.get('groupBy') || 'city';
    const include = searchParams.get('include')?.split(',') || ['units', 'routes', 'ghats', 'zones'];

    try {
        // Fetch all data
        const [units, ghats, routes, zones, policeStations] = await Promise.all([
            include.includes('units') ? prisma.eventUnit.findMany({ include: { policeStation: true } }) : [],
            include.includes('ghats') ? prisma.ghat.findMany() : [],
            include.includes('routes') ? prisma.route.findMany({ include: { policeStation: true } }) : [],
            include.includes('zones') ? prisma.zone.findMany({ include: { policeStation: true } }) : [],
            prisma.policeStation.findMany(),
        ]);

        let kmlContent = '';

        if (groupBy === 'ps') {
            // Group by Police Station
            for (const ps of policeStations) {
                const psUnits = units.filter(u => u.psId === ps.id);
                const psRoutes = routes.filter(r => r.psId === ps.id);
                const psZones = zones.filter(z => z.psId === ps.id);

                kmlContent += `
          <Folder>
            <name>${escapeXml(ps.psName)}</name>
            <description>Police Station: ${escapeXml(ps.psName)}</description>
            ${include.includes('units') ? `
              <Folder>
                <name>Event Units</name>
                ${psUnits.map(generateUnitPlacemark).join('')}
              </Folder>
            ` : ''}
            ${include.includes('routes') ? `
              <Folder>
                <name>Routes</name>
                ${psRoutes.map(generateRoutePlacemark).join('')}
              </Folder>
            ` : ''}
            ${include.includes('zones') ? `
              <Folder>
                <name>Zones</name>
                ${psZones.map(generateZonePlacemark).join('')}
              </Folder>
            ` : ''}
          </Folder>`;
            }

            // Add ghats (not PS-specific)
            if (include.includes('ghats') && ghats.length > 0) {
                kmlContent += `
          <Folder>
            <name>Ghats</name>
            ${ghats.map(generateGhatPlacemark).join('')}
          </Folder>`;
            }
        } else {
            // City-wide grouping
            if (include.includes('units')) {
                kmlContent += `
          <Folder>
            <name>Event Units</name>
            ${units.map(generateUnitPlacemark).join('')}
          </Folder>`;
            }
            if (include.includes('ghats')) {
                kmlContent += `
          <Folder>
            <name>Ghats</name>
            ${ghats.map(generateGhatPlacemark).join('')}
          </Folder>`;
            }
            if (include.includes('routes')) {
                kmlContent += `
          <Folder>
            <name>Routes</name>
            ${routes.map(generateRoutePlacemark).join('')}
          </Folder>`;
            }
            if (include.includes('zones')) {
                kmlContent += `
          <Folder>
            <name>Zones</name>
            ${zones.map(generateZonePlacemark).join('')}
          </Folder>`;
            }
        }

        const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>AI BANDOBaST - Ganpati Utsav 2025 Nashik</name>
    <description>Bandobast planning data exported from AI BANDOBaST portal</description>
    ${KML_STYLES}
    ${kmlContent}
  </Document>
</kml>`;

        return new NextResponse(kml, {
            headers: {
                'Content-Type': 'application/vnd.google-earth.kml+xml',
                'Content-Disposition': `attachment; filename="bandobast_${groupBy}_${new Date().toISOString().split('T')[0]}.kml"`,
            },
        });
    } catch (error) {
        console.error('Error generating KML:', error);
        return NextResponse.json({ error: 'Failed to generate KML' }, { status: 500 });
    }
}
