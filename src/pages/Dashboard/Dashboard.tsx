import styled from 'styled-components';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import NetWorthByCurrencyCard from 'src/components/cards/NetWorthByCurrencyCard/NetWorthByCurrencyCard';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 5%;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

// #endregion

const Dashboard = () => {
  return (
    <Container>
      <NetWorthCard />
      <NetWorthByCurrencyCard />
    </Container>
  );
};

export default Dashboard;
