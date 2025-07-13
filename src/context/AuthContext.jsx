import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          // Ici vous pourriez faire une requête pour vérifier le token
          // et récupérer les infos utilisateur
          // Pour cet exemple, on stocke juste les infos basiques
          const userData = {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            isAdmin: localStorage.getItem('isAdmin') === 'true'
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Stocker les infos utilisateur de base (à adapter selon votre API)
      const userData = {
        username: credentials.username,
        email: credentials.email,
        isAdmin: false // À remplacer par la réponse de votre API
      };
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('isAdmin', userData.isAdmin);
      
      setUser(userData);
      toast.success('Connexion réussie !');
      return true;
    } catch (error) {
      toast.error('Identifiants incorrects');
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await api.register(userData);
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      return true;
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
    setUser(null);
    navigate('/login');
    toast.info('Vous avez été déconnecté');
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    localStorage.setItem('username', userData.username);
    localStorage.setItem('email', userData.email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};