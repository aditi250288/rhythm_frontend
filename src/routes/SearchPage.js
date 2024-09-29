import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import songContext from "../contexts/songContext";
import LoggedInContainer from "../containers/LoggedInContainer";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
     // eslint-disable-next-line
  const [error, setError] = useState(null);
   // eslint-disable-next-line
  const navigate = useNavigate();
  const { setCurrentSong } = useContext(songContext);

  const searchSong = useCallback(async () => {
    if (searchText.trim() === "") {
      setSongData([]);
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await makeAuthenticatedGETRequest(
        `/song/search/${encodeURIComponent(searchText)}`
      );
      setSongData(response.data || []);
    } catch (error) {
      console.error("Error searching songs:", error);
      setSongData([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.trim()) {
        searchSong();
      } else {
        setSongData([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, searchSong]);

  return (
    <LoggedInContainer curActiveScreen="search">
      <div className="content p-8 pt-0 overflow-auto">
        <div className="text-2xl font-semibold mb-5 text-white mt-8">
          Search Song
        </div>
        <div className={`w-1/2 bg-gray-800 p-3 px-5 rounded-full flex items-center space-x-3 transition-all duration-300 ${isFocused ? 'ring-2 ring-white shadow-xl' : ''}`}>
          <Icon icon="ic:outline-search" className="text-white text-2xl" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 outline-none text-white"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Search for songs"
          />
        </div>
        <div className="pt-10 space-y-3">
          {isLoading && <div className="text-white">Searching...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!isLoading && !error && songData.length > 0 && (
            <>
              <div className="text-white">Search Results</div>
              {songData.map((item) => (
                <SingleSongCard
                  key={item._id}
                  info={item}
                  playSound={() => setCurrentSong(item)}
                />
              ))}
            </>
          )}
          {!isLoading && !error && searchText.trim() !== "" && songData.length === 0 && (
            <div className="text-white">No results found</div>
          )}
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;