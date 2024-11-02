"use client"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import './App.css'
import Link from "next/link";

import { configAptos, configSui } from '../configs/wormHoleConfig'

// Dynamically import WormholeBridge with no SSR
const WormholeBridge = dynamic(
  () => import('@wormhole-foundation/wormhole-connect').then((mod) => mod.default),
  { ssr: false }
)

function App() {
  const [isSui, setIsSui] = useState(false)
  const [bodyClass, setBodyClass] = useState('body-container-bg body-container-bg-aptos')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const routers = window.location.pathname.toString()
    setIsSui(routers === '/sui')
    setBodyClass(routers === '/sui' ? 'body-container-bg' : 'body-container-bg body-container-bg-aptos')
  }, [])

  return (  <div className="bg-[#0a0e1d] min-h-screen text-white">
   
 
 
    <div className={isSui ? 'sui' : 'aptos'}>
      <div className='header'>
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
        <div className={isSui ? 'headerAll sui-header' : 'headerAll'}>
          <div className='select'>
            <a
              href='https://www.portalbridge.com/#/transfer'
              target='_self'
              rel='noreferrer'
            >
              <span>Switch to Portal Bridge</span>
            </a>
          </div>
        </div>
          </button>
         
        </div>
      </div>
    </header>
       
      </div>
      {isClient && (
        <WormholeBridge config={isSui ? configSui : configAptos} />
      )}
      <div className={bodyClass}></div>
    </div>
    </div>


  )
}

export default App