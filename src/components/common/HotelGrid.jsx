import React from 'react';
import HotelCard from './HotelCard';

const HotelGrid = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Aucun hôtel trouvé</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelGrid;