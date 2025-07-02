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
  Unassigned,
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
  graphData: GraphDatum[];
  primaryCurrencyID: number;
  rows: FormattedRow[];
  sum: number;
  unassignedSum?: number;
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
                    {getCode(data.primaryCurrencyID)}{' '}
                    {getSymbol(data.primaryCurrencyID)}{' '}
                    {formatNumber(amountInPC)})
                  </Conversion>
                </RowContainer>
              )
            )}
            {data.rows.length > 0 && (
              <div>
                <Total>TOTAL: </Total>
                <AmountContainer>
                  {getCode(data.primaryCurrencyID)}
                  <Amount $negative={data.sum < 0}>
                    {getSymbol(data.primaryCurrencyID)} {formatNumber(data.sum)}
                  </Amount>
                </AmountContainer>
              </div>
            )}
            {data.unassignedSum && (
              <Unassigned>
                Unassinged Amount
                <div>{formatNumber(data.unassignedSum)}</div>
              </Unassigned>
            )}
          </List>
        </Body>
      )}
    </Card>
  );
};

export default StatsCard;
