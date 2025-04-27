import styled from 'styled-components';
import { signInAnonymously, updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from 'src/services/firebase';
import useAuth, { mapUser } from 'src/hooks/useAuth';

// #region Styles

const StyledButton = styled.button<{ $bg?: string; $color?: string }>`
  width: 100%;
  height: 56px;
  font-size: 20px;
  background-color: ${({ $bg }) => $bg ?? 'white'};
  border: ${(props) =>
    props.$bg ? 'none' : `solid 1px ${props.theme.colors.secondary}`};
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ $color }) => $color ?? 'black'};
`;

const StyledFrontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
`;

// #endregion

const AnonymousSignInButton = () => {
  const { setUser } = useAuth();

  const handleSignInAnonymously = async () => {
    try {
      await signInAnonymously(auth);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: 'Anonymous User',
        });

        setUser(mapUser(auth.currentUser));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledButton onClick={handleSignInAnonymously}>
      <StyledFrontAwesomeIcon icon={faLock} />
      Sign in anonymously
    </StyledButton>
  );
};

export default AnonymousSignInButton;
