import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { deleteAccount, getAccounts, updateAccount } from 'src/services/axios';
import { useCurrencies } from 'src/hooks/useCurrencies';
import NewAccountModal from './components/NewAccountModal/NewAccountModal';

// #region Styles

const StyledInput = styled.input`
  padding: 10px 15px;
  width: 99%;
  height: 56px;
  border-radius: 1px;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: inherit;

  &:hover {
    cursor: pointer;
  }
`;

const BalanceInput = styled.input`
  padding: 10px 15px;
  width: 99%;
  height: 56px;
  border-radius: 1px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  // TODO:
  //  &[type='number'] {
  //    -moz-appearance: textfield; /* Firefox */
  //  }
`;

const PaymentMethodButton = styled.button`
  border: none;
  background-color: inherit;
  padding: 5px 15px;

  &:hover {
    cursor: pointer;
  }
`;

// #endregion

interface Account {
  id: number;
  name: string;
  currency_id: number;
  balance: number;
  is_primary_payment_method: boolean;
}

const AccountsTable = () => {
  const { data } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  const [active, setActive] = useState<(string | number | null)[]>([
    null,
    null,
  ]);
  const currencies = useCurrencies();
  const queryClient = useQueryClient();
  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
  const updateAccountMutation = useMutation({
    mutationFn: ({
      accountId,
      column,
      value,
    }: {
      accountId: number;
      column: string;
      value: string;
    }) => updateAccount(accountId, column, value),
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });

  const columns: TableProps<Account>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, account) => {
        return active[0] === account.id && active[1] === 'name' ? (
          <StyledInput
            type="text"
            autoFocus
            defaultValue={account.name}
            onBlur={() => setActive([null, null])}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                updateAccountMutation.mutate({
                  accountId: account.id,
                  column: 'name',
                  value: evt.currentTarget.value,
                });
                setActive([null, null]);
              } else if (evt.key === 'Escape') {
                setActive([null, null]);
              }
            }}
          />
        ) : (
          <div
            onClick={() => {
              setActive([account.id, 'name']);
            }}
          >
            {account.name}
          </div>
        );
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currency_id',
      key: 'currency_id',
      render: (_, account) => {
        return (
          <div>
            {currencies.find((x) => x.id === account.currency_id)?.code}
          </div>
        );
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (_, account) => {
        return active[0] === account.id && active[1] === 'balance' ? (
          <BalanceInput
            type="number"
            autoFocus
            defaultValue={account.balance}
            onBlur={() => setActive([null, null])}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                updateAccountMutation.mutate({
                  accountId: account.id,
                  column: 'balance',
                  value: evt.currentTarget.value,
                });
                setActive([null, null]);
              } else if (evt.key === 'Escape') {
                setActive([null, null]);
              }
            }}
          />
        ) : (
          <div
            onClick={() => {
              setActive([account.id, 'balance']);
            }}
          >
            {currencies.find((x) => x.id === account.currency_id)?.symbol +
              ' ' +
              account.balance}
          </div>
        );
      },
    },
    {
      title: 'Primary payment method',
      dataIndex: 'is_primary_payment_method',
      key: 'is_primary_payment_method',
      render: (_, account) => (
        <PaymentMethodButton
          onClick={() =>
            updateAccountMutation.mutate({
              accountId: account.id,
              column: 'is_primary_payment_method',
              value: (!account.is_primary_payment_method).toString(),
            })
          }
        >
          {account.is_primary_payment_method ? 'Yes' : 'No'}
        </PaymentMethodButton>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, account) => (
        <DeleteButton onClick={() => deleteAccountMutation.mutate(account.id)}>
          Delete
        </DeleteButton>
      ),
    },
  ];

  return (
    <Table<Account>
      dataSource={data}
      columns={columns}
      rowKey="id"
      footer={() => <NewAccountModal />}
    />
  );
};

export default AccountsTable;
