import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  Account,
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  AccountEditableKey,
} from 'src/services/api';

interface UpdateParams {
  accountId: number;
  column: AccountEditableKey;
  value: Account[AccountEditableKey];
}

export const useAccountQueryMutations = () => {
  const queryClient = useQueryClient();

  const accountQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  });

  const createAccountMutation = useMutation({
    mutationFn: (variables: {
      id?: number;
      name: string;
      currencyId: number;
      balance: number;
      isPrimaryPaymentMethod: boolean;
    }) =>
      createAccount(
        variables.name,
        variables.currencyId,
        variables.balance,
        variables.isPrimaryPaymentMethod
      ),
    onMutate: async (variables) => {
      variables.id = -1;
      await queryClient.cancelQueries({ queryKey: ['accounts'] });
      const previousAccounts = queryClient.getQueryData(['accounts']);
      queryClient.setQueryData(['accounts'], (old: Account[]) => [
        ...old,
        {
          id: -1,
          name: variables.name,
          currency_id: variables.currencyId,
          balance: variables.balance,
          is_primary_payment_method: variables.isPrimaryPaymentMethod,
        },
      ]);
      return { previousAccounts };
    },
    onError: (err, _, context) => {
      console.error('Error: ', err);
      queryClient.setQueryData(['accounts'], context?.previousAccounts);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });

  const updateAccountMutation = useMutation({
    mutationFn: ({ accountId, column, value }: UpdateParams) =>
      updateAccount(accountId, column, value),
    onMutate: async ({ accountId, column, value }: UpdateParams) => {
      await queryClient.cancelQueries({ queryKey: ['accounts'] });
      const previousAccounts = queryClient.getQueryData(['accounts']);
      queryClient.setQueryData(['accounts'], (old: Account[]) => {
        const clone = structuredClone(old);
        const found = clone.find((x) => x.id === accountId);
        if (found) (found[column] as Account[typeof column]) = value;
        return clone;
      });
      return { previousAccounts };
    },
    onError: (err, _, context) => {
      console.error('Error: ', err);
      queryClient.setQueryData(['accounts'], context?.previousAccounts);
    },

    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onMutate: async (accountId) => {
      await queryClient.cancelQueries({ queryKey: ['accounts'] });
      const previousAccounts = queryClient.getQueryData(['accounts']);
      queryClient.setQueryData(['accounts'], (old: Account[]) =>
        old.filter((account) => account.id !== accountId)
      );
      return { previousAccounts };
    },
    onError: (err, _, context) => {
      console.error('Error: ', err);
      queryClient.setQueryData(['accounts'], context?.previousAccounts);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });

  return {
    accountQuery,
    createAccountMutation,
    updateAccountMutation,
    deleteAccountMutation,
  };
};

export default useAccountQueryMutations;
