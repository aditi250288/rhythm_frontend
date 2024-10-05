import { useEffect, useState, useLayoutEffect } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const AddToPlaylistModal = ({ closeModal, currentSongId }) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state

    // Prevent background scroll when modal is open
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = originalStyle);
    }, []);

    // Close modal on pressing 'esc' key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [closeModal]);

    // Fetch user playlists
    const fetchPlaylists = async () => {
        try {
            setIsLoading(true); // Start loading
            const response = await makeAuthenticatedGETRequest("/api/playlist/get/me");
            setMyPlaylists(response.data);
        } catch (error) {
            console.error("Error fetching playlists:", error);
            setError("Failed to load playlists.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const addSongToPlaylist = async (playlistId) => {
        if (!currentSongId) {
            console.error("No song ID available to add to playlist.");
            return;
        }

        try {
            setIsLoading(true); // Start loading
            setError(""); // Clear any previous errors

            const response = await makeAuthenticatedPOSTRequest(
                "/api/playlist/add/song",
                { playlistId, songId: currentSongId }
            );

            if (response) {
                console.log("Song added to playlist:", response);
                closeModal(); // Close modal after adding
            }
        } catch (error) {
            console.error("Error adding song to playlist:", error);
            setError("Failed to add song to playlist.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-full max-w-lg mx-4 md:mx-auto rounded-md p-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Select Playlist
                </div>
                {isLoading && <div className="text-white">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <div className="space-y-4 flex flex-col justify-center items-center">
                    {myPlaylists.length > 0 ? (
                        myPlaylists.map((item) => (
                            <div
                                key={item._id}
                                className="bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3"
                                onClick={() => addSongToPlaylist(item._id)}
                            >
                                <div>
                                    <img
                                        src={item.thumbnail}
                                        className="w-10 h-10 rounded"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="text-white font-semibold text-sm">
                                    {item.name}
                                </div>
                            </div>
                        ))
                    ) : (
                        !isLoading && <div className="text-white">No playlists available.</div>
                    )}
                </div>
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-white text-xl font-bold"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;
