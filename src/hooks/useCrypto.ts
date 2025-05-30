import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { Coin, getCoinPrices, getCoins } from 'src/services/api';
import { getCoinsWithBalance } from 'src/services/viem';
import useSettingsQueryMutations from './useSettingsQueryMutations';

interface Row {
  coin: Coin;
  amount: BigNumber;
  amountInPC: BigNumber;
  percentage: BigNumber;
}

export interface CoinStats {
  primaryCurrency: {
    symbol: string;
    code: string;
  };
  rows: Row[];
  sum: BigNumber;
}

const useCrypto = () => {
  const { address } = useAccount();
  const { settingsQuery } = useSettingsQueryMutations();

  const coinQuery = useQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
    staleTime: Infinity,
  });

  const priceQuery = useQuery({
    queryKey: ['prices', settingsQuery.data],
    queryFn: getCoinPrices,
    staleTime: 60000,
  });

  const statsQuery = useQuery({
    queryKey: ['cryptoStats', coinQuery.data, priceQuery.data],
    staleTime: 60000,
    queryFn: async () => {
      if (!coinQuery.data || !priceQuery.data) return;

      const coinsWithBalance = await getCoinsWithBalance(
        coinQuery.data,
        address
      );

      const { currency, prices } = priceQuery.data;

      let sum = new BigNumber(0);

      const rows: Row[] = [];
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
        if (!coin.amountInPC.isEqualTo(0))
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
