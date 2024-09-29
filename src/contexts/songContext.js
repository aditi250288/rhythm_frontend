import React from 'react';

const songContext = React.createContext({
  currentSong: null,
  setCurrentSong: () => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: true,
  setIsPaused: () => {},
  songData: [],
  setSongData: () => {},
});

export default songContext;