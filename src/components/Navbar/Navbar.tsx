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

const Navbar = () => {
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const capitalized = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <Container>
      <Title>{path ? capitalized : 'Overview'}</Title>
      <User />
    </Container>
  );
};

export default Navbar;
