import { Navigate } from "react-router-dom";
import useAuth from "../useAuth";

function ProtectedRoute({ children }) {
  const auth = useAuth();

  console.log("auth", auth);

  if (auth.loading) {
    return null; // Or a loading spinner
  }

  return auth.authUserId ? children : <Navigate to="/app/auth" />;
}

export default ProtectedRoute;
