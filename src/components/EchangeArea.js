'use client';

import { useState, useRef, useEffect } from 'react';

export default function ExchangeArea() {
  const [hoverSell, setHoverSell] = useState(false);
  const [hoverBuy, setHoverBuy] = useState(false);
  const [hoverSwap, setHoverSwap] = useState(false);
  const [sellingCoin, setSellingCoin] = useState('SUI');
  const [buyingCoin, setBuyingCoin] = useState('USDC');
  const [sellingAmount, setSellingAmount] = useState('');
  const [buyingAmount, setBuyingAmount] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectingFor, setSelectingFor] = useState(''); // 'sell' or 'buy'
  const modalRef = useRef(null);

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

  const hoverStyle = {
    boxShadow: '0 0 10px 3px rgba(74, 222, 128, 0.7)',
    transition: 'box-shadow 0.3s ease-in-out',
  };

  const swapHoverStyle = {
    boxShadow: '0 0 15px 5px rgba(138, 43, 226, 0.7)',
    transition: 'box-shadow 0.3s ease-in-out',
  };

  const handleSwap = () => {
    setSellingCoin(buyingCoin);
    setBuyingCoin(sellingCoin);
    setSellingAmount(buyingAmount);
    setBuyingAmount(sellingAmount);
  };

  const openTokenModal = (type) => {
    setSelectingFor(type);
    setShowTokenModal(true);
  };

  const closeTokenModal = () => {
    setShowTokenModal(false);
  };

  const selectToken = (token) => {
    if (selectingFor === 'sell') {
      setSellingCoin(token);
    } else {
      setBuyingCoin(token);
    }
    closeTokenModal();
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col space-y-3">
        <div className="bg-white/5 rounded-lg p-5">
          <label className="block text-sm font-bold text-gray-300 mb-3 text-left">You're Selling</label>
          <div className="flex justify-between items-center">
            <button 
              className="bg-[#1c243e] rounded-lg py-3 px-4 w-[30%] text-sm font-bold outline-none text-left"
              style={hoverSell ? hoverStyle : {}}
              onMouseEnter={() => setHoverSell(true)}
              onMouseLeave={() => setHoverSell(false)}
              onClick={() => openTokenModal('sell')}
            >
              {sellingCoin}
            </button>
            <input
              type="text"
              placeholder="0.00"
              value={sellingAmount}
              onChange={(e) => setSellingAmount(e.target.value)}
              className="bg-transparent py-3 px-4 w-[65%] text-right focus:outline-none text-2xl font-bold tracking-tight"
            />
          </div>
        </div>

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

        <div className="bg-white/5 rounded-lg p-5">
          <label className="block text-sm font-bold text-gray-300 mb-3 text-left">You're Buying</label>
          <div className="flex justify-between items-center">
            <button 
              className="bg-[#1c243e] rounded-lg py-3 px-4 w-[30%] text-sm font-bold outline-none text-left"
              style={hoverBuy ? hoverStyle : {}}
              onMouseEnter={() => setHoverBuy(true)}
              onMouseLeave={() => setHoverBuy(false)}
              onClick={() => openTokenModal('buy')}
            >
              {buyingCoin}
            </button>
            <input
              type="text"
              placeholder="0.00"
              value={buyingAmount}
              onChange={(e) => setBuyingAmount(e.target.value)}
              className="bg-transparent py-3 px-4 w-[65%] text-right focus:outline-none text-2xl font-bold tracking-tight"
            />
          </div>
        </div>
      </div>

      {showTokenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-sm" onClick={closeTokenModal}></div>
          <div ref={modalRef} className="bg-[#1c243e] w-[500px] h-[90vh] rounded-lg p-6 z-10 animate-scaleIn">
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
            <div className="bg-[#0b1022] rounded-lg flex items-center p-2 mb-4">
              <input 
                type="text" 
                placeholder="Search by name or paste address" 
                className="bg-transparent text-white w-full outline-none text-sm font-medium placeholder-[#5d6785]"
              />
              <svg className="w-5 h-5 text-[#8ca7e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[#8ca7e8] text-sm font-semibold mb-3 text-left">Popular tokens</p>
            <div className="flex justify-between mb-4 space-x-2">
              {['USDC', 'SUI', 'SWIZZY', 'USDT'].map((token) => (
                <button 
                  key={token} 
                  className="bg-[#0b1022] text-white rounded-md py-1.5 px-3 text-sm hover:bg-opacity-80 transition-colors flex-1"
                  onClick={() => selectToken(token)}
                >
                  {token}
                </button>
              ))}
            </div>
            <hr className="border-[#3e4969] border-t mb-3" />
            <div className="flex justify-between text-sm text-[#8ca7e8] font-semibold mb-3">
              <span>Token</span>
              <span>Balance/Address</span>
            </div>
            <div className="h-[calc(90vh-220px)] overflow-y-auto custom-scrollbar">
              {/* You can add more token listings here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}