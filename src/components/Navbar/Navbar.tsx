import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from 'src/components/buttons/IconButton/IconButton';
import UserDropdown from './components/UserDropdown/UserDropdown';

// #region Styles

const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: calc(
    (100vw - ${({ theme }) => theme.sizes.pageWidth}) / 2 -
      (${({ theme }) => theme.sizes.sidebarWidth})
  );
`;

const Content = styled.div`
  max-width: ${({ theme }) => theme.sizes.pageWidth};
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 45px;
  gap: 30px;
`;

const HamburgerButton = styled(IconButton)`
  display: none;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    display: flex;
  }
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
  '/accounts': 'Assets & Liabilities',
  '/records': 'Records',
  '/cryptocurrency': 'Crypto Assets',
  '/settings': 'Settings',
  '/signin': 'Sign in',
  '/signup': 'Sign up',
};

interface NavbarProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Content>
        <HamburgerButton
          icon={faBars}
          onClick={() => setIsSidebarOpen((x) => !x)}
        />
        <Title>{title[pathname]}</Title>
        <UserDropdown />
      </Content>
    </Container>
  );
};

export default Navbar;
