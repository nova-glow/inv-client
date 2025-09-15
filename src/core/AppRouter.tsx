import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInForm from "../domain/auth/components/SignInForm";
import { useAuth } from "./AuthContext";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/auth" element={<SignInForm />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div>Welcome to the The Inventory!</div>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
