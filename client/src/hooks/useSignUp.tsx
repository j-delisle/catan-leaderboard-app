import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export default function useSignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: String,
    password: String,
    passwordConfirm: String
  ) => {
    setIsLoading(true);
    setError(null);

    const resp = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, passwordConfirm }),
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
    }
  };

  return { signup, isLoading, error };
}
