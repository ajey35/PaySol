
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePassWallet } from "@/contexts/WalletContext";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Profile() {
  const { publicKey, disconnectWallet } = usePassWallet();
  
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container max-w-md mx-auto py-8"
    >
      <div className="glass p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold text-center gradient-text">
          Profile
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-purple-200 mb-1">Wallet Address</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400 truncate">
                {publicKey || "Not connected"}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAddress}
                className="text-purple-400"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-purple-200 mb-1">Network</p>
            <p className="text-sm text-gray-400">Solana Devnet</p>
          </div>

          <Button
            variant="outline"
            className="w-full border-red-500 text-red-400 hover:bg-red-500/20"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
