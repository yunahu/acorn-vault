import { useQueryClient } from '@tanstack/react-query';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from 'src/services/firebase';

interface Auth {
  user?: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
  name: string | null;
  email: string | null;
  isAnonymous: boolean;
  photoURL: string | null;
  uid: string;
}

const AuthContext = createContext<Auth>({} as Auth);

export const mapUser = (user: FirebaseUser | null): User | null => {
  if (!user) return null;

  const { displayName, email, isAnonymous, photoURL, uid } = user;

  return {
    name: displayName,
    email,
    isAnonymous,
    photoURL,
    uid,
  };
};

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(mapUser(auth.currentUser));
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(mapUser(user));
      queryClient.removeQueries();
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
