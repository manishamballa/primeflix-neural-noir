import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { ContentItem } from "../data/content";

function Book({
  item,
  index,
  total,
  strand,
  onClick,
}: {
  item: ContentItem;
  index: number;
  total: number;
  strand: 0 | 1;
  onClick: (i: ContentItem) => void;
}) {
  const ref = useRef<THREE.Group>(null!);
  const t = index / Math.max(1, total - 1);
  const baseAngle = t * Math.PI * 4 + (strand ? Math.PI : 0);
  const y = (t - 0.5) * 6;

  useFrame((s) => {
    const a = baseAngle + s.clock.elapsedTime * 0.25;
    ref.current.position.set(Math.cos(a) * 1.6, y, Math.sin(a) * 1.6);
    ref.current.lookAt(0, y, 0);
  });

  return (
    <group
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
      <mesh>
        <boxGeometry args={[0.9, 0.55, 0.12]} />
        <meshStandardMaterial
          color={item.accent}
          emissive={item.accent}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
      <Text
        position={[0, 0, 0.07]}
        fontSize={0.08}
        color="#0a0a0a"
        maxWidth={0.8}
        textAlign="center"
        anchorX="center"
      >
        {item.title}
      </Text>
      <Text position={[0, -0.18, 0.07]} fontSize={0.05} color="#0a0a0a">
        {item.genre.toUpperCase()}
      </Text>
    </group>
  );
}

function Spine({ count }: { count: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => (ref.current.rotation.y = s.clock.elapsedTime * 0.25));
  const segments = useMemo(
    () =>
      Array.from({ length: count * 6 }, (_, i) => {
        const t = i / (count * 6 - 1);
        const a = t * Math.PI * 4;
        const y = (t - 0.5) * 6;
        return [Math.cos(a) * 1.6, y, Math.sin(a) * 1.6] as [number, number, number];
      }),
    [count],
  );
  return (
    <group ref={ref}>
      {segments.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#E8B73A" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function BooksHelix({
  items,
  onPick,
}: {
  items: ContentItem[];
  onPick: (i: ContentItem) => void;
}) {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1} color="#F2C744" />
        <pointLight position={[-3, -3, 3]} intensity={0.6} color="#ffffff" />
        <Spine count={items.length} />
        <group>
          {items.map((item, i) => (
            <Book
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              strand={(i % 2) as 0 | 1}
              onClick={onPick}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}