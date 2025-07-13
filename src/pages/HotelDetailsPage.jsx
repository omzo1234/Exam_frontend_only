import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  StarIcon,
  WifiIcon,
  Square2StackIcon, // Remplace ParkingIcon
  BuildingStorefrontIcon, // Pour restaurant
  SwatchIcon, // Pour piscine (alternative)
  ArrowPathIcon // Pour politique d'annulation
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import api from '../api/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HotelGallery from '../components/common/HotelGallery';
import BookingForm from '../components/common/BokingForm';

const HotelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true);
      try {
        const response = await api.getHotel(id);
        setHotel(response.data);
        document.title = `${response.data.name} | HotelBooking`;
      } catch (error) {
        console.error('Error fetching hotel:', error);
        toast.error('Hôtel non trouvé');
        navigate('/hotels');
      } finally {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchHotel();
  }, [id, navigate]);

  if (isLoading || !hotel) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hotel Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPinIcon className="h-5 w-5 mr-1" />
          <span>{hotel.city}</span>
          <div className="ml-4 flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
            <span>4.8 (124 avis)</span>
          </div>
        </div>
      </div>

      {/* Gallery and Info */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-2/3">
          <HotelGallery images={hotel.images || [hotel.image]} />
        </div>
        <div className="lg:w-1/3">
          <BookingForm 
            hotel={hotel} 
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </div>
      </div>

      {/* Hotel Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 mb-6">{hotel.description}</p>
          
          <h2 className="text-2xl font-semibold mb-4">Équipements</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <WifiIcon className="h-6 w-6" />, name: 'Wi-Fi gratuit' },
              { icon: <Square2StackIcon className="h-6 w-6" />, name: 'Parking' },
              { icon: <BuildingStorefrontIcon className="h-6 w-6" />, name: 'Restaurant' },
              { icon: <SwatchIcon className="h-6 w-6" />, name: 'Piscine' },
            ].map((amenity, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 text-blue-600">{amenity.icon}</span>
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Informations</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">Adresse</h3>
              <p className="text-gray-600">123 Rue de l'Hôtel, {hotel.city}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">Contact</h3>
              <p className="text-gray-600">+33 1 23 45 67 89</p>
              <p className="text-gray-600">contact@{hotel.name.toLowerCase().replace(/\s+/g, '-')}.com</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Politique d'annulation</h3>
              <p className="text-gray-600">Annulation gratuite jusqu'à 24h avant l'arrivée</p>
              <ArrowPathIcon className="h-5 w-5 mt-2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Avis des clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-medium">Jean Dupont</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "Excellent séjour dans cet hôtel. Le personnel est très accueillant et les chambres sont spacieuses et propres."
              </p>
              <p className="text-sm text-gray-500 mt-2">15 Mars 2023</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;