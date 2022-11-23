import React, { useRef, useState } from "react";
import { Form, Button, Alert, Nav } from "react-bootstrap";
import FormButton from '../UI/FormButton';
import CustomInput from '../Forms/CustomInput';
import ImageView from '../Forms/ImageView';
import ImageInput from '../Forms/ImageInput';
import useHttp from "../../hooks/useHttp";
import { getUsersByNameContain, saveGroupConversation } from "../../services/chatroom.service";
import CustomModal from "../Common/Modal/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../Forms/SearchInput";
import SearchSelectedView from "../Forms/SearchSelectedView";
import SearchDropdownList from './../Forms/SearchDropdownList';

const NewChatRoom = () => {
    const fileInputRef = useRef(null);
    const [room, setRoom] = useState({ file: '', name: '' });
    const { isLoading, error, data, sendRequest, requestIdentifier } = useHttp();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setSelectedUsers([]);
        setRoom([]);
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setRoom(room => ({ ...room, file: e.target.files[0] }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userIds = [];
        selectedUsers.map((user) =>
            userIds.push(user.id)
        );
        const data = {
            name: room.name,
            userIds: userIds,
        }
        console.log(data);
        const multipart = new FormData();
        multipart.append('file', room.file);
        multipart.append('room', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));
        addChatRoom(multipart);
        handleClose();
    }

    const addChatRoom = async (room) => {
        saveGroupConversation(room);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({
            ...room,
            [name]: value,
        });
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleImageRemove = () => {
        setRoom(room => ({ ...room, file: "" }));
    }

    const handleUserNameChange = async (e) => {
        const namePart = e.target.value;
        if (namePart.length > 2) {
            const { data } = await getUsersByNameContain(namePart);
            setUsers(data);
        } else {
            setUsers([]);
        }
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
        setUsers([]);
    }

    return (
        <React.Fragment>
            <div
                className="text-secondary"
                onClick={handleShow}
            >
                <FontAwesomeIcon
                    className="px-2"
                    icon={faUserGroup} 
                    size="sm" 
                />
                Group
            </div>

            <CustomModal
                show={show}
                title={'Create Group'}
                handleOnHide={handleClose}
            >

                <div className="d-flex align-items-center justify-content-center">
                    <div className="w-75">

                        <Form
                            className="d-grid gap-3"
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

                            <ImageView
                                onHandleImageRemove={handleImageRemove}
                                image={room.file}
                            />

                            <Button
                                variant="outline-info"
                                className="d-flex mx-auto rounded-pill"
                                onClick={handleUploadClick}
                            >
                                Select Image
                            </Button>

                            <CustomInput
                                type='Text'
                                typeAs='input'
                                name='name'
                                label='Name'
                                value={room.name}
                                error={error && error.details && error.details.name}
                                onHandleInputChange={handleInputChange}
                            />

                            <div className="d-flex position-relative">
                                <SearchInput
                                    onHandleChange={handleUserNameChange}
                                />
                                <SearchDropdownList
                                    items={users}
                                    onHandleSelect={handleSelectUser}
                                />
                            </div>

                            <SearchSelectedView
                                items={selectedUsers}
                                onHandleRemove={handleRemoveSelectedUser}
                            />

                            <FormButton
                                isLoading={isLoading}
                                btnText='Create'
                            />
                        </Form>
                    </div>
                </div>
            </CustomModal>
        </React.Fragment>
    );
}

export default NewChatRoom;

/*
<div className="d-flex position-relative">

<Form.Control
type="search"
placeholder="Search User"
aria-label="Search"
onChange={handleUserNameChange}
/>

{users &&
    <div className="mt-1 position-absolute top-100 start-0 w-100 bg-light rounded">
    {users.map((user) =>
        <div
        key={user.id}
        className="p-1"
        onClick={() => handleSelectUser(user)}>
        
        <ProfileItem
        name={user.name}
        image={user.image}
        />
        </div>
        )}
        </div>
    }
    </div>

    <Row>
        {selectedUsers.length > 0 && selectedUsers.map((user) =>
            <Col className="d-flex align-items-center mb-1" key={user.id}>
                <ProfileItem
                    name={user.name}
                    image={user.image}
                />
                <Nav.Link
                    className="text-secondary fw-bold text-danger"
                    onClick={() => handleRemoveSelectedUser(user.id)}
                >
                    <FontAwesomeIcon
                        className="px-2"
                        icon={faXmark} size="lg" />
                </Nav.Link>
            </Col>
        )}
    </Row>
    */