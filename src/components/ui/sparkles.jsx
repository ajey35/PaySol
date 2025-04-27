
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  className,
}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = particleDensity || 50;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
    }));
    setParticles(newParticles);
  }, [particleDensity, minSize, maxSize]);

  return (
    <div
      style={{ background }}
      className={`absolute inset-0 ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particleColor,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
