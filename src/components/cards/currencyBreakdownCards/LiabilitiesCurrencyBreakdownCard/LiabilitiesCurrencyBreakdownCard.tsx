import CurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/CurrencyBreakdownCard/CurrencyBreakdownCard';
import { useAccountStatsQuery } from 'src/hooks/stats';

const LiabilitiesCurrencyBreakdownCard = () => {
  const { data, isLoading } = useAccountStatsQuery();

  return (
    <CurrencyBreakdownCard
      title="Liabilities By Currency"
      statItem={data?.liabilities}
      primaryCurrencyID={data?.primary_currency}
      $isLoading={isLoading}
    />
  );
};

export default LiabilitiesCurrencyBreakdownCard;
