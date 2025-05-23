import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import AccountsTable from './components/AccountsTable/AccountsTable';
import NetWorthByCurrencyCard from 'src/components/cards/NetWorthByCurrencyCard/NetWorthByCurrencyCard';

const Accounts = () => {
  return (
    <PageWrapper>
      <AccountsTable />
      <NetWorthCard />
      <NetWorthByCurrencyCard />
    </PageWrapper>
  );
};

export default Accounts;
