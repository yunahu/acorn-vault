import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { auth } from 'src/services/firebase';
import { useAuth } from 'src/hooks/useAuth';

// #region Styles

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const UserIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.primary};
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

const ChevronIcon = styled(FontAwesomeIcon)`
  color: grey;
  padding: 10px;
`;

const Modal = styled.div`
  position: absolute;
  top: 100px;
  right: 0px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.border};
  padding: 0 12px 10px 7px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ModalUserName = styled.div`
  font-size: 14px;
`;

const Email = styled.div`
  color: #6a6f78;
  font-size: 13px;
`;

const ModalBody = styled.div`
  padding-top: 15px;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: #fafafa;
    border-radius: 5px;
  }
`;

// #endregion

const UserDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => setIsVisible((x) => !x);

  const handleMousedown = ({ target }: MouseEvent) => {
    if (
      modalRef.current &&
      target instanceof Node &&
      !modalRef.current.contains(target) &&
      !userRef.current?.contains(target)
    ) {
      setIsVisible((x) => !x);
    }
  };

  useEffect(() => {
    if (isVisible) document.addEventListener('mousedown', handleMousedown);
    return () => document.removeEventListener('mousedown', handleMousedown);
  }, [isVisible]);

  return (
    <Wrapper>
      <Container ref={userRef} onClick={toggleModal}>
        <UserIconContainer>
          <UserIcon icon={faUser} />
        </UserIconContainer>
        <UserName>{user?.name ?? 'GUEST'}</UserName>
        <ChevronIcon icon={faChevronDown} />
      </Container>
      {isVisible && (
        <Modal ref={modalRef}>
          <ModalHeader>
            <UserIconContainer>
              <UserIcon icon={faUser} />
            </UserIconContainer>
            <div>
              <ModalUserName>{user?.name ?? 'GUEST'}</ModalUserName>
              <Email>{user?.email}</Email>
            </div>
          </ModalHeader>
          <ModalBody>
            <StyledLink to="/profile" onClick={toggleModal}>
              My profile
            </StyledLink>
            <StyledLink to="/notifications" onClick={toggleModal}>
              Notifications
            </StyledLink>
            {user ? (
              <StyledLink
                to="/"
                onClick={() => {
                  toggleModal();
                  signOut(auth);
                }}
              >
                Sign Out
              </StyledLink>
            ) : (
              <StyledLink to="/signin" onClick={toggleModal}>
                Sign In
              </StyledLink>
            )}
          </ModalBody>
        </Modal>
      )}
    </Wrapper>
  );
};

export default UserDropdown;
