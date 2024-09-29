import "./output.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/login";
import RegisterComponent from "./routes/register";
// eslint-disable-next-line
import HomeComponent from "./routes/home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSongs from "./routes/UploadSongs";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import SpotifyCallback from "./routes/SpotifyCallback";
import SpotifyPlayer from "./routes/SpotifyPlayer";
import ForgotPasswordComponent from "./routes/forgotPasswordComponent";


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(null);
  const [songData, setSongData] = useState([]);
  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(["token"]);


  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // loggedIn routes
          <songContext.Provider
            value={{
              currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
        songData,
        setSongData,
            }}
          >
            <Routes>
              <Route path="/" element={<HelloComponent />} />
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadSongs" element={<UploadSongs />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/callback" element={<SpotifyCallback />} />
              <Route path="/spotify-player" element={<SpotifyPlayer />} />
              <Route path="/searchPage" element={<SearchPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          // loggedOut routes
          <Routes>
            {/*<Route path="/home" element={<HomeComponent />} />*/}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
  return <div>This is hello from component</div>;
};

export default App;