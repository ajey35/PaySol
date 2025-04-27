import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@lazorkit/wallet";
import { Connection } from "@solana/web3.js";

const connection = new Connection('https://api.devnet.solana.com');

const WalletContext = createContext({});

export function WalletProvider({ children }) {
  const {
    isConnected,    // boolean: wallet connection status
    publicKey,      // string | null: user's public key
    connect,        // () => Promise<void>: connect wallet
    disconnect,     // () => void: disconnect wallet
    signMessage,    // (message: Uint8Array) => Promise<Uint8Array>: sign a message
    error,          // string | null: error message if any
  } = useWallet(connection);

  const [loading, setLoading] = useState(false);
  const [isPassConnected, setIsPassConnected] = useState(false);

  // Sync isPassConnected with isConnected safely
  useEffect(() => {
    setIsPassConnected(isConnected);
  }, [isConnected]);

  const connectWallet = async () => {
    try {
      setLoading(true);
      await connect();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your wallet!",
      });
      setIsPassConnected(true)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
    window.location.href = "/";
  };

  return (
    <WalletContext.Provider
      value={{
        isPassConnected,
        publicKey,
        signMessage,
        error,
        loading,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const usePassWallet = () => useContext(WalletContext);
