import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Avatar3D from './Avatar3D';
import { useAvatar } from '../context/AvatarContext';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function AmbientField() {
  const pointsRef = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 180 : 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(() => {
    if (pointsRef.current) pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const { cameraTarget } = useAvatar();
  const lookAt = useRef(new THREE.Vector3(...cameraTarget.lookAt));

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(...cameraTarget.position), 0.035);
    lookAt.current.lerp(new THREE.Vector3(...cameraTarget.lookAt), 0.035);
    camera.lookAt(lookAt.current);
    const pc = camera as THREE.PerspectiveCamera;
    if (cameraTarget.fov && pc.fov !== undefined) {
      pc.fov += (cameraTarget.fov - pc.fov) * 0.04;
      pc.updateProjectionMatrix();
    }
  });

  return null;
}

export default function SceneBackground() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (!supported) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 45%, rgba(201,162,75,0.08), transparent 60%)' }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.4, 6.2], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.25 : 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.6} />
          <AmbientField />
          <Avatar3D />
        </Suspense>
      </Canvas>
    </div>
  );
}
