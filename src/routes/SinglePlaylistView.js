import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
    const [playlistDetails, setPlaylistDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { playlistId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await makeAuthenticatedGETRequest(
                    "/playlist/get/playlist/" + playlistId
                );
                setPlaylistDetails(response);
            } catch (error) {
                console.error("Error fetching playlist details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [playlistId]);

    return (
        <LoggedInContainer curActiveScreen={"library"}>
            {isLoading ? (
                <div>Loading...</div>
            ) : playlistDetails._id ? (
                <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        {playlistDetails.name}
                    </div>
                    <div className="pt-10 space-y-3">
                        {playlistDetails.songs && playlistDetails.songs.map((item) => (
                            <SingleSongCard
                                info={item}
                                key={item._id}
                                playSound={() => {}}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div>Playlist not found</div>
            )}
        </LoggedInContainer>
    );
};

export default SinglePlaylistView;
