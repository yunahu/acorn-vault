import styled from 'styled-components';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { useAccountQueryMutations } from 'src/hooks/useAccountQueryMutations';
import NewAccountModal from './components/NewAccountModal/NewAccountModal';
import EditableInput from 'src/components/EditableInput/EditableInput';
import { Account } from 'src/services/api';

// #region Styles

const StyledButton = styled.button`
  border: none;
  background-color: inherit;

  &:focus-visible {
    outline: 2px solid green;
    outline-offset: 2px;
  }
`;

// #endregion

const AccountsTable = () => {
  const currencies = useCurrencies();
  const { accountQuery, updateAccountMutation, deleteAccountMutation } =
    useAccountQueryMutations();

  const columns: TableProps<Account>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, account) => (
        <EditableInput
          type="text"
          initialValue={account.name}
          onOk={(value: string) => {
            updateAccountMutation.mutate({
              accountId: account.id,
              column: 'name',
              value,
            });
          }}
        />
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency_id',
      key: 'currency_id',
      render: (_, account) => (
        <div>{currencies.find((x) => x.id === account.currency_id)?.code}</div>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (_, account) => (
        <EditableInput
          type="number"
          prefix={
            currencies.find((x) => x.id === account.currency_id)?.symbol + ' '
          }
          initialValue={account.balance}
          onOk={(value) => {
            updateAccountMutation.mutate({
              accountId: account.id,
              column: 'balance',
              value: parseFloat(value),
            });
          }}
        />
      ),
    },
    {
      title: 'Primary payment method',
      dataIndex: 'is_primary_payment_method',
      key: 'is_primary_payment_method',
      render: (_, account) => (
        <StyledButton
          onClick={() =>
            updateAccountMutation.mutate({
              accountId: account.id,
              column: 'is_primary_payment_method',
              value: !account.is_primary_payment_method,
            })
          }
        >
          {account.is_primary_payment_method ? 'Yes' : 'No'}
        </StyledButton>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, account) => (
        <StyledButton onClick={() => deleteAccountMutation.mutate(account.id)}>
          Delete
        </StyledButton>
      ),
    },
  ];

  return (
    <Table<Account>
      dataSource={accountQuery.data}
      columns={columns}
      rowKey="id"
      footer={() => <NewAccountModal />}
    />
  );
};

export default AccountsTable;
