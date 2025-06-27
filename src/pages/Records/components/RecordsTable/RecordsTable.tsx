import { type TableProps } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import BasicButton from 'src/components/buttons/BasicButton/BasicButton';
import TextButton from 'src/components/buttons/TextButton/TextButton';
import EditableDate from 'src/components/editables/EditableDate/EditableDate';
import EditableInput from 'src/components/editables/EditableInput/EditableInput';
import EditableSelect from 'src/components/editables/EditableSelect/EditableSelect';
import Table from 'src/components/Table/Table';
import { useAccountsQuery } from 'src/hooks/accounts';
import { useCurrencies } from 'src/hooks/useCurrencies';
import {
  useCreateRecord,
  useDeleteRecord,
  useRecordsQuery,
  useUpdateRecord,
} from 'src/hooks/records';
import { Range } from 'src/pages/Records/Records';

interface RecordsTableProps {
  range: Range;
}

const RecordsTable = ({ range }: RecordsTableProps) => {
  const { getCode, getSymbol } = useCurrencies();
  const createRecord = useCreateRecord(range);
  const recordsQuery = useRecordsQuery(range);
  const updateRecord = useUpdateRecord(range);
  const deleteRecord = useDeleteRecord(range);
  const accountQuery = useAccountsQuery();

  const primaryPaymentOptions = useMemo(() => {
    const primaryPaymentMethods = accountQuery.data?.filter(
      (x) => x.is_primary_payment_method
    );
    const mapped = primaryPaymentMethods?.map(({ name, id }) => ({
      label: name,
      value: id,
    }));
    return mapped ?? [];
  }, [accountQuery.data]);

  const columns: TableProps['columns'] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      className: 'editable',
      render: (_, record) => (
        <EditableDate
          allowClear={false}
          defaultValue={record.date}
          onChange={(newDate) => {
            const day = newDate.format('YYYY-MM-DD');
            updateRecord.mutate({
              id: record.id,
              body: { date: dayjs.utc(day) },
            });
          }}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'editable',
      render: (_, record) => (
        <EditableInput
          type="text"
          initialValue={record.description}
          onOk={(newDescription: string) => {
            if (newDescription !== record.description)
              updateRecord.mutate({
                id: record.id,
                body: { description: newDescription },
              });
          }}
        />
      ),
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      className: 'editable',
      render: (_, record) => {
        const defaultValue = primaryPaymentOptions.find(
          (x) => x.value === record.account_id
        )
          ? record.account_id
          : null;

        const noAccountMessage = '---';
        const accountName =
          accountQuery.data?.find((x) => x.id === record.account_id)?.name ??
          noAccountMessage;

        return (
          <EditableSelect
            placeholder="Primary payment method"
            options={primaryPaymentOptions}
            text={accountName}
            defaultValue={defaultValue}
            onChange={(newAccountId) => {
              if (newAccountId !== record.account_id)
                updateRecord.mutate({
                  id: record.id,
                  body: { account_id: newAccountId ?? null },
                });
            }}
          />
        );
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currency_id',
      key: 'currency_id',
      align: 'right',
      render: (_, record) => {
        const noCode = '---';
        let code = noCode;
        if (record.account_id) {
          const account = accountQuery.data?.find(
            (x) => x.id === record.account_id
          );
          if (account) {
            code = getCode(account.currency_id) ?? noCode;
          }
        }
        return <div>{code}</div>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      className: 'editable',
      align: 'right',
      render: (_, record) => {
        let prefix;
        if (record.account_id) {
          const account = accountQuery.data?.find(
            (x) => x.id === record.account_id
          );
          if (account) {
            prefix = getSymbol(account.currency_id) + ' ';
          }
        }
        return (
          <EditableInput
            type="number"
            isColorCoded
            prefix={prefix}
            initialValue={record.amount.toString()}
            onOk={(newAmount) => {
              if (parseFloat(newAmount) !== record.amount)
                updateRecord.mutate({
                  id: record.id,
                  body: { amount: parseFloat(newAmount) },
                });
            }}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <TextButton onClick={() => deleteRecord.mutate(record.id)}>
          Delete
        </TextButton>
      ),
    },
  ];

  return (
    <Table
      loading={recordsQuery.isLoading}
      dataSource={recordsQuery.data}
      columns={columns}
      rowKey="id"
      footer={() => (
        <BasicButton onClick={() => createRecord.mutate({})}>
          + New record
        </BasicButton>
      )}
    />
  );
};

export default RecordsTable;
