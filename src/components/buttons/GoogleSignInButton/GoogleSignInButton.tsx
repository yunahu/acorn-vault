import styled from 'styled-components';
import google from 'src/assets/icons/google.png';

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

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

// #endregion

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <StyledButton onClick={handleGoogleSignIn}>
      <Icon src={google} />
      Continue with Google
    </StyledButton>
  );
};

export default GoogleSignInButton;
