import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { http, createConfig } from "wagmi";
import { bsc, polygon } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { mudDev, mudMainnet, mudTestnet, bscTestnet, Network } from "./data";

const network = import.meta.env.VITE_NETWORK as Network;

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

export const config = createConfig({
  chains:
    network === Network.Dev
      ? [mudDev, bscTestnet]
      : Network.Testnet
      ? [mudTestnet, polygon]
      : [mudMainnet, bsc, polygon],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "bridge" }),
    walletConnect({ projectId }),
  ],
  transports: Network.Dev
    ? { [mudDev.id]: http(), [bscTestnet.id]: http() }
    : Network.Testnet
    ? { [mudTestnet.id]: http(), [polygon.id]: http() }
    : { [mudMainnet.id]: http(), [bsc.id]: http(), [polygon.id]: http() },
});

const metadata = {
  name: "bridge",
  description: "mud chain bridge",
  url: "",
  icons: [],
};

// 2. Create wagmiConfig
export const wagmiAdapter = new WagmiAdapter({
  networks: [mudTestnet],
  projectId,
});

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mudTestnet],
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
  },
});
