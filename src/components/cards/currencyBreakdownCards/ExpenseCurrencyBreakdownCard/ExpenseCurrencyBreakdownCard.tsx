import CurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/CurrencyBreakdownCard/CurrencyBreakdownCard';
import { useRecordStatsQuery } from 'src/hooks/stats';
import { Range } from 'src/pages/Records/Records';

interface ExpenseCurrencyBreakdownCardProps {
  range?: Range;
}

const ExpenseCurrencyBreakdownCard = ({
  range,
}: ExpenseCurrencyBreakdownCardProps) => {
  const { data, isLoading } = useRecordStatsQuery(
    range ?? {
      start: null,
      end: null,
    }
  );

  return (
    <CurrencyBreakdownCard
      title="Expense By Currency"
      statItem={data?.expense_items}
      primaryCurrencyId={data?.primary_currency}
      $isLoading={isLoading}
    />
  );
};

export default ExpenseCurrencyBreakdownCard;
