import AssetsCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/AssetsCurrencyBreakdownCard/AssetsCurrencyBreakdownCard';
import LiabilitiesCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/LiabilitiesCurrencyBreakdownCard/LiabilitiesCurrencyBreakdownCard';
import IncomeCurrencyBreakdownCard from 'src/components/cards/IncomeCurrencyBreakdownCard/IncomeCurrencyBreakdownCard';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';

const Dashboard = () => {
  return (
    <PageWrapper>
      <NetWorthCard />
      <AssetsCurrencyBreakdownCard />
      <LiabilitiesCurrencyBreakdownCard />
      <IncomeCurrencyBreakdownCard />
    </PageWrapper>
  );
};

export default Dashboard;
