import { TableProps } from 'antd';
import styled from 'styled-components';
import Table from 'src/components/Table/Table';
import useCrypto from 'src/hooks/useCrypto';
import { formatNumber } from 'src/utils/helpers';
import CryptoCard from './components/CryptoCard/CryptoCard';

// #region Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
`;

const TotalContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const Total = styled.span`
  font-weight: bold;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

// #endregion

const CryptoDetails = () => {
  const { statsQuery } = useCrypto();

  const columns: TableProps['columns'] = [
    {
      title: 'Asset',
      dataIndex: ['coin', 'id'],
      key: 'coin',
      render: (_, { coin }) => <div>{`${coin.name} (${coin?.symbol})`}</div>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (_, { coin, amount }) => <div>{`${amount} ${coin?.symbol}`}</div>,
    },
    {
      title: 'Value',
      dataIndex: 'amountInPC',
      key: 'value',
      align: 'right',
      render: (_, { amountInPC }) => {
        if (!statsQuery.data) return '';
        const { primaryCurrency } = statsQuery.data;

        return (
          <div>
            {`${primaryCurrency.code} ${primaryCurrency.symbol} ${formatNumber(amountInPC.toFixed())}`}
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      <Table
        loading={statsQuery.isLoading}
        dataSource={statsQuery.data?.rows}
        columns={columns}
        rowKey={(coin) => coin.id}
        footer={() => (
          <TotalContainer>
            <Total>TOTAL:{'  '}</Total>
            {statsQuery.data?.sum
              ? statsQuery.data?.primaryCurrency.code +
                ' ' +
                statsQuery.data?.primaryCurrency.symbol +
                ' ' +
                formatNumber(statsQuery.data?.sum.toFixed())
              : ''}
          </TotalContainer>
        )}
      />
      <Section>
        <CryptoCard />
      </Section>
    </Container>
  );
};

export default CryptoDetails;
