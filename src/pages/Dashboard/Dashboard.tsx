import AssetsCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/AssetsCurrencyBreakdownCard/AssetsCurrencyBreakdownCard';
import LiabilitiesCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/LiabilitiesCurrencyBreakdownCard/LiabilitiesCurrencyBreakdownCard';
import ExpenseCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/ExpenseCurrencyBreakdownCard/ExpenseCurrencyBreakdownCard';
import IncomeCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/IncomeCurrencyBreakdownCard/IncomeCurrencyBreakdownCard';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';

const Dashboard = () => {
  return (
    <PageWrapper>
      <NetWorthCard />
      <AssetsCurrencyBreakdownCard />
      <LiabilitiesCurrencyBreakdownCard />
      <IncomeCurrencyBreakdownCard />
      <ExpenseCurrencyBreakdownCard />
    </PageWrapper>
  );
};

export default Dashboard;
