import styled from 'styled-components';
import Card from 'src/components/cards/Card/Card';
import { useAccountStatsQuery } from 'src/hooks/stats';
import { useCurrencies } from 'src/hooks/useCurrencies';
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
  const { data, isLoading } = useAccountStatsQuery();

  return (
    <Card
      title="Total Net Worth"
      $isLoading={isLoading}
      showNoDataMessage={!data}
    >
      {data && (
        <Body>
          <Currency>{getCode(data.primary_currency_id)}</Currency>
          <Amount $negative={data.net_worth < 0}>
            {getSymbol(data.primary_currency_id)} {formatNumber(data.net_worth)}
          </Amount>
        </Body>
      )}
    </Card>
  );
};

export default NetWorthCard;
