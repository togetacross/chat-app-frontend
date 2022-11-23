import CustomModal from './../Common/Modal/CustomModal';
import SearchInput from './SearchInput';
import { Button } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
import { getUsersByNameContain } from '../../services/chatroom.service';
import SearchListView from './SearchListView';

const SearchUser = ({room, handleOnClick }) => {

    const [usersFound, setUsersFound] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const handleShow = () => setShow(!show);

    const handleInvitation = (id) => {
        const data = {
            userId: id,
            chatRoomId: room.id
        }
        handleOnClick(data);
        console.log(data);

        //addUsersToChatroom(data);
        // handleShow();
    };

    const handleUserNameChange = async (e) => {
        const namePart = e.target.value;
        if (namePart.length > 2) {
            try {
                const { data } = await getUsersByNameContain(namePart);
                setUsersFound(data);
            } catch (err) {
                console.log(err?.response?.data?.message);
                setError(err?.response?.data?.message);
            }
        } else {
            setUsersFound([]);
        }
    };

    return (
        <React.Fragment>

            <CustomModal
                show={show}
                title={"Add to conversation"}
                handleOnHide={handleShow}>
                <SearchInput
                    onHandleChange={handleUserNameChange}
                />
                <SearchListView
                    items={usersFound}
                    onHandleSelect={handleInvitation} />
            </CustomModal>
            <Button
                variant="success"
                onClick={handleInvitation}
            >
                Add to conversation
            </Button>
        </React.Fragment>
    );
}

export default SearchUser;