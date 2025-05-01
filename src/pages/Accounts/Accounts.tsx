import styled from 'styled-components';
import NetWorthCard from 'src/components/cards/NetWorthCard/NetWorthCard';
import AccountsTable from './components/AccountsTable/AccountsTable';
import NetWorthByCurrencyCard from 'src/components/cards/NetWorthByCurrencyCard/NetWorthByCurrencyCard';

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
        <AccountsTable />
        <NetWorthCard />
        <NetWorthByCurrencyCard />
      </Main>
    </Container>
  );
};

export default Accounts;
