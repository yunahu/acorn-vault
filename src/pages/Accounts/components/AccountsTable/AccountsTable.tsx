import type { TableProps } from 'antd';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { useAccountQueryMutations } from 'src/hooks/useAccountQueryMutations';
import EditableInput from 'src/components/editables/EditableInput/EditableInput';
import NewAccountModal from './components/NewAccountModal/NewAccountModal';
import StyledTable from 'src/components/Table/Table';
import TextButton from 'src/components/buttons/TextButton/TextButton';

const AccountsTable = () => {
  const { getCode, getSymbol } = useCurrencies();
  const { accountQuery, updateAccountMutation, deleteAccountMutation } =
    useAccountQueryMutations();

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'editable',
      render: (_, account) => (
        <EditableInput
          type="text"
          initialValue={account.name}
          onOk={(newName: string) => {
            if (newName !== account.name) {
              updateAccountMutation.mutate({
                id: account.id,
                column: 'name',
                value: newName,
              });
            }
          }}
        />
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency_id',
      align: 'right',
      key: 'currency_id',
      render: (_, account) => <div>{getCode(account.currency_id)}</div>,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      className: 'editable',
      align: 'right',
      render: (_, account) => (
        <EditableInput
          type="number"
          isColorCoded
          prefix={getSymbol(account.currency_id) + ' '}
          initialValue={account.balance.toString()}
          onOk={(newBalance) => {
            if (parseFloat(newBalance) !== account.balance) {
              updateAccountMutation.mutate({
                id: account.id,
                column: 'balance',
                value: parseFloat(newBalance),
              });
            }
          }}
        />
      ),
    },
    {
      title: 'Primary payment method',
      dataIndex: 'is_primary_payment_method',
      key: 'is_primary_payment_method',
      render: (_, account) => (
        <TextButton
          onClick={() =>
            updateAccountMutation.mutate({
              id: account.id,
              column: 'is_primary_payment_method',
              value: !account.is_primary_payment_method,
            })
          }
        >
          {account.is_primary_payment_method ? 'Yes' : 'No'}
        </TextButton>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, account) => (
        <TextButton onClick={() => deleteAccountMutation.mutate(account.id)}>
          Delete
        </TextButton>
      ),
    },
  ];

  return (
    <StyledTable
      loading={accountQuery.isLoading}
      dataSource={accountQuery.data}
      columns={columns}
      rowKey="id"
      footer={() => <NewAccountModal />}
    />
  );
};

export default AccountsTable;
