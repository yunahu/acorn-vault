import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import LoadingOverlay from 'src/components/spinners/LoadingOverlay/LoadingOverlay';
import useAuth, { User } from 'src/hooks/useAuth';
import Accounts from 'src/pages/Accounts/Accounts';
import Cryptocurrency from 'src/pages/Cryptocurrency/Cryptocurrency';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Records from 'src/pages/Records/Records';
import Settings from 'src/pages/Settings/Settings';
import SignIn from 'src/pages/SignIn/SignIn';
import SignUp from 'src/pages/SignUp/SignUp';

const ProtectedRoute = ({ user }: { user: User | null }) => {
  const { pathname } = useLocation();
  return user ? <Outlet /> : <Navigate to="/signin" state={pathname} replace />;
};

const Router = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) setLoading(false);
    else setTimeout(() => setLoading(false), 1000);
  }, [user]);

  return loading ? (
    <LoadingOverlay />
  ) : (
    <Routes>
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/records" element={<Records />} />
        <Route path="/cryptocurrency" element={<Cryptocurrency />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
