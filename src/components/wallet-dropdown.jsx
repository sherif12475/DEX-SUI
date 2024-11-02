import React, { useState, useRef, useEffect } from 'react';
import { useWallet, addressEllipsis } from "@suiet/wallet-kit";
import { Clipboard, ExternalLink, FileText, LogOut, RefreshCw } from 'lucide-react';

const WalletDropdown = ({ preferredExplorer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);
  const wallet = useWallet();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopyAddress = async () => {
    if (wallet.account?.address) {
      await navigator.clipboard.writeText(wallet.account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExplorerClick = () => {
    const baseUrl = preferredExplorer === 'SuiVision' 
      ? 'https://suivision.xyz/account/'
      : 'https://suiscan.xyz/mainnet/account/';
    window.open(`${baseUrl}${wallet.account?.address}`, '_blank');
  };

  if (!wallet.connected) {
    return null;
  }

  const truncatedAddress = addressEllipsis(wallet.account?.address);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-[#1c243e] text-white rounded-lg hover:bg-[#2a3454] transition-colors duration-200 flex items-center space-x-2"
      >
        {wallet.adapter && (
          <img 
            src={wallet.adapter.icon}
            alt={`${wallet.adapter.name} icon`}
            className="w-5 h-5 rounded-full"
          />
        )}
        <span>{truncatedAddress}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1c243e] rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {wallet.adapter && (
                  <img 
                    src={wallet.adapter.icon}
                    alt={`${wallet.adapter.name} icon`}
                    className="w-5 h-5 rounded-full"
                  />
                )}
                <span className="text-white">{truncatedAddress}</span>
              </div>
              <button
                onClick={handleCopyAddress}
                className="text-gray-400 hover:text-white transition-colors"
                title={copied ? "Copied!" : "Copy address"}
              >
                <Clipboard size={16} />
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-600" />

          <div className="p-2">
            <button
              className="w-full px-4 py-2 flex items-center text-gray-300 hover:bg-[#2a3454] rounded-lg transition-colors"
              onClick={handleExplorerClick}
            >
              <ExternalLink size={16} className="mr-2" />
              <span>View in {preferredExplorer}</span>
            </button>

            <button
              className="w-full px-4 py-2 flex items-center text-gray-300 hover:bg-[#2a3454] rounded-lg transition-colors"
            >
              <FileText size={16} className="mr-2" />
              <span>Transaction Details</span>
            </button>

            <button
              className="w-full px-4 py-2 flex items-center text-gray-300 hover:bg-[#2a3454] rounded-lg transition-colors"
            >
              <RefreshCw size={16} className="mr-2" />
              <span>Change Wallet</span>
            </button>

            <button
              onClick={() => {
                wallet.disconnect();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 flex items-center text-red-500 hover:bg-[#2a3454] rounded-lg transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletDropdown;