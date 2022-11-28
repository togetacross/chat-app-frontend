import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { addUsersToChatroom } from '../../services/chatroom.service';
import UserSearch from '../Chatroom/UserSearch';
import CustomModal from './../Common/Modal/CustomModal';
import useHttp from '../../hooks/useHttp';

const AddUser = ({ roomId }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const { data, error, loading, sendRequest } = useHttp();

    const handleInvitation = (user) => {
        const data = {
            userId: user.id,
            chatRoomId: roomId
        };
        sendRequest(addUsersToChatroom(data));
    };

    useEffect(() => {
        if (data && !error && !loading) {
            handleShow();
        }
    }, [data, error])

    return (
        <React.Fragment>
            <Dropdown.Item onClick={handleShow}>Add user</Dropdown.Item>
            <CustomModal
                show={show}
                title={"Add to conversation"}
                handleOnHide={handleShow}
            >
                {error && (
                    <p className="text-center m-0 text-danger">{error?.data?.message || 'Something went wrong!'}</p>
                )}
                <UserSearch
                    onHandleSelectUser={handleInvitation}
                    roomId={roomId}
                />
            </CustomModal>
        </React.Fragment>
    );


}

export default AddUser;