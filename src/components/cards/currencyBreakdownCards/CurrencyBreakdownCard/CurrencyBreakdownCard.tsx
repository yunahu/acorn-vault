import { useMemo } from 'react';
import StatsCard, {
  Data,
  GraphDatum,
  FormattedRow,
} from 'src/components/cards/StatsCard/StatsCard';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { StatItem } from 'src/services/api';
import { formatNumber } from 'src/utils/helpers';

interface CurrencyBreakdownCardProps {
  title: string;
  statItem: StatItem | undefined;
  primaryCurrencyID: number | undefined;
  $isLoading: boolean;
}

const CurrencyBreakdownCard = ({
  statItem,
  primaryCurrencyID,
  ...rest
}: CurrencyBreakdownCardProps) => {
  const { getCode, getSymbol } = useCurrencies();

  const processGraphData = (): GraphDatum[] | undefined =>
    statItem?.currency_breakdown.map((breakdownItem) => ({
      id: getCode(breakdownItem.currency_id),
      label: getCode(breakdownItem.currency_id),
      value: formatNumber(breakdownItem.percentage),
    }));

  const processCurrencyBreakdown = (): FormattedRow[] | undefined =>
    statItem?.currency_breakdown.map(
      ({ currency_id, amount, amount_in_PC, percentage }) => ({
        key: currency_id,
        name: getCode(currency_id),
        formattedAmount: getSymbol(currency_id) + ' ' + formatNumber(amount),
        amountInPC: amount_in_PC,
        percentage,
        $negative: amount < 0,
      })
    );

  const processData = (): Data | undefined => {
    if (!statItem || !primaryCurrencyID) return;
    const graphData = processGraphData();
    const rows = processCurrencyBreakdown();
    if (!graphData || !rows) return;

    return {
      graphData,
      primaryCurrencyID,
      sum: statItem.sum,
      rows,
    };
  };

  const processedData = useMemo(processData, [statItem]);

  return <StatsCard data={processedData} {...rest} />;
};

export default CurrencyBreakdownCard;
