import { DatumId, ResponsivePie } from '@nivo/pie';
import Card, { CardProps } from 'src/components/cards/Card/Card';
import {
  Amount,
  AmountContainer,
  Body,
  ChartContainer,
  Conversion,
  List,
  RowContainer,
  Total,
  CurrencyUnassignedSum,
} from 'src/components/cards/StatsCardLayouts/StatsCardLayouts';
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
