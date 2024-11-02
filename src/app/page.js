"use client"
import Image from "next/image"; 
import ExchangeArea from '../components/EchangeArea';
import { useState, useEffect, useRef } from 'react';
import WalletDropdown from '../components/wallet-dropdown';
import PriceWidget from '../components/PriceWidget';
import Link from "next/link";
import { TransactionBlock } from "@mysten/sui.js";
import { ConnectButton, useWallet, addressEllipsis } from "@suiet/wallet-kit";
import { getCoins, transferSui, mintNFT } from '../src/utils/sui';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { AlertTriangle } from 'lucide-react';

const SlippageTolerance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slippage, setSlippage] = useState('0.5');
  const [isCustom, setIsCustom] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const modalRef = useRef(null);

  const handleSlippageChange = (value) => {
    setSlippage(value);
    setIsCustom(false);
  };

  const handleCustomInput = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) > 0)) {
      setSlippage(value);
      setIsCustom(true);
    }
  };

  const getWarningMessage = () => {
    const slippageNum = parseFloat(slippage);
    if (slippageNum < 0.5) {
      return {
        message: "Your transaction may fail",
        show: true,
        color: "#f2c939"
      };
    }
    if (slippageNum > 4) {
      return {
        message: "Your transaction may be frontrun and result in an unfavorable trade",
        show: true,
        color: "#f2c939"
      };
    }
    return { show: false };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 rounded-full px-3 py-1.5 border border-transparent hover:border-[#22d1f8] transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors"
          style={{ color: isOpen ? '#22d1f8' : '#9ac4ff' }}
        >
          <path
            d="M4 15V9H12V4L20 12L12 20V15H4Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="transition-colors"
          style={{ color: isOpen ? '#22d1f8' : '#9ac4ff' }}
        >
          {slippage}%
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={modalRef} className="slippage-modal bg-[#1c243e] rounded-xl p-6 w-96">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-white text-xl font-semibold">Swap slippage tolerance</h2>
              <div className="relative">
                <button
                  className="text-[#abbee6] hover:text-white transition-colors"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                {showTooltip && (
                  <div className="absolute left-6 top-0 bg-[#0d1a3e] text-[#abbee6] p-2 rounded-lg text-sm w-64">
                    Set your slippage tolerance for swap transactions.
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <button
                onClick={() => handleSlippageChange('0.1')}
                className={`rounded-full px-4 py-2 ${
                  slippage === '0.1' ? 'bg-[#22d1f8] text-[#1c243e]' : 'bg-[#2e3855] text-white'
                }`}
              >
                0.1%
              </button>
              <button
                onClick={() => handleSlippageChange('0.5')}
                className={`rounded-full px-4 py-2 ${
                  slippage === '0.5' && !isCustom ? 'bg-[#22d1f8] text-[#1c243e]' : 'bg-[#2e3855] text-white'
                }`}
              >
                0.5%
              </button>
              <button
                onClick={() => handleSlippageChange('1.0')}
                className={`rounded-full px-4 py-2 ${
                  slippage === '1.0' ? 'bg-[#22d1f8] text-[#1c243e]' : 'bg-[#2e3855] text-white'
                }`}
              >
                1%
              </button>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <span className="text-sm text-[#798dbd]">Custom</span>
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={slippage}
                  onChange={handleCustomInput}
                  className="w-20 bg-[#0b1022] text-white rounded-full px-3 py-1 text-center"
                />
                <span className="text-[#798dbd]">%</span>
              </div>
            </div>

            {getWarningMessage().show && (
              <div className="mb-4 flex items-center justify-center space-x-2 bg-[#33363e] text-[#f2c939] py-2 px-4 rounded">
                <AlertTriangle size={16} />
                <span className="text-sm">{getWarningMessage().message}</span>
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#22d1f8] text-[#1c243e] py-2 rounded font-medium hover:bg-[#1ba8c7] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RPCNotification = ({ show, rpcEndpoint, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100);
      const duration = 4000;
      const interval = 10;
      const step = (100 * interval) / duration;
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - step;
        });
      }, interval);

      const closeTimer = setTimeout(() => {
        onClose();
        window.location.reload();
      }, duration);

      return () => {
        clearInterval(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-[#1c243e] border border-[#22d1f8] rounded-lg overflow-hidden shadow-lg z-50">
      <div
        className="h-1 bg-[#22d1f8] transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
      <div className="px-6 py-4">
        <h3 className="text-[#ffffff] text-xl font-semibold mb-1">
          RPC Updated
        </h3>
        <p className="text-[#899ed2] text-sm">
          RPC is currently set to {rpcEndpoint}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const [client, setClient] = useState(null);
  const [activeButton, setActiveButton] = useState('Swap');
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [preferredExplorer, setPreferredExplorer] = useState('SuiVision');
  const [language, setLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [rpcEndpoint, setRpcEndpoint] = useState('Sui Official');
  const [customRpcUrl, setCustomRpcUrl] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const wallet = useWallet();
  const [coins, setCoins] = useState([]);
  const [nftName, setNftName] = useState('');
  const moreDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);

  const buttons = ['Swap', 'Limit', 'DCA'];

  useEffect(() => {
    if (rpcEndpoint === 'Sui Official') {
      const newClient = new SuiClient({ url: getFullnodeUrl('mainnet') });
      setClient(newClient);
      console.log('Connected to Sui Official RPC');
    }
  }, [rpcEndpoint]);

  useEffect(() => {
    if (wallet.connected && client) {
      fetchCoins();
    }
  }, [wallet.connected, client]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setShowSettingsDropdown(false);
        setShowLanguageDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchCoins = async () => {
    if (wallet.account?.address && client) {
      try {
        const coinsData = await client.getCoins({
          owner: wallet.account.address,
        });
        setCoins(coinsData.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    }
  };

  const handleTransfer = async () => {
    if (wallet.connected && client) {
      try {
        const tx = new TransactionBlock();
        const [coin] = tx.splitCoins(tx.gas, [1000]);
        tx.transferObjects([coin], wallet.account.address);
        const result = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        console.log('Transfer result:', result);
        alert('Transfer successful!');
        fetchCoins();
      } catch (error) {
        console.error('Transfer failed:', error);
        alert('Transfer failed. See console for details.');
      }
    }
  };

  const handleMintNFT = async () => {
    if (wallet.connected && client && nftName) {
      try {
        const packageObjectId = '0x...';
        const tx = new TransactionBlock();
        tx.moveCall({
          target: `${packageObjectId}::nft::mint`,
          arguments: [tx.pure.string(nftName)],
        });
        const result = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        console.log('Mint NFT result:', result);
        alert('NFT minted successfully!');
      } catch (error) {
        console.error('Mint NFT failed:', error);
        alert('Mint NFT failed. See console for details.');
      }
    }
  };

  const handleRPCChange = (endpoint) => {
    setRpcEndpoint(endpoint);
    setShowNotification(true);
  };

  const getConnectButtonContent = () => {
    if (!wallet.connected) {
      return (
        <div className="w-full mt-5 px-4 py-2 bg-[#22d1f8] hover:bg-[#1ba8c7] text-[#1c243e] font-semibold rounded-lg transition-colors duration-200 shadow-lg">
          <ConnectButton className="!bg-[#22d1f8] !text-[#1c243e] !font-bold !border-none !shadow-none !outline-none hover:!bg-[#1ba8c7] hover:!border-none hover:!shadow-none transition-colors duration-200">
            Connect Wallet
          </ConnectButton>
        </div>
      );
    } else {
      return (
        <div className="w-full px-4 py-5 bg-[#22d1f8] bg-opacity-50 text-[#1c243e] font-semibold rounded-lg cursor-not-allowed">
          Enter an amount
        </div>
      );
    }
  };

  return (
    <div className="bg-[#0a0e1d] min-h-screen text-white">
      <header className="flex items-center p-6 bg-[#00072D]">
        <div className="flex items-center w-1/4">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C20.6868 12 19.6868 11.7071 18.2929 11.2929C16.9289 10.8787 15.3033 10.3431 13 10.3431C10.6967 10.3431 9.07107 10.8787 7.70711 11.2929C6.31321 11.7071 5.31321 12 4 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 17C20.6868 17 19.6868 16.7071 18.2929 16.2929C16.9289 15.8787 15.3033 15.3431 13 15.3431C10.6967 15.3431 9.07107 15.8787 7.70711 16.2929C6.31321 16.7071 5.31321 17 4 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold">Suiez</span>
        </div>
        <nav className="flex justify-center space-x-8 w-1/2">
          <Link href="/" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
            Trade
          </Link>
          <Link href="/earn" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
            Earn
          </Link>
          <Link href="/bridge" target="_blank" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
            Bridge
          </Link>
          <div className="relative" ref={moreDropdownRef}>
            <button 
              className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl flex items-center px-4 py-2 rounded-lg hover:bg-white/10"
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            >
              More
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showMoreDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-[#1c243e] rounded-lg shadow-xl z-10 p-4">
                <div className="group hover:bg-[#161e32] transition-colors duration-200">
                  <div className="flex items-center py-3 px-2">
                    <svg className="w-5 h-5 text-[#22d1f8]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V12.414L15.293,16.707L16.707,15.293L13,11.586V7Z"/>
                    </svg>
                    <span className="text-[#22d1f8] text-base ml-3">Stats</span>
                  </div>
                </div>

                <div className="group hover:bg-[#161e32] transition-colors duration-200">
                  <div className="flex items-center justify-between py-3 px-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#22d1f8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-[#22d1f8] text-base ml-3">Docs</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                <div className="group hover:bg-[#161e32] transition-colors duration-200">
                  <div className="flex items-center justify-between py-3 px-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#22d1f8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <span className="text-[#22d1f8] text-base ml-3">Feedback</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                <hr className="border-gray-600 my-4" />
                
                <div className="flex justify-center space-x-8 px-2">
                  <svg className="w-5 h-5 text-[#22d1f8] cursor-pointer hover:text-[#1ba8c7] transition-colors" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  
                  <svg className="w-5 h-5 text-[#22d1f8] cursor-pointer hover:text-[#1ba8c7] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  
                  <svg className="w-5 h-5 text-[#22d1f8] cursor-pointer hover:text-[#1ba8c7] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center justify-end w-1/4">
          <div className="relative mr-4 group" ref={settingsDropdownRef}>
            <button 
              className="text-white hover:text-gray-300 transition-colors p-2 relative z-10"
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996-.608 2.296-.07 2.572-1.065z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1c243e] rounded-lg shadow-xl z-20 p-8">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <span className="text-base text-[#abc4ff]">Preferred Explorer</span>
                  </div>
                  <select 
                    value={preferredExplorer}
                    onChange={(e) => setPreferredExplorer(e.target.value)}
                    className="w-full bg-[#0b1022] text-white rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SuiVision">SuiVision</option>
                    <option value="SuiScan">SuiScan</option>
                  </select>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <span className="text-base text-[#abc4ff]">Language</span>
                  </div>
                 <div className="relative">
                    <button
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      className="w-full bg-[#0b1022] text-white rounded-md py-3 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span>{language}</span>
                      <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${showLanguageDropdown ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <hr className="border-t border-white border-opacity-10 my-8"/>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <span className="text-base text-[#abc4ff]">RPC Endpoint</span>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {['Sui Official', 'Suiscan', 'Suiet', 'Blast', 'Custom'].map((endpoint) => (
                      <label key={endpoint} className="inline-flex items-center py-2">
                        <input
                          type="radio"
                          className="form-radio text-purple-600 focus:ring-purple-500 h-5 w-5 border-gray-400 border-2 rounded-full bg-lavender-100"
                          name="rpc-endpoint"
                          value={endpoint}
                          checked={rpcEndpoint === endpoint}
                          onChange={() => handleRPCChange(endpoint)}
                        />
                        <span className="ml-3 text-sm text-[#abc4ff]">{endpoint}</span>
                      </label>
                    ))}
                    {rpcEndpoint === 'Custom' && (
                      <div className="mt-4 flex items-center bg-[#0b1022] border border-[#22d1f8] rounded-md p-3">
                        <input
                          type="text"
                          placeholder="Custom RPC URL"
                          value={customRpcUrl}
                          onChange={(e) => setCustomRpcUrl(e.target.value)}
                          className="flex-grow bg-transparent text-gray-400 text-sm focus:outline-none py-2"
                        />
                        <button className="ml-3 px-4 py-2 bg-gray-700 text-gray-300 text-xs rounded">
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {!wallet.connected ? (
            <ConnectButton className="!bg-[#22d1f8] !text-[#0a0e1d] !font-bold px-7 py-2 !rounded-full !border-none !shadow-none !outline-none hover:!bg-[#1ba8c7] hover:!text-[#0a0e1d] transition-colors duration-200">
              Connect Wallet
            </ConnectButton>
          ) : (
            <WalletDropdown 
              preferredExplorer={preferredExplorer}
              setPreferredExplorer={setPreferredExplorer}
            />
          )}
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center mt-20 max-w-7xl mx-auto">
        {activeButton === 'Limit' && (
          <div className="w-1/2 pr-4 mt-14">
            <iframe 
              width="100%" 
              height="400" 
              src="https://birdeye.so/tv-widget/0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN/0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630?chain=sui&viewMode=pair&chartInterval=1D&chartType=CANDLE&chartTimezone=Europe%2FBucharest&chartLeftToolbar=show&theme=dark" 
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div className="w-full max-w-lg">
          <div className="mb-4 flex justify-between items-center">
            <div className="bg-white/5 rounded-full p-1 inline-flex space-x-1">
              {buttons.map((button) => (
                <button
                  key={button}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                    activeButton === button
                      ? 'bg-[#22d1f8] text-[#1c243e]'
                      : 'text-[#abc4ff] hover:bg-white/5'
                  }`}
                  onClick={() => setActiveButton(button)}
                >
                  {button}
                </button>
              ))}
            </div>
            <SlippageTolerance />
          </div>
          <ExchangeArea 
            coinSelectBgColor="#1c243e"
            swapButtonBgColor="#8ca7e8"
            swapButtonArrowColor="#0b1022"
          />
          <div className="w-full mt-5">
            {getConnectButtonContent()}
          </div>
          
          <div className="mt-8 w-full max-w-lg">
            <PriceWidget />
          </div>
        </div>
      </main>

      <RPCNotification 
        show={showNotification}
        rpcEndpoint={rpcEndpoint}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}