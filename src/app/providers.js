"use client"

import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

export function Providers({ children }) {
  return (
    <WalletProvider
    
    >
      {children}
    </WalletProvider>
  );
}

