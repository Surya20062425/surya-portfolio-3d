import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAvatar } from '../context/AvatarContext';

const ACCENT = '#C9A24B';

/** Builds the revolved torso/shoulder silhouette used by the avatar. */
function useTorsoGeometry() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, -1.75),
      new THREE.Vector2(0.58, -1.7),
      new THREE.Vector2(0.98, -1.35),
      new THREE.Vector2(1.08, -0.9),
      new THREE.Vector2(0.9, -0.48),
      new THREE.Vector2(0.58, -0.22),
      new THREE.Vector2(0.34, -0.05),
      new THREE.Vector2(0.24, 0.02),
    ];
    return new THREE.LatheGeometry(pts, 28);
  }, []);
}

function useHaloGeometry(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.95 + Math.random() * 0.55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);
}

export default function Avatar3D() {
  const { state, pointer } = useAvatar();

  const groupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Points>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);

  const torsoGeo = useTorsoGeometry();
  const haloGeo = useHaloGeometry(160);
  const headGeo = useMemo(() => new THREE.IcosahedronGeometry(0.6, 1), []);
  const armGeo = useMemo(() => new THREE.CapsuleGeometry(0.09, 1.05, 4, 8), []);

  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    const t = clock.current;
    const group = groupRef.current;
    const headGroup = headGroupRef.current;
    if (!group || !headGroup) return;

    // idle breathing sway — always present, subtler when a directed animation is active
    const breathe = Math.sin(t * 0.6) * 0.03;
    group.position.y = -0.65 + breathe;

    let lookX = pointer.x * 0.5;
    let lookY = -pointer.y * 0.3;
    let bodySway = pointer.x * 0.12;
    let armSwing = 0;

    switch (state) {
      case 'THINKING':
        lookX = Math.sin(t * 0.8) * 0.35;
        lookY = 0.18 + Math.sin(t * 1.4) * 0.05;
        bodySway = Math.sin(t * 0.4) * 0.05;
        break;
      case 'CODING':
        lookY = -0.28;
        lookX = Math.sin(t * 3) * 0.05;
        armSwing = Math.sin(t * 6) * 0.15;
        break;
      case 'EXCITED':
        group.position.y += Math.abs(Math.sin(t * 6)) * 0.08;
        lookX = Math.sin(t * 4) * 0.3;
        armSwing = Math.sin(t * 8) * 0.4;
        break;
      case 'SUCCESS':
        group.rotation.y += (0 - group.rotation.y) * 0.1;
        lookY = 0.15;
        armSwing = Math.sin(t * 3) * 0.6;
        break;
      case 'WALKING':
        bodySway = Math.sin(t * 2) * 0.1;
        armSwing = Math.sin(t * 4) * 0.25;
        break;
      case 'CONTACT':
        lookY = 0.05;
        lookX *= 0.6;
        break;
      case 'LOOKING_AT_UI':
        // pointer already carries the UI target position
        break;
      case 'CURSOR_FOLLOW':
      default:
        break;
    }

    headGroup.rotation.y += (lookX - headGroup.rotation.y) * 0.06;
    headGroup.rotation.x += (lookY - headGroup.rotation.x) * 0.06;
    group.rotation.y += (bodySway - group.rotation.y) * 0.04;

    if (armLRef.current && armRRef.current) {
      armLRef.current.rotation.x = -0.15 + armSwing;
      armRRef.current.rotation.x = -0.15 - armSwing;
    }

    if (haloRef.current) {
      haloRef.current.rotation.y += 0.0016;
      haloRef.current.rotation.x += 0.0006;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      {/* torso / shoulders */}
      <mesh geometry={torsoGeo}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh geometry={torsoGeo} scale={1.015}>
        <meshBasicMaterial color={ACCENT} transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      <points geometry={torsoGeo}>
        <pointsMaterial color="#ffffff" size={0.018} transparent opacity={0.3} />
      </points>

      {/* arms */}
      <mesh ref={armLRef} geometry={armGeo} position={[-0.95, -0.7, 0]} rotation={[-0.15, 0, 0.18]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh ref={armRRef} geometry={armGeo} position={[0.95, -0.7, 0]} rotation={[-0.15, 0, -0.18]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.14} />
      </mesh>

      {/* neck */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.17, 0.22, 0.42, 14, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* head group — tracks the cursor / UI targets */}
      <group ref={headGroupRef} position={[0, 0.78, 0]}>
        <mesh geometry={headGeo}>
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.24} />
        </mesh>
        <mesh geometry={headGeo} scale={1.03}>
          <meshBasicMaterial color={ACCENT} transparent opacity={0.07} side={THREE.DoubleSide} />
        </mesh>
        <points ref={haloRef} geometry={haloGeo}>
          <pointsMaterial color={ACCENT} size={0.028} transparent opacity={0.55} />
        </points>
      </group>
    </group>
  );
}
