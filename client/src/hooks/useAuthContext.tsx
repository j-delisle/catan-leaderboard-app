import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return ctx;
};
