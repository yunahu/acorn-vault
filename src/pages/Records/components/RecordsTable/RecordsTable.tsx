import { type TableProps } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import EditableInput from 'src/components/editables/EditableInput/EditableInput';
import useRecordQueryMutations from 'src/hooks/useRecordQueryMutations';
import { useCurrencies } from 'src/hooks/useCurrencies';
import BasicButton from 'src/components/buttons/BasicButton/BasicButton';
import EditableSelect from 'src/components/editables/EditableSelect/EditableSelect';
import useAccountQueryMutations from 'src/hooks/useAccountQueryMutations';
import { Range } from 'src/pages/Records/Records';
import TextButton from 'src/components/buttons/TextButton/TextButton';
import Table from 'src/components/Table/Table';
import EditableDate from 'src/components/editables/EditableDate/EditableDate';

interface RecordsTableProps {
  range: Range;
}

const RecordsTable = ({ range }: RecordsTableProps) => {
  const { getCode, getSymbol } = useCurrencies();
  const {
    createRecordMutation,
    recordQuery,
    updateRecordMutation,
    deleteRecordMutation,
  } = useRecordQueryMutations(range);
  const { accountQuery } = useAccountQueryMutations();

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
            updateRecordMutation.mutate({
              id: record.id,
              column: 'date',
              value: dayjs.utc(day),
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
              updateRecordMutation.mutate({
                id: record.id,
                column: 'description',
                value: newDescription,
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
                updateRecordMutation.mutate({
                  id: record.id,
                  column: 'account_id',
                  value: newAccountId,
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
                updateRecordMutation.mutate({
                  id: record.id,
                  column: 'amount',
                  value: parseFloat(newAmount),
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
        <TextButton onClick={() => deleteRecordMutation.mutate(record.id)}>
          Delete
        </TextButton>
      ),
    },
  ];

  return (
    <Table
      loading={recordQuery.isLoading}
      dataSource={recordQuery.data}
      columns={columns}
      rowKey="id"
      footer={() => (
        <BasicButton onClick={() => createRecordMutation.mutate({})}>
          + New record
        </BasicButton>
      )}
    />
  );
};

export default RecordsTable;
