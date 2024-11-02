'use client';

import { useState, useRef, useEffect } from 'react';

const API_KEY = 'mlwf9GOHA5L1WICHl8WSKrjCpx7AOT';
const API_BASE_URL = 'https://api.blockberry.one/sui/v1';

export default function ExchangeArea() {
  // State management
  const [hoverSell, setHoverSell] = useState(false);
  const [hoverBuy, setHoverBuy] = useState(false);
  const [hoverSwap, setHoverSwap] = useState(false);
  const [sellingCoin, setSellingCoin] = useState('SUI');
  const [buyingCoin, setBuyingCoin] = useState('USDC');
  const [sellingAmount, setSellingAmount] = useState('');
  const [buyingAmount, setBuyingAmount] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectingFor, setSelectingFor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  // Fetch coins from Blockberry API
// Update the fetchCoins function in your ExchangeArea component
useEffect(() => {
  const fetchCoins = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/coins');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch coins');
      }

      // Format the coins data
      const formattedTokens = Array.isArray(data.content) 
        ? data.content.map(coin => ({
            id: coin.objectId || coin.coinType,
            name: coin.coinName || coin.symbol,
            symbol: coin.coinSymbol,
            image: coin.imgUrl || '/placeholder.png',
            address: coin.coinType,
            decimals: coin.decimals || 9,
            price: coin.price || 0
          }))
        : [];

      setTokens(formattedTokens);
      setError(null);
    } catch (err) {
      console.error('Error fetching coins:', err);
      setError('Failed to load coins. Please try again later.');
      
      // Set default tokens as fallback
      setTokens([
        {
          id: '1',
          name: 'Sui',
          symbol: 'SUI',
          image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png',
          address: '0x2::sui::SUI',
          decimals: 9,
          price: 1.9
        },
        {
          id: '2',
          name: 'USD Coin',
          symbol: 'USDC',
          image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
          address: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
          decimals: 6,
          price: 1
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  fetchCoins();
}, []);

  // Filter tokens based on search
  const filteredTokens = tokens.filter(token => 
    token.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle click outside modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeTokenModal();
      }
    }

    if (showTokenModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTokenModal]);

  // Handlers
  const handleSwap = () => {
    setSellingCoin(buyingCoin);
    setBuyingCoin(sellingCoin);
    setSellingAmount(buyingAmount);
    setBuyingAmount(sellingAmount);
  };

  const openTokenModal = (type) => {
    setSelectingFor(type);
    setShowTokenModal(true);
    setSearchQuery('');
  };

  const closeTokenModal = () => {
    setShowTokenModal(false);
    setSearchQuery('');
  };

  const selectToken = (token) => {
    if (selectingFor === 'sell') {
      if (token.symbol === buyingCoin) {
        setBuyingCoin(sellingCoin);
      }
      setSellingCoin(token.symbol);
    } else {
      if (token.symbol === sellingCoin) {
        setSellingCoin(buyingCoin);
      }
      setBuyingCoin(token.symbol);
    }
    closeTokenModal();
  };

  // UI Styles
  const hoverStyle = {
    boxShadow: '0 0 10px 3px rgba(74, 222, 128, 0.7)',
    transition: 'box-shadow 0.3s ease-in-out',
  };

  const swapHoverStyle = {
    boxShadow: '0 0 15px 5px rgba(138, 43, 226, 0.7)',
    transition: 'box-shadow 0.3s ease-in-out',
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Main Exchange Interface */}
      <div className="flex flex-col space-y-3">
        {/* Selling Section */}
        <div className="bg-white/5 rounded-lg p-5">
          <label className="block text-sm font-bold text-gray-300 mb-3 text-left">You're Selling</label>
          <div className="flex justify-between items-center">
            <button 
              className="bg-[#1c243e] rounded-lg py-3 px-4 w-[30%] text-sm font-bold outline-none text-left flex items-center space-x-2"
              style={hoverSell ? hoverStyle : {}}
              onMouseEnter={() => setHoverSell(true)}
              onMouseLeave={() => setHoverSell(false)}
              onClick={() => openTokenModal('sell')}
            >
              <img 
                src={tokens.find(t => t.symbol === sellingCoin)?.image || '/placeholder.png'} 
                alt={sellingCoin}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.png';
                }}
              />
              <span>{sellingCoin}</span>
            </button>
            <input
              type="text"
              placeholder="0.00"
              value={sellingAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setSellingAmount(value);
                  setBuyingAmount(value); // Simple 1:1 for example
                }
              }}
              className="bg-transparent py-3 px-4 w-[65%] text-right focus:outline-none text-2xl font-bold tracking-tight"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="relative h-12 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-600"></div>
          <button 
            className="absolute bg-[#8ca7e8] rounded-full p-1.5 z-10 group transition-all duration-300"
            style={hoverSwap ? swapHoverStyle : {}}
            onMouseEnter={() => setHoverSwap(true)}
            onMouseLeave={() => setHoverSwap(false)}
            onClick={handleSwap}
          >
            <svg className="w-5 h-5 text-[#0b1022]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Buying Section */}
        <div className="bg-white/5 rounded-lg p-5">
          <label className="block text-sm font-bold text-gray-300 mb-3 text-left">You're Buying</label>
          <div className="flex justify-between items-center">
            <button 
              className="bg-[#1c243e] rounded-lg py-3 px-4 w-[30%] text-sm font-bold outline-none text-left flex items-center space-x-2"
              style={hoverBuy ? hoverStyle : {}}
              onMouseEnter={() => setHoverBuy(true)}
              onMouseLeave={() => setHoverBuy(false)}
              onClick={() => openTokenModal('buy')}
            >
              <img 
                src={tokens.find(t => t.symbol === buyingCoin)?.image || '/placeholder.png'} 
                alt={buyingCoin}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.png';
                }}
              />
              <span>{buyingCoin}</span>
            </button>
            <input
              type="text"
              placeholder="0.00"
              value={buyingAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setBuyingAmount(value);
                  setSellingAmount(value); // Simple 1:1 for example
                }
              }}
              className="bg-transparent py-3 px-4 w-[65%] text-right focus:outline-none text-2xl font-bold tracking-tight"
            />
          </div>
        </div>
      </div>

      {/* Token Selection Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-sm"></div>
          <div ref={modalRef} className="bg-[#1c243e] w-[500px] max-h-[90vh] rounded-lg p-6 z-10 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-2xl font-bold">Select a token</h2>
              <button 
                onClick={closeTokenModal}
                className="text-[#8ca7e8] hover:bg-white hover:bg-opacity-10 p-1 rounded transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="bg-[#0b1022] rounded-lg flex items-center p-2 mb-4">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or paste address"
                className="bg-transparent text-white w-full outline-none text-sm font-medium placeholder-[#5d6785]"
              />
              <svg className="w-5 h-5 text-[#8ca7e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Token List */}
            <div className="h-[calc(90vh-220px)] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="text-center py-4 text-[#8ca7e8]">Loading tokens...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
              ) : filteredTokens.length === 0 ? (
                <div className="text-center py-4 text-[#8ca7e8]">No tokens found</div>
              ) : (
                filteredTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => selectToken(token)}
                    className="w-full flex items-center justify-between p-3 hover:bg-[#0b1022] rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <img
                        src={token.image || '/placeholder.png'}
                        alt={token.name}
                        className="w-8 h-8 rounded-full mr-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <div className="text-left">
                        <div className="text-white font-semibold">{token.name}</div>
                        <div className="text-[#8ca7e8] text-sm">{token.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#8ca7e8] text-xs truncate ml-2 max-w-[120px]">
                        {token.address}
                      </div>
                      {token.price > 0 && (
                        <div className="text-gray-400 text-xs">
                          ${token.price.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}