import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';
import Card from 'src/components/cards/Card/Card';
import {
  Amount,
  AmountContainer,
  Body,
  ChartContainer,
  Conversion,
  List,
  RowContainer,
} from 'src/components/cards/StatsCardLayouts/StatsCardLayouts';
import { formatNumber } from 'src/utils/helpers';
import { CoinStats, ProcessingResult } from '../../CryptoDetails';

interface CryptoCardProps {
  coinStats: ProcessingResult<CoinStats>;
}

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

const CryptoCard = ({ coinStats }: CryptoCardProps) => {
  const { data, isLoading } = coinStats;

  const chartData = useMemo(() => (data ? processData(data) : []), [data]);

  return (
    <Card title="Crypto Assets" $isLoading={isLoading}>
      {data && (
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
            {data.rows.map(({ coin, amount, amountInPC, percentage }) => (
              <RowContainer key={coin.id}>
                <AmountContainer>
                  {coin.symbol}
                  <Amount $negative={amountInPC.toNumber() < 0}>
                    {amount.toFixed()}
                  </Amount>
                </AmountContainer>
                <Conversion>
                  ({formatNumber(percentage.toFixed())}% -{' '}
                  {data.primaryCurrency.code} {data.primaryCurrency.symbol}{' '}
                  {formatNumber(amountInPC.toFixed())})
                </Conversion>
              </RowContainer>
            ))}
          </List>
        </Body>
      )}
    </Card>
  );
};

export default CryptoCard;
