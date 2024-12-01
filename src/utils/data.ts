import { type Chain, type Address } from 'viem';
import { bsc, polygon } from 'wagmi/chains';

type Bridge = {
  chainId: number;
  domain: number;
  bridge: Address;
  handler: Address;
  usdt: Address;
  resource: `0x${string}`;
};

const network = import.meta.env.VITE_NETWORK as Network;

export const bridgeAbi = [
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'destinationDomainID',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: '_fee',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

export const enum Network {
  Dev = 'DEV',
  Testnet = 'TESTNET',
  Mainnet = 'MAINNET'
}

export const bscTestnet = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://endpoints.omniatech.io/v1/bsc/testnet/public'] }
  },
  blockExplorers: {
    default: { name: 'bsc testnet scan', url: 'https://testnet.bscscan.com' }
  },
  contracts: {}
} as const satisfies Chain;

export const mudDev = {
  id: 168167,
  name: 'MUD Dev',
  nativeCurrency: { name: 'MUD', symbol: 'MUD', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://dev-rpc.metauserdao.com/'] }
  },
  blockExplorers: {
    default: { name: 'mudscan', url: 'https://dev-scan.metauserdao.com/' }
  },
  contracts: {}
} as const satisfies Chain;
export const mudMainnet = {
  id: 168168,
  name: 'MUD',
  nativeCurrency: { name: 'MUD', symbol: 'MUD', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.mud-chain.net/'] }
  },
  blockExplorers: {
    default: { name: 'mudscan', url: 'https://scan.mud-chain.net/' }
  },
  contracts: {}
};
export const mudTestnet = {
  id: 168169,
  name: 'MUD Testnet',
  nativeCurrency: { name: 'MUD', symbol: 'MUD', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.mud-chain.net/'] }
  },
  blockExplorers: {
    default: { name: 'mudscan', url: 'https://testnet-scan.mud-chain.net/' }
  },
  contracts: {}
} as const satisfies Chain;

const mudChainIds = {
  [Network.Dev]: 168167,
  [Network.Testnet]: 168169,
  [Network.Mainnet]: 168168
};

const mudBridgs = {
  [Network.Dev]: '0x0E56d4F2BCbDe2E4bEa0edfd618EF35340D7760f' as Address,
  [Network.Testnet]: '0x9e08bb5FE455bfBD430eFD7EB00CE715E7536C36' as Address,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000' as Address
};

const mudHandlers = {
  [Network.Dev]: '0xE9e993DDaA539e17e568BBC30cb5C767a8549f7B' as Address,
  [Network.Testnet]: '0x9e65CeB4367d8EaAF9AF49fa4dC38b12bA85b59D' as Address,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000' as Address
};

const mudUsdt = {
  [Network.Dev]: '0xfaD6EC03130519adDfffF1358fe2005e1b21Dcc4' as Address,
  [Network.Testnet]: '0x592d157a0765b43b0192Ba28F4b8cd4F50E326cF' as Address,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000' as Address
};

const mudResources = {
  [Network.Dev]: '0x000000000000000000000000faD6EC03130519adDfffF1358fe2005e1b21Dcc4' as `0x${string}`,
  [Network.Testnet]: '0x000000000000000000000000592d157a0765b43b0192Ba28F4b8cd4F50E326cF' as `0x${string}`,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`
};

// mud bridge
export const mudBridge: Bridge = {
  chainId: mudChainIds[network],
  domain: 0,
  bridge: mudBridgs[network],
  handler: mudHandlers[network],
  usdt: mudUsdt[network],
  resource: mudResources[network]
};

const bscChainIds = {
  [Network.Dev]: bscTestnet.id,
  [Network.Testnet]: bscTestnet.id,
  [Network.Mainnet]: bsc.id
};

const bscBridgs = {
  [Network.Dev]: '0x0E56d4F2BCbDe2E4bEa0edfd618EF35340D7760f' as Address,
  [Network.Testnet]: '0xA1e9C0403893c3E1580b929be90aaADECb93944d' as Address,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000' as Address
};

const bscHandlers = {
  [Network.Dev]: '0xE9e993DDaA539e17e568BBC30cb5C767a8549f7B' as Address,
  [Network.Testnet]: '0xa2582c671Ef2a0D5898e25C77cEbe0BF5A20a300' as Address,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000' as Address
};

const bscUsdt = {
  [Network.Dev]: '0xfaD6EC03130519adDfffF1358fe2005e1b21Dcc4' as Address,
  [Network.Testnet]: '0xa2F921913eed72D908CE1D7611E76c432B39eF2F' as Address,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000' as Address
};

const bscResources = {
  [Network.Dev]: '0x000000000000000000000000faD6EC03130519adDfffF1358fe2005e1b21Dcc4' as `0x${string}`,
  [Network.Testnet]: '0x000000000000000000000000a2F921913eed72D908CE1D7611E76c432B39eF2F' as `0x${string}`,
  [Network.Mainnet]: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`
};

export const bscBridge: Bridge = {
  chainId: bscChainIds[network],
  domain: 1,
  bridge: bscBridgs[network],
  handler: bscHandlers[network],
  usdt: bscUsdt[network],
  resource: bscResources[network]
};

export const polygonBridge: Bridge = {
  chainId: polygon.id,
  domain: 1,
  bridge: '0x9e08bb5FE455bfBD430eFD7EB00CE715E7536C36' as Address,
  handler: '0x9e65CeB4367d8EaAF9AF49fa4dC38b12bA85b59D' as Address,
  usdt: '0x592d157a0765b43b0192Ba28F4b8cd4F50E326cF' as Address,
  resource: '0x000000000000000000000000592d157a0765b43b0192Ba28F4b8cd4F50E326cF' as `0x${string}`
};

export const enum ChainId {
  Ethereum = 1,
  Bsc = 56,
  BscTestnet = 97,
  Polygon = 137,
  MudDev = 168167,
  Mud = 168168,
  MudTestnet = 168169
}

export const enum TokenId {
  USDT = 1,
  USDC = 2
}

export const enum Tab {
  Deposit = 1,
  Withdraw = 2
}

export const getBridge = (chainId: number) => {
  const bridges = [mudBridge, polygonBridge];
  for (const bridge of bridges) {
    if (chainId === bridge.chainId) {
      return bridge;
    }
  }
  throw new Error(`${chainId} bridge not find!`);
};

export const NativeTokenName = {
  '56': 'BNB',
  '97': 'tBNB',
  '137': 'Matic',
  '168167': 'MUD',
  '168168': 'MUD',
  '168169': 'MUD'
};

export const enum Action {
  ConnectMetamask = 'Connect Metamask',
  SwitchChain = 'Switch Chain',
  Approve = 'Approve',
  Transfer = 'Transfer'
}
