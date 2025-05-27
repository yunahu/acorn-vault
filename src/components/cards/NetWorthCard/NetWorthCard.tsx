import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useCurrencies } from 'src/hooks/useCurrencies';
import useAccountQueryMutations from 'src/hooks/useAccountQueryMutations';
import { getNetWorth, NetWorth } from 'src/services/api';
import Card from 'src/components/cards/Card/Card';
import { formatNumber } from 'src/utils/helpers';

// #region Styles

const Body = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
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
  const { accountQuery } = useAccountQueryMutations();
  const query = useQuery<NetWorth>({
    queryKey: ['netWorth', accountQuery.data],
    queryFn: getNetWorth,
  });

  return (
    <Card title="Total Net Worth" $isLoading={query.isLoading}>
      <Body>
        <Currency>{query.data && getCode(query.data.currency_id)}</Currency>
        <Amount $negative={query.data && query.data?.amount < 0}>
          {query.data && getSymbol(query.data.currency_id)}{' '}
          {query.data && formatNumber(query.data.amount)}
        </Amount>
      </Body>
    </Card>
  );
};

export default NetWorthCard;
