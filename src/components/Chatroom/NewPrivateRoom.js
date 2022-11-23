import React, { useState } from "react";
import CustomModal from './../Common/Modal/CustomModal';
import SearchInput from './../Forms/SearchInput';
import SearchListView from './../Forms/SearchListView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUsersByNameContain, savePrivateConversation } from "../../services/chatroom.service";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NewPrivateRoom = () => {

    const [usersFound, setUsersFound] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setUsersFound([]);
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const handleInvitation = (user) => {
        const data = { id: user.id }
        savePrivateConversation(data);
        setUsersFound([]);
    };

    const handleUserNameChange = async (e) => {
        const namePart = e.target.value;
        if (namePart.length > 2) {
            // need setTimeOut...
            const { data } = await getUsersByNameContain(namePart);
            setUsersFound(data);
        } else {
            setUsersFound([]);
        }
    };


    return (
        <React.Fragment>

            <CustomModal
                show={show}
                title={"Search User"}
                handleOnHide={handleClose}>
                <SearchInput
                    onHandleChange={handleUserNameChange}
                />
                <SearchListView
                    items={usersFound}
                    onHandleSelect={handleInvitation} />
            </CustomModal>

            <div
                className='text-secondary'
                onClick={handleShow}
            >
                <FontAwesomeIcon
                    className="px-2"
                    icon={faSearch}
                    size="lg"
                />
                User
            </div>

        </React.Fragment>
    )

}

export default NewPrivateRoom;