import { Route, Routes } from 'react-router-dom';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import SignIn from 'src/pages/SignIn/SignIn';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default Router;
