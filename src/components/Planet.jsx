
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

export function Planet({ position, size, color, speed, orbitRadius }) {
  const ref = useRef();
  const orbit = useRef(0);

  useFrame((state, delta) => {
    orbit.current += delta * speed;
    ref.current.position.x = Math.cos(orbit.current) * orbitRadius;
    ref.current.position.z = Math.sin(orbit.current) * orbitRadius;
    ref.current.rotation.y += delta;
  });

  return (
    <Sphere ref={ref} position={position} args={[size, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
}
