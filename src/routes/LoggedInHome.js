import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import SpotifyWebApi from 'spotify-web-api-js';
// eslint-disable-next-line no-unused-vars
import TextWithHover from "../components/shared/textWithHover";
// eslint-disable-next-line no-unused-vars
const spotifyApi = new SpotifyWebApi();

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl: "https://images.unsplash.com/photo-1517578099694-8b23adec837c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // ... (other focus cards data)
];

// eslint-disable-next-line no-unused-vars
const rhythmPlaylistsCardData = [
  {
    title: "Relax and listen",
    description: "Relaxing songs",
    imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  // ... (other rhythm playlists data)
];

// eslint-disable-next-line no-unused-vars
const SoundOfIndiaCardsData = [
  {
    title: "Soul of India",
    description: "Songs which touches your heart",
    imgUrl: "https://images.unsplash.com/photo-1633411988188-6e63354a9019?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // ... (other Sound of India cards data)
];

const LoggedInHome = () => {
  return (
    <LoggedInContainer curActiveScreen="home">
      <div className="content p-8 text-white">
        <div className="text-2xl font-bold mb-4">Focus</div>
        <div className="grid grid-cols-5 gap-4">
          {focusCardsData.map((card, index) => (
            <div key={index} className="bg-black p-4 rounded-lg">
              <img src={card.imgUrl} alt={card.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <div className="text-white font-semibold">{card.title}</div>
              <div className="text-gray-400 text-sm">{card.description}</div>
            </div>
          ))}
        </div>
        
        {/* Rhythm Playlists Section */}
        <div className="text-2xl font-bold mb-4 mt-8">Rhythm Playlists</div>
        <div className="grid grid-cols-5 gap-4">
          {rhythmPlaylistsCardData.map((card, index) => (
            <div key={index} className="bg-black p-4 rounded-lg">
              <img src={card.imgUrl} alt={card.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <div className="text-white font-semibold">{card.title}</div>
              <div className="text-gray-400 text-sm">{card.description}</div>
            </div>
          ))}
        </div>

        {/* Sound of India Section */}
        <div className="text-2xl font-bold mb-4 mt-8">Sound of India</div>
        <div className="grid grid-cols-5 gap-4">
          {SoundOfIndiaCardsData.map((card, index) => (
            <div key={index} className="bg-black p-4 rounded-lg">
              <img src={card.imgUrl} alt={card.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <div className="text-white font-semibold">{card.title}</div>
              <div className="text-gray-400 text-sm">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default LoggedInHome;