import { useContext } from 'react';
import google from 'src/assets/icons/google.png';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import { NOT_IMPLEMENTED } from 'src/constants/messages';
import { NotificationContext } from 'src/services/notify';

const GoogleSignInButton = () => {
  const notify = useContext(NotificationContext);
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
