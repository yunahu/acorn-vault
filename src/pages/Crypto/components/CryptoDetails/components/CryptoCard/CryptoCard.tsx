import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';
import { formatNumber } from 'src/utils/helpers';
import useCrypto, { CoinStats } from 'src/hooks/useCrypto';
import Card from 'src/components/cards/Card/Card';
import {
  Amount,
  AmountContainer,
  Body,
  Conversion,
  RowContainer,
  List,
  ChartContainer,
} from 'src/components/cards/StatsCardLayouts/StatsCardLayouts';

const processData = (data: CoinStats) => {
  const nonZeroRows = data.rows.filter((x) => x.amountInPC.toNumber() > 0);
  return (
    nonZeroRows.map(({ coin, percentage }) => ({
      id: coin.symbol,
      label: coin.symbol,
      value: formatNumber(percentage.toFixed()),
    })) ?? []
  );
};

const CryptoCard = () => {
  const { statsQuery } = useCrypto();
  const coinStats = statsQuery.data;

  const chartData = useMemo(
    () => (statsQuery.data ? processData(statsQuery.data) : []),
    [statsQuery.data]
  );

  return (
    <Card title="Crypto Assets" $loading={statsQuery.isLoading}>
      <Body>
        {chartData.length > 0 && (
          <ChartContainer>
            <ResponsivePie
              data={chartData}
              sortByValue
              arcLabel={(d) => `${d.label} (${d.value}%)`}
              enableArcLinkLabels={false}
            />
          </ChartContainer>
        )}
        <List>
          {coinStats &&
            coinStats.rows.map(({ coin, amount, amountInPC, percentage }) => (
              <RowContainer key={coin.id}>
                <AmountContainer>
                  {coin.symbol}
                  <Amount $negative={amountInPC.toNumber() < 0}>
                    {coinStats.primaryCurrency.symbol} {amount.toFixed()}
                  </Amount>
                </AmountContainer>
                <Conversion>
                  ({formatNumber(percentage.toFixed())}% -{' '}
                  {coinStats.primaryCurrency.code}{' '}
                  {coinStats.primaryCurrency.symbol}{' '}
                  {formatNumber(amountInPC.toFixed())})
                </Conversion>
              </RowContainer>
            ))}
        </List>
      </Body>
    </Card>
  );
};

export default CryptoCard;
