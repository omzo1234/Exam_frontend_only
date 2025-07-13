/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../api/api';
import HeroSection from '../components/common/HeroSection';
import SearchBar from '../components/common/SearchBar';
import HotelCard from '../components/common/HotelCard';

const HomePage = () => {
  console.log('Rendering HomePage');
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.getHotels();
        setFeaturedHotels(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Search Bar */}
      <SearchBar className="container mx-auto px-4 -mt-10 relative z-10" />

      {/* Featured Hotels */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Nos Hôtels Recommandés
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos meilleures sélections pour votre prochain voyage
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <>
            <HotelCard hotels={featuredHotels} />
            <div className="text-center mt-8">
              <Link
                to="/hotels"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Voir tous les hôtels
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir notre plateforme ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ... (votre code existant pour les features) ... */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;