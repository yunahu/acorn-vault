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
} from 'src/components/cards/StatsCardLayouts/StatsCardLayouts';
import useAccountQueryMutations from 'src/hooks/useAccountQueryMutations';
import { useCurrencies } from 'src/hooks/useCurrencies';
import useSettingsQueryMutations from 'src/hooks/useSettingsQueryMutations';
import { getNetWorthByCurrency, NetWorthByCurrency } from 'src/services/api';
import { formatNumber } from 'src/utils/helpers';

const processData = (
  data: NetWorthByCurrency,
  getCode: (id: number) => string | undefined
) =>
  data.rows.map((row) => ({
    id: getCode(row.currency_id),
    label: getCode(row.currency_id),
    value: formatNumber(row.percentage),
  })) ?? [];

const NetWorthByCurrencyCard = () => {
  const { getCode, getSymbol } = useCurrencies();
  const { accountQuery } = useAccountQueryMutations();
  const { settingsQuery } = useSettingsQueryMutations();
  const { data, isLoading } = useQuery<NetWorthByCurrency>({
    queryKey: ['netWorthByCurrency', accountQuery.data, settingsQuery.data],
    queryFn: getNetWorthByCurrency,
    staleTime: Infinity,
  });

  const chartData = useMemo(
    () => (data ? processData(data, getCode) : []),
    [data]
  );

  return (
    <Card
      title="Net Worth By Currency"
      $isLoading={isLoading}
      showNoDataMessage={!data?.rows.length}
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
          </List>
        </Body>
      )}
    </Card>
  );
};

export default NetWorthByCurrencyCard;
