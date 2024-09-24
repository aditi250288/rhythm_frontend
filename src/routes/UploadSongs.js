import {useState} from "react";
import image1 from "../assets/images/image1.png";
import IconText from "../components/shared/iconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextWithHover from "../components/shared/textWithHover";
import TextInput from "../components/shared/textInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers"
import { useNavigate } from "react-router-dom";

const UploadSongs = () => {

  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongName] = useState();
  const navigate = useNavigate();

  const submitSong = async ()=> {
    
    const data = {name, thumbnail, track:playlistUrl}
    const response = await makeAuthenticatedPOSTRequest(
      "/song/create",
      data
    );
    if(response.err){
      alert("could not create song")
      return;
    }
    alert("Success");
    navigate("/home")
  }
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
              active
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

        <div className="content p-8 pt-0 overflow-auto">
            <div className= "text-2xl- font semibold mb-5 text-white mt-8">
            Upload your Music
            </div>
            <div className="w-2/3 flex space-x-3">
                <div className="w-1/2">
                
                <TextInput label="Name" 
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
                />
                </div>
                <div className="w-1/2">
                <TextInput label="Thumbnail" 
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
                />
                </div>
            </div>
          {/* Add content for the main area here */}
        </div>
        <div className="py-5 ">
          {uploadedSongFileName ? (
            <div className="bg-white rounded-full p-3 w-1/3">
              {uploadedSongFileName.substring(0,35)}...
              </div>
          ): (
            <CloudinaryUpload 
            setUrl={setPlaylistUrl} 
            setName={setUploadedSongName}/>
          )}
          </div>
          <div className="bg-white w-40 flex-item-center justify-center p-4 rounded-full cursor-pointer font-semibold" 
          onClick={submitSong}>
            Submit Song
          </div>
      </div>
    </div>
  );
};

export default UploadSongs;