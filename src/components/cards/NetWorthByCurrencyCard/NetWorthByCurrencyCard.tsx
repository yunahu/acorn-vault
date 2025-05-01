import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { ResponsivePie } from '@nivo/pie';
import { getNetWorthByCurrency, NetWorthByCurrency } from 'src/services/api';
import { useCurrencies } from 'src/hooks/useCurrencies';
import Card from 'src/components/cards/Card/Card';
import { formatNumber } from 'src/utils/helpers';
import useAccountQueryMutations from 'src/hooks/useAccountQueryMutations';

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

const processData = (
  data: NetWorthByCurrency,
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

const NetWorthByCurrencyCard = () => {
  const { getSymbol, getCode } = useCurrencies();
  const { accountQuery } = useAccountQueryMutations();
  const query = useQuery<NetWorthByCurrency>({
    queryKey: ['netWorthByCurrency', accountQuery.data],
    queryFn: getNetWorthByCurrency,
  });

  const data = query.data ? processData(query.data, getCode) : [];

  return (
    <Card title="Net Worth By Currency" $loading={query.isLoading}>
      <Body>
        <ChartContainer>
          <ResponsivePie
            data={data}
            sortByValue
            arcLabel={(d) => `${d.label} (${d.value}%)`}
            enableArcLinkLabels={false}
          />
        </ChartContainer>
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
        </List>
      </Body>
    </Card>
  );
};

export default NetWorthByCurrencyCard;
