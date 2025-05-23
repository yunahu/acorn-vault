export type WalletAddress = `0x${string}`;

export interface Coin {
  id: number;
  name: string;
  symbol: string;
  decimals: number;
  address?: WalletAddress;
}

export const ETH: Coin = {
  id: 1,
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

export const WETH: Coin = {
  id: 2,
  name: 'Wrapped Ether',
  symbol: 'WETH',
  decimals: 18,
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
};

export const WBTC: Coin = {
  id: 3,
  name: 'Wrapped Bitcoin',
  symbol: 'WBTC',
  decimals: 8,
  address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
};

export const RPC = 'https://eth.llamarpc.com';

const coins = [ETH, WETH, WBTC];

export default coins;
