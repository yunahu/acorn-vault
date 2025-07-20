import { useQuery } from '@tanstack/react-query';
import { getPrimaryCurrencyPrice } from 'src/services/api';

export const usePrimaryCurrencyPriceQuery = () => {
  return useQuery({
    queryKey: ['primaryCurrencyPrice'],
    queryFn: getPrimaryCurrencyPrice,
    staleTime: Infinity,
  });
};
