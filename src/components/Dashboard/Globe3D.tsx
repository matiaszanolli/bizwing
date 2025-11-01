// 3D Globe Component using Three.js
// Shows airports as markers and routes as arcs on a rotating globe

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../contexts/GameContext';
import { airports } from '../../data/airports';
import { Airport } from '../../data/airports';
import { Route } from '../../models/types';
import { formatMoney } from '../../utils/helpers';

// Generate a simple world map texture
function generateWorldMapTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    const size = 2048;
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext('2d')!;

    // Ocean background - darker for better contrast
    ctx.fillStyle = '#082818';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Simplified continent shapes with better positioning
    // Using equirectangular projection coordinates
    ctx.fillStyle = '#2a6d3f';

    // Americas (left side of map)
    // North America
    ctx.beginPath();
    ctx.ellipse(400, 300, 200, 220, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.ellipse(500, 650, 100, 200, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Central America connector
    ctx.fillRect(380, 450, 80, 100);

    // Europe (center-left)
    ctx.beginPath();
    ctx.ellipse(1050, 280, 140, 100, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Africa (center)
    ctx.beginPath();
    ctx.ellipse(1100, 520, 160, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    // Asia (right-center) - largest landmass
    ctx.beginPath();
    ctx.ellipse(1500, 300, 300, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    // Australia (right-lower)
    ctx.beginPath();
    ctx.ellipse(1650, 720, 120, 90, 0, 0, Math.PI * 2);
    ctx.fill();

    // Greenland
    ctx.beginPath();
    ctx.ellipse(650, 180, 60, 80, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Antarctica (bottom strip)
    ctx.fillRect(0, 920, canvas.width, 104);

    // Add terrain variation with lighter green
    ctx.fillStyle = '#3a8d5f';
    ctx.globalAlpha = 0.4;

    // Mountain/terrain details on major landmasses
    const terrainSpots = [
        // North America mountains
        [350, 280], [420, 300], [450, 320],
        // South America Andes
        [480, 600], [490, 650], [500, 700],
        // European Alps
        [1050, 300], [1080, 290],
        // African highlands
        [1100, 480], [1120, 550],
        // Asian mountains
        [1450, 280], [1500, 270], [1550, 290], [1600, 300],
        // Australian interior
        [1650, 720]
    ];

    terrainSpots.forEach(([x, y]) => {
        const radius = 20 + Math.random() * 30;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1.0;

    // Add coastline highlights
    ctx.strokeStyle = '#4aad7f';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.3;

    // Draw subtle outlines on continents
    ctx.strokeRect(200, 200, 400, 400); // Americas rough outline
    ctx.strokeRect(900, 200, 400, 400); // Europe-Africa outline
    ctx.strokeRect(1200, 200, 600, 400); // Asia outline

    ctx.globalAlpha = 1.0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

// Convert latitude/longitude to 3D coordinates on sphere
// lat/lon are in decimal degrees
function coordsToVector3(lat: number, lon: number, radius: number = 5): THREE.Vector3 {
    // Convert degrees to radians
    const phi = (90 - lat) * (Math.PI / 180);  // Latitude to phi (0 at north pole, PI at south pole)
    const theta = (lon + 180) * (Math.PI / 180);  // Longitude to theta (0 to 2*PI)

    // Convert spherical to Cartesian coordinates
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
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
    onClick: (airport: Airport) => void;
}

function AirportMarker({ airport, isOwned, isCompetitor, hasRoutes, onHover, onClick }: AirportMarkerProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const position = coordsToVector3(airport.lat, airport.lon);
    const [hovered, setHovered] = useState(false);

    // Determine color based on ownership
    let color = '#666666';
    let size = 0.08;
    let pulseSpeed = 1;

    if (isOwned) {
        color = '#00ff00';
        size = 0.12;
        pulseSpeed = 1.5;
    } else if (isCompetitor) {
        color = '#ff5500';
        size = 0.10;
        pulseSpeed = 1.2;
    } else if (hasRoutes) {
        color = '#ffaa00';
        size = 0.10;
    }

    // Pulsing animation for owned/competitor airports
    useFrame(({ clock }) => {
        if (meshRef.current && (isOwned || isCompetitor)) {
            const scale = 1 + Math.sin(clock.elapsedTime * pulseSpeed) * 0.2;
            meshRef.current.scale.set(scale, scale, scale);
        }
        if (meshRef.current && hovered) {
            const scale = 1.3 + Math.sin(clock.elapsedTime * 3) * 0.1;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={position}>
            <Sphere
                ref={meshRef}
                args={[size, 16, 16]}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    onHover(airport);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    onHover(null);
                    document.body.style.cursor = 'default';
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(airport);
                }}
            >
                <meshBasicMaterial color={color} />
            </Sphere>

            {/* Glow effect for owned/competitor airports */}
            {(isOwned || isCompetitor) && (
                <Sphere args={[size * 1.5, 16, 16]}>
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.2}
                        depthWrite={false}
                    />
                </Sphere>
            )}

            {/* Tooltip on hover */}
            {hovered && (
                <Html distanceFactor={15}>
                    <div className="globe-tooltip">
                        <div className="tooltip-title">{airport.name}</div>
                        <div className="tooltip-details">
                            <div>{airport.country}</div>
                            {isOwned && <div className="tooltip-status owned">Your Airport</div>}
                            {isCompetitor && <div className="tooltip-status competitor">Competitor</div>}
                            {!isOwned && !isCompetitor && hasRoutes && <div className="tooltip-status">Connected</div>}
                            {!isOwned && !isCompetitor && !hasRoutes && <div className="tooltip-status">Available</div>}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

interface RouteArcProps {
    route: Route;
    profitClass: string;
}

function RouteArc({ route, profitClass }: RouteArcProps) {
    const lineRef = useRef<THREE.Line>(null);
    const fromAirport = airports.find(a => a.id === route.from);
    const toAirport = airports.find(a => a.id === route.to);

    if (!fromAirport || !toAirport) return null;

    const start = coordsToVector3(fromAirport.lat, fromAirport.lon);
    const end = coordsToVector3(toAirport.lat, toAirport.lon);
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

    // Animate dashed line offset for flow effect
    useFrame(({ clock }) => {
        if (lineRef.current && !route.suspended) {
            const material = lineRef.current.material as THREE.LineDashedMaterial;
            material.dashOffset = -clock.elapsedTime * 0.5;
        }
    });

    return (
        <>
            {/* Main route line */}
            <Line
                ref={lineRef}
                points={arcPoints}
                color={color}
                lineWidth={route.suspended ? 1 : 2}
                transparent
                opacity={opacity}
                dashed={!route.suspended}
                dashScale={50}
                dashSize={3}
                gapSize={2}
            />

            {/* Animated particles for active routes */}
            {!route.suspended && profitClass !== 'unprofitable' && (
                <RouteParticle
                    points={arcPoints}
                    color={color}
                    speed={profitClass === 'highly-profitable' ? 2 : 1}
                />
            )}
        </>
    );
}

// Animated particle that moves along the route
interface RouteParticleProps {
    points: THREE.Vector3[];
    color: string;
    speed: number;
}

function RouteParticle({ points, color, speed }: RouteParticleProps) {
    const particleRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (particleRef.current && points.length > 0) {
            const t = (clock.elapsedTime * speed * 0.1) % 1;
            const index = Math.floor(t * (points.length - 1));
            const nextIndex = Math.min(index + 1, points.length - 1);
            const localT = (t * (points.length - 1)) % 1;

            const position = new THREE.Vector3().lerpVectors(
                points[index],
                points[nextIndex],
                localT
            );

            particleRef.current.position.copy(position);
        }
    });

    return (
        <Sphere ref={particleRef} args={[0.05, 8, 8]}>
            <meshBasicMaterial color={color} />
        </Sphere>
    );
}

// Atmosphere shader for glow effect
const AtmosphereMaterial = () => {
    const shaderRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.time.value = clock.elapsedTime;
        }
    });

    return (
        <shaderMaterial
            ref={shaderRef}
            transparent
            side={THREE.BackSide}
            uniforms={{
                time: { value: 0 },
            }}
            vertexShader={`
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `}
            fragmentShader={`
                varying vec3 vNormal;
                varying vec3 vPosition;
                uniform float time;
                void main() {
                    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    vec3 glowColor = vec3(0.3, 0.6, 1.0);
                    gl_FragColor = vec4(glowColor, 1.0) * intensity;
                }
            `}
        />
    );
};

function GlobeScene() {
    const globeRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const { state, engine } = useGame();
    const [hoveredAirport, setHoveredAirport] = useState<Airport | null>(null);
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

    // Generate world map texture once
    const worldMapTexture = useMemo(() => {
        const texture = generateWorldMapTexture();
        // Rotate texture to align with globe coordinates
        texture.rotation = Math.PI;
        texture.center.set(0.5, 0.5);
        texture.needsUpdate = true;
        return texture;
    }, []);

    // Auto-rotate globe slowly
    useFrame(({ clock }) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.001;
        }
        // Pulsing atmosphere
        if (atmosphereRef.current) {
            const scale = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.02;
            atmosphereRef.current.scale.set(scale, scale, scale);
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
            {/* Globe sphere with world map texture */}
            <Sphere ref={globeRef} args={[5, 64, 64]} rotation={[0, -Math.PI / 2, 0]}>
                <meshPhongMaterial
                    map={worldMapTexture}
                    emissive="#002a1a"
                    emissiveIntensity={0.3}
                    shininess={25}
                    specular="#44aa77"
                />
            </Sphere>

            {/* Subtle highlight overlay for oceans */}
            <Sphere args={[5.005, 64, 64]}>
                <meshPhongMaterial
                    color="#0a3a2a"
                    transparent
                    opacity={0.2}
                    shininess={50}
                    specular="#44ffaa"
                />
            </Sphere>

            {/* Grid overlay for geographic reference */}
            <Sphere args={[5.02, 32, 32]}>
                <meshBasicMaterial
                    color="#00ff88"
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </Sphere>

            {/* Atmosphere glow */}
            <Sphere ref={atmosphereRef} args={[5.4, 32, 32]}>
                <AtmosphereMaterial />
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
                    onClick={setSelectedAirport}
                />
            ))}

            {/* Enhanced lighting setup */}
            <ambientLight intensity={0.4} />

            {/* Main light (sun) */}
            <directionalLight
                position={[10, 5, 10]}
                intensity={1.2}
                color="#ffffff"
            />

            {/* Fill light */}
            <directionalLight
                position={[-5, 3, -5]}
                intensity={0.4}
                color="#4488ff"
            />

            {/* Rim light */}
            <pointLight
                position={[0, 0, -15]}
                intensity={0.5}
                color="#88ddff"
            />
        </group>
    );
}

export function Globe3D() {
    return (
        <div className="globe-container">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{
                    background: 'radial-gradient(circle at center, #0a1628 0%, #000000 100%)'
                }}
            >
                <GlobeScene />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={8}
                    maxDistance={25}
                    autoRotate={false}
                    rotateSpeed={0.5}
                    zoomSpeed={0.8}
                    enableDamping
                    dampingFactor={0.05}
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
