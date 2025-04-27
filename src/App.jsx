
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import Dashboard from "@/pages/Dashboard";
import Send from "@/pages/Send";
import History from "@/pages/History";
import Profile from "@/pages/Profile";
import Layout from "@/components/Layout";
import { WalletProvider } from "@/contexts/WalletContext";

export default function App() {
  return (
    <WalletProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/send" element={<Send />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </AnimatePresence>
        <Toaster />
      </Router>
    </WalletProvider>
  );
}
