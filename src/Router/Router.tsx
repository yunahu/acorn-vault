import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import Accounts from 'src/pages/Accounts/Accounts';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Records from 'src/pages/Records/Records';
import Crypto from 'src/pages/Crypto/Crypto';
import Settings from 'src/pages/Settings/Settings';
import SignIn from 'src/pages/SignIn/SignIn';
import SignUp from 'src/pages/SignUp/SignUp';

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/records" element={<Records />} />
        <Route path="/cryptocurrency" element={<Crypto />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
