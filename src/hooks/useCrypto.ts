import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { Coin, getCoinPrices, getCoins } from 'src/services/api';
import { getCoinsWithBalance } from 'src/services/viem';

export interface CoinStats {
  primaryCurrency: {
    symbol: string;
    code: string;
  };
  rows: {
    coin: Coin;
    amount: BigNumber;
    amountInPC: BigNumber;
    percentage: BigNumber;
  }[];
  sum: BigNumber;
}

const useCrypto = () => {
  const { address } = useAccount();

  const coinQuery = useQuery({
    queryKey: ['coins', address],
    queryFn: getCoins,
  });

  const priceQuery = useQuery({
    queryKey: ['prices', address],
    queryFn: getCoinPrices,
  });

  const statsQuery = useQuery({
    queryKey: ['cryptoStats', coinQuery.data, priceQuery.data],
    queryFn: async () => {
      if (!coinQuery.data || !priceQuery.data) return;

      const coinsWithBalance = await getCoinsWithBalance(
        coinQuery.data,
        address
      );

      const { currency, prices } = priceQuery.data;

      let sum = new BigNumber(0);

      const rows: CoinStats['rows'] = [];
      coinsWithBalance?.forEach(({ coin, amount }) => {
        const amountInPC = amount.multipliedBy(prices[coin.coingecko_api_id]);
        sum = sum.plus(amountInPC);
        rows.push({
          coin,
          amount,
          amountInPC,
          percentage: new BigNumber(0),
        });
      });

      rows.forEach((coin) => {
        coin['percentage'] = coin.amountInPC.dividedBy(sum).multipliedBy(100);
      });

      const result: CoinStats = {
        primaryCurrency: currency,
        rows,
        sum,
      };

      return result;
    },
    enabled: !!coinQuery.data && !!priceQuery.data,
  });

  return {
    coinQuery,
    priceQuery,
    statsQuery,
  };
};

export default useCrypto;
