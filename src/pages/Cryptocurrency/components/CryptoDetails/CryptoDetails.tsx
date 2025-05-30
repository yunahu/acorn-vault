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

const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const FooterTitle = styled.span`
  font-weight: bold;
`;

// #endregion

const CryptoDetails = () => {
  const { statsQuery } = useCrypto();

  const columns: TableProps['columns'] = [
    {
      title: 'Asset',
      dataIndex: ['coin', 'id'],
      key: 'coin',
      render: (_, { coin }) => `${coin.name} (${coin?.symbol})`,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (_, { coin, amount }) => `${amount} ${coin?.symbol}`,
    },
    {
      title: 'Value',
      dataIndex: 'amountInPC',
      key: 'value',
      align: 'right',
      render: (_, { amountInPC }) => {
        if (!statsQuery.data) return '';
        const { primaryCurrency } = statsQuery.data;
        return `${primaryCurrency.code} ${primaryCurrency.symbol} ${formatNumber(amountInPC.toFixed())}`;
      },
    },
  ];

  return (
    <Container>
      <Table
        loading={statsQuery.isLoading}
        dataSource={statsQuery.data?.rows}
        columns={columns}
        rowKey={(row) => row.coin.id}
        footer={() => (
          <Footer>
            <FooterTitle>TOTAL:</FooterTitle>
            {statsQuery.data?.sum
              ? statsQuery.data?.primaryCurrency.code +
                ' ' +
                statsQuery.data?.primaryCurrency.symbol +
                ' ' +
                formatNumber(statsQuery.data?.sum.toFixed())
              : ''}
          </Footer>
        )}
      />
      <CryptoCard />
    </Container>
  );
};

export default CryptoDetails;
