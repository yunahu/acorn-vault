import { faLock } from '@fortawesome/free-solid-svg-icons';
import { signInAnonymously, updateProfile } from 'firebase/auth';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import useAuth, { mapUser } from 'src/hooks/useAuth';
import { createUser } from 'src/services/api';
import { auth } from 'src/services/firebase';

const AnonymousSignInButton = () => {
  const { setUser } = useAuth();

  const handleSignInAnonymously = async () => {
    try {
      await signInAnonymously(auth);
      createUser();

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: 'Anonymous User',
        });

        setUser(mapUser(auth.currentUser));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RoundButton onClick={handleSignInAnonymously} FWicon={faLock}>
      Sign in anonymously
    </RoundButton>
  );
};

export default AnonymousSignInButton;
