import CurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/CurrencyBreakdownCard/CurrencyBreakdownCard';
import { useRecordStatsQuery } from 'src/hooks/stats';
import { Range } from 'src/pages/Records/Records';

interface IncomeCurrencyBreakdownCardProps {
  range?: Range;
}

const IncomeCurrencyBreakdownCard = ({
  range,
}: IncomeCurrencyBreakdownCardProps) => {
  const { data, isLoading } = useRecordStatsQuery(
    range ?? {
      start: null,
      end: null,
    }
  );

  return (
    <CurrencyBreakdownCard
      title="Income By Currency"
      statItem={data?.income_items}
      primaryCurrencyId={data?.primary_currency_id}
      $isLoading={isLoading}
    />
  );
};

export default IncomeCurrencyBreakdownCard;
