import React from 'react'
import Link from "next/link";

import BridgeCom from  '../../components/BridgeComp'
function page() {
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
        <a href="#" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
          Earn
        </a>
        <Link href="/bridge" target="_blank" className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl px-4 py-2 rounded-lg hover:bg-white/10">
          Bridge
        </Link>
        <div className="relative">
          <button 
            className="text-[#abc4ff] hover:text-white transition-colors font-space-grotesk text-xl flex items-center px-4 py-2 rounded-lg hover:bg-white/10"
          >
            More
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
     
        </div>
      </nav>
      <div className="flex items-center justify-end w-1/4">
        <div className="relative mr-4 group" >
          <button 
            className="text-white hover:text-gray-300 transition-colors p-2 relative z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996-.608 2.296-.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
         
        </div>
      </div>
    </header>
      <BridgeCom />
    </div>
  )
}

export default page