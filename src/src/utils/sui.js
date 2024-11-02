import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

let client;
let keypair;

export function initializeSui(network = 'devnet') {
  client = new SuiClient({ url: getFullnodeUrl(network) });
  keypair = new Ed25519Keypair();
  console.log(`Connected to ${network}`);
}

export async function getCoins(address) {
  if (!client) throw new Error('Sui client not initialized');
  return await client.getCoins({
    owner: address,
  });
}

export async function transferSui(amount, recipientAddress) {
  if (!client || !keypair) throw new Error('Sui client not initialized');
  const tx = new Transaction();
  const [coin] = tx.splitCoins(tx.gas, [amount]);
  tx.transferObjects([coin], recipientAddress);
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
  });
  return result;
}

export async function mintNFT(name) {
  if (!client || !keypair) throw new Error('Sui client not initialized');
  const packageObjectId = '0x...'; // Replace with your package object ID
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageObjectId}::nft::mint`,
    arguments: [tx.pure.string(name)],
  });
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
  });
  return result;
}