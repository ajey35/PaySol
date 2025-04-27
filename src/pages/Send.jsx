
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Send as SendIcon } from "lucide-react";

export default function Send() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulated transaction for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Transaction Successful",
        description: `Sent ${amount} SOL to ${recipient}`,
      });
      
      setRecipient("");
      setAmount("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Failed to send transaction. Please try again.",
      });
    } finally {
      setLoading(false);
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
          Send Payment
        </h2>
        
        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-purple-200">Recipient Address</label>
            <Input
              type="text"
              placeholder="Enter recipient's address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-white/5 border-purple-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-purple-200">Amount (SOL)</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/5 border-purple-500/20"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading || !recipient || !amount}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                Send Payment
                <SendIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
