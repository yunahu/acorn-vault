import styled from 'styled-components';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import api from 'src/services/axios';
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

  &[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
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
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [active, setActive] = useState<(string | number | null)[]>([
    null,
    null,
  ]);
  const currencies = useCurrencies();

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
                api.patch(`accounts/${account.id}`, {
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
                api.patch(`accounts/${account.id}`, {
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
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (_, account) => (
        <PaymentMethodButton
          onClick={() =>
            api.patch(`accounts/${account.id}`, {
              column: 'is_primary_payment_method',
              value: !account.is_primary_payment_method,
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
        <DeleteButton onClick={() => api.delete(`/accounts/${account.id}`)}>
          Delete
        </DeleteButton>
      ),
    },
  ];

  useEffect(() => {
    const run = async () => {
      const data = await api.get('/accounts').then((x) => x.data);
      setAccounts(data ?? []);
    };

    run();
  }, []);

  return (
    <Table<Account>
      dataSource={accounts}
      columns={columns}
      rowKey="id"
      footer={() => <NewAccountModal />}
    />
  );
};

export default AccountsTable;
