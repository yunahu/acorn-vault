import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import dog from 'src/assets/images/dog.webp';
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

  &::placeholder {
    color: #b1b2b0;
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
  background-image: url(${dog});
  background-size: cover;
  width: 40%;
`;

// #endregion

const SignUp = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Container>
      <Main>
        <Card>
          <Title>Sign up</Title>
          <StyledForm>
            <InputContainer>
              <StyledLabel htmlFor="email">Email address</StyledLabel>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                required
              />
            </InputContainer>
            <InputContainer>
              <StyledLabel htmlFor="name">Name</StyledLabel>
              <StyledInput
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Name (or nickname)"
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
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
                placeholder="Choose a password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <StyledInput
                type={isHidden ? 'password' : 'text'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputContainer>
            <StyledButton
              type="submit"
              $bg={
                email && name && password && confirmPassword
                  ? '#2c4c3b'
                  : '#dad8d8'
              }
              $color="white"
            >
              Sign up
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
            Already have an account?
            <SignUpLink to="/signin">Sign in</SignUpLink>
          </Footer>
        </Card>
      </Main>
      <SidePhoto />
    </Container>
  );
};

export default SignUp;
