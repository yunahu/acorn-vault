import { Route, Routes } from "react-router-dom";
import Dashboard from "src/pages/Dashboard/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
