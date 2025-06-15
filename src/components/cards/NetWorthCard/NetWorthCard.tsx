import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Card from 'src/components/cards/Card/Card';
import useAccountQueryMutations from 'src/hooks/useAccountQueryMutations';
import { useCurrencies } from 'src/hooks/useCurrencies';
import useSettingsQueryMutations from 'src/hooks/useSettingsQueryMutations';
import { getNetWorth, NetWorth } from 'src/services/api';
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
  const { settingsQuery } = useSettingsQueryMutations();
  const { data, isLoading } = useQuery<NetWorth>({
    queryKey: ['netWorth', accountQuery.data, settingsQuery.data],
    queryFn: getNetWorth,
    staleTime: Infinity,
  });

  return (
    <Card
      title="Total Net Worth"
      $isLoading={isLoading}
      showNoDataMessage={!data}
    >
      {data && (
        <Body>
          <Currency>{getCode(data.currency_id)}</Currency>
          <Amount $negative={data.amount < 0}>
            {getSymbol(data.currency_id)} {formatNumber(data.amount)}
          </Amount>
        </Body>
      )}
    </Card>
  );
};

export default NetWorthCard;
