import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/services/firebase';
import useAuth from 'src/hooks/useAuth';
import AuthCardLayout from 'src/components/layouts/AuthCardLayout/AuthCardLayout';
import forrest from 'src/assets/images/forrest.jpg';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import GoogleSignInButton from 'src/components/buttons/GoogleSignInButton/GoogleSignInButton';
import AnonymousSignInButton from 'src/components/buttons/AnonymousSignInButton/AnonymousSignInButton';

// #region Styles

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

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SignUpLink = styled(Link)`
  text-decoration: underline;
`;

// #endregion

const SignIn = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthCardLayout title="Sign in" image={forrest}>
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
        <RoundButton
          type="submit"
          $bg={email && password ? '#2c4c3b' : '#dad8d8'}
          $color="white"
        >
          Sign in
        </RoundButton>
      </StyledForm>
      <GoogleSignInButton />
      <AnonymousSignInButton />
      <Footer>
        Don't have an account?
        <SignUpLink to="/signup">Sign up</SignUpLink>
      </Footer>
    </AuthCardLayout>
  );
};

export default SignIn;
