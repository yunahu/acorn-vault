import AssetsCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/AssetsCurrencyBreakdownCard/AssetsCurrencyBreakdownCard';
import LiabilitiesCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/LiabilitiesCurrencyBreakdownCard/LiabilitiesCurrencyBreakdownCard';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import AccountsTable from './components/AccountsTable/AccountsTable';

const Accounts = () => {
  return (
    <PageWrapper>
      <AccountsTable />
      <NetWorthCard />
      <AssetsCurrencyBreakdownCard />
      <LiabilitiesCurrencyBreakdownCard />
    </PageWrapper>
  );
};

export default Accounts;
