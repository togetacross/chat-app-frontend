import React, { useRef, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import FormButton from '../UI/FormButton';
import CustomInput from '../Forms/CustomInput';
import ImageView from '../Forms/ImageView';
import ImageInput from '../Forms/ImageInput';
import useHttp from "../../hooks/useHttp";
import { saveGroupConversation } from "../../services/chatroom.service";
import CustomModal from "../Common/Modal/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import SearchSelectedView from "../Forms/SearchSelectedView";
import { useEffect } from "react";
import UserSearch from "./UserSearch";
import { MenuItem } from 'react-pro-sidebar';

const NewChatRoom = () => {
    const fileInputRef = useRef(null);
    const [room, setRoom] = useState({ file: '', name: '' });
    const { data, error, loading, sendRequest } = useHttp();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setSelectedUsers([]);
        setRoom({ file: '', name: '' });
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setRoom(room => ({ ...room, file: e.target.files[0] }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userIds = [];
        selectedUsers.map((user) =>
            userIds.push(user.id)
        );
        const roomData = {
            name: room.name,
            userIds: userIds,
        }
        const multipart = new FormData();
        multipart.append('file', room.file);
        multipart.append('room', new Blob([JSON.stringify(roomData)], {
            type: "application/json"
        }));

        sendRequest(saveGroupConversation(multipart));
    }

    useEffect(() => {
        if (data && !error) {
            handleClose();
        }
    }, [data, error])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value, });
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleImageRemove = () => {
        setRoom(room => ({ ...room, file: "" }));
        fileInputRef.current.value = '';
    }

    const handleRemoveSelectedUser = (id) => {
        setSelectedUsers(users =>
            users.filter(user => {
                return user.id != id
            }),
        );
    };

    const handleSelectUser = (user) => {
        setSelectedUsers(selectedUsers => [...selectedUsers, user]);
    }

    return (
        <React.Fragment>


            <MenuItem
                icon={
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        size="sm"
                    />
                }
                onClick={handleShow}
            >
                Group
            </MenuItem>

            <CustomModal
                show={show}
                title={'Create Group'}
                handleOnHide={handleClose}
            >

                <div className="d-flex align-items-center justify-content-center p-2">

                    <Form
                        className="d-grid gap-3 w-100"
                        onSubmit={handleSubmit}
                    >
                        {
                            error && !error.details && error.message && (
                                <Alert variant="danger" className="text-center">{error.message}</Alert>
                            )
                        }

                        <ImageInput
                            onHandleImageChange={handleImageChange}
                            onFileInputRef={fileInputRef}
                        />
                        {room.file &&
                            <ImageView
                                onHandleImageRemove={handleImageRemove}
                                image={room.file}
                            />
                        }

                        {!room.file &&
                            <FontAwesomeIcon
                                onClick={handleUploadClick}
                                className='text-primary d-flex me-auto ms-auto my-3'
                                icon={faPlus}
                                size="xl"
                            />
                        }

                        <CustomInput
                            type='Text'
                            typeAs='input'
                            name='name'
                            label='Name'
                            value={room.name}
                            error={error?.data?.details?.name}
                            onHandleInputChange={handleInputChange}
                        />

                        <div className="d-flex position-relative">
                            <UserSearch onHandleSelectUser={handleSelectUser} />
                        </div>

                        <div className="pt-3">
                            <SearchSelectedView
                                items={selectedUsers}
                                onHandleRemove={handleRemoveSelectedUser}
                            />
                        </div>


                        <FormButton
                            isLoading={loading}
                            btnText='Create'
                        />

                    </Form>
                </div>
            </CustomModal>
        </React.Fragment>
    );
}

export default NewChatRoom;