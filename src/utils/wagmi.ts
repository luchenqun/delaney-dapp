import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { http, createConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { mudTestnet, Network } from './data';

const network = import.meta.env.VITE_NETWORK as Network;

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}

export const config = createConfig({
  chains: network == Network.Testnet ? [mudTestnet] : [polygon],
  connectors: [injected(), coinbaseWallet({ appName: 'delaney' }), walletConnect({ projectId })],
  transports: network == Network.Testnet ? { [mudTestnet.id]: http() } : { [polygon.id]: http() }
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
