"use client"
import { useState } from 'react';
import Link from "next/link";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import WalletDropdown from '../../components/wallet-dropdown';

export default function Earn() {
  const [layout, setLayout] = useState('list');
  const [activeTab, setActiveTab] = useState('concentrated');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const wallet = useWallet();

  return (
    <div className="bg-[#0a0e1d] min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center py-5 px-10 bg-[#00072D]">
        <div className="flex items-center w-48">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C20.6868 12 19.6868 11.7071 18.2929 11.2929C16.9289 10.8787 15.3033 10.3431 13 10.3431C10.6967 10.3431 9.07107 10.8787 7.70711 11.2929C6.31321 11.7071 5.31321 12 4 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 17C20.6868 17 19.6868 16.7071 18.2929 16.2929C16.9289 15.8787 15.3033 15.3431 13 15.3431C10.6967 15.3431 9.07107 15.8787 7.70711 16.2929C6.31321 16.7071 5.31321 17 4 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold">Suiez</span>
        </div>
        <nav className="flex justify-center space-x-8 flex-grow">
          <Link href="/" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-lg px-4 py-2 rounded-lg hover:bg-white/10">
            Trade
          </Link>
          <Link href="/earn" className="text-white transition-colors font-space-grotesk text-lg px-4 py-2 rounded-lg bg-white/10">
            Earn
          </Link>
          <Link href="/bridge" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-lg px-4 py-2 rounded-lg hover:bg-white/10">
            Bridge
          </Link>
        </nav>
        <div className="flex items-center justify-end w-48">
          {!wallet.connected ? (
            <ConnectButton className="!bg-[#22d1f8] !text-[#0a0e1d] !font-bold px-6 py-2 !rounded-full !border-none !shadow-none !outline-none hover:!bg-[#1ba8c7] hover:!text-[#0a0e1d] transition-colors duration-200">
              Connect Wallet
            </ConnectButton>
          ) : (
            <WalletDropdown />
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-6 px-10">
        {/* Title and Stats Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Title */}
          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold">
              <span className="text-white">Liquidity</span>{" "}
              <span className="text-white">Pools</span>
            </h1>
            <p className="text-[#abc4ff] opacity-60">
              Provide liquidity,{"\n"}
              earn yield.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3">
            <div className="bg-[#1c243e] rounded-xl p-3 flex flex-col items-center justify-center w-48">
              <span className="text-[#abc4ff] mb-1">TVL</span>
              <span className="text-white text-lg font-medium">$1,576,098,159</span>
            </div>
            <div className="bg-[#1c243e] rounded-xl p-3 flex flex-col items-center justify-center w-48">
              <span className="text-[#abc4ff] mb-1">24h Volume</span>
              <span className="text-white text-lg font-medium">$1,965,373,157</span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          {/* First Control Panel */}
          <div className="relative border-b border-[#0c1221] bg-[#0c1221] rounded-lg py-4">
            <div className="flex items-center gap-5 px-4">
              {/* Left side with all grouped elements */}
              <div className="flex items-center gap-5 flex-grow">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('concentrated')}
                    className={`px-1.5 py-2 relative text-lg ${
                      activeTab === 'concentrated' 
                        ? 'text-white' 
                        : 'text-[#abc4ff] hover:text-white'
                    }`}
                  >
                    Concentrated Liquidity Pools
                    {activeTab === 'concentrated' && (
                      <div className="absolute bottom-0 left-[15%] right-[15%] h-0.5 bg-[#22d1f8]"></div>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('manage')}
                    className={`px-1.5 py-2 relative text-lg ${
                      activeTab === 'manage' 
                        ? 'text-white' 
                        : 'text-[#abc4ff] hover:text-white'
                    }`}
                  >
                    Manage Positions and Rewards
                    {activeTab === 'manage' && (
                      <div className="absolute bottom-0 left-[15%] right-[15%] h-0.5 bg-[#22d1f8]"></div>
                    )}
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-96">
                  <input
                    type="text"
                    placeholder="Search all"
                    className="w-full bg-[#1c243e] rounded-full px-10 py-2 text-white placeholder-[#abc4ff] focus:outline-none focus:ring-1 focus:ring-[#22d1f8]"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {isSearchFocused && (
                    <div className="absolute w-full bg-[#141f3a] rounded-lg mt-1 py-2 px-3 z-10">
                      <span className="text-[#48587e] text-sm">Search for token or paste mint address.</span>
                    </div>
                  )}
                  <svg className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#abc4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Layout Toggle */}
                <div className="bg-[#1c243e] rounded-lg p-1 flex">
                  <button 
                    className={`p-2 rounded ${layout === 'list' ? 'bg-[#0a0e1d]' : ''}`}
                    onClick={() => setLayout('list')}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                  </button>
                  <button 
                    className={`p-2 rounded ${layout === 'grid' ? 'bg-[#0a0e1d]' : ''}`}
                    onClick={() => setLayout('grid')}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Create Pool Button */}
              <button className="px-5 py-2 bg-transparent border border-[#22d1f8] text-[#22d1f8] rounded-lg hover:bg-[#22d1f8] hover:text-[#0a0e1d] transition-colors">
                Create Pool
              </button>
            </div>
          </div>

          {/* Second Control Panel with Pool Information Headers */}
          <div className="relative border-b border-[#0c1221] bg-[#0c1221] rounded-lg py-4">
            <div className="flex items-center px-6">
              {/* Pool with increased spacing */}
              <div className="w-[8cm] text-[#abc4ff]">Pool</div>
              
              {/* Liquidity */}
              <div className="w-[6cm] text-[#abc4ff]">Liquidity</div>
              
              {/* Volume 24H with increased spacing */}
              <div className="w-[4cm] text-[#abc4ff]">Volume 24H</div>
              
              {/* Fees 24H with increased spacing */}
              <div className="w-[4cm] text-[#abc4ff]">Fees 24H</div>
              
              {/* APR with tooltip and increased spacing */}
              <div className="w-[3cm] flex items-center text-[#abc4ff]">
                <span>APR</span>
                <div className="relative ml-1 group">
                  <div className="w-4 h-4 rounded-full border border-[#abc4ff] flex items-center justify-center text-xs cursor-help">
                    ?
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-[#1c243e] text-white text-sm rounded-lg w-72 hidden group-hover:block shadow-lg z-10">
                    Estimated on trading activity and reward bonuses over the past 24 hours. Historical data is for reference only and does not guarantee future returns.
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-[#1c243e]"></div>
                  </div>
                </div>
              </div>
              
              {/* Rewards with increased spacing */}
              <div className="w-[4cm] text-[#abc4ff]">Rewards</div>
              
              {/* Remaining space */}
              <div className="flex-grow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}