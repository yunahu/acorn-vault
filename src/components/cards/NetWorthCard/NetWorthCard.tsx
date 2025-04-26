import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getNetWorth } from 'src/services/api';
import { useCurrencies } from 'src/hooks/useCurrencies';
import Card from 'src/components/cards/Card/Card';
import { formatNumber } from 'src/utils/helpers';

// #region Styles

const Body = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  align-items: end;
  gap: 13px;
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

const NetWorthCard = () => {
  const { getSymbol, getCode } = useCurrencies();
  const netWorthQuery = useQuery({
    queryKey: ['netWorth'],
    queryFn: getNetWorth,
  });
  netWorthQuery.isLoading;

  return (
    <Card title="Total Net Worth" loading={netWorthQuery.isLoading}>
      <Body>
        <Currency>
          {netWorthQuery.data && getCode(netWorthQuery.data.currency_id)}
        </Currency>
        <Amount
          $negative={netWorthQuery.data && netWorthQuery.data?.amount < 0}
        >
          {netWorthQuery.data && getSymbol(netWorthQuery.data.currency_id)}{' '}
          {netWorthQuery.data && formatNumber(netWorthQuery.data.amount)}
        </Amount>
      </Body>
    </Card>
  );
};

export default NetWorthCard;
