// 3D Globe Component using Three.js
// Shows airports as markers and routes as arcs on a rotating globe

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../contexts/GameContext';
import { airports } from '../../data/airports';
import { Airport } from '../../data/airports';
import { Route } from '../../models/types';

// Convert lat/lon to 3D coordinates on sphere
// We'll use the x,y coordinates from airports as approximations
// and convert them to spherical coordinates
function coordsToVector3(x: number, y: number, radius: number = 5): THREE.Vector3 {
    // Normalize x (0-800) to longitude (-180 to 180)
    const lon = ((x / 800) * 360 - 180) * (Math.PI / 180);

    // Normalize y (0-400) to latitude (90 to -90)
    // Note: y increases downward in screen coordinates
    const lat = (90 - (y / 400) * 180) * (Math.PI / 180);

    // Convert spherical to Cartesian coordinates
    const phi = lat;
    const theta = lon;

    return new THREE.Vector3(
        radius * Math.cos(phi) * Math.cos(theta),
        radius * Math.sin(phi),
        radius * Math.cos(phi) * Math.sin(theta)
    );
}

// Create arc points between two positions
function createArcPoints(start: THREE.Vector3, end: THREE.Vector3, numPoints: number = 50): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        // Interpolate between start and end
        const point = new THREE.Vector3().lerpVectors(start, end, t);
        // Push outward slightly to create an arc
        const arcHeight = Math.sin(t * Math.PI) * 0.5;
        point.normalize().multiplyScalar(5.2 + arcHeight);
        points.push(point);
    }

    return points;
}

interface AirportMarkerProps {
    airport: Airport;
    isOwned: boolean;
    isCompetitor: boolean;
    hasRoutes: boolean;
    onHover: (airport: Airport | null) => void;
}

function AirportMarker({ airport, isOwned, isCompetitor, hasRoutes, onHover }: AirportMarkerProps) {
    const position = coordsToVector3(airport.x, airport.y);

    // Determine color based on ownership
    let color = '#666666';
    let size = 0.08;

    if (isOwned) {
        color = '#00ff00';
        size = 0.12;
    } else if (isCompetitor) {
        color = '#ff5500';
        size = 0.10;
    } else if (hasRoutes) {
        color = '#ffaa00';
        size = 0.10;
    }

    return (
        <Sphere
            args={[size, 16, 16]}
            position={position}
            onPointerOver={() => onHover(airport)}
            onPointerOut={() => onHover(null)}
        >
            <meshBasicMaterial color={color} />
        </Sphere>
    );
}

interface RouteArcProps {
    route: Route;
    profitClass: string;
}

function RouteArc({ route, profitClass }: RouteArcProps) {
    const fromAirport = airports.find(a => a.id === route.from);
    const toAirport = airports.find(a => a.id === route.to);

    if (!fromAirport || !toAirport) return null;

    const start = coordsToVector3(fromAirport.x, fromAirport.y);
    const end = coordsToVector3(toAirport.x, toAirport.y);
    const arcPoints = useMemo(() => createArcPoints(start, end), [start, end]);

    // Determine color based on profitability
    let color = '#666666';
    let opacity = 0.6;

    if (route.suspended) {
        color = '#666666';
        opacity = 0.3;
    } else {
        switch (profitClass) {
            case 'highly-profitable':
                color = '#00ff00';
                opacity = 0.9;
                break;
            case 'profitable':
                color = '#7fff00';
                opacity = 0.8;
                break;
            case 'marginal':
                color = '#ffaa00';
                opacity = 0.7;
                break;
            case 'unprofitable':
                color = '#ff5500';
                opacity = 0.7;
                break;
        }
    }

    return (
        <Line
            points={arcPoints}
            color={color}
            lineWidth={route.suspended ? 1 : 2}
            transparent
            opacity={opacity}
        />
    );
}

function GlobeScene() {
    const globeRef = useRef<THREE.Mesh>(null);
    const { state, engine } = useGame();
    const [hoveredAirport, setHoveredAirport] = useState<Airport | null>(null);

    // Auto-rotate globe slowly
    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.001;
        }
    });

    // Prepare airport data with ownership info
    const mapAirports = useMemo(() => {
        return airports.map(airport => {
            const stateAirport = state.airports.find(a => a.id === airport.id);
            const hasRoutes = state.routes.some(r =>
                r.from === airport.id || r.to === airport.id
            );

            return {
                ...airport,
                isOwned: stateAirport?.owned || false,
                isCompetitor: !!stateAirport?.competitor_owned,
                hasRoutes
            };
        });
    }, [state.airports, state.routes]);

    // Calculate route metrics
    const routeMetrics = useMemo(() => {
        return state.routes.map(route => {
            const metrics = engine.estimateRouteProfitability(route);
            return {
                route,
                ...metrics,
                profitClass: route.suspended
                    ? 'suspended'
                    : metrics.profit > 1000000
                    ? 'highly-profitable'
                    : metrics.profit > 0
                    ? 'profitable'
                    : metrics.profit > -500000
                    ? 'marginal'
                    : 'unprofitable'
            };
        });
    }, [state.routes, state.year, state.fuelPrice, state.reputation]);

    return (
        <group>
            {/* Globe sphere */}
            <Sphere ref={globeRef} args={[5, 64, 64]}>
                <meshStandardMaterial
                    color="#001a00"
                    roughness={1}
                    metalness={0}
                    wireframe={false}
                />
            </Sphere>

            {/* Wireframe overlay */}
            <Sphere args={[5.02, 32, 32]}>
                <meshBasicMaterial
                    color="#00aa00"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </Sphere>

            {/* Routes */}
            {routeMetrics.map(({ route, profitClass }) => (
                <RouteArc
                    key={route.id}
                    route={route}
                    profitClass={profitClass}
                />
            ))}

            {/* Airports */}
            {mapAirports.map(airport => (
                <AirportMarker
                    key={airport.id}
                    airport={airport}
                    isOwned={airport.isOwned}
                    isCompetitor={airport.isCompetitor}
                    hasRoutes={airport.hasRoutes}
                    onHover={setHoveredAirport}
                />
            ))}

            {/* Ambient light */}
            <ambientLight intensity={0.5} />

            {/* Directional light */}
            <directionalLight position={[10, 10, 10]} intensity={1} />
        </group>
    );
}

export function Globe3D() {
    return (
        <div className="globe-container">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 50 }}
                style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            >
                <GlobeScene />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={8}
                    maxDistance={25}
                    autoRotate={false}
                />
            </Canvas>

            {/* Legend */}
            <div className="globe-legend">
                <div className="legend-title">Legend</div>
                <div className="legend-items">
                    <div className="legend-item">
                        <span className="legend-marker owned"></span>
                        <span>Your Airports</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-marker competitor"></span>
                        <span>Competitors</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-marker available"></span>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-route highly-profitable"></span>
                        <span>Highly Profitable</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-route profitable"></span>
                        <span>Profitable</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-route unprofitable"></span>
                        <span>Unprofitable</span>
                    </div>
                </div>
                <div className="globe-hint">
                    Drag to rotate • Scroll to zoom
                </div>
            </div>
        </div>
    );
}
