import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ProductList from "../components/Products/ProductList";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
