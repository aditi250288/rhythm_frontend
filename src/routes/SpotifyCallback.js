import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const SpotifyCallback = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line 
  const [cookies, setCookie] = useCookies(["spotifyToken"]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // Send this code to your backend
      fetch('http://localhost:5000/api/spotify/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          setCookie("spotifyToken", data.access_token, { path: "/" });
          navigate('/LoggedInHome');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/');
      });
    }
  }, [navigate, setCookie]);

  return <div>Connecting to Spotify...</div>;
};

export default SpotifyCallback;