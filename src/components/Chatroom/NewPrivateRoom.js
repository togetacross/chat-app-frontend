import React, { useState } from "react";
import CustomModal from './../Common/Modal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { savePrivateConversation } from "../../services/chatroom.service";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import useHttp from "../../hooks/useHttp";
import { useEffect } from "react";
import UserSearch from "./UserSearch";
import { MenuItem } from 'react-pro-sidebar';

const NewPrivateRoom = () => {

    const { data, error, loading, sendRequest } = useHttp();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInvitation = (user) => {
        const data = { id: user.id }
        sendRequest(savePrivateConversation(data));
    };

    useEffect(() => {
        if (data && !loading && !error) {
            handleClose();
        }
    }, [data])


    return (
        <React.Fragment>

            <CustomModal
                show={show}
                title={"Create private conversation"}
                handleOnHide={handleClose}>
                {error && !loading &&
                    <p className="text-center text-danger m-0">
                        {error?.data?.message || 'Something went wrong!'}
                    </p>
                }
                <div className="p-1">
                    <UserSearch onHandleSelectUser={handleInvitation} />
                </div>
            </CustomModal>


            <MenuItem
                icon={
                    <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                    />
                }
                onClick={handleShow}
            >
                Private
            </MenuItem>

        </React.Fragment>
    )

}

export default NewPrivateRoom;