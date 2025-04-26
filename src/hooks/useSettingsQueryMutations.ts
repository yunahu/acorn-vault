import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getSettings,
  Settings,
  SettingsEditableKey,
  updateSettings,
} from 'src/services/api';

interface UpdateParams {
  column: SettingsEditableKey;
  value: Settings[SettingsEditableKey];
}

export const useSettingsQueryMutations = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: ({ column, value }: UpdateParams) =>
      updateSettings(column, value),
    onMutate: async ({ column, value }: UpdateParams) => {
      await queryClient.cancelQueries({ queryKey: ['settings'] });
      const previousSettings = queryClient.getQueryData(['settings']);
      queryClient.setQueryData(['settings'], (old: Settings) => {
        old[column] = value;
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
