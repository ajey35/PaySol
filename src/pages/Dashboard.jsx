
import React from "react";
import { motion } from "framer-motion";
import { usePassWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";

export default function Dashboard() {
  const { connectWallet, loading , isPassConnected  } = usePassWallet();

  console.log("ispassconnect",isPassConnected)

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          PAYSOL
        </h1>
        <p className="text-xl text-purple-200 max-w-2xl">
          The Next Generation Solana Payment Platform
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass p-8 rounded-2xl w-full max-w-md space-y-6"
      >
        {!isPassConnected ? (
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? (
              "Connecting..."
            ) : (
              <>
                Connect Wallet <Wallet className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={() => window.location.href = "/send"}
            >
              Send Money <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
