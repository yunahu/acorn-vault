import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFeather,
  faGear,
  faHouse,
  faVault,
} from '@fortawesome/free-solid-svg-icons';
import logo from 'src/assets/icons/logo.png';

// #region Styles

const Container = styled.div`
  width: 250px;
  height: inherit;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 160px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLink = styled(Link)<{ $active: boolean | undefined }>`
  width: 100%;
  height: 65px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.gray};
  display: flex;
  align-items: center;
  font-size: 22px;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Pointbar = styled.div<{ $active: boolean | undefined }>`
  width: 6px;
  height: 60px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : 'white'};
  margin-right: 40px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const Icon = styled.div`
  width: 25px;
  margin-right: 25px;
  display: flex;
  justify-content: center;
`;

// #endregion

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <LogoContainer>
        <Link to="/">
          <Logo src={logo} />
        </Link>
      </LogoContainer>
      <Links>
        <StyledLink to="/" $active={pathname === '/'}>
          <Pointbar $active={pathname === '/'} />
          <Icon>
            <FontAwesomeIcon icon={faHouse} />
          </Icon>
          Dashboard
        </StyledLink>
        <StyledLink to="/assets" $active={pathname === '/assets'}>
          <Pointbar $active={pathname === '/assets'} />
          <Icon>
            <FontAwesomeIcon icon={faVault} />
          </Icon>
          Assets
        </StyledLink>
        <StyledLink to="/records" $active={pathname === '/records'}>
          <Pointbar $active={pathname === '/records'} />
          <Icon>
            <FontAwesomeIcon icon={faFeather} />
          </Icon>
          Records
        </StyledLink>
        <StyledLink to="/settings" $active={pathname === '/settings'}>
          <Pointbar $active={pathname === '/settings'} />
          <Icon>
            <FontAwesomeIcon icon={faGear} />
          </Icon>
          Settings
        </StyledLink>
      </Links>
    </Container>
  );
};

export default Sidebar;
