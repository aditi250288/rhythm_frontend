// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

const SpotifyPlayer = () => {
  const [cookies] = useCookies(["spotifyToken"]);

  useEffect(() => {
    if (cookies.spotifyToken) {
      fetchTracks();
    }
  }, [cookies.spotifyToken]);

  const fetchTracks = async () => {
    // Implement fetching tracks from Spotify API
  };
// eslint-disable-next-line
  const playTrack = async (uri) => {
    // Implement playing a track
  };

  return (
    <div>
      <h1>Spotify Player</h1>
      {/* Implement your player UI here */}
    </div>
  );
};

export default SpotifyPlayer;