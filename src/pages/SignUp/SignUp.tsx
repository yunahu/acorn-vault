import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dog from 'src/assets/images/dog.webp';
import AnonymousSignInButton from 'src/components/buttons/AnonymousSignInButton/AnonymousSignInButton';
import GoogleSignInButton from 'src/components/buttons/GoogleSignInButton/GoogleSignInButton';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import {
  ErrorMessage,
  Footer,
  InputContainer,
  InputHeader,
  PasswordToggle,
  SignUpLink,
  StyledForm,
  StyledInput,
  StyledLabel,
} from 'src/components/layouts/auth/AuthCardLayouts/AuthCardLayouts';
import AuthPageLayout from 'src/components/layouts/auth/AuthPageLayout/AuthPageLayout';
import useAuth, { mapUser } from 'src/hooks/useAuth';
import { createUser } from 'src/services/api';
import { auth } from 'src/services/firebase';

const SignUp = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (user) navigate(state ?? '/', { replace: true });
  }, [user]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!email || !name || !password || password !== confirmPassword) return;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((x) => x.user);

      if (res) {
        await updateProfile(res, {
          displayName: name,
        });

        setUser(mapUser(auth.currentUser));
        createUser();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthPageLayout title="Sign up" image={dog}>
      <StyledForm onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setPassword(e.target.value);
              const errMsg =
                e.target.value === confirmPassword
                  ? ''
                  : 'The password and confirmation password do not match.';
              setErrorMessage(errMsg);
            }}
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
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              const errMsg =
                password === e.target.value
                  ? ''
                  : 'The password and confirmation password do not match.';
              setErrorMessage(errMsg);
            }}
            required
          />
        </InputContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <RoundButton
          type="submit"
          $bg={
            email && name && password && password === confirmPassword
              ? '#2c4c3b'
              : '#dad8d8'
          }
          $color="white"
        >
          Sign up
        </RoundButton>
      </StyledForm>
      <GoogleSignInButton />
      <AnonymousSignInButton />
      <Footer>
        Already have an account?
        <SignUpLink to="/signin" state={state} replace>
          Sign in
        </SignUpLink>
      </Footer>
    </AuthPageLayout>
  );
};

export default SignUp;
