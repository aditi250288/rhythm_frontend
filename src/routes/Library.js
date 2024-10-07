import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const Library = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest("/api/playlist/get/me");
                setMyPlaylists(response.data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen={"library"}>
            <div className="text-white text-xl pt-8 font-semibold">
                My Playlists
            </div>
            <div className="py-5 grid gap-5 grid-cols-5">
                {myPlaylists.map((item) => {
                    return (
                        <Card
                            key={item._id} // Use playlist ID directly as the key
                            title={item.name}
                            description=""
                            imgUrl={item.thumbnail}
                            playlistId={item._id}
                        />
                    );
                })}
            </div>
        </LoggedInContainer>
    );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
    const navigate = useNavigate();
    //onClick={() => navigate(`/playlist/${item._id}`)}

    return (
        <div
            className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
            onClick={() => {
                navigate(`/playlist/${playlistId}`); // Navigate to the playlist's detailed view
            }}
        >
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Library;
