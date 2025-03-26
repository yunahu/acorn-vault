import styled from 'styled-components';
import AccountsTable from './components/AccountsTable/AccountsTable';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 100px;
`;

// #endregion

const Accounts = () => {
  return (
    <Container>
      <AccountsTable />
    </Container>
  );
};

export default Accounts;
