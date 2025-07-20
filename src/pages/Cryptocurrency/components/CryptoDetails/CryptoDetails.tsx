import { TableProps } from 'antd';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import Table from 'src/components/Table/Table';
import { useCoinQuery, useCoinPriceQuery } from 'src/hooks/crypto';
import { usePrimaryCurrencyPriceQuery } from 'src/hooks/currencies';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { Coin } from 'src/services/api';
import { getCoinsWithBalance } from 'src/services/viem';
import { formatCoinAmount, formatNumber } from 'src/utils/helpers';
import CryptoCard from './components/CryptoCard/CryptoCard';

interface Row {
  coin: Coin;
  formattedAmount: string;
  amountInPC: BigNumber;
  percentage: BigNumber;
}

export interface CoinStats {
  primaryCurrencyId: number;
  sum: BigNumber;
  rows: Row[];
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
  const priceQuery = useCoinPriceQuery();
  const primaryCurrencyPrice = usePrimaryCurrencyPriceQuery();
  const { address } = useAccount();
  const [coinStats, setCoinStats] = useState<ProcessingResult<CoinStats>>({
    isLoading: true,
    data: undefined,
  });
  const { getCode, getSymbol } = useCurrencies();

  useEffect(() => {
    const run = async () => {
      if (!coinQuery.data || !priceQuery.data || !primaryCurrencyPrice.data)
        return;

      setCoinStats({ isLoading: true, data: null });

      const coinsWithBalance = await getCoinsWithBalance(
        coinQuery.data,
        address
      );

      const { primary_currency_id, prices } = priceQuery.data;

      let sum = new BigNumber(0);

      const rows: Row[] = [];
      coinsWithBalance?.forEach(({ coin, amount }) => {
        const coinPrice = prices[coin.coingecko_api_id];
        const amountInPC = amount.multipliedBy(coinPrice);
        const formattedAmount = formatCoinAmount(
          amount,
          primaryCurrencyPrice.data,
          coinPrice
        );
        sum = sum.plus(amountInPC);
        rows.push({
          coin,
          formattedAmount,
          amountInPC,
          percentage: new BigNumber(0),
        });
      });

      rows.forEach((coin) => {
        if (!coin.amountInPC.isEqualTo(0))
          coin['percentage'] = coin.amountInPC.dividedBy(sum).multipliedBy(100);
      });

      const result: CoinStats = {
        primaryCurrencyId: primary_currency_id,
        rows,
        sum,
      };

      setCoinStats({ isLoading: false, data: result });
    };

    run();
  }, [coinQuery.data, priceQuery.data, primaryCurrencyPrice.data]);

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
      render: (_, { coin, formattedAmount }) =>
        `${formattedAmount} ${coin?.symbol}`,
    },
    {
      title: 'Value',
      dataIndex: 'amountInPC',
      key: 'value',
      align: 'right',
      render: (_, { amountInPC }) => {
        if (!coinStats.data) return '';
        const { primaryCurrencyId } = coinStats.data;
        return `${getCode(primaryCurrencyId)} ${getSymbol(primaryCurrencyId)} ${formatNumber(amountInPC.toFixed())}`;
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
              ? getCode(coinStats.data.primaryCurrencyId) +
                ' ' +
                getSymbol(coinStats.data.primaryCurrencyId) +
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
