import switchToPortal from '../assets/images/switch-to-portal.png'

const Navbar = () => {
  return (
    <div className='header'>
      <div className='headerAll sui-header'>
        <div className='top-left-header'>
          <div
            className='top-logo'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              minWidth: '132px',
              marginRight: '28px',
            }}
          >
            <a className='left-logo' href='https://app.cetus.zone/swap' ></a>
            <div className='left-bridge-logo'></div>
          </div>
          <div
            className='menu'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className='more_icon'>
              Trade
              <span role='img' className='anticon icon'>
                <svg
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  aria-hidden='true'
                  focusable='false'
                  className=''
                >
                  <use></use>
                </svg>
              </span>
              <div className='earn-list' style={{ paddingBottom: '0px' }}>
                <a
                  href='https://app.cetus.zone/swap'
                  className='item'
                  target='_self'
                  rel='noreferrer'
                >
                  <div className='more_link'>
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                        className=''
                      >
                        <use></use>
                      </svg>
                    </span>
                    <span>Swap</span>
                  </div>
                </a>
                <a href='#'>
                  <div className='item'>
                    <div className='more_link more_link_beta'>
                      <span role='img' className='anticon item-icon'>
                        <svg
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          aria-hidden='true'
                          focusable='false'
                          className=''
                        >
                          <use></use>
                        </svg>
                      </span>
                      <span>Limit Order</span>
                      <img
                        className='limit_beta'
                        src='path_to_image.jpg'
                        alt='Limit beta icon'
                      />
                    </div>
                  </div>
                </a>
                <a
                  href='https://deepbook.cetus.zone'
                  className='item'
                  target='_self'
                  rel='noreferrer'
                >
                  <div className='more_link'>
                    <img
                      className='default-img'
                      src='path_to_image.jpg'
                      alt='Default'
                    />
                    <img
                      className='hover-img'
                      src='path_to_image.jpg'
                      alt='Hover'
                    />
                    <span>DeepBook</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div
            className='menu'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className='more_icon'>
              Earn
              <span role='img' className='anticon icon'>
                <svg
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  aria-hidden='true'
                  focusable='false'
                  className=''
                >
                  <use></use>
                </svg>
              </span>
              <div className='earn-list' style={{ paddingBottom: '0px' }}>
                <a
                  href='https://app.cetus.zone/swap'
                  className='item'
                  target='_self'
                  rel='noreferrer'
                >
                  <div className='more_link'>
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                        className=''
                      >
                        <use></use>
                      </svg>
                    </span>
                    <span>Swap</span>
                  </div>
                </a>
                <a href='#'>
                  <div className='item'>
                    <div className='more_link more_link_beta'>
                      <span role='img' className='anticon item-icon'>
                        <svg
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          aria-hidden='true'
                          focusable='false'
                          className=''
                        >
                          <use></use>
                        </svg>
                      </span>
                      <span>Limit Order</span>
                      <img
                        className='limit_beta'
                        src='path_to_image.jpg'
                        alt='Limit beta icon'
                      />
                    </div>
                  </div>
                </a>
                <a
                  href='https://deepbook.cetus.zone'
                  className='item'
                  target='_self'
                  rel='noreferrer'
                >
                  <div className='more_link'>
                    <img
                      className='default-img'
                      src='path_to_image.jpg'
                      alt='Default'
                    />
                    <img
                      className='hover-img'
                      src='path_to_image.jpg'
                      alt='Hover'
                    />
                    <span>DeepBook</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div
            className='menu'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className='more_icon'>
              More
              <span role='img' className='anticon icon'>
                <svg
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  aria-hidden='true'
                  focusable='false'
                  className=''
                >
                  <use></use>
                </svg>
              </span>
              <div className='earn-list' style={{ paddingBottom: '0px' }}>
                <a
                  href='https://app.cetus.zone/swap'
                  className='item'
                  target='_self'
                  rel='noreferrer'
                >
                  <div className='more_link'>
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                        className=''
                      >
                        <use></use>
                      </svg>
                    </span>
                    <span>Swap</span>
                  </div>
                </a>
                <a href='#'>
                  <div className='item'>
                    <div className='more_link more_link_beta'>
                      <span role='img' className='anticon item-icon'>
                        <svg
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          aria-hidden='true'
                          focusable='false'
                          className=''
                        >
                          <use></use>
                        </svg>
                      </span>
                      <span>Limit Order</span>
                      <img
                        className='limit_beta'
                        src='path_to_image.jpg'
                        alt='Limit beta icon'
                      />
                    </div>
                  </div>
                </a>
                <a
                  href='https://deepbook.cetus.zone'
                  className='item'
                  target='_self'
                  rel='noreferrer'
                >
                  <div className='more_link'>
                    <img
                      className='default-img'
                      src='path_to_image.jpg'
                      alt='Default'
                    />
                    <img
                      className='hover-img'
                      src='path_to_image.jpg'
                      alt='Hover'
                    />
                    <span>DeepBook</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='select'>
          <a
            href='https://www.portalbridge.com/#/transfer'
            target='_self'
            rel='noreferrer'
          >
            <img alt='' src={switchToPortal} />
            <span>Switch to Portal Bridge</span>
          </a>
          <div className='h5-select-modal'>
            <img
              alt=''
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAATFJREFUaEPtmdENwjAMRM8r8AdiB1ZgDRiEIRgE1mAFdkDwxwpGlfqBkFrXapya6PjF2Hf3kjQVgsY/0rg/0OC/EyZBEkyeAJdockCmPBJUVTVjWrBAREYhmQRpcEF63WgSXBhA+HhzD4YrCB5Ag8EBh7cnwfCIgweQYHDA4e0nEVTVLYAzgH2v6AbgJCKPcIUzB5gGe3N3AKufWW8Au+wmpxi8ADgMBHkVkeP3d7Uv5yXuok8A6wGDLxHZ0ODMfTT28xIEm1+i3Qna7iHTLY+mHxOB26dKa/MxUUVF4BAaDAy3SmsSrBJz4BASDAy3SmuTYO23A6/rEndR/vniTb1kPQmWTDNjL/OQySjao4kGPWllrCXBjFQ8mkjQk1bGWhLMSMWjiQQ9aWWsJcGMVDyaPl9NXDkkfmbBAAAAAElFTkSuQmCC'
            />
            <div className='left-modal'>
              <div className='logo'>
                <div className='left-logo'></div>
              </div>
              <div className='menu-list exhibit'>
                {/* Trade Section */}
                <div
                  className='h5_earn_icon sui-h5_earn_icon'
                  style={{ height: '25px' }}
                >
                  Trade
                  <span
                    role='img'
                    className='anticon icon'
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <svg
                      width='1em'
                      height='1em'
                      fill='currentColor'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <use href='#icon-icon_on' />
                    </svg>
                  </span>
                  <div className='h5_earn-list' style={{ display: 'none' }}>
                    <div className='line'></div>
                    <a
                      href='https://app.cetus.zone/swap'
                      className='item'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon_swap' />
                          </svg>
                        </span>
                        <span>Swap</span>
                      </div>
                    </a>
                    <a href='javascript:;'>
                      <div className='item'>
                        <div className='more_link more_link_beta'>
                          <span role='img' className='anticon item-icon'>
                            <svg
                              width='1em'
                              height='1em'
                              fill='currentColor'
                              aria-hidden='true'
                              focusable='false'
                            >
                              <use href='#icon-icon_limitorder' />
                            </svg>
                          </span>
                          <span>Limit Order</span>
                          <img className='limit_beta' alt='' />
                          <img className='hover-img' alt='' />
                          <span>DeepBook</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Earn Section */}
                <div
                  className='h5_earn_icon sui-h5_earn_icon'
                  style={{ height: '25px' }}
                >
                  Earn
                  <span
                    role='img'
                    className='anticon icon'
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <svg
                      width='1em'
                      height='1em'
                      fill='currentColor'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <use href='#icon-icon_on' />
                    </svg>
                  </span>
                  <div className='h5_earn-list' style={{ display: 'none' }}>
                    <div className='line'></div>
                    <a
                      href='https://app.cetus.zone/pool/list'
                      className='item'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon_liquiditypools' />
                          </svg>
                        </span>
                        <span>Pools</span>
                      </div>
                    </a>
                    <a
                      href='https://app.cetus.zone/farms'
                      className='item'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon_farms' />
                          </svg>
                        </span>
                        <span>Farms</span>
                      </div>
                    </a>
                    <a
                      href='https://app.cetus.zone/vaults'
                      className='item'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon_vaults' />
                          </svg>
                        </span>
                        <span>Vaults</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Additional Links */}
                <a
                  href='https://app.cetus.zone/xcetus'
                  target='_self'
                  rel='noreferrer'
                >
                  xCETUS
                </a>
                <a
                  href='https://launch.cetus.zone/?chain=sui'
                  target='_self'
                  rel='noreferrer'
                >
                  Launchpad
                </a>

                {/* More Section */}
                <div className='h5_more_icon'>
                  More
                  <span
                    role='img'
                    className='anticon icon'
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <svg
                      width='1em'
                      height='1em'
                      fill='currentColor'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <use href='#icon-icon_on' />
                    </svg>
                  </span>
                  <div className='h5_more-list' style={{ display: 'none' }}>
                    <div className='line'></div>
                    <a
                      href='/bridge'
                      className='item bridge'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon-Bridge' />
                          </svg>
                        </span>
                        <span>Bridge</span>
                      </div>
                      <div className='start-item'></div>
                    </a>
                    <a
                      href='https://app.cetus.zone/stats'
                      className='item'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon-Stats' />
                          </svg>
                        </span>
                        <span>Stats</span>
                      </div>
                    </a>
                    <a
                      href='https://cetus-1.gitbook.io/cetus-docs'
                      className='item'
                      target='_self'
                      rel='noreferrer'
                    >
                      <div className='more_link'>
                        <span role='img' className='anticon item-icon'>
                          <svg
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                            focusable='false'
                          >
                            <use href='#icon-icon-Docs1' />
                          </svg>
                        </span>
                        <span>Docs</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className='footer-box select'>
                <a
                  href='https://www.portalbridge.com/#/transfer'
                  target='_self'
                  rel='noreferrer'
                >
                  <img alt='' src={switchToPortal} />
                  <span>Switch to Portal Bridge</span>
                </a>
                <div className='exhibit'>
                  <a
                    href='https://cetus-1.gitbook.io/cetus-docs/'
                    target='_blank'
                    rel='noreferrer'
                    className='not_show'
                  >
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                      >
                        <use href='#icon-svg-medium' />
                      </svg>
                    </span>
                  </a>
                  <a
                    href='https://twitter.com/CetusProtocol'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                      >
                        <use href='#icon-svg-twitter' />
                      </svg>
                    </span>
                  </a>
                  <a
                    href='https://discord.gg/rQtYGfmcD8'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                      >
                        <use href='#icon-svg-Discord' />
                      </svg>
                    </span>
                  </a>
                  <a
                    href='https://medium.com/@CetusProtocol'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span role='img' className='anticon item-icon'>
                      <svg
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                        focusable='false'
                      >
                        <use href='#icon-svg-Medium' />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar