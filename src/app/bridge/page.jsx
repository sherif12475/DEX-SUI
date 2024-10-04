"use client"

import Image from "next/image"; 
import { useState, useEffect, useRef } from 'react';
import { wormhole } from '@wormhole-foundation/sdk';
import sui from '@wormhole-foundation/sdk/sui';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { JsonRpcProvider } from '@mysten/sui.js/client';

export default function Home() {
  // ... (keep your existing state and functions)

  const [bridgeAmount, setBridgeAmount] = useState('');
  const [bridgeStatus, setBridgeStatus] = useState('');

  const initiateSuiBridge = async () => {
    try {
      setBridgeStatus('Initiating bridge...');

      // Initialize Wormhole
      const wh = await wormhole('Testnet', [sui]);

      // Create a SUI signer (you should replace this with your actual signer implementation)
      const keypair = new Ed25519Keypair();
      const provider = new JsonRpcProvider();
      
      // Get the SUI chain context
      const suiChain = wh.getChain('Sui');

      // Create a token transfer
      const transfer = await wh.tokenTransfer(
        wh.tokenId('Sui', 'native'), // SUI native token
        BigInt(parseFloat(bridgeAmount) * 1e9), // Convert to SUI's smallest unit (1 SUI = 1e9 units)
        wh.chainAddress('Sui', keypair.getPublicKey().toSuiAddress()),
        wh.chainAddress('Ethereum', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'), // Example Ethereum address
        false // Not automatic
      );

      // Initiate the transfer
      const txids = await transfer.initiateTransfer({
        chain: () => 'Sui',
        address: () => keypair.getPublicKey().toSuiAddress(),
        signAndSend: async (txs) => {
          const txResponses = await Promise.all(
            txs.map(tx => provider.signAndExecuteTransactionBlock({
              signer: keypair,
              transactionBlock: tx,
            }))
          );
          return txResponses.map(resp => ({ txid: resp.digest }));
        }
      });

      setBridgeStatus(`Bridge initiated. Transaction IDs: ${txids.join(', ')}`);

      // Wait for attestation (this may take a while)
      const attestation = await transfer.fetchAttestation(60000);
      setBridgeStatus(`Attestation received: ${attestation}`);

      // Note: Completing the transfer on the destination chain would require additional steps
      // and is not included in this example as it would happen on Ethereum, not SUI.

    } catch (error) {
      console.error('Bridge error:', error);
      setBridgeStatus(`Bridge failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-[#0a0e1d] min-h-screen text-white">
      {/* ... (keep your existing header and other content) */}

      <main className="flex flex-col items-center justify-center text-center mt-20">
        {/* ... (keep your existing content) */}
        
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">SUI Bridge</h2>
          <input
            type="number"
            value={bridgeAmount}
            onChange={(e) => setBridgeAmount(e.target.value)}
            placeholder="Amount to bridge"
            className="w-full p-2 mb-4 bg-[#1c243e] rounded"
          />
          <button 
            className="bg-[#22d1f8] hover:bg-[#1ba8c7] transition-all w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center shadow-lg text-[#1c243e] mb-4"
            onClick={initiateSuiBridge}
          >
            Bridge SUI
          </button>
          {bridgeStatus && (
            <div className="mt-4 p-4 bg-[#1c243e] rounded">
              <p>{bridgeStatus}</p>
            </div>
          )}
        </div>
      </main>

      {/* ... (keep your existing wallet modal) */}
    </div>
  );
}