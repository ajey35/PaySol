
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { usePassWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Send, History, User, LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const { publicKey, disconnectWallet } = usePassWallet();
  const navItems = [
    { path: "/send", label: "Send", icon: Send },
    { path: "/history", label: "History", icon: History },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-purple-400">
            PAYSOL
          </Link>

          {publicKey && (
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`relative ${
                        location.pathname === item.path
                          ? "text-purple-400"
                          : "text-gray-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                onClick={disconnectWallet}
                className="text-red-400"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
