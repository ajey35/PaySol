
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

function Planet({ position, size, color, speed, orbitRadius, hasRing }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta * speed;
    const x = Math.cos(time.current) * orbitRadius;
    const z = Math.sin(time.current) * orbitRadius;
    meshRef.current.position.x = x;
    meshRef.current.position.z = z;
    meshRef.current.rotation.y += delta * 0.5;
    
    if (hasRing && ringRef.current) {
      ringRef.current.position.x = x;
      ringRef.current.position.z = z;
      ringRef.current.rotation.x = Math.PI / 3;
      ringRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      <Trail
        width={2}
        length={20}
        color={new THREE.Color(color)}
        attenuation={(t) => t * t}
      >
        <Sphere ref={meshRef} args={[size, 32, 32]}>
          <meshPhongMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.8}
          />
        </Sphere>
      </Trail>
      
      {hasRing && (
        <mesh ref={ringRef} position={position}>
          <torusGeometry args={[size * 2, size * 0.2, 2, 50]} />
          <meshPhongMaterial
            color={color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  );
}

function Sun() {
  const sunRef = useRef();
  const coronaRef = useRef();

  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.2;
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.1;
      coronaRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group>
      <Sphere ref={sunRef} args={[2, 32, 32]}>
        <meshPhongMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={2}
          roughness={0.2}
        />
      </Sphere>
      <Points ref={coronaRef} limit={1000}>
        <PointMaterial
          transparent
          vertexColors
          size={8}
          sizeAttenuation={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function StarField() {
  const count = 5000;
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 100;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.5, 0.5 + Math.random() * 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function AsteroidBelt() {
  const asteroids = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      position: [
        Math.cos(i) * (15 + Math.random() * 2),
        (Math.random() - 0.5) * 0.5,
        Math.sin(i) * (15 + Math.random() * 2)
      ],
      size: Math.random() * 0.05 + 0.05
    }));
  }, []);

  return asteroids.map((asteroid, i) => (
    <Sphere key={i} position={asteroid.position} args={[asteroid.size, 4, 4]}>
      <meshStandardMaterial
        color="#8B7355"
        roughness={0.9}
        metalness={0.1}
      />
    </Sphere>
  ));
}

export default function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 30, 35], fov: 45 }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      
      <StarField />
      <Sun />
      
      <Planet position={[4, 0, 0]} size={0.4} color="#E17B35" speed={1.4} orbitRadius={4} />
      <Planet position={[7, 0, 0]} size={0.6} color="#C7E8F3" speed={1.1} orbitRadius={7} />
      <Planet position={[10, 0, 0]} size={0.8} color="#4B9CD3" speed={0.9} orbitRadius={10} />
      <Planet position={[13, 0, 0]} size={0.5} color="#E15F5F" speed={0.7} orbitRadius={13} />
      
      <AsteroidBelt />
      
      <Planet position={[18, 0, 0]} size={1.2} color="#E1B35F" speed={0.4} orbitRadius={18} hasRing={true} />
      <Planet position={[22, 0, 0]} size={1} color="#5FE1B3" speed={0.3} orbitRadius={22} hasRing={true} />
      
      <fog attach="fog" args={['#000', 30, 90]} />
    </Canvas>
  );
}
