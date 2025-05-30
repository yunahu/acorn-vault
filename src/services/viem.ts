import BigNumber from 'bignumber.js';
import { Address, createPublicClient, erc20Abi, getContract, http } from 'viem';
import { mainnet } from 'viem/chains';
import { Coin } from 'src/services/api';

const RPC = 'https://eth.llamarpc.com';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(RPC),
});

export const getCoinBalance = async (address: Address, coin: Coin) => {
  let result;

  if (!coin.address) {
    result = await publicClient.getBalance({
      address,
    });
  } else {
    const contract = getContract({
      address: coin.address,
      abi: erc20Abi,
      client: publicClient,
    });

    result = await contract.read.balanceOf([address]);
  }

  return new BigNumber(result).multipliedBy(`1e-${coin.decimals}`);
};

export const getCoinsWithBalance = async (coins: Coin[], address?: Address) => {
  if (!address || !coins) return;

  return Promise.all(
    coins.map(async (coin) => {
      const amount = await getCoinBalance(address, coin);
      return {
        coin,
        amount,
      };
    })
  );
};
