import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  Account,
  AccountEditableKey,
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from 'src/services/api';

interface UpdateParams {
  id: number;
  column: AccountEditableKey;
  value: Account[AccountEditableKey];
}

const useAccountQueryMutations = () => {
  const queryClient = useQueryClient();

  const createAccountMutation = useMutation({
    mutationFn: (variables: {
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

  const accountQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  });

  const updateAccountMutation = useMutation({
    mutationFn: ({ id, column, value }: UpdateParams) =>
      updateAccount(id, column, value),
    onMutate: async ({ id, column, value }: UpdateParams) => {
      await queryClient.cancelQueries({ queryKey: ['accounts'] });
      const previousAccounts = queryClient.getQueryData(['accounts']);
      queryClient.setQueryData(['accounts'], (old: Account[]) => {
        const clone = structuredClone(old);
        const found = clone.find((x) => x.id === id);
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
    createAccountMutation,
    accountQuery,
    updateAccountMutation,
    deleteAccountMutation,
  };
};

export default useAccountQueryMutations;
