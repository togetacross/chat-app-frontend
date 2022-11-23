import React from "react";
import ImageInput from './ImageInput';
import ImageView from './ImageView';

const ImageUploader = ({ onHandleUpload }) => {

    const [image, setImage] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

    const handleImageRemove = () => {
        setImage([]);
    }


    return (
        <React.Fragment>
             <ImageInput
                onHandleImageChange={handleImageChange}
                onFileInputRef={fileInputRef}
            />
            <ImageView
                onHandleImageRemove={handleImageRemove}
                image={image}
            />
        </React.Fragment>
    );
};

export default ImageUploader;