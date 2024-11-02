import { OPACITY } from '@wormhole-foundation/wormhole-connect';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';

// Sui theme configuration
const sui = {
  primary: grey,
  secondary: grey,
  divider: `#ffffff`,
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
    disabled: `#ffffff`,
    disabledText: `#ffffff`,
    action: '#76c8ff',
    actionText: '#000000',
    hover: `#ffffff`,
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
    secondary: `#192623`,
    elevation: 'none',
  },
  modal: {
    background: '#1C1C1C',
  },
  font: {
    primary: 'Space Grotesk',
    header: '',
  },
};

// Aptos theme configuration
const aptos = {
  primary: grey,
  secondary: grey,
  divider: `#ffffff`,
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
    disabled: `#ffffff`,
    disabledText: `#ffffff`,
    action: '#68ffd8',
    actionText: '#000000',
    hover: `#ffffff`,
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
    secondary: `#192623`,
    elevation: 'none',
  },
  modal: {
    background: '#1C1C1C',
  },
  font: {
    primary: 'Space Grotesk',
    header: '',
  },
};

// Wormhole Connect configuration for Sui
const configSui = {
  env: 'mainnet',
  networks: ['ethereum', 'sui'],
  tokens: ['ETH', 'WETH', 'SUI'],
  bridgeDefaults: {
    fromNetwork: 'ethereum',
    toNetwork: 'sui',
    token: 'ETH',
  },
};

// Wormhole Connect configuration for Aptos
 const configAptos = {
  env: 'mainnet',
  networks: ['ethereum', 'aptos'],
  tokens: ['ETH', 'WETH', 'APT'],
  bridgeDefaults: {
    fromNetwork: 'ethereum',
    toNetwork: 'aptos',
    token: 'ETH',
  },
};

// Export configurations
export { configSui, configAptos };