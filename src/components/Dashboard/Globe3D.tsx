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
import { AirportDetailsModal } from '../Modals/AirportDetailsModal';

// Generate a simple world map texture with continents
function generateWorldMapTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    const size = 2048;
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext('2d')!;

    // Fill with ocean color - dark blue-green
    ctx.fillStyle = '#0a2820';
    ctx.fillRect(0, 0, size, size / 2);

    // Land color - earth green
    ctx.fillStyle = '#2d5a3f';

    // Helper to convert lat/lon to pixel coordinates (equirectangular projection)
    const toPixel = (lon: number, lat: number): [number, number] => {
        const x = ((lon + 180) / 360) * size;
        const y = ((90 - lat) / 180) * (size / 2);
        return [x, y];
    };

    // Draw continents with more detailed outlines
    // North America
    ctx.beginPath();
    ctx.moveTo(...toPixel(-169, 65));
    ctx.lineTo(...toPixel(-168, 68));
    ctx.lineTo(...toPixel(-165, 70));
    ctx.lineTo(...toPixel(-156, 71));
    ctx.lineTo(...toPixel(-141, 70));
    ctx.lineTo(...toPixel(-130, 69));
    ctx.lineTo(...toPixel(-95, 69));
    ctx.lineTo(...toPixel(-80, 68));
    ctx.lineTo(...toPixel(-70, 67));
    ctx.lineTo(...toPixel(-60, 65));
    ctx.lineTo(...toPixel(-55, 62));
    ctx.lineTo(...toPixel(-52, 58));
    ctx.lineTo(...toPixel(-52, 50));
    ctx.lineTo(...toPixel(-55, 48));
    ctx.lineTo(...toPixel(-60, 46));
    ctx.lineTo(...toPixel(-63, 44));
    ctx.lineTo(...toPixel(-65, 42));
    ctx.lineTo(...toPixel(-75, 36));
    ctx.lineTo(...toPixel(-80, 30));
    ctx.lineTo(...toPixel(-81, 26));
    ctx.lineTo(...toPixel(-81, 22));
    ctx.lineTo(...toPixel(-83, 18));
    ctx.lineTo(...toPixel(-87, 16));
    ctx.lineTo(...toPixel(-92, 15));
    ctx.lineTo(...toPixel(-97, 16));
    ctx.lineTo(...toPixel(-105, 17));
    ctx.lineTo(...toPixel(-110, 16));
    ctx.lineTo(...toPixel(-115, 16));
    ctx.lineTo(...toPixel(-118, 17));
    ctx.lineTo(...toPixel(-122, 20));
    ctx.lineTo(...toPixel(-125, 25));
    ctx.lineTo(...toPixel(-130, 32));
    ctx.lineTo(...toPixel(-132, 40));
    ctx.lineTo(...toPixel(-135, 48));
    ctx.lineTo(...toPixel(-140, 54));
    ctx.lineTo(...toPixel(-145, 58));
    ctx.lineTo(...toPixel(-155, 60));
    ctx.lineTo(...toPixel(-162, 62));
    ctx.lineTo(...toPixel(-169, 65));
    ctx.closePath();
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.moveTo(...toPixel(-81, 12));
    ctx.lineTo(...toPixel(-78, 10));
    ctx.lineTo(...toPixel(-73, 7));
    ctx.lineTo(...toPixel(-68, 2));
    ctx.lineTo(...toPixel(-62, 0));
    ctx.lineTo(...toPixel(-57, -2));
    ctx.lineTo(...toPixel(-48, -2));
    ctx.lineTo(...toPixel(-42, -1));
    ctx.lineTo(...toPixel(-38, 0));
    ctx.lineTo(...toPixel(-35, 2));
    ctx.lineTo(...toPixel(-35, 5));
    ctx.lineTo(...toPixel(-35, -5));
    ctx.lineTo(...toPixel(-36, -12));
    ctx.lineTo(...toPixel(-38, -18));
    ctx.lineTo(...toPixel(-42, -24));
    ctx.lineTo(...toPixel(-46, -28));
    ctx.lineTo(...toPixel(-50, -32));
    ctx.lineTo(...toPixel(-54, -38));
    ctx.lineTo(...toPixel(-58, -44));
    ctx.lineTo(...toPixel(-62, -50));
    ctx.lineTo(...toPixel(-66, -54));
    ctx.lineTo(...toPixel(-70, -55));
    ctx.lineTo(...toPixel(-73, -54));
    ctx.lineTo(...toPixel(-74, -50));
    ctx.lineTo(...toPixel(-75, -45));
    ctx.lineTo(...toPixel(-76, -38));
    ctx.lineTo(...toPixel(-77, -30));
    ctx.lineTo(...toPixel(-78, -22));
    ctx.lineTo(...toPixel(-79, -16));
    ctx.lineTo(...toPixel(-81, 12));
    ctx.closePath();
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.moveTo(...toPixel(-10, 70));
    ctx.lineTo(...toPixel(-5, 71));
    ctx.lineTo(...toPixel(0, 70));
    ctx.lineTo(...toPixel(5, 69));
    ctx.lineTo(...toPixel(10, 68));
    ctx.lineTo(...toPixel(15, 66));
    ctx.lineTo(...toPixel(20, 64));
    ctx.lineTo(...toPixel(25, 62));
    ctx.lineTo(...toPixel(30, 60));
    ctx.lineTo(...toPixel(35, 58));
    ctx.lineTo(...toPixel(38, 56));
    ctx.lineTo(...toPixel(40, 54));
    ctx.lineTo(...toPixel(42, 50));
    ctx.lineTo(...toPixel(40, 47));
    ctx.lineTo(...toPixel(37, 45));
    ctx.lineTo(...toPixel(32, 43));
    ctx.lineTo(...toPixel(25, 42));
    ctx.lineTo(...toPixel(18, 41));
    ctx.lineTo(...toPixel(12, 40));
    ctx.lineTo(...toPixel(6, 39));
    ctx.lineTo(...toPixel(0, 38));
    ctx.lineTo(...toPixel(-5, 37));
    ctx.lineTo(...toPixel(-9, 36));
    ctx.lineTo(...toPixel(-10, 40));
    ctx.lineTo(...toPixel(-10, 50));
    ctx.lineTo(...toPixel(-10, 60));
    ctx.lineTo(...toPixel(-10, 70));
    ctx.closePath();
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.moveTo(...toPixel(-17, 37));
    ctx.lineTo(...toPixel(-11, 35));
    ctx.lineTo(...toPixel(-5, 33));
    ctx.lineTo(...toPixel(0, 31));
    ctx.lineTo(...toPixel(8, 31));
    ctx.lineTo(...toPixel(15, 30));
    ctx.lineTo(...toPixel(25, 30));
    ctx.lineTo(...toPixel(32, 31));
    ctx.lineTo(...toPixel(38, 31));
    ctx.lineTo(...toPixel(43, 30));
    ctx.lineTo(...toPixel(48, 28));
    ctx.lineTo(...toPixel(51, 25));
    ctx.lineTo(...toPixel(51, 20));
    ctx.lineTo(...toPixel(50, 15));
    ctx.lineTo(...toPixel(48, 10));
    ctx.lineTo(...toPixel(48, 5));
    ctx.lineTo(...toPixel(48, 0));
    ctx.lineTo(...toPixel(48, -5));
    ctx.lineTo(...toPixel(48, -10));
    ctx.lineTo(...toPixel(48, -15));
    ctx.lineTo(...toPixel(47, -20));
    ctx.lineTo(...toPixel(45, -25));
    ctx.lineTo(...toPixel(42, -29));
    ctx.lineTo(...toPixel(38, -32));
    ctx.lineTo(...toPixel(33, -34));
    ctx.lineTo(...toPixel(26, -35));
    ctx.lineTo(...toPixel(20, -34));
    ctx.lineTo(...toPixel(16, -30));
    ctx.lineTo(...toPixel(14, -25));
    ctx.lineTo(...toPixel(12, -18));
    ctx.lineTo(...toPixel(10, -10));
    ctx.lineTo(...toPixel(7, -2));
    ctx.lineTo(...toPixel(3, 5));
    ctx.lineTo(...toPixel(-2, 10));
    ctx.lineTo(...toPixel(-8, 15));
    ctx.lineTo(...toPixel(-12, 20));
    ctx.lineTo(...toPixel(-15, 26));
    ctx.lineTo(...toPixel(-17, 32));
    ctx.lineTo(...toPixel(-17, 37));
    ctx.closePath();
    ctx.fill();

    // Asia (large continent)
    ctx.beginPath();
    ctx.moveTo(...toPixel(26, 77));
    ctx.lineTo(...toPixel(40, 76));
    ctx.lineTo(...toPixel(60, 76));
    ctx.lineTo(...toPixel(80, 74));
    ctx.lineTo(...toPixel(100, 71));
    ctx.lineTo(...toPixel(120, 68));
    ctx.lineTo(...toPixel(140, 66));
    ctx.lineTo(...toPixel(160, 67));
    ctx.lineTo(...toPixel(170, 68));
    ctx.lineTo(...toPixel(178, 70));
    ctx.lineTo(...toPixel(180, 68));
    ctx.lineTo(...toPixel(175, 62));
    ctx.lineTo(...toPixel(170, 58));
    ctx.lineTo(...toPixel(165, 54));
    ctx.lineTo(...toPixel(158, 50));
    ctx.lineTo(...toPixel(150, 47));
    ctx.lineTo(...toPixel(142, 45));
    ctx.lineTo(...toPixel(135, 42));
    ctx.lineTo(...toPixel(128, 38));
    ctx.lineTo(...toPixel(122, 33));
    ctx.lineTo(...toPixel(118, 28));
    ctx.lineTo(...toPixel(115, 22));
    ctx.lineTo(...toPixel(112, 16));
    ctx.lineTo(...toPixel(108, 10));
    ctx.lineTo(...toPixel(104, 6));
    ctx.lineTo(...toPixel(98, 5));
    ctx.lineTo(...toPixel(92, 5));
    ctx.lineTo(...toPixel(85, 6));
    ctx.lineTo(...toPixel(78, 8));
    ctx.lineTo(...toPixel(70, 10));
    ctx.lineTo(...toPixel(62, 12));
    ctx.lineTo(...toPixel(55, 13));
    ctx.lineTo(...toPixel(48, 14));
    ctx.lineTo(...toPixel(43, 18));
    ctx.lineTo(...toPixel(40, 25));
    ctx.lineTo(...toPixel(38, 32));
    ctx.lineTo(...toPixel(36, 40));
    ctx.lineTo(...toPixel(33, 48));
    ctx.lineTo(...toPixel(30, 58));
    ctx.lineTo(...toPixel(28, 68));
    ctx.lineTo(...toPixel(26, 77));
    ctx.closePath();
    ctx.fill();

    // Southeast Asia & Indonesia
    ctx.beginPath();
    ctx.moveTo(...toPixel(95, 28));
    ctx.lineTo(...toPixel(100, 26));
    ctx.lineTo(...toPixel(105, 24));
    ctx.lineTo(...toPixel(110, 22));
    ctx.lineTo(...toPixel(115, 20));
    ctx.lineTo(...toPixel(122, 18));
    ctx.lineTo(...toPixel(128, 16));
    ctx.lineTo(...toPixel(135, 15));
    ctx.lineTo(...toPixel(140, 16));
    ctx.lineTo(...toPixel(142, 10));
    ctx.lineTo(...toPixel(140, 5));
    ctx.lineTo(...toPixel(135, 0));
    ctx.lineTo(...toPixel(130, -3));
    ctx.lineTo(...toPixel(123, -5));
    ctx.lineTo(...toPixel(115, -6));
    ctx.lineTo(...toPixel(108, -5));
    ctx.lineTo(...toPixel(102, -3));
    ctx.lineTo(...toPixel(98, 0));
    ctx.lineTo(...toPixel(95, 5));
    ctx.lineTo(...toPixel(93, 12));
    ctx.lineTo(...toPixel(92, 20));
    ctx.lineTo(...toPixel(95, 28));
    ctx.closePath();
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.moveTo(...toPixel(113, -10));
    ctx.lineTo(...toPixel(118, -11));
    ctx.lineTo(...toPixel(125, -12));
    ctx.lineTo(...toPixel(132, -14));
    ctx.lineTo(...toPixel(138, -16));
    ctx.lineTo(...toPixel(144, -18));
    ctx.lineTo(...toPixel(149, -20));
    ctx.lineTo(...toPixel(153, -23));
    ctx.lineTo(...toPixel(154, -28));
    ctx.lineTo(...toPixel(153, -33));
    ctx.lineTo(...toPixel(151, -37));
    ctx.lineTo(...toPixel(148, -40));
    ctx.lineTo(...toPixel(144, -42));
    ctx.lineTo(...toPixel(138, -43));
    ctx.lineTo(...toPixel(132, -43));
    ctx.lineTo(...toPixel(125, -42));
    ctx.lineTo(...toPixel(119, -40));
    ctx.lineTo(...toPixel(115, -37));
    ctx.lineTo(...toPixel(113, -32));
    ctx.lineTo(...toPixel(113, -26));
    ctx.lineTo(...toPixel(113, -18));
    ctx.lineTo(...toPixel(113, -10));
    ctx.closePath();
    ctx.fill();

    // Antarctica - bottom strip
    ctx.fillRect(0, toPixel(0, -60)[1], size, (size / 2) - toPixel(0, -60)[1]);

    // Add lighter terrain highlights for depth
    ctx.fillStyle = '#3d7a5f';
    ctx.globalAlpha = 0.4;

    // Random mountain/terrain highlights
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * size;
        const y = Math.random() * (size / 2);
        const radius = 15 + Math.random() * 40;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1.0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;

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

