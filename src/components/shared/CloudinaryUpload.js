import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";

const CloudinaryUpload = ({setUrl, setName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dlkl4ek0w",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    
    <button className="bg-white text-black rounded-full p-4 font-semibold" onClick={uploadImageWidget}>
      Select Song
    </button>
  );
};

export default CloudinaryUpload;