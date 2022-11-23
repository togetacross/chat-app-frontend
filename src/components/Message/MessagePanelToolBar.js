import { Dropdown, Image, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { faCircleXmark, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { leaveFromConversation } from "../../services/chatroom.service";
import profileIcon from "../../assets/profile.png"
import AddUser from "./AddUser";
import ConversationUsers from "../Chatroom/ConversationUsers";
import { useEffect } from 'react';
import store from './../../store/index';
import { useState } from 'react';

const MessagePanelToolBar = () => {
    const { room, users } = useSelector((state) => state.chat);
    const { id } = store.getState().user;
    const [authUser, setAuthUser] = useState();

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

            <div className="d-flex align-items-center">
                <Image
                    className="border-0 me-3"
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
/*
                <div>
                    <div className="d-flex align-items-center">
                        <Image
                            className="border-0"
                            src={room.image ? `data:image/jpeg;base64,${room.image}` : profileIcon}
                            thumbnail
                            style={{ maxHeight: "60px" }}
                        />
                        <div className="ps-1">
                            <div className="d-flex align-items-center">
                                <p className="m-0 fw-bold">{room.name}</p>
                                {room.type === 'GROUP' &&
                                    <Nav.Link
                                        className="text-success ms-3"
                                        onClick={handleShow}
                                    >
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </Nav.Link>
                                }
                                <Nav.Link
                                    className="ms-3 text-danger"
                                    onClick={handleLeave}
                                >
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </Nav.Link>
                            </div>
                            {users && room.type === 'GROUP' && (
                                <div>
                                    <small>{users.length} member</small>(
                                    {users.map((user) => (
                                        <span key={user.id}>
                                            {user.role && user.role !== 'NONE' &&
                                                <small className="position-relative">
                                                    <span className="p-2">{user.name}</span>
                                                    <span
                                                        className={
                                                            "position-absolute top-50 start-0 translate-middle-y p-1 " +
                                                            `${user.online ? "bg-success" : "bg-danger"}` +
                                                            " rounded-circle"
                                                        }
                                                    >
                                                        <span className="visually-hidden">status</span>
                                                    </span>
                                                </small>
                                            }
                                        </span>

                                    ))}
                                    )
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
*/
export default MessagePanelToolBar;