interface GlobeSceneProps {
    onSelectAirport: (airport: Airport | null) => void;
}

function GlobeSceneWithSelection({ onSelectAirport }: GlobeSceneProps) {
    const globeRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const { state, engine } = useGame();
    const [hoveredAirport, setHoveredAirport] = useState<Airport | null>(null);

    // Generate world map texture once
    const worldMapTexture = useMemo(() => {
        const texture = generateWorldMapTexture();
        texture.needsUpdate = true;
        return texture;
    }, []);

    // Pulsing atmosphere animation (removed auto-rotate to keep texture aligned with airports)
    useFrame(({ clock }) => {
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
            <Sphere ref={globeRef} args={[5, 64, 64]} rotation={[0, 0, 0]}>
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
                    onClick={onSelectAirport}
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
    const { state } = useGame();
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

    return (
        <div className="globe-container">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{
                    background: 'radial-gradient(circle at center, #0a1628 0%, #000000 100%)'
                }}
            >
                <GlobeSceneWithSelection onSelectAirport={setSelectedAirport} />
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
                    Drag to rotate • Scroll to zoom • Click airport for details
                </div>
            </div>

            {/* Airport Details Modal */}
            {selectedAirport && (
                <AirportDetailsModal
                    airport={selectedAirport}
                    gameState={state}
                    onClose={() => setSelectedAirport(null)}
                />
            )}
        </div>
    );
}
