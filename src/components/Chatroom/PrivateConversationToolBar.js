import React from "react";
import profileIcon from "../../assets/profile.png"
import { Image } from 'react-bootstrap';

const PrivateConversationToolBar = ({ image, name, isOnline }) => {
    return (
        <React.Fragment>
            <Image
                className="border-0"
                src={image ? `data:image/jpeg;base64,${image}` : profileIcon}
                thumbnail
                style={{ maxHeight: "60px" }}
            />
            {name}
        </React.Fragment>
    );

}

export default PrivateConversationToolBar;