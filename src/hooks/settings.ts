import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Settings,
  getUserSettings,
  updateUserSettings,
} from 'src/services/api';

export const useSettingsQuery = () =>
  useQuery({
    queryKey: ['settings'],
    queryFn: getUserSettings,
    staleTime: Infinity,
  });

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
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
      console.error('Error: ', err);
      queryClient.setQueryData(['settings'], context?.previousSettings);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      queryClient.invalidateQueries({ queryKey: ['prices'] });
      queryClient.invalidateQueries({ queryKey: ['accountStats'] });
      queryClient.invalidateQueries({ queryKey: ['recordStats'] });
    },
  });
};
