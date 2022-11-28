import React, { useEffect, useState } from 'react';
import { Dropdown, Image, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import store from './../../store/index';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { leaveFromConversation } from "../../services/chatroom.service";
import AddUser from "./AddUser";
import ConversationUsers from "../Chatroom/ConversationUsers";
import CustomModal from './../Common/Modal/CustomModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileIcon from "../../assets/profile.png"

const MessagePanelToolBar = () => {
    const { room, users } = useSelector((state) => state.chat);
    const { id } = store.getState().user;
    const [authUser, setAuthUser] = useState();
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        if (users) {
            const user = users.find(user => {
                return user.id === id;
            });
            setAuthUser(user);
        }
    }, [users])

    const handleLeave = () => {
        leaveFromConversation(room.id);
    };

    return (
        <div className="d-flex justify-content-between p-2 bg-dark text-white border-bottom border-white">

            <CustomModal
                show={show}
                title={'Group profile'}
                handleOnHide={handleShow}
                size="lg"
            >
                <Image
                    src={`data:image/jpeg;base64,${room.image}`}
                    className="img-fluid rounded m-auto user-select-none"
                    style={{ maxHeight: '100vh' }}
                />
            </CustomModal>


            <div className="d-flex align-items-center">
                <Image
                    className="border-0 me-3"
                    onClick={handleShow}
                    src={room.image ? `data:image/jpeg;base64,${room.image}` : profileIcon}
                    thumbnail
                    style={{ maxHeight: "60px" }}
                />
                <div>
                    <span className="fw-bold fs-6">{room.name}</span>
                    {room.type === 'GROUP' &&
                        <ConversationUsers users={users} />
                    }

                </div>
            </div>

            <div className="d-flex align-items-center">
                {room.type === 'GROUP' &&
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle
                            className="p-3"
                            as={Nav} size='xl'
                            id="dropdown-autoclose-true"
                        >
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant='dark'>

                            {authUser && authUser.role === 'ADMIN' &&
                                <AddUser roomId={room.id} />
                            }

                            <Dropdown.Item onClick={handleLeave}>Leave</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }

                {room.type === 'PRIVATE' &&
                    <Nav.Link
                        className="ms-3 text-danger"
                        onClick={handleLeave}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} /> Leave
                    </Nav.Link>
                }
            </div>
        </div >
    );
};

export default MessagePanelToolBar;
