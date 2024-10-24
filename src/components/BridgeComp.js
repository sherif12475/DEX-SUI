"use client"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import './App.css'
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

  return (
    <div className={isSui ? 'sui' : 'aptos'}>
      <div className='header'>
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
      </div>
      {isClient && (
        <WormholeBridge config={isSui ? configSui : configAptos} />
      )}
      <div className={bodyClass}></div>
    </div>
  )
}

export default App