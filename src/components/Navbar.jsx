"use client"
import Image from "next/image"; 
import './globals.css';
import ExchangeArea from '../components/EchangeArea';
import { useState, useEffect, useRef } from 'react';
import suiWallet from './images/sui.png'
import ethos from './images/ethos.png'
import suiet from './images/suiet-icon.png'
import stashed from './images/stashed.png'
import metamask from './images/metamask.png'
import bybit from './images/bybit.png'
import gate from './images/gate.png'
import binance from './images/binance.png'
import martian from './images/martian.png'
import bitget from './images/bitget.png'
import safepal from './images/safepal.png'
import coin98 from './images/coin98.png'
import surf from './images/surf.png'
import nightly from './images/nightly.png'
import PriceWidget from '../components/PriceWidget';

export default function Home() {
  const [activeButton, setActiveButton] = useState('Swap');
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [preferredExplorer, setPreferredExplorer] = useState('SuiVision');
  const [language, setLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [rpcEndpoint, setRpcEndpoint] = useState('Sui Official');
  const [customRpcUrl, setCustomRpcUrl] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);

  const moreDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);

  const buttons = ['Swap', 'Limit', 'DCA'];
  const walletPlatforms = [
    { name: "Sui Wallet", image: suiWallet },
    { name: "Ethos", image: ethos },
    { name: "Suiet", image: suiet },
    { name: "Stashed", image: stashed },
    { name: "MetaMask", image: metamask },
    { name: "Bybit Wallet", image: bybit },
    { name: "Gate Wallet", image: gate },
    { name: "Binance", image: binance },
    { name: "Martian", image: martian },
    { name: "Bitget wallet", image: bitget },
    { name: "SafePal", image: safepal },
    { name: "Coin98", image: coin98 },
    { name: "Surf", image: surf },
    { name: "Nightly", image: nightly },
  ];
  
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

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  const closeWalletModal = () => {
    setShowWalletModal(false);
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
          <a href="#" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
            Trade
          </a>
          <a href="#" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
            Earn
          </a>
          <a href="#" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
            Bridge
          </a>
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
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-[#1c243e] rounded-lg shadow-xl z-10 p-6">
                <div className="mb-6 group">
                  <h3 className="text-base font-bold mb-2 group-hover:text-[#22d1f8] transition-colors">Station</h3>
                  <p className="text-xs text-gray-300 group-hover:text-[#22d1f8] transition-colors">User-oriented guides to help you get started with everything related to Swizzy</p>
                </div>
                <div className="mb-6 group">
                  <h3 className="text-base font-bold mb-2 group-hover:text-[#22d1f8] transition-colors">Welcome to SUI</h3>
                  <p className="text-xs text-gray-300 group-hover:text-[#22d1f8] transition-colors">Join us to welcome you to SUI with a step-by-step guide</p>
                </div>
                <div className="mb-6 flex items-center group">
                  <h3 className="text-base font-bold mr-2 group-hover:text-[#22d1f8] transition-colors">Feedback</h3>
                  <svg className="w-4 h-4 hover:text-[#22d1f8] transition-colors cursor-pointer group-hover:text-[#22d1f8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <hr className="border-gray-600 my-6" />
                <div className="flex justify-between px-4">
                  <a href="#" className="text-white hover:text-[#22d1f8] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#22d1f8] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#22d1f8] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                    </svg>
                  </a>
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
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996-.608 2.296-.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1c243e] rounded-lg shadow-xl z-20 p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-base text-[#abc4ff]">Preferred Explorer</span>
                  </div>
                  <select 
                    value={preferredExplorer}
                    onChange={(e) => setPreferredExplorer(e.target.value)}
                    className="w-full bg-[#0b1022] text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SuiVision">SuiVision</option>
                    <option value="SuiScan">SuiScan</option>
                    <option value="Suivision">Suivision</option>
                  </select>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-base text-[#abc4ff]">Language</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      className="w-full bg-[#0b1022] text-white rounded-md py-2 px-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span>{language}</span>
                      <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${showLanguageDropdown ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {showLanguageDropdown && (
                      <div className="absolute right-0 mt-2 w-32 bg-[#0b1022] rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto">
                        {[
                          'English',
                          '繁體中文',
                          '简体中文',
                          '한국어',
                          'Español',
                          'Français',
                          'Русский',
                          'Português',
                          'Türkçe'
                        ].map((lang) => (
                          <button
                            key={lang}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLanguage(lang);
                              setShowLanguageDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#0d1326]"
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-t border-white border-opacity-10 my-4" />

                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-base text-[#abc4ff]">RPC Endpoint</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {['Sui Official', 'Suiscan', 'Suiet', 'Blast', 'Custom'].map((endpoint) => (
                      <label key={endpoint} className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-purple-600 focus:ring-purple-500 h-5 w-5 border-gray-400 border-2 rounded-full bg-lavender-100"
                          name="rpc-endpoint"
                          value={endpoint}
                          checked={rpcEndpoint === endpoint}
                          onChange={() => setRpcEndpoint(endpoint)}
                        />
                        <span className="ml-2 text-sm text-[#abc4ff]">{endpoint}</span>
                      </label>
                    ))}
                  </div>
                  {rpcEndpoint === 'Custom' && (
                    <div className="mt-3 flex items-center bg-[#0b1022] border border-[#22d1f8] rounded-md p-2">
                      <input
                        type="text"
                        placeholder="Custom RPC URL"
                        value={customRpcUrl}
                        onChange={(e) => setCustomRpcUrl(e.target.value)}
                        className="flex-grow bg-transparent text-gray-400 text-sm focus:outline-none"
                      />
                      <button className="ml-2 px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button 
            className="bg-[#22d1f8] hover:bg-[#1ba8c7] transition-colors px-5 py-2.5 rounded-full font-semibold flex items-center text-lg text-[#1c243e]"
            onClick={openWalletModal}
          >
            Connect Wallet
          </button>
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
          <div className="mb-4 flex justify-start">
            {/* <div className="bg-white/5 rounded-full p-1 inline-flex space-x-1">
              {buttons.map((button) => (
                <button
                  key={button}
                  className={`px-5 py-2 text-sm transition-all duration-300 rounded-full ${
                    activeButton === button
                      ? 'bg-[#22d1f8] text-white'
                      : 'bg-transparent text-white hover:bg-[#22d1f8] hover:bg-opacity-30'
                  }`}
                  onClick={() => setActiveButton(button)}
                >
                  {button}
                </button>
              ))}
            </div> */}
          </div>
          <ExchangeArea 
            coinSelectBgColor="#1c243e"
            swapButtonBgColor="#8ca7e8"
            swapButtonArrowColor="#0b1022"
          />
          <div className="mt-8 w-full max-w-lg">
            <button 
              className="bg-[#22d1f8] hover:bg-[#1ba8c7] transition-all w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center shadow-lg text-[#1c243e]"
              onClick={openWalletModal}
            >
              Connect Wallet
            </button>
          </div>
          <div className="mt-8 w-full max-w-lg">
            <PriceWidget />
          </div>
        </div>
      </main>

      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-[#1c243e] w-[580px] h-[780px] rounded-3xl shadow-lg p-8 relative transform transition-all duration-300 ease-out scale-95 opacity-0"
            style={{
              animation: 'modalAppear 0.3s ease-out forwards',
            }}
          >
            <style jsx>{`
              @keyframes modalAppear {
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}</style>
            <button 
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
              onClick={closeWalletModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-2">Connect Wallet</h2>
            <p className="text-sm text-gray-400 mb-6">Please select a Wallet to connect to this dapp:</p>
            <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[600px] pr-4">
              {walletPlatforms.map((platform, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-4 rounded-lg border border-[#22d1f8] cursor-pointer hover:bg-[#22d1f8] hover:bg-opacity-10 transition-colors duration-200"
                >
                  <div className="w-12 h-12 relative mb-2">
                    <Image 
                      src={platform.image} 
                      alt={platform.name} 
                      layout="fill" 
                      objectFit="contain"
                    />
                  </div>
                  <span className="text-sm text-white text-center">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
