import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PRIMARY_CURRENCY_UPDATED } from 'src/constants/messages';
import {
  Settings,
  getUserSettings,
  updateUserSettings,
} from 'src/services/api';
import useNotify from 'src/hooks/useNotify';

export const useSettingsQuery = () =>
  useQuery({
    queryKey: ['settings'],
    queryFn: getUserSettings,
    staleTime: Infinity,
  });

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { notify, notifyError } = useNotify();
  return useMutation({
    mutationFn: (body: Partial<Settings>) => updateUserSettings(body),
    onMutate: async (body: Partial<Settings>) => {
      await queryClient.cancelQueries({ queryKey: ['settings'] });
      const previousSettings = queryClient.getQueryData(['settings']);
      queryClient.setQueryData(['settings'], (old: Settings) => {
        Object.entries(body).forEach(([key, value]) => {
          (old[key as keyof typeof body] as typeof value) = value;
        });
        return old;
      });
      return { previousSettings };
    },
    onError: (err, _, context) => {
      notifyError(err);
      queryClient.setQueryData(['settings'], context?.previousSettings);
    },
    onSuccess: async () => {
      notify(PRIMARY_CURRENCY_UPDATED);
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      queryClient.invalidateQueries({ queryKey: ['prices'] });
      queryClient.invalidateQueries({ queryKey: ['accountStats'] });
      queryClient.invalidateQueries({ queryKey: ['recordStats'] });
      queryClient.invalidateQueries({ queryKey: ['primaryCurrencyPrice'] });
    },
  });
};
