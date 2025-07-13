import { useState, useEffect } from 'react';
import HotelCard from '../components/common/HotelCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../api/api';
import Filters from '../components/common/Filters';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const response = await api.getHotels();
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    return (
      (filters.city === '' || hotel.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (filters.minPrice === '' || hotel.price_per_night >= Number(filters.minPrice)) &&
      (filters.maxPrice === '' || hotel.price_per_night <= Number(filters.maxPrice))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos Hôtels</h1>
        <p className="text-gray-600">Trouvez l'hôtel parfait pour votre séjour</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Hotels List */}
        <div className="md:w-3/4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="large" />
            </div>
          ) : filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun hôtel trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;