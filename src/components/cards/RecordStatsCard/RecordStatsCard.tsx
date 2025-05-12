import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { ResponsivePie } from '@nivo/pie';
import { getRecordStats, RecordStats } from 'src/services/api';
import { useCurrencies } from 'src/hooks/useCurrencies';
import Card from 'src/components/cards/Card/Card';
import { formatNumber } from 'src/utils/helpers';
import { Range } from 'src/pages/Records/Records';
import useRecordQueryMutations from 'src/hooks/useRecordQueryMutations';

// #region Styles

const Body = styled.div`
  display: flex;
  gap: 20px;
`;

const ChartContainer = styled.div`
  width: 200px;
  height: 200px;
`;

const List = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const AmountContainer = styled.div`
  font-size: 20px;
  display: flex;
  align-items: end;
  gap: 15px;
`;

const Unassigned = styled.div`
  color: #888888;
  font-size: 18px;
  display: flex;
  align-items: end;
  gap: 18px;
`;

const Amount = styled.div<{ $negative?: boolean }>`
  color: ${({ theme, $negative }) =>
    $negative ? theme.colors.negative : theme.colors.positive};
`;

const Conversion = styled.div`
  color: #615d5d;
  display: flex;
  font-size: 14px;
`;

// #endregion

interface RecordsStatsProps {
  range?: Range;
}

const processData = (
  data: RecordStats,
  getCode: (id: number) => string | undefined
) => {
  const result = data.rows.map((row) => {
    return {
      id: getCode(row.currency_id),
      label: getCode(row.currency_id),
      value: formatNumber(row.percentage),
    };
  });

  return result ?? [];
};

const RecordStatsCard = ({ range }: RecordsStatsProps) => {
  const { getSymbol, getCode } = useCurrencies();
  const { recordQuery } = useRecordQueryMutations(
    range ?? {
      start: null,
      end: null,
    }
  );
  const query = useQuery<RecordStats>({
    queryKey: ['recordStats', recordQuery.data],
    queryFn: async () => {
      const from = range?.start?.format('YYYY-MM-DD');
      const to = range?.end?.format('YYYY-MM-DD');
      return getRecordStats(from, to);
    },
  });

  const data = query.data ? processData(query.data, getCode) : [];

  return (
    <Card title="Records" $loading={query.isLoading}>
      <Body>
        {query.data?.rows && query.data?.rows.length > 0 && (
          <ChartContainer>
            <ResponsivePie
              data={data}
              sortByValue
              arcLabel={(d) => `${d.label} (${d.value}%)`}
              enableArcLinkLabels={false}
            />
          </ChartContainer>
        )}
        <List>
          {query.data &&
            query.data.rows.map((row) => (
              <ItemContainer key={row.currency_id}>
                <AmountContainer>
                  {getCode(row.currency_id)}
                  <Amount $negative={row.amount < 0}>
                    {getSymbol(row.currency_id)} {formatNumber(row.amount)}
                  </Amount>
                </AmountContainer>
                <Conversion>
                  ({formatNumber(row.percentage)}% -{' '}
                  {getCode(query.data.primary_currency)}{' '}
                  {getSymbol(query.data.primary_currency)}{' '}
                  {formatNumber(row.amount_in_PC)})
                </Conversion>
              </ItemContainer>
            ))}
          {query.data && Boolean(query.data?.currencyUnassigned) && (
            <div>
              <Unassigned>
                Unassinged Amount
                <div>{formatNumber(query.data?.currencyUnassigned)}</div>
              </Unassigned>
            </div>
          )}
        </List>
      </Body>
    </Card>
  );
};

export default RecordStatsCard;
