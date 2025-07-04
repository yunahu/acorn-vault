import { TableProps } from 'antd';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import Table from 'src/components/Table/Table';
import { useCoinQuery, usePriceQuery } from 'src/hooks/crypto';
import { Currency, Row } from 'src/services/api';
import { getCoinsWithBalance } from 'src/services/viem';
import { formatNumber } from 'src/utils/helpers';
import CryptoCard from './components/CryptoCard/CryptoCard';
import { useCurrencies } from 'src/hooks/useCurrencies';

export interface CoinStats {
  primaryCurrency: Partial<Currency>;
  rows: Row[];
  sum: BigNumber;
}

export interface ProcessingResult<T> {
  isLoading: boolean;
  data: T | undefined | null;
}

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
  const coinQuery = useCoinQuery();
  const priceQuery = usePriceQuery();
  const { address } = useAccount();
  const [coinStats, setCoinStats] = useState<ProcessingResult<CoinStats>>({
    isLoading: true,
    data: undefined,
  });
  const { getCode, getSymbol } = useCurrencies();

  useEffect(() => {
    const run = async () => {
      if (!coinQuery.data || !priceQuery.data) return;

      setCoinStats({ isLoading: true, data: null });

      const coinsWithBalance = await getCoinsWithBalance(
        coinQuery.data,
        address
      );

      const { primary_currency_id, prices } = priceQuery.data;

      let sum = new BigNumber(0);

      const rows: Row[] = [];
      coinsWithBalance?.forEach(({ coin, amount }) => {
        const amountInPC = amount.multipliedBy(prices[coin.coingecko_api_id]);
        sum = sum.plus(amountInPC);
        rows.push({
          coin,
          amount,
          amountInPC,
          percentage: new BigNumber(0),
        });
      });

      rows.forEach((coin) => {
        if (!coin.amountInPC.isEqualTo(0))
          coin['percentage'] = coin.amountInPC.dividedBy(sum).multipliedBy(100);
      });

      const primaryCurrency = {
        symbol: getSymbol(primary_currency_id),
        code: getCode(primary_currency_id),
      };

      const result: CoinStats = {
        primaryCurrency,
        rows,
        sum,
      };

      setCoinStats({ isLoading: false, data: result });
    };

    run();
  }, [coinQuery.data, priceQuery.data]);

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
        if (!coinStats.data) return '';
        const { primaryCurrency } = coinStats.data;
        return `${primaryCurrency.code} ${primaryCurrency.symbol} ${formatNumber(amountInPC.toFixed())}`;
      },
    },
  ];

  return (
    <Container>
      <Table
        loading={coinStats.isLoading}
        dataSource={coinStats.data?.rows}
        columns={columns}
        rowKey={(row) => row.coin.id}
        footer={() => (
          <Footer>
            <FooterTitle>TOTAL:</FooterTitle>
            {coinStats.data?.sum
              ? coinStats.data?.primaryCurrency.code +
                ' ' +
                coinStats.data?.primaryCurrency.symbol +
                ' ' +
                formatNumber(coinStats.data?.sum.toFixed())
              : ''}
          </Footer>
        )}
      />
      <CryptoCard coinStats={coinStats} />
    </Container>
  );
};

export default CryptoDetails;
