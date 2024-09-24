//import logo from "./logo.svg";
import "./output.css";
import  { useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from "./routes/login";
import RegisterComponent from "./routes/register";
import HomeComponent from "./routes/home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSongs from "./routes/UploadSongs";
import MyMusic from "./routes/MyMusic";
import { useCookies } from "react-cookie";
import songContext from "./context/songContext";

function App() {

  const [currentSong, setCurrentSong] = useState(null)
  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
      {cookie.token ? (
        //loggeIn routes
        
          <songContext.Provider value={{currentSong, setCurrentSong}}>
          <Routes>
          <Route path="/" element={<HelloComponent />} />
          <Route path="/home" element={<LoggedInHomeComponent />} />
          <Route path="/uploadSongs" element={<UploadSongs />} />
          <Route path="/myMusic" element={<MyMusic />} />
          <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          </songContext.Provider>
      ) : (
        //loggedOut routes
        <Routes>
          <Route path="/home" element={<HomeComponent/>} />
          <Route path="/login" element={<LoginComponent/>} />
          <Route path="/register" element={<RegisterComponent/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
  return<div>This is hello from component</div>;
};

export default App;
