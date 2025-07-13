import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirige vers /login si non connecté
    return <Navigate to="/login" replace />;
  }

  // Affiche les routes enfants si authentifié
  return <Outlet />;
};

export default PrivateRoute;