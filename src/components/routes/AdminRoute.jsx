import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirige vers /login si non connecté
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== 'admin') {
    // Redirige vers la page d'accueil si non admin
    return <Navigate to="/" replace />;
  }

  // Affiche les routes enfants si admin
  return <Outlet />;
};

export default AdminRoute;