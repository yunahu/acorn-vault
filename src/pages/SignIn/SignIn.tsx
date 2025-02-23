import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import forrest from 'src/assets/icons/forrest.jpg';
import google from 'src/assets/icons/google.png';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 25px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const InputHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledLabel = styled.label`
  height: 27px;
`;

const StyledInput = styled.input`
  width: 480px;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0px 15px;
  font-size: 17px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 8px rgba(44, 76, 59, 0.6);
  }
`;

const PasswordToggle = styled.div`
  width: 70px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ForgotPasswordLink = styled(Link)`
  text-decoration: underline;
`;

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
  cursor: pointer;
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledFrontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SignUpLink = styled(Link)`
  text-decoration: underline;
`;

const SidePhoto = styled.div`
  background-image: url(${forrest});
  background-size: cover;
  width: 40%;
`;

// #endregion

const SignIn = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    alert(JSON.stringify({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <Main>
        <Card>
          <Title>Sign in</Title>
          <StyledForm onSubmit={handleSubmit}>
            <InputContainer>
              <StyledLabel htmlFor="email">Email address</StyledLabel>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputHeader>
                <StyledLabel htmlFor="password">Password</StyledLabel>
                <PasswordToggle onClick={() => setIsHidden((x) => !x)}>
                  <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash} />
                  {isHidden ? 'Show' : 'Hide'}
                </PasswordToggle>
              </InputHeader>
              <StyledInput
                type={isHidden ? 'password' : 'text'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputContainer>
            <ForgotPasswordLink to="/reset-password">
              Forgot password?
            </ForgotPasswordLink>
            <StyledButton
              type="submit"
              $bg={email && password ? '#2c4c3b' : '#dad8d8'}
              $color="white"
            >
              Sign in
            </StyledButton>
          </StyledForm>
          <StyledButton>
            <StyledIcon src={google} />
            Continue with Google
          </StyledButton>
          <StyledButton>
            <StyledFrontAwesomeIcon icon={faLock} />
            Sign in anonymously
          </StyledButton>
          <Footer>
            Don't have an account?
            <SignUpLink to="/signup">Sign up</SignUpLink>
          </Footer>
        </Card>
      </Main>
      <SidePhoto />
    </Container>
  );
};

export default SignIn;
