"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Sphere,
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

interface GiftBox3DProps {
  color?: string;
  ribbonColor?: string;
  size?: "small" | "medium" | "large" | "extra-large";
  bowStyle?: "classic" | "elegant" | "playful" | "luxury" | "minimalist";
  isAnimating?: boolean;
  showItems?: boolean;
}

// 3D Table Component
function Table() {
  const tableRef = useRef<THREE.Group>(null);

  return (
    <group ref={tableRef} position={[0, -1.8, 0]}>
      {/* Table Top */}
      <Box args={[8, 0.3, 6]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
      </Box>

      {/* Table Legs */}
      <Box args={[0.3, 2, 0.3]} position={[-3.5, -1.15, -2.5]}>
        <meshPhysicalMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </Box>
      <Box args={[0.3, 2, 0.3]} position={[3.5, -1.15, -2.5]}>
        <meshPhysicalMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </Box>
      <Box args={[0.3, 2, 0.3]} position={[-3.5, -1.15, 2.5]}>
        <meshPhysicalMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </Box>
      <Box args={[0.3, 2, 0.3]} position={[3.5, -1.15, 2.5]}>
        <meshPhysicalMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </Box>

      {/* Table Runner */}
      <Box args={[0.8, 0.02, 5.5]} position={[0, 0.16, 0]}>
        <meshPhysicalMaterial color="#D2691E" roughness={0.6} metalness={0.2} />
      </Box>
    </group>
  );
}

// Bow Style Components
function ClassicBow({
  ribbonColor,
  dimensions,
}: {
  ribbonColor: string;
  dimensions: any;
}) {
  return (
    <group position={[0, dimensions.height / 2 + 0.25, 0]}>
      {/* Classic Bow Loops */}
      <RoundedBox args={[0.25, 0.18, 0.12]} position={[-0.2, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.15}
          metalness={0.8}
          envMapIntensity={1}
        />
      </RoundedBox>
      <RoundedBox args={[0.25, 0.18, 0.12]} position={[0.2, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.15}
          metalness={0.8}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* Center Knot */}
      <Sphere args={[0.12]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={1}
        />
      </Sphere>

      {/* Classic Tails */}
      <Box args={[0.06, 0.3, 0.04]} position={[-0.08, -0.18, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.2}
          metalness={0.75}
        />
      </Box>
      <Box args={[0.06, 0.3, 0.04]} position={[0.08, -0.18, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.2}
          metalness={0.75}
        />
      </Box>
    </group>
  );
}

function ElegantBow({
  ribbonColor,
  dimensions,
}: {
  ribbonColor: string;
  dimensions: any;
}) {
  return (
    <group position={[0, dimensions.height / 2 + 0.2, 0]}>
      {/* Single Elegant Loop */}
      <RoundedBox args={[0.35, 0.12, 0.08]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={1.1}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Refined Center Knot */}
      <Sphere args={[0.1]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.05}
          metalness={0.9}
          envMapIntensity={1.2}
        />
      </Sphere>

      {/* Single Graceful Tail */}
      <Box args={[0.08, 0.4, 0.06]} position={[0, -0.22, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.15}
          metalness={0.8}
        />
      </Box>
    </group>
  );
}

function PlayfulBow({
  ribbonColor,
  dimensions,
}: {
  ribbonColor: string;
  dimensions: any;
}) {
  return (
    <group position={[0, dimensions.height / 2 + 0.3, 0]}>
      {/* Bouncy Loops */}
      <RoundedBox args={[0.3, 0.25, 0.15]} position={[-0.25, 0.1, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.3}
          metalness={0.6}
          envMapIntensity={0.8}
        />
      </RoundedBox>
      <RoundedBox args={[0.3, 0.25, 0.15]} position={[0.25, -0.1, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.3}
          metalness={0.6}
          envMapIntensity={0.8}
        />
      </RoundedBox>

      {/* Playful Center */}
      <Sphere args={[0.15]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.2}
          metalness={0.7}
          emissive={ribbonColor}
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Curved Tails */}
      <Box args={[0.08, 0.35, 0.05]} position={[-0.12, -0.2, 0.05]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.25}
          metalness={0.65}
        />
      </Box>
      <Box args={[0.08, 0.35, 0.05]} position={[0.12, -0.2, -0.05]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.25}
          metalness={0.65}
        />
      </Box>
    </group>
  );
}

function LuxuryBow({
  ribbonColor,
  dimensions,
}: {
  ribbonColor: string;
  dimensions: any;
}) {
  return (
    <group position={[0, dimensions.height / 2 + 0.35, 0]}>
      {/* Ornate Loops */}
      <RoundedBox args={[0.4, 0.3, 0.2]} position={[-0.3, 0.05, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.05}
          metalness={0.95}
          envMapIntensity={1.5}
          emissive={ribbonColor}
          emissiveIntensity={0.05}
        />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.3, 0.2]} position={[0.3, -0.05, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.05}
          metalness={0.95}
          envMapIntensity={1.5}
          emissive={ribbonColor}
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      {/* Luxury Center with Gem-like Appearance */}
      <Sphere args={[0.18]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.02}
          metalness={0.98}
          envMapIntensity={2}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Ornate Tails */}
      <Box args={[0.12, 0.5, 0.08]} position={[-0.15, -0.25, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.08}
          metalness={0.9}
          envMapIntensity={1.3}
        />
      </Box>
      <Box args={[0.12, 0.5, 0.08]} position={[0.15, -0.25, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.08}
          metalness={0.9}
          envMapIntensity={1.3}
        />
      </Box>

      {/* Decorative Elements */}
      <Sphere args={[0.08]} position={[-0.2, -0.15, 0.05]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={1.2}
        />
      </Sphere>
      <Sphere args={[0.08]} position={[0.2, -0.15, -0.05]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={1.2}
        />
      </Sphere>
    </group>
  );
}

function MinimalistBow({
  ribbonColor,
  dimensions,
}: {
  ribbonColor: string;
  dimensions: any;
}) {
  return (
    <group position={[0, dimensions.height / 2 + 0.15, 0]}>
      {/* Simple Horizontal Ribbon */}
      <Box
        args={[dimensions.width + 0.12, 0.08, dimensions.depth + 0.12]}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.2}
          metalness={0.7}
          envMapIntensity={0.9}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* Small Center Accent */}
      <Box args={[0.12, 0.12, 0.08]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={ribbonColor}
          roughness={0.15}
          metalness={0.8}
          envMapIntensity={1}
        />
      </Box>
    </group>
  );
}

// Main Gift Box Component
function GiftBox({
  color = "#ff6b9d",
  ribbonColor = "#ffd700",
  size = "medium",
  bowStyle = "classic",
  isAnimating = false,
  showItems = false,
}: GiftBox3DProps) {
  const boxRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const dimensions = useMemo(() => {
    switch (size) {
      case "small":
        return { width: 1.5, height: 1.2, depth: 1.2 };
      case "medium":
        return { width: 2, height: 1.5, depth: 1.5 };
      case "large":
        return { width: 2.5, height: 1.8, depth: 1.8 };
      case "extra-large":
        return { width: 3, height: 2.2, depth: 2.2 };
      default:
        return { width: 2, height: 1.5, depth: 1.5 };
    }
  }, [size]);

  useFrame((state) => {
    if (boxRef.current) {
      if (isAnimating) {
        boxRef.current.rotation.y = state.clock.elapsedTime * 0.8;
        boxRef.current.position.y =
          Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else if (hovered) {
        boxRef.current.rotation.y = THREE.MathUtils.lerp(
          boxRef.current.rotation.y,
          0.2,
          0.1
        );
        boxRef.current.position.y = THREE.MathUtils.lerp(
          boxRef.current.position.y,
          0.05,
          0.1
        );
      } else {
        boxRef.current.rotation.y = THREE.MathUtils.lerp(
          boxRef.current.rotation.y,
          0,
          0.1
        );
        boxRef.current.position.y = THREE.MathUtils.lerp(
          boxRef.current.position.y,
          0,
          0.1
        );
      }
    }
  });

  const renderBow = () => {
    switch (bowStyle) {
      case "classic":
        return <ClassicBow ribbonColor={ribbonColor} dimensions={dimensions} />;
      case "elegant":
        return <ElegantBow ribbonColor={ribbonColor} dimensions={dimensions} />;
      case "playful":
        return <PlayfulBow ribbonColor={ribbonColor} dimensions={dimensions} />;
      case "luxury":
        return <LuxuryBow ribbonColor={ribbonColor} dimensions={dimensions} />;
      case "minimalist":
        return (
          <MinimalistBow ribbonColor={ribbonColor} dimensions={dimensions} />
        );
      default:
        return <ClassicBow ribbonColor={ribbonColor} dimensions={dimensions} />;
    }
  };

  return (
    <group
      ref={boxRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
      position={[0, 0, 0]}
    >
      {/* Main Box with Rounded Corners */}
      <RoundedBox
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        radius={0.03}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0.15}
          envMapIntensity={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Box Edges for definition */}
      <Box
        args={[dimensions.width, dimensions.height * 0.02, dimensions.depth]}
        position={[0, dimensions.height / 2, 0]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.7}
          envMapIntensity={0.9}
          opacity={0.8}
          transparent
        />
      </Box>

      {/* Vertical Ribbon Strip */}
      {bowStyle !== "minimalist" && (
        <Box
          args={[0.15, dimensions.height + 0.08, dimensions.depth + 0.06]}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color={ribbonColor}
            roughness={0.15}
            metalness={0.85}
            emissive={ribbonColor}
            emissiveIntensity={0.15}
            envMapIntensity={1}
          />
        </Box>
      )}

      {/* Bow Style Component */}
      {renderBow()}

      {/* Box Contents */}
      {showItems && (
        <group position={[0, -0.1, 0]}>
          {/* Book */}
          <RoundedBox args={[0.35, 0.4, 0.25]} position={[-0.35, 0.05, -0.25]}>
            <meshPhysicalMaterial
              color="#8B4513"
              roughness={0.5}
              metalness={0.15}
              emissive="#3d2914"
              emissiveIntensity={0.05}
            />
          </RoundedBox>

          {/* Gold Item */}
          <RoundedBox args={[0.3, 0.2, 0.3]} position={[0.25, -0.05, 0.15]}>
            <meshPhysicalMaterial
              color="#FFD700"
              roughness={0.1}
              metalness={0.9}
              envMapIntensity={1.2}
              emissive="#B8860B"
              emissiveIntensity={0.1}
            />
          </RoundedBox>

          {/* Pink Gem */}
          <Sphere args={[0.15]} position={[0, 0.25, -0.15]}>
            <meshPhysicalMaterial
              color="#FF69B4"
              roughness={0.05}
              metalness={0.1}
              envMapIntensity={1}
              transparent
              opacity={0.85}
              emissive="#FF1493"
              emissiveIntensity={0.05}
            />
          </Sphere>
        </group>
      )}
    </group>
  );
}

// Enhanced floating particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 40;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 1;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
        colors[i * 3 + 2] = 1;
      }
    }
    return { pos, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions.pos}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={positions.colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        opacity={0.6}
        transparent
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main 3D Scene Component
export default function GiftBox3D({
  color = "#ff6b9d",
  ribbonColor = "#ffd700",
  size = "medium",
  bowStyle = "classic",
  isAnimating = false,
  showItems = false,
}: GiftBox3DProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4, 2.5, 4], fov: 50 }}
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderRadius: "1rem",
        }}
      >
        <PerspectiveCamera makeDefault position={[4, 2.5, 4]} />

        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.2} color="#2a2a3a" />

        {/* Main directional light */}
        <directionalLight
          position={[8, 8, 4]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={30}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />

        {/* Colorful accent lights */}
        <pointLight position={[-6, 3, 3]} color="#ff6b9d" intensity={0.4} />
        <pointLight position={[6, -2, 3]} color="#ffd700" intensity={0.3} />
        <pointLight position={[0, 6, -6]} color="#8A2BE2" intensity={0.25} />

        {/* Table */}
        <Table />

        {/* Gift Box */}
        <GiftBox
          color={color}
          ribbonColor={ribbonColor}
          size={size}
          bowStyle={bowStyle}
          isAnimating={isAnimating}
          showItems={showItems}
        />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Soft contact shadow on table */}
        <ContactShadows
          position={[0, -1.65, 0]}
          opacity={0.4}
          scale={8}
          blur={2}
          far={4}
          resolution={512}
        />

        {/* Controls with enhanced settings */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={2.5}
          maxDistance={8}
          autoRotate={isAnimating}
          autoRotateSpeed={1.2}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>

      {/* Enhanced UI Overlay */}
      <div className="absolute top-4 left-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 shadow-lg">
        {isAnimating
          ? "🌀 Auto-rotating • Drag to explore"
          : "🎮 Drag to rotate • Scroll to zoom"}
      </div>

      {/* Size and Bow Style indicator */}
      <div className="absolute bottom-4 right-4 text-white/80 text-xs bg-black/40 backdrop-blur-sm rounded px-3 py-1 border border-white/10">
        {size.toUpperCase()} • {bowStyle.toUpperCase()} BOW
      </div>

      {/* Table indicator */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs bg-black/40 backdrop-blur-sm rounded px-2 py-1">
        🪵 On wooden table
      </div>
    </div>
  );
}
