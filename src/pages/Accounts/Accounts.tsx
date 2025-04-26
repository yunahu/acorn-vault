import styled from 'styled-components';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import AccountsTable from './components/AccountsTable/AccountsTable';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

const Main = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// #endregion

const Accounts = () => {
  return (
    <Container>
      <Main>
        <NetWorthCard />
        <AccountsTable />
      </Main>
    </Container>
  );
};

export default Accounts;
