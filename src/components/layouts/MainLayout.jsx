import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { Outlet } from 'react-router-dom'; // ✅ Obligatoire pour les routes imbriquées

const MainLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16"> {/* pt-16 pour compenser le header fixe */}
        <Outlet /> {/* ✅ C’est ici que les pages imbriquées vont s'afficher */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
