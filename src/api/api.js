import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gestion avancée des erreurs et refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      
      try {
        const { data } = await axios.post(
          'http://127.0.0.1:8000/api/token/refresh/', 
          { refresh: refreshToken }
        );
        localStorage.setItem('token', data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);



// Méthodes API
export default {
  // Authentification
  login: (credentials) => {
    const response = api.post('token/', credentials);
    response.then(res => {
      localStorage.setItem('token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
    });
    return response;
  },
  register: (userData) => api.post('register/', userData),
  refreshToken: () => {
    const refresh = localStorage.getItem('refresh_token');
    return api.post('token/refresh/', { refresh });
  },

  // Hôtels
  getHotels: (params) => api.get('hotels/', { params }),
  getHotel: (id) => api.get(`hotels/${id}/`),
  checkAvailability: (hotelId, checkIn, checkOut) => 
    api.get(`hotels/${hotelId}/availability/?check_in=${checkIn}&check_out=${checkOut}`),

  // Réservations
  getReservations: () => api.get('reservations/'),
  getUserReservations: () => api.get('reservations/me/'),
  createReservation: (data) => api.post('reservations/', data),
  cancelReservation: (id) => api.patch(`reservations/${id}/cancel/`),

  getUnavailableDates: (hotelId) => api.get(`hotels/${hotelId}/unavailable-dates`),

  // Utilisateurs
  getProfile: () => api.get('users/me/'),
  updateProfile: (data) => api.put('users/me/', data),
};
