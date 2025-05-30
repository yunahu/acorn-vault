import NetWorthByCurrencyCard from 'src/components/cards/NetWorthByCurrencyCard/NetWorthByCurrencyCard';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import RecordStatsCard from 'src/components/cards/RecordStatsCard/RecordStatsCard';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';

const Dashboard = () => {
  return (
    <PageWrapper>
      <NetWorthCard />
      <NetWorthByCurrencyCard />
      <RecordStatsCard />
    </PageWrapper>
  );
};

export default Dashboard;
