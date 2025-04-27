
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function History() {
  // Simulated transaction history
  const transactions = [
    {
      id: 1,
      type: "send",
      amount: "0.5",
      address: "8xk7nAstQYnHUWNF4vuZ3UuYt1SGQKYgqqhxNAYXh5GJ",
      timestamp: "2025-04-25T10:30:00",
      status: "completed"
    },
    {
      id: 2,
      type: "receive",
      amount: "1.2",
      address: "5xk9mBstPLnHUWNF4vuZ3UuYt1SGQKYgqhxNAYXh5GJ",
      timestamp: "2025-04-24T15:45:00",
      status: "completed"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container max-w-2xl mx-auto py-8"
    >
      <div className="glass p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold text-center gradient-text mb-8">
          Transaction History
        </h2>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  tx.type === "send" 
                    ? "bg-red-500/20 text-red-500"
                    : "bg-green-500/20 text-green-500"
                }`}>
                  {tx.type === "send" ? <ArrowUpRight /> : <ArrowDownLeft />}
                </div>
                <div>
                  <p className="text-sm text-purple-200">
                    {tx.type === "send" ? "Sent to" : "Received from"}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-[200px]">
                    {tx.address}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  tx.type === "send" ? "text-red-400" : "text-green-400"
                }`}>
                  {tx.type === "send" ? "-" : "+"}{tx.amount} SOL
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
