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
  Total,
  Unassigned,
} from 'src/components/cards/StatsCardLayouts/StatsCardLayouts';
import { useRecordStatsQuery } from 'src/hooks/stats';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { Range } from 'src/pages/Records/Records';
import { RecordStats } from 'src/services/api';
import { formatNumber } from 'src/utils/helpers';

interface RecordStatsProps {
  range?: Range;
}

const processData = (
  data: RecordStats,
  getCode: (id: number) => string | undefined
) =>
  data.income_items.currency_breakdown.map((row) => ({
    id: getCode(row.currency_id),
    label: getCode(row.currency_id),
    value: formatNumber(row.percentage),
  })) ?? [];

const IncomeCurrencyBreakdownCard = ({ range }: RecordStatsProps) => {
  const { getCode, getSymbol } = useCurrencies();
  const { data, isLoading } = useRecordStatsQuery(
    range ?? {
      start: null,
      end: null,
    }
  );

  const chartData = useMemo(
    () => (data ? processData(data, getCode) : []),
    [data]
  );

  return (
    <Card
      title="Income By Currency"
      $isLoading={isLoading}
      showNoDataMessage={!data?.income_items.currency_breakdown.length}
    >
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
            {data.income_items.currency_breakdown.map(
              ({ currency_id, amount, amount_in_PC, percentage }) => (
                <RowContainer key={currency_id}>
                  <AmountContainer>
                    {getCode(currency_id)}
                    <Amount $negative={amount < 0}>
                      {getSymbol(currency_id)} {formatNumber(amount)}
                    </Amount>
                  </AmountContainer>
                  <Conversion>
                    ({formatNumber(percentage)}% -{' '}
                    {getCode(data.primary_currency)}{' '}
                    {getSymbol(data.primary_currency)}{' '}
                    {formatNumber(amount_in_PC)})
                  </Conversion>
                </RowContainer>
              )
            )}
            {data.income_items.currency_breakdown.length > 0 && (
              <div>
                <Total>TOTAL: </Total>
                <AmountContainer>
                  {getCode(data.primary_currency)}
                  <Amount $negative={data.sum < 0}>
                    {getSymbol(data.primary_currency)} {formatNumber(data.sum)}
                  </Amount>
                </AmountContainer>
              </div>
            )}
            {data.currency_unassigned !== 0 && (
              <Unassigned>
                Unassinged Amount
                <div>{formatNumber(data.currency_unassigned)}</div>
              </Unassigned>
            )}
          </List>
        </Body>
      )}
    </Card>
  );
};

export default IncomeCurrencyBreakdownCard;
