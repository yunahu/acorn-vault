import type { TableProps } from 'antd';
import TextButton from 'src/components/buttons/TextButton/TextButton';
import EditableInput from 'src/components/editables/EditableInput/EditableInput';
import Table from 'src/components/Table/Table';
import {
  useAccountsQuery,
  useDeleteAccount,
  useUpdateAccount,
} from 'src/hooks/accounts';
import { useCurrencies } from 'src/hooks/useCurrencies';
import NewAccountModal from './components/NewAccountModal/NewAccountModal';

const AccountsTable = () => {
  const { getCode, getSymbol } = useCurrencies();
  const accountQuery = useAccountsQuery();
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();

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
              updateAccount.mutate({
                id: account.id,
                body: { name: newName },
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
              updateAccount.mutate({
                id: account.id,
                body: { balance: parseFloat(newBalance) },
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
            updateAccount.mutate({
              id: account.id,
              body: {
                is_primary_payment_method: !account.is_primary_payment_method,
              },
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
        <TextButton onClick={() => deleteAccount.mutate(account.id)}>
          Delete
        </TextButton>
      ),
    },
  ];

  return (
    <Table
      loading={accountQuery.isLoading}
      dataSource={accountQuery.data}
      columns={columns}
      rowKey="id"
      footer={() => <NewAccountModal />}
    />
  );
};

export default AccountsTable;
