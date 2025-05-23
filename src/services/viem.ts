import { getContract, createPublicClient, http, erc20Abi } from 'viem';
import { mainnet } from 'viem/chains';
import BigNumber from 'bignumber.js';
import coins, { Coin, RPC, WalletAddress } from 'src/data/coins';

export interface CoinWithBalance {
  coin: Coin;
  balance: BigNumber;
}

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(RPC),
});

export const getBalance = async (walletAddress: WalletAddress, coin: Coin) => {
  const decimals = coin.decimals;
  let result;

  if (!coin.address) {
    result = await publicClient.getBalance({
      address: walletAddress,
    });
  } else {
    const contract = getContract({
      address: coin.address,
      abi: erc20Abi,
      client: publicClient,
    });

    result = await contract.read.balanceOf([walletAddress]);
  }

  return new BigNumber(result).multipliedBy(`1e-${decimals}`);
};

export const getCoinsWithBalance = async (walletAddress: WalletAddress) =>
  Promise.all(
    coins.map(async (coin) => {
      const balance = await getBalance(walletAddress, coin);
      return {
        coin,
        balance,
      };
    })
  );
