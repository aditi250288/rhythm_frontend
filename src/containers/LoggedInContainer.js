import React, {useContext, useState, useEffect, useLayoutEffect, useRef} from "react";
// eslint-disable-next-line
import { useCookies } from "react-cookie";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/image1.png";
import IconText from "../components/shared/iconText";
import TextWithHover from "../components/shared/textWithHover";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/createPlaylistModal";
import AddToPlaylistModal from "../modals/addToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/home");
  const navigateToSearch = () => navigate("/searchPage");
  const navigateToLibrary = () => navigate("/library");
  const navigateToMyMusic = () => navigate("/myMusic");
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["spotifyToken"]);
  // eslint-disable-next-line
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  const handleSpotifyLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "code";
    const SCOPE = "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";
  
    const state = generateRandomString(16);
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("code_verifier", codeVerifier);
  
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: RESPONSE_TYPE,
      redirect_uri: REDIRECT_URI,
      state: state,
      scope: SCOPE,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });
  
    window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
  };

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  function generateCodeVerifier() {
    return generateRandomString(128);
  }
  
  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    songData,
    // eslint-disable-next-line
    setSongData,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  useEffect(() => {
    const token = cookies.spotifyToken;
    if (token) {
      setSpotifyConnected(true);
      // You might want to validate the token here or set up Spotify API
    }
  }, [cookies.spotifyToken]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong || !currentSong.track) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line
  }, [currentSong]);

  const addSongToPlaylist = async (playlistId) => {
    if (!currentSong) return;
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
      onend: () => {
        if (isRepeatOn) {
          sound.play();
        } else {
          playNextSong();
        }
      },
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    if (soundPlayed) {
      if (isPaused) {
        soundPlayed.play();
      } else {
        soundPlayed.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const getRandomIndex = (currentIndex) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songData.length);
    } while (randomIndex === currentIndex);
    return randomIndex;
  };

  const playNextSong = () => {
    if (songData.length > 0 && currentSong) {
      const currentIndex = songData.findIndex(
        (song) => song._id === currentSong._id
      );
      const nextIndex = isShuffleOn
        ? getRandomIndex(currentIndex)
        : (currentIndex + 1) % songData.length;
      setCurrentSong(songData[nextIndex]);
    }
  };

  const playPreviousSong = () => {
    if (songData.length > 0 && currentSong) {
      const currentIndex = songData.findIndex(
        (song) => song._id === currentSong._id
      );
      const previousIndex = isShuffleOn
        ? getRandomIndex(currentIndex)
        : (currentIndex - 1 + songData.length) % songData.length;
      setCurrentSong(songData[previousIndex]);
    }
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  // eslint-disable-next-line no-unused-vars
  
  return (
    <div className="h-full w-full bg-app-black">
      <div className="h-9/10 w-full flex">
        {/* Left sidebar */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="logoDiv p-6">
              <img src={image1} alt="rhythm logo" width={500} />
            </div>
            <div className="py-5">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                active={curActiveScreen === "home"}
                onClick={navigateToHome}
              />
              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                active={curActiveScreen === "search"}
                onClick={navigateToSearch}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                active={curActiveScreen === "library"}
                onClick={navigateToLibrary}
              />
              <IconText
                iconName={"material-symbols:library-music-rounded"}
                displayText={"My Music"}
                active={curActiveScreen === "myMusic"}
                onClick={navigateToMyMusic}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"material-symbols:add-box"}
                displayText={"Create Playlist"}
                onClick={() => setCreatePlaylistModalOpen(true)}
              />
              <IconText
                iconName={"mdi:cards-heart"}
                displayText={"Liked Songs"}
              />
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-3/5 flex justify-around items-center">
                {!spotifyConnected ? (
                  <button
                    onClick={handleSpotifyLogin}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Connect to Spotify
                  </button>
                ) : (
                  <span className="text-white">Connected to Spotify</span>
                )}
                <TextWithHover displayText={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-2/5 flex justify-around h-full items-center">
                <TextWithHover
                  displayText={"Upload Song"}
                  onClick={() => navigate("/uploadSongs")}
                />
                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  Aditi
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {/* Playback controls */}
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbail"
              className="h-14 w-14 rounded"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className={`cursor-pointer ${
                  isShuffleOn ? "text-green-500" : ""
                }`}
                onClick={toggleShuffle}
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={30}
                className="cursor-pointer"
                onClick={playPreviousSong}
              />
              <Icon
                icon={isPaused ? "mdi:play-circle" : "mdi:pause-circle"}
                fontSize={50}
                className="cursor-pointer"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={30}
                className="cursor-pointer"
                onClick={playNextSong}
              />
              <Icon
                icon="material-symbols:repeat"
                fontSize={30}
                className={`cursor-pointer ${
                  isRepeatOn ? "text-green-500" : ""
                }`}
                onClick={toggleRepeat}
              />
            </div>
          </div>
          <div className="w-1/4 flex justify-end">
            {/* Add volume controls or additional features here */}
          </div>
        </div>
      )}
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => setCreatePlaylistModalOpen(false)}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => setAddToPlaylistModalOpen(false)}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
    </div>
  );
};

export default LoggedInContainer;
