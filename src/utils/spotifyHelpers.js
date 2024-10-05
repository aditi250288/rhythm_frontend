// spotifyHelpers.js

/**
 * Fetch playlists for the authenticated user.
 * @param {string} accessToken - The Spotify API access token.
 * @returns {Promise<Object>} - An object containing playlists and metadata or an error.
 */
const fetchPlaylists = async (accessToken) => {
    const endpoint = 'https://api.spotify.com/v1/me/playlists';
    
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('User playlists:', data.items);
      return {
        success: true,
        playlists: data.items,
        total: data.total,
        next: data.next,
        previous: data.previous
      };
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  /**
   * Fetch the details of a specific playlist.
   * @param {string} accessToken - The Spotify API access token.
   * @param {string} playlistId - The ID of the playlist to fetch.
   * @returns {Promise<Object>} - An object containing the playlist details or an error.
   */
  const fetchPlaylistDetails = async (accessToken, playlistId) => {
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;
    
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return {
        success: true,
        playlist: data
      };
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  /**
   * Add a song to a playlist.
   * @param {string} accessToken - The Spotify API access token.
   * @param {string} playlistId - The ID of the playlist to add the song to.
   * @param {string} trackUri - The URI of the track to add.
   * @returns {Promise<Object>} - An object indicating success or failure.
   */
  const addTrackToPlaylist = async (accessToken, playlistId, trackUri) => {
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [trackUri] })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
  
      return {
        success: true,
        message: 'Track added successfully!'
      };
    } catch (error) {
      console.error('Error adding track to playlist:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  export { fetchPlaylists, fetchPlaylistDetails, addTrackToPlaylist };
  