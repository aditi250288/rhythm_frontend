const SingleSongCard = ({info, playSound}) => {
    if (!info) return null; // Return null if info is undefined or null
    return (
        <div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={() =>{playSound(info.track)}}>
            <div
                className="w-12 h-12 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${info.thumbnail || 'fallback-image-url'}")`, // Provide fallback if thumbnail is missing
                }}
            ></div>
            <div className="flex w-full">
                <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
                    <div className="cursor-pointer hover:underline">
                        {info.name || "Unknown Title"} {/* Fallback for name */}
                    </div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                        {info.artist?.firstName + " " + info.artist?.lastName || "Unknown Artist"} {/* Handle artist fallback */}
                    </div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>3:44</div>
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;
