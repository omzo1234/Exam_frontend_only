import { useState, useEffect } from 'react';
import { CalendarIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ hotel, onBookingSuccess }) => {
  const { currentUser } = useAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch les dates indisponibles
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
       const response = await api.getUnavailableDates(hotel.id);

        setUnavailableDates(response.data.map(date => new Date(date)));
      } catch (error) {
        console.error("Erreur lors de la récupération des dates", error);
      }
    };
    fetchUnavailableDates();
  }, [hotel.id]);

  // Calcul du nombre de nuits et du prix total
  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return nights * hotel.price_per_night;
  };

  // Vérifie si une date est disponible
  const isDateAvailable = (date) => {
    return !unavailableDates.some(unavailable => 
      date.toDateString() === unavailable.toDateString()
    );
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!currentUser) {
      toast.error('Veuillez vous connecter pour réserver');
      setIsLoading(false);
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Veuillez sélectionner des dates');
      setIsLoading(false);
      return;
    }

    try {
      const bookingData = {
        hotel_id: hotel.id,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        guests,
        total_price: calculateTotal()
      };

      const response = await api.post('/reservations', bookingData);
      toast.success('Réservation confirmée !');
      onBookingSuccess(response.data);
      
    } catch (error) {
      console.error("Erreur de réservation", error);
      toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
      <h3 className="text-xl font-bold mb-4">Réserver maintenant</h3>

      <form onSubmit={handleSubmit}>
        {/* Sélecteur de dates */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2  items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Dates
          </label>
          <div className="grid grid-cols-2 gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              filterDate={isDateAvailable}
              placeholderText="Arrivée"
              className="w-full p-2 border rounded-md"
              required
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              filterDate={isDateAvailable}
              placeholderText="Départ"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Nombre de voyageurs */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            Voyageurs
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num > 1 ? 'personnes' : 'personne'}
              </option>
            ))}
          </select>
        </div>

        {/* Résumé du prix */}
        <div className="mb-6 border-t pt-4">
          <h4 className="font-medium mb-2">Résumé</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>${hotel.price_per_night} x {startDate && endDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : '0'} nuits</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement...
            </>
          ) : (
            <>
              <CreditCardIcon className="h-5 w-5" />
              Confirmer la réservation
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;