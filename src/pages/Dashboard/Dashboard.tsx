import styled from 'styled-components';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 5%;
`;

// #endregion

const Dashboard = () => {
  return (
    <Container>
      <NetWorthCard />
    </Container>
  );
};

export default Dashboard;
