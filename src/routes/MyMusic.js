import React, { useEffect, useContext } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import songContext from "../contexts/songContext";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const { songData, setSongData, setCurrentSong } = useContext(songContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/api/song/get/mysongs");
        if (response && response.data) {
          setSongData(response.data);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    getData();
  }, [setSongData]);

  return (
    <LoggedInContainer curActiveScreen="myMusic">
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        My Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {songData.map((item) => (
          <SingleSongCard
            key={item._id}
            info={item}
            playSound={() => setCurrentSong(item)}
          />
        ))}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;