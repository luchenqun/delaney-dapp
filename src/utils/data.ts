import { type Chain } from 'viem';

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

export const enum TxType {
  Delegate = 0,
  Approve = 1,
  Claim = 2,
  Undelegate = 3,
  Redelegate = 4
}
