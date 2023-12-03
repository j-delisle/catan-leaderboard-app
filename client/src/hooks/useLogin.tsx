import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const resp = await fetch('http://localhost:8000/auth/token', {
      method: 'POST',
      body: formData,
    });

    const json = await resp.json();

    if (!resp.ok) {
      setIsLoading(false);
      setError(json.detail);
    }

    if (resp.ok) {
      // save user
      localStorage.setItem('user', JSON.stringify(json));

      // update authContext
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);

      navigate('/user/profile/stats');
    }
  };

  return { login, isLoading, error };
}
