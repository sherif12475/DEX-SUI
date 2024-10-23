import WormholeBridge from '@wormhole-foundation/wormhole-connect'
import './App.css'

// import portal from './assets/images/switch-to-portal.png'
import { configAptos, configSui } from '../../src/configs/wormHoleConfig'

function BridgeCom() {
  const classesChange = () => {
    const routers = window.location.pathname.toString()
    if (routers === '/sui') {
      return true
    } else {
      return false
    }
  }
  const bodyClassChange = () => {
    const routers = window.location.pathname.toString()
    if (routers === '/sui') {
      return 'body-container-bg'
    } else {
      return 'body-container-bg body-container-bg-aptos'
    }
  }

  return (
    <div className={classesChange() ? 'sui' : 'aptos'}>
      <div className='header'>
        <div className={classesChange() ? 'headerAll sui-header' : 'headerAll'}>
          <div className='select'>
            <a
              href='https://www.portalbridge.com/#/transfer'
              target='_self'
              rel='noreferrer'
            >
              {/* <img alt='' src={portal} /> */}
              <span>Switch to Portal Bridge</span>
            </a>
          </div>
        </div>
      </div>
      <WormholeBridge config={classesChange() ? configSui : configAptos} />
      <div className={bodyClassChange()}></div>
    </div>
  )
}

export default BridgeCom