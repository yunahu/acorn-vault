import CurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/CurrencyBreakdownCard/CurrencyBreakdownCard';
import { useAccountStatsQuery } from 'src/hooks/stats';

const AssetsCurrencyBreakdownCard = () => {
  const { data, isLoading } = useAccountStatsQuery();

  return (
    <CurrencyBreakdownCard
      title="Assets By Currency"
      statItem={data?.assets}
      primaryCurrencyId={data?.primary_currency_id}
      $isLoading={isLoading}
    />
  );
};

export default AssetsCurrencyBreakdownCard;
