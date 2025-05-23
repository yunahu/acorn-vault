import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth } from 'src/services/firebase';
import useAuth, { mapUser } from 'src/hooks/useAuth';
import AuthCardLayout from 'src/components/layouts/AuthCardLayout/AuthCardLayout';
import dog from 'src/assets/images/dog.webp';
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

  &::placeholder {
    color: #b1b2b0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 5px 0px;
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

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SignUpLink = styled(Link)`
  text-decoration: underline;
`;

// #endregion

const SignUp = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthCardLayout title="Sign up" image={dog}>
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
        <SignUpLink to="/signin">Sign in</SignUpLink>
      </Footer>
    </AuthCardLayout>
  );
};

export default SignUp;
