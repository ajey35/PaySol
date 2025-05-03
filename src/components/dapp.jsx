import React, { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection,
} from '@solana/web3.js';

const DApp = () => {
  const connection = new Connection('https://rpc.lazorkit.xyz/', {
    wsEndpoint: 'ws://rpc.lazorkit.xyz/ws/',
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000,
  });

  const [txStatus, setTxStatus] = useState('');
  const [txExplorerLink, setTxExplorerLink] = useState('');
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
      console.log('Wallet connected:', smartWalletAuthorityPubkey?.toBase58());
    } catch (err) {
      console.error('Connection failed:', err);
      setTxStatus('Connection failed');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setTxStatus('');
    setTxExplorerLink('');
    console.log('Wallet disconnected');
  };


  const executeTransaction = async () => {
    if (!smartWalletAuthorityPubkey) {
      setTxStatus('Wallet not connected');
      return;
    }

    setLoading(true);
    setTxStatus('');
    setTxExplorerLink('');

    try {
      const recipient = new PublicKey('D96oEJtpQE2B6sSsgeNN9dXjNypmFbNZKJYiC5wKhn8W');
      const lamports = 0.1 * LAMPORTS_PER_SOL;

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletAuthorityPubkey,
        toPubkey: recipient,
        lamports,
      });

      const txid = await signMessage(transferInstruction);
      setTxStatus(`tx id ${txid}`);

    } catch (err) {
      console.error('Transaction error:', err);
      setTxStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Solana Transaction Example</h1>
      {isConnected ? (
        <div>
          <p>Connected Wallet: {smartWalletAuthorityPubkey}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
          <br />
          <button
            onClick={executeTransaction}
            disabled={loading}
            style={{ marginTop: '10px' }}
          >
            {loading ? 'Processing...' : 'Send 0.1 SOL'}
          </button>
        </div>
      ) : (
        <button onClick={handleConnect} disabled={isLoading}>
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}

      {txStatus && (
        <div style={{ marginTop: 20, color: txStatus.includes('Error') ? 'red' : 'green' }}>
          Status: {txStatus}
        </div>
      )}

      {txExplorerLink && (
        <div style={{ marginTop: 10 }}>
          <a href={txExplorerLink} target="_blank" rel="noopener noreferrer">
            View on Explorer
          </a>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error.message || error}</p>}
    </div>
  );
};

export default DApp;
