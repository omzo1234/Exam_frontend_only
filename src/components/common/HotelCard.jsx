import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

const HotelCard = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun hôtel disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <div 
          key={hotel.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Image avec placeholder si manquante */}
          <div className="h-48 overflow-hidden">
            <img
              src={hotel.image || '/images/hotel-placeholder.jpg'}
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/hotel-placeholder.jpg';
              }}
            />
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold truncate">{hotel.name}</h3>
              <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{hotel.rating || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center mt-1 text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{hotel.city}</span>
            </div>

            {/* Affichage des commodités */}
            {hotel.amenities && (
              <div className="mt-2 flex flex-wrap gap-1">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {amenity.name}
                  </span>
                ))}
                {hotel.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">+{hotel.amenities.length - 3}</span>
                )}
              </div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">À partir de</p>
                <p className="text-xl font-bold text-blue-600">
                  ${hotel.price_per_night}
                  <span className="text-sm font-normal text-gray-500">/nuit</span>
                </p>
                <p className="text-sm text-gray-500">
                  {hotel.available_rooms} chambres disponibles
                </p>
              </div>
              <Link
                to={`/hotels/${hotel.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voir
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelCard;