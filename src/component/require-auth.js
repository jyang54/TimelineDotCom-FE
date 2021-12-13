import { Redirect, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const authed = true;
  const location = useLocation();
  return authed ? (
    children
  ) : (
    <Redirect to="/login" state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
