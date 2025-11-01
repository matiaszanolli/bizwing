// World map GeoJSON data fetcher
// Uses Natural Earth 110m simplified country boundaries

export interface GeoJSONFeature {
    type: string;
    properties: Record<string, any>;
    geometry: {
        type: 'Polygon' | 'MultiPolygon';
        coordinates: number[][][] | number[][][][];
    };
}

export interface GeoJSONFeatureCollection {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
}

let cachedWorldData: GeoJSONFeatureCollection | null = null;

export async function fetchWorldMapData(): Promise<GeoJSONFeatureCollection> {
    if (cachedWorldData) {
        return cachedWorldData;
    }

    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        cachedWorldData = data;
        return data;
    } catch (error) {
        console.error('Failed to fetch world map data:', error);
        // Return empty feature collection on error
        return { type: 'FeatureCollection', features: [] };
    }
}

// Helper to draw a GeoJSON geometry on canvas
export function drawGeoJSONGeometry(
    ctx: CanvasRenderingContext2D,
    geometry: GeoJSONFeature['geometry'],
    toPixel: (lon: number, lat: number) => [number, number]
) {
    if (geometry.type === 'Polygon') {
        drawPolygon(ctx, geometry.coordinates as number[][][], toPixel);
    } else if (geometry.type === 'MultiPolygon') {
        const multiPolygon = geometry.coordinates as number[][][][];
        for (const polygon of multiPolygon) {
            drawPolygon(ctx, polygon, toPixel);
        }
    }
}

function drawPolygon(
    ctx: CanvasRenderingContext2D,
    rings: number[][][],
    toPixel: (lon: number, lat: number) => [number, number]
) {
    // First ring is the outer boundary
    for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
        const ring = rings[ringIndex];

        if (ring.length === 0) continue;

        ctx.beginPath();
        const [startLon, startLat] = ring[0];
        const [startX, startY] = toPixel(startLon, startLat);
        ctx.moveTo(startX, startY);

        for (let i = 1; i < ring.length; i++) {
            const [lon, lat] = ring[i];
            const [x, y] = toPixel(lon, lat);
            ctx.lineTo(x, y);
        }

        ctx.closePath();

        // Fill or stroke based on whether it's the outer ring or a hole
        if (ringIndex === 0) {
            ctx.fill();
        } else {
            // This is a hole - we'd need to use clip() for proper handling
            // For simplicity, we'll just fill everything for now
            ctx.fill();
        }
    }
}
