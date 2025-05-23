import google from 'src/assets/icons/google.png';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <RoundButton onClick={handleGoogleSignIn} iconSrc={google}>
      Continue with Google
    </RoundButton>
  );
};

export default GoogleSignInButton;
