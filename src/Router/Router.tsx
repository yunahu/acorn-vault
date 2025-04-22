import { Route, Routes } from 'react-router-dom';
import Accounts from 'src/pages/Accounts/Accounts';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Records from 'src/pages/Records/Records';
import SignIn from 'src/pages/SignIn/SignIn';
import SignUp from 'src/pages/SignUp/SignUp';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/records" element={<Records />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
