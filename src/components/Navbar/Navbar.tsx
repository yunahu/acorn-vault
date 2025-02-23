import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import User from './components/User/User';

// #region Styles

const Container = styled.div`
  height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  padding: 0 40px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 34px;
  color: ${({ theme }) => theme.colors.primary};
`;

// #endregion

interface Title {
  [key: string]: string;
}

const title: Title = {
  '/': 'Overview',
  '/signin': 'Sign in',
};

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Title>{title[pathname]}</Title>
      <User />
    </Container>
  );
};

export default Navbar;
