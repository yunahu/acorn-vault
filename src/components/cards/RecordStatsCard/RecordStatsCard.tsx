import { ResponsivePie } from '@nivo/pie';
import { useQuery } from '@tanstack/react-query';
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
import { useCurrencies } from 'src/hooks/useCurrencies';
import useRecordQueryMutations from 'src/hooks/useRecordQueryMutations';
import useSettingsQueryMutations from 'src/hooks/useSettingsQueryMutations';
import { Range } from 'src/pages/Records/Records';
import { getRecordStats, RecordStats } from 'src/services/api';
import { formatNumber } from 'src/utils/helpers';

interface RecordsStatsProps {
  range?: Range;
}

const processData = (
  data: RecordStats,
  getCode: (id: number) => string | undefined
) =>
  data.rows.map((row) => ({
    id: getCode(row.currency_id),
    label: getCode(row.currency_id),
    value: formatNumber(row.percentage),
  })) ?? [];

const RecordStatsCard = ({ range }: RecordsStatsProps) => {
  const { getCode, getSymbol } = useCurrencies();
  const { recordQuery } = useRecordQueryMutations(
    range ?? {
      start: null,
      end: null,
    }
  );
  const { settingsQuery } = useSettingsQueryMutations();
  const { data, isLoading } = useQuery<RecordStats>({
    queryKey: ['recordStats', recordQuery.data, settingsQuery.data],
    queryFn: async () => {
      const from = range?.start?.format('YYYY-MM-DD');
      const to = range?.end?.format('YYYY-MM-DD');
      return getRecordStats(from, to);
    },
    staleTime: Infinity,
  });

  const chartData = useMemo(
    () => (data ? processData(data, getCode) : []),
    [data]
  );

  return (
    <Card title="Records" $isLoading={isLoading}>
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
            {data.rows.map(
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
            {data.rows.length > 0 && (
              <div>
                <Total>TOTAL: </Total>
                <AmountContainer>
                  {getCode(data.primary_currency)}
                  <Amount $negative={data.assignedSum < 0}>
                    {getSymbol(data.primary_currency)}{' '}
                    {formatNumber(data.assignedSum)}
                  </Amount>
                </AmountContainer>
              </div>
            )}
            {data.currencyUnassigned !== 0 && (
              <Unassigned>
                Unassinged Amount
                <div>{formatNumber(data.currencyUnassigned)}</div>
              </Unassigned>
            )}
          </List>
        </Body>
      )}
    </Card>
  );
};

export default RecordStatsCard;
