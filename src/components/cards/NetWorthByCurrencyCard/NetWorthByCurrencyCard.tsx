import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getNetWorthByCurrency, NetWorth } from 'src/services/api';
import { useCurrencies } from 'src/hooks/useCurrencies';
import Card from 'src/components/cards/Card/Card';
import { formatNumber } from 'src/utils/helpers';

// #region Styles

const Body = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 15px;
`;

const Currency = styled.div`
  font-size: 14px;
  line-height: 18px;
`;

const Amount = styled.div<{ $negative?: boolean }>`
  color: ${({ theme, $negative }) =>
    $negative ? theme.colors.negative : theme.colors.positive};
`;

// #endregion

const NetWorthByCurrencyCard = () => {
  const { getSymbol, getCode } = useCurrencies();
  const query = useQuery<NetWorth[]>({
    queryKey: ['netWorthByCurrency'],
    queryFn: getNetWorthByCurrency,
  });

  return (
    <Card title="Net Worth By Currency" $loading={query.isLoading}>
      <Body>
        {query.data &&
          query.data.map((item) => (
            <ItemContainer key={item.currency_id}>
              <Currency>{getCode(item.currency_id)}</Currency>
              <Amount $negative={item.amount < 0}>
                {getSymbol(item.currency_id)} {formatNumber(item.amount)}
              </Amount>
            </ItemContainer>
          ))}
      </Body>
    </Card>
  );
};

export default NetWorthByCurrencyCard;
