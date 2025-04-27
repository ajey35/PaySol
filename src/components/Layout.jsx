
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background/80 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#ffffff"
        />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
