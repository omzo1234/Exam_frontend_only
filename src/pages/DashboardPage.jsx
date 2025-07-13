import { useState, useEffect } from 'react';
import  useAuth  from '../hooks/useAuth';
import api from '../api/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { toast } from 'react-toastify';

const DashboardPage = ({ admin = false }) => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const response = await api.getReservations();
        setReservations(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des réservations');
        console.error('Error fetching reservations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {admin ? 'Tableau de bord Admin' : 'Mon Tableau de bord'}
      </h1>

      {admin ? (
        <AdminDashboard reservations={reservations} />
      ) : (
        <UserReservations reservations={reservations} />
      )}
    </div>
  );
};

export default DashboardPage;