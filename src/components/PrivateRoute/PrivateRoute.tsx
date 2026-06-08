import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
};

const isAuthenticated = false; 

const PrivateRoute = ({ children }: PrivateRouteProps) =>
  isAuthenticated ? children : <Navigate to="/login" />;

export default PrivateRoute;