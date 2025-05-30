import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Settings, getSettings, updateSettings } from 'src/services/api';

export const useSettingsQueryMutations = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: Infinity,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (body: Partial<Settings>) => updateSettings(body),
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
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });

  return {
    settingsQuery,
    updateSettingsMutation,
  };
};

export default useSettingsQueryMutations;
