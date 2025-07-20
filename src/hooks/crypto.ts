import { useQuery } from '@tanstack/react-query';
import { getCoinPrices, getCoins } from 'src/services/api';

export const useCoinQuery = () =>
  useQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
    staleTime: Infinity,
  });

export const useCoinPriceQuery = () =>
  useQuery({
    queryKey: ['prices'],
    queryFn: getCoinPrices,
    refetchInterval: 180000,
  });
