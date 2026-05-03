import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { ContentItem } from "../data/content";

function geometryForTheme(themes: string[]) {
  if (themes.includes("cyberpunk")) return <octahedronGeometry args={[0.7, 0]} />;
  if (themes.includes("strategy")) return <boxGeometry args={[1, 1, 1]} />;
  if (themes.includes("rpg")) return <dodecahedronGeometry args={[0.7, 0]} />;
  return <icosahedronGeometry args={[0.7, 0]} />;
}

function Node({
  item,
  position,
  onClick,
}: {
  item: ContentItem;
  position: [number, number, number];
  onClick: (i: ContentItem) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    ref.current.rotation.x = s.clock.elapsedTime * 0.4 + position[0];
    ref.current.rotation.y = s.clock.elapsedTime * 0.3 + position[1];
  });
  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick(item);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        {geometryForTheme(item.themes)}
        <meshStandardMaterial
          color={item.accent}
          emissive={item.accent}
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
      <Text
        position={[0, -1.1, 0]}
        fontSize={0.18}
        color="#E8B73A"
        anchorX="center"
      >
        {item.title}
      </Text>
      <Text
        position={[0, -1.35, 0]}
        fontSize={0.1}
        color="#9a9a9a"
        anchorX="center"
      >
        {item.genre.toUpperCase()}
      </Text>
    </group>
  );
}

export default function GamesNodes({
  items,
  onPick,
}: {
  items: ContentItem[];
  onPick: (i: ContentItem) => void;
}) {
  const positions: [number, number, number][] = useMemo(
    () =>
      items.map((_, i) => {
        const cols = 4;
        const c = i % cols;
        const r = Math.floor(i / cols);
        return [(c - (cols - 1) / 2) * 2.6, -(r * 3.2) + 1.4, 0];
      }),
    [items],
  );
  return (
    <div className="h-[560px] w-full">
      <Canvas camera={{ position: [0, -1, 7], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 5]} intensity={1.2} color="#F2C744" />
        <pointLight position={[-3, -3, 5]} intensity={0.6} color="#ffffff" />
        {items.map((item, i) => (
          <Node key={item.id} item={item} position={positions[i]} onClick={onPick} />
        ))}
      </Canvas>
    </div>
  );
}