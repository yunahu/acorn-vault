import google from 'src/assets/icons/google.png';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import { NOT_IMPLEMENTED } from 'src/constants/messages';
import useNotify from 'src/hooks/useNotify';

const GoogleSignInButton = () => {
  const { notify } = useNotify();

  const handleGoogleSignIn = async () => {
    notify(NOT_IMPLEMENTED);
  };

  return (
    <RoundButton onClick={handleGoogleSignIn} iconSrc={google}>
      Continue with Google
    </RoundButton>
  );
};

export default GoogleSignInButton;
