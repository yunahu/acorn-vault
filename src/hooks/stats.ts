import { useQuery } from '@tanstack/react-query';
import { getAccountStats, getRecordStats } from 'src/services/api';
import { Range } from 'src/pages/Records/Records';

export const useAccountStatsQuery = () =>
  useQuery({
    queryKey: ['accountStats'],
    queryFn: getAccountStats,
    staleTime: Infinity,
  });

export const useRecordStatsQuery = (range: Range) =>
  useQuery({
    queryKey: ['recordStats', range],
    queryFn: async () => {
      const from = range?.start?.format('YYYY-MM-DD');
      const to = range?.end?.format('YYYY-MM-DD');
      return getRecordStats(from, to);
    },
    staleTime: Infinity,
  });
