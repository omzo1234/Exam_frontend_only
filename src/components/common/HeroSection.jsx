import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-blue-800 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Trouvez l'hôtel parfait</h1>
        <p className="text-xl mb-8">Découvrez les meilleures offres pour votre prochain séjour</p>
        <Link 
          to="/hotels" 
          className="inline-block bg-white text-blue-800 font-bold py-3 px-6 rounded-lg hover:bg-blue-100 transition duration-300"
        >
          Explorer les hôtels
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;