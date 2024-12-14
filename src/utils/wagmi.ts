import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { http, createConfig } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { mudTestnet } from './data';

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}

console.log('mud---------->', import.meta.env.VITE_APP_MUD_ADDRESS);

export const ADDRESS_CONFIG = {
  delaney: import.meta.env.VITE_APP_DELANEY_ADDRESS,
  usdt: import.meta.env.VITE_APP_USDT_ADDRESS
};

export const config = createConfig({
  chains: [mudTestnet],
  connectors: [injected(), coinbaseWallet({ appName: 'delaney' }), walletConnect({ projectId })],
  transports: { [mudTestnet.id]: http() }
});

const metadata = {
  name: 'bridge',
  description: 'mud chain bridge',
  url: '',
  icons: []
};

// 2. Create wagmiConfig
export const wagmiAdapter = new WagmiAdapter({
  networks: [mudTestnet],
  projectId
});

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mudTestnet],
  metadata: metadata,
  projectId,
  features: {
    analytics: true
  }
});
