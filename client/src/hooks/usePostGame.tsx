import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function usePostGame() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const postGame = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      navigate('/login');
    }

    if (user) {
      const resp = await fetch('http://localhost:8000/record_game', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
        body: formData,
      });

      const json = await resp.json();

      if (!resp.ok) {
        setIsLoading(false);
        setError(json.detail);
      }

      if (resp.ok) {
        setIsLoading(false);

        navigate('/leaderboard');
      }
    }
  };

  return { postGame, isLoading, error };
}
