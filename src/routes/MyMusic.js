import { useState, useEffect } from "react";
// eslint-disable-next-line
import {Howl, Howler} from 'howler';
import image1 from "../assets/images/image1.png";
import IconText from "../components/shared/iconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextWithHover from "../components/shared/textWithHover";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
//import TextInput from "../components/shared/textInput";
//import CloudinaryUpload from "../components/shared/CloudinaryUpload";

//delete folllowing commented code later
// eslint-disable-next-line              

const MyMusic = () => {
  // eslint-disable-next-line
  const [songData, setSongData] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState (null);

  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }

    let newSound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(newSound);
    newSound.play();
  };

  useEffect(()=>{
    //fetch data
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest (
        "/song/get/mysongs"
    );
    if (response && response.data){
  
    setSongData(response.data);
    }
  };
  getData();

  }, []);

  return (
    <div className="h-full w-full flex">
      {/* This first div will be the left panel */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        {/* This div is for logo */}
        <div>
          <div className="logoDiv p-6">
            <img 
              src={image1} 
              alt="rhythm logo" 
              width={500}
            />
          </div>
          <div className="py-2">
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              
            />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText 
              iconName={"icomoon-free:books"} 
              displayText={"Library"} 
            />
            <IconText 
              iconName={"material-symbols:library-music-rounded"} 
              displayText={"My Music"}
              active
            />
          </div>

          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
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
            <div className="ml- text-sm font-semibold pt-1">English</div>
          </div>
        </div>
      </div>

      {/* This second div will be the right part(main content) */}
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-2/3 border-r border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover displayText={"Upload Songs"} />
              <div className="bg-white h-1/2 p-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                Aditi
              </div>
            </div>
          </div>
        </div>

        <div className="content p-8 overflow-auto">
          <div className="text-white text-xl font-semibold pb-5 pl-2">
            My Songs
          </div>
          {/* Add your content here */}
          <div className= "space-y-3">
            {songData.map((item)=>(
              <SingleSongCard
              key={item.id}
              info={item} 
              playSound={playSound}
              
              />
            ))}
            
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyMusic;