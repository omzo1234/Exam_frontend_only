import { useAuth } from '../context/AuthContext';

// Ce hook est principalement un réexport pour une utilisation plus simple
const useAuthHook = () => {
  return useAuth();
};

export default useAuthHook;