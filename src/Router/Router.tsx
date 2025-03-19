import { Route, Routes } from 'react-router-dom';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import SignIn from 'src/pages/SignIn/SignIn';
import SignUp from 'src/pages/SignUp/SignUp';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;
