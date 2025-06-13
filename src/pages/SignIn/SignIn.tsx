import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import forrest from 'src/assets/images/forrest.jpg';
import AnonymousSignInButton from 'src/components/buttons/AnonymousSignInButton/AnonymousSignInButton';
import GoogleSignInButton from 'src/components/buttons/GoogleSignInButton/GoogleSignInButton';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import {
  Footer,
  ForgotPasswordLink,
  InputContainer,
  InputHeader,
  PasswordToggle,
  SignUpLink,
  StyledForm,
  StyledInput,
  StyledLabel,
} from 'src/components/layouts/auth/AuthCardLayouts/AuthCardLayouts';
import AuthPageLayout from 'src/components/layouts/auth/AuthPageLayout/AuthPageLayout';
import useAuth from 'src/hooks/useAuth';
import { auth } from 'src/services/firebase';

const SignIn = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (user) navigate(state ?? '/', { replace: true });
  }, [user]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthPageLayout title="Sign in" image={forrest}>
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
        <SignUpLink to="/signup" state={state} replace>
          Sign up
        </SignUpLink>
      </Footer>
    </AuthPageLayout>
  );
};

export default SignIn;
