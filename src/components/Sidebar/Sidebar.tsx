import {
  faCoins,
  faFeather,
  faGear,
  faHouse,
  faVault,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from 'src/assets/icons/logo.png';
import IconButton from 'src/components/buttons/IconButton/IconButton';

// #region Styles

const Container = styled.div<{ $open: boolean }>`
  width: 250px;
  height: inherit;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    position: absolute;
    height: 100%;
    min-height: fit-content;
    z-index: 3;
    translate: ${({ $open }) => ($open ? '0px 0px' : '-260px 0px')};
    transition: translate 1s;
    box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
    align-items: start;
  }
`;

const LogoContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    align-items: center;
    justify-content: start;
    padding-left: 45px;
  }
`;

const Logo = styled.img`
  width: 160px;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    width: 120px;
    margin-right: 20px;
  }
`;

const CloseButton = styled(IconButton)`
  display: none;
  position: absolute;
  top: 30px;
  right: 20px;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    display: block;
  }
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
    $active ? theme.colors.secondary : theme.colors.lightGray};
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

interface Row {
  id: number;
  path: string;
  name: string;
  icon: IconDefinition;
}

const rows: Row[] = [
  {
    id: 1,
    path: '/',
    name: 'Dashboard',
    icon: faHouse,
  },
  {
    id: 2,
    path: '/accounts',
    name: 'Accounts',
    icon: faVault,
  },
  {
    id: 3,
    path: '/records',
    name: 'Records',
    icon: faFeather,
  },
  {
    id: 4,
    path: '/cryptocurrency',
    name: 'Crypto',
    icon: faCoins,
  },
  {
    id: 5,
    path: '/settings',
    name: 'Settings',
    icon: faGear,
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { pathname } = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutisde = ({ target }: MouseEvent) => {
    if (
      sidebarRef.current &&
      target instanceof Node &&
      !sidebarRef.current.contains(target)
    )
      setIsOpen(false);
  };

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleClickOutisde);
    return () => document.removeEventListener('mousedown', handleClickOutisde);
  }, [isOpen]);

  return (
    <Container $open={isOpen} ref={sidebarRef}>
      <LogoContainer>
        <Link to="/" onClick={close}>
          <Logo src={logo} />
        </Link>
      </LogoContainer>
      <CloseButton icon={faXmark} onClick={close} />
      <Links>
        {rows.map(({ id, path, name, icon }) => (
          <StyledLink
            key={id}
            to={path}
            $active={pathname === path}
            onClick={() => setIsOpen(false)}
          >
            <Pointbar $active={pathname === path} />
            <Icon>
              <FontAwesomeIcon icon={icon} />
            </Icon>
            {name}
          </StyledLink>
        ))}
      </Links>
    </Container>
  );
};

export default Sidebar;
