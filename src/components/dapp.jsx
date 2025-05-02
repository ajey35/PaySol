import React, { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Connection, Transaction } from '@solana/web3.js';

const DApp = () => {
  // Configure Solana connection
  const connection = new Connection('https://rpc.lazorkit.xyz/', {
    wsEndpoint: 'https://rpc.lazorkit.xyz/ws/',
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000,
  });
  // State for transaction feedback
  const [txStatus, setTxStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    smartWalletAuthorityPubkey,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
    signMessage,
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      console.log('Wallet connected:', smartWalletAuthorityPubkey);
    } catch (err) {
      console.error('Connection failed:', err);
      setTxStatus("Connection failed");
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setTxStatus("");
    console.log('Wallet disconnected');
  };

  const executeTransaction = async () => {
    if (!smartWalletAuthorityPubkey) {
      setTxStatus("Wallet not connected");
      return;
    }

    setLoading(true);
    setTxStatus("Processing transaction...");

    try {
      // 1. Prepare transaction
      const recipient = new PublicKey('D96oEJtpQE2B6sSsgeNN9dXjNypmFbNZKJYiC5wKhn8W');
      
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletAuthorityPubkey,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * 0.1 // 0.1 SOL
      });

      // 2. Build transaction
      const transaction = new Transaction().add(transferInstruction);
      
      // 3. Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = smartWalletAuthorityPubkey;

      // 4. Sign transaction
      const signedTx = await signMessage(transaction);
      
      // 5. Send transaction
      const rawTransaction = signedTx.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction);
      
      // 6. Confirm transaction
      setTxStatus("Confirming transaction...");
      const confirmation = await connection.confirmTransaction({
        signature: txid,
        blockhash,
        lastValidBlockHeight: 150, // Get this from getLatestBlockhash if needed
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      setTxStatus(`Transaction successful: ${txid}`);
      console.log("Transaction confirmed", txid);
    } catch (err) {
      console.error("Transaction error:", err);
      setTxStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Solana Transaction Example</h1>
      {isConnected ? (
        <div>
          <p>Connected Wallet: {smartWalletAuthorityPubkey}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
          <br/>
          <button 
            onClick={executeTransaction}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Send 0.1 SOL'}
          </button>
        </div>
      ) : (
        <button 
          onClick={handleConnect} 
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      
      {txStatus && (
        <div style={{ marginTop: 20, color: txStatus.includes("Error") ? "red" : "green" }}>
          Status: {txStatus}
        </div>
      )}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default DApp;