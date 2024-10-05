import { useState, useEffect } from 'react';

export const useSpotify = (accessToken) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchPlaylists();
    }
  }, [accessToken]);

  return { playlists, loading, error, refetch: fetchPlaylists };
};