import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { ContentItem } from "../data/content";

function Orb({
  index,
  total,
  item,
  onClick,
}: {
  index: number;
  total: number;
  item: ContentItem;
  onClick: (i: ContentItem) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  // Spiral the orbs around a central well; closer orbs == higher recommendation rank.
  const params = useMemo(() => {
    const t = index / Math.max(1, total - 1);
    const radius = 1.2 + t * 3.4;
    const angle = index * 0.7 + t * Math.PI * 2;
    const y = (t - 0.5) * 1.4;
    return { radius, angle, y, t };
  }, [index, total]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const a = params.angle + time * (0.25 - params.t * 0.15);
    ref.current.position.set(
      Math.cos(a) * params.radius,
      params.y + Math.sin(time * 0.6 + index) * 0.15,
      Math.sin(a) * params.radius,
    );
    ref.current.rotation.y += 0.01;
  });

  const color = new THREE.Color(item.accent);

  return (
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
      <icosahedronGeometry args={[0.32 - params.t * 0.1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        metalness={0.7}
        roughness={0.25}
      />
    </mesh>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.4;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.55, 0.15, 160, 24]} />
      <meshStandardMaterial
        color="#E8B73A"
        emissive="#E8B73A"
        emissiveIntensity={1.2}
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function GravityWell({
  items,
  onPick,
}: {
  items: ContentItem[];
  onPick: (i: ContentItem) => void;
}) {
  return (
    <div className="h-[520px] w-full">
      <Canvas camera={{ position: [0, 1.4, 6.5], fov: 55 }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#F2C744" />
        <pointLight position={[5, 4, 5]} intensity={0.6} color="#ffffff" />
        <Core />
        {items.map((item, i) => (
          <Orb key={item.id} index={i} total={items.length} item={item} onClick={onPick} />
        ))}
      </Canvas>
    </div>
  );
}