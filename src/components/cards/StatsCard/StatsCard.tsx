import { DatumId, ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import Card, { CardProps } from 'src/components/cards/Card/Card';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { formatNumber } from 'src/utils/helpers';

export interface FormattedRow {
  key: number;
  name: string | undefined;
  formattedAmount: string;
  amountInPC: number;
  percentage: number;
  $negative: boolean;
}

export interface Data {
  primaryCurrencyId: number;
  sum: number;
  currencyUnassignedSum?: number;
  rows: FormattedRow[];
  graphData: GraphDatum[];
}

export type GraphDatum = {
  id: DatumId | undefined;
  label: DatumId | undefined;
  value: number | string;
};

interface StatsCardProps extends CardProps {
  data: Data | undefined;
  $isLoading: boolean;
}

// #region Styles

const Body = styled.div`
  display: flex;
  gap: 25px;

  @media only screen and (max-width: 555px) {
    flex-direction: column;
  }
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

const RowContainer = styled.div`
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

const CurrencyUnassignedSum = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
  display: flex;
  align-items: end;
  gap: 18px;
`;

const Amount = styled.div<{ $negative?: boolean }>`
  min-width: fit-content;
  color: ${({ theme, $negative }) =>
    $negative ? theme.colors.negative : theme.colors.positive};
`;

const Conversion = styled.div`
  color: #615d5d;
  display: flex;
  font-size: 14px;
`;

const Total = styled.div`
  font-size: 16px;
  margin: 15px 0px 10px 0px;
  color: ${({ theme }) => theme.colors.secondary};
`;

// #endregion

const StatsCard = ({ data, ...rest }: StatsCardProps) => {
  const { getCode, getSymbol } = useCurrencies();

  return (
    <Card showNoDataMessage={!data?.rows.length} {...rest}>
      {data && (
        <Body>
          {data.graphData.length > 0 && (
            <ChartContainer>
              <ResponsivePie
                data={data.graphData}
                sortByValue
                arcLabel={(d) => `${d.label} (${d.value}%)`}
                enableArcLinkLabels={false}
              />
            </ChartContainer>
          )}
          <List>
            {data.rows.map(
              ({
                key,
                name,
                formattedAmount,
                amountInPC,
                percentage,
                $negative,
              }) => (
                <RowContainer key={key}>
                  <AmountContainer>
                    {name}
                    <Amount $negative={$negative}>{formattedAmount}</Amount>
                  </AmountContainer>
                  <Conversion>
                    ({formatNumber(percentage)}% -{' '}
                    {getCode(data.primaryCurrencyId)}{' '}
                    {getSymbol(data.primaryCurrencyId)}{' '}
                    {formatNumber(amountInPC)})
                  </Conversion>
                </RowContainer>
              )
            )}
            {data.rows.length > 0 && (
              <div>
                <Total>TOTAL: </Total>
                <AmountContainer>
                  {getCode(data.primaryCurrencyId)}
                  <Amount $negative={data.sum < 0}>
                    {getSymbol(data.primaryCurrencyId)} {formatNumber(data.sum)}
                  </Amount>
                </AmountContainer>
              </div>
            )}
            {data.currencyUnassignedSum && (
              <CurrencyUnassignedSum>
                Unassinged Amount
                <div>{formatNumber(data.currencyUnassignedSum)}</div>
              </CurrencyUnassignedSum>
            )}
          </List>
        </Body>
      )}
    </Card>
  );
};

export default StatsCard;
