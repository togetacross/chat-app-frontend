import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { addUsersToChatroom, getUsersByNameContainAndNotInGroup } from '../../services/chatroom.service';
import CustomModal from './../Common/Modal/CustomModal';
import SearchInput from './../Forms/SearchInput';
import SearchListView from './../Forms/SearchListView';

const AddUser = ({ roomId }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const [error, setError] = useState();
    const [usersFound, setUsersFound] = useState([]);

    const handleInvitation = (user) => {
        const data = {
            userId: user.id,
            chatRoomId: roomId
        }
        addUsersToChatroom(data);
        setError();
        setUsersFound([]);
    };

    const handleUserNameChange = async (e) => {
        const namePart = e.target.value;
        if (namePart.length > 2) {
            try {
                console.log(roomId);
                const { data } = await getUsersByNameContainAndNotInGroup(namePart, roomId);
                setUsersFound(data);
            } catch (err) {
                setError(err?.response?.data?.message);
            }
        } else {
            setError();
            setUsersFound([]);
        }
    };

    return (
        <React.Fragment>
            <Dropdown.Item onClick={handleShow}>Add user</Dropdown.Item>
            <CustomModal
                show={show}
                title={"Add to conversation"}
                handleOnHide={handleShow}>
                <SearchInput
                    onHandleChange={handleUserNameChange}
                />
                <SearchListView
                    items={usersFound}
                    onHandleSelect={handleInvitation} 
                    error={error}
                />
            </CustomModal>
        </React.Fragment>
    );


}

export default AddUser;