import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import Accounts from 'src/pages/Accounts/Accounts';
import Cryptocurrency from 'src/pages/Cryptocurrency/Cryptocurrency';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Records from 'src/pages/Records/Records';
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
        <Route path="/cryptocurrency" element={<Cryptocurrency />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
