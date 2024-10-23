import {
    Theme,
    OPACITY,
    WormholeConnectConfig,
  } from '@wormhole-foundation/wormhole-connect'
  
  import grey from '@mui/material/colors/grey'
  import orange from '@mui/material/colors/orange'
  import red from '@mui/material/colors/red'
  
  const sui = {
    primary: grey,
    secondary: grey,
    divider: '#ffffff',
    background: {
      default: '#232323',
    },
    text: {
      primary: '#ffffff',
      secondary: grey[500],
    },
    error: red,
    info: grey,
    success: grey,
    warning: orange,
    button: {
      primary: '#162630',
      primaryText: '#ffffff',
      disabled: '#ffffff' ,
      disabledText: '#ffffff' ,
      action: '#76c8ff',
      actionText: '#000000',
      hover: '#ffffff' ,
    },
    options: {
      hover: '#474747',
      select: '#202020',
    },
    card: {
      background: '#191919',
      secondary: '#202020',
      elevation: 'none',
    },
    popover: {
      background: '#162630',
      secondary: '#192623' ,
      elevation: 'none',
    },
    modal: {
      background: '#1C1C1C',
    },
    font: {
      primary: 'Space Grotesk',
      header: '',
    },
  }
  const aptos = {
    primary: grey,
    secondary: grey,
    // divider: '#ffffff' + OPACITY[20],
    background: {
      default: '#232323',
    },
    text: {
      primary: '#ffffff',
      secondary: grey[500],
    },
    error: red,
    info: grey,
    success: grey,
    warning: orange,
    button: {
      primary: '#2d3858',
      primaryText: '#ffffff',
      disabled: '#ffffff',
      disabledText: '#ffffff' ,
      action: '#68ffd8',
      actionText: '#000000',
      hover: '#ffffff' ,
    },
    options: {
      hover: '#474747',
      select: '#202020',
    },
    card: {
      background: '#191919',
      secondary: '#202020',
      elevation: 'none',
    },
    popover: {
      background: '#1a2b27',
      secondary: '#192623',
      elevation: 'none',
    },
    modal: {
      background: '#1C1C1C',
    },
    font: {
      primary: 'Space Grotesk',
      header: '',
    },
  }
  const configSui = {
    mode: 'dark',
    env: 'mainnet',
    customTheme: sui,
    rpcs: {
      solana: 'https://rpc-public.hellomoon.io/',
    },
  }
  const configAptos = {
    mode: 'dark',
    env: 'mainnet',
    customTheme: aptos,
    rpcs: {
      solana: 'https://rpc-public.hellomoon.io/',
    },
  }
  
  export { configSui, configAptos }