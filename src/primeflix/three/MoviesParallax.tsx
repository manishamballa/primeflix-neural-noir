import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { ContentItem } from "../data/content";

function Poster({
  item,
  position,
  onClick,
}: {
  item: ContentItem;
  position: [number, number, number];
  onClick: (i: ContentItem) => void;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5 + position[0]) * 0.15;
    ref.current.position.y =
      position[1] + Math.sin(s.clock.elapsedTime * 0.7 + position[0] * 2) * 0.12;
  });
  return (
    <group
      ref={ref}
      position={position}
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
      <mesh>
        <planeGeometry args={[1.4, 2.1]} />
        <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={0.25} />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.5, 2.2]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <Text
        position={[0, -0.85, 0.01]}
        fontSize={0.13}
        color="#0a0a0a"
        anchorX="center"
        maxWidth={1.3}
        textAlign="center"
      >
        {item.title}
      </Text>
      <Text
        position={[0, 0.85, 0.01]}
        fontSize={0.08}
        color="#0a0a0a"
        anchorX="center"
      >
        {item.language?.toUpperCase()}
      </Text>
    </group>
  );
}

export default function MoviesParallax({
  items,
  onPick,
}: {
  items: ContentItem[];
  onPick: (i: ContentItem) => void;
}) {
  // Lay posters in a loose 3D grid -> the void.
  const positions: [number, number, number][] = items.map((_, i) => {
    const col = (i % 4) - 1.5;
    const row = Math.floor(i / 4) - 0.5;
    const depth = ((i * 37) % 5) - 2;
    return [col * 1.9, row * -2.5, depth * 0.7];
  });

  return (
    <div className="h-[560px] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 5]} intensity={1.4} color="#F2C744" />
        {items.map((it, i) => (
          <Poster key={it.id} item={it} position={positions[i]} onClick={onPick} />
        ))}
      </Canvas>
    </div>
  );
}