import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function useUpdateUserSettings() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState('');
  const [pfp, setPfp] = useState('');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const updateUserSettings = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      navigate('/login');
    }

    if (user) {
      const resp = await fetch(`http://localhost:8000/users/${user.id}`, {
        method: 'PATCH',
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
        setSuccess('User Settings Updated Successfully');
        setPfp(json.pfp_url);
      }
    }
  };

  return { updateUserSettings, isLoading, error, success, pfp };
}
