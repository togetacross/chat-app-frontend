import React from 'react';
import CustomModal from './../Common/Modal/CustomModal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import ProfileItem from '../Common/ProfileItem';
import { ListGroup } from 'react-bootstrap';
import { useEffect } from 'react';

const ConversationUsers = ({ users }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const [sortedUsers, setSortedUsers] = useState([])

    useEffect(()=>{
        if(users) {
            const sortedUsersByRole = [...users].filter((user) => user.role !== 'NONE').
            sort((a, b) => a.role > b.role ? 1 : -1);
            setSortedUsers(sortedUsersByRole);
        }
    }, [users])

    return (
        <React.Fragment>

            <Nav.Link
                className="text-success"
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faUserGroup} />
                <small className="ms-1">{sortedUsers.length} member</small>
            </Nav.Link>

            <CustomModal
                show={show}
                title={"Members"}
                handleOnHide={handleShow}>
                <ListGroup className=''>
                    {sortedUsers && sortedUsers.map((user) => (
                        <ListGroup.Item
                            variant='dark'
                            key={user.id}
                            action
                        >
                            <div className='d-flex align-items-center justify-content-between'>
                                <ProfileItem
                                    image={user.image}
                                    name={user.name}
                                    isOnline={user.online}
                                />
                                <span className='ms-2'>
                                    {user.role}
                                </span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </CustomModal>
        </React.Fragment>
    )
}

export default ConversationUsers;