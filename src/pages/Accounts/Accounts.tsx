import NetWorthByCurrencyCard from 'src/components/cards/NetWorthByCurrencyCard/NetWorthByCurrencyCard';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import AccountsTable from './components/AccountsTable/AccountsTable';

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
