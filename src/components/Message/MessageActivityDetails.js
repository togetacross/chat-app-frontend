import React, { useState, useEffect } from "react";
import CustomModal from './../Common/Modal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ProfileItem from './../Common/ProfileItem';
import { Tabs, Tab } from 'react-bootstrap';

const MessageActivityDetails = ({ activities, users }) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [likeActivities, setLikeActivities] = useState();
    const [seenActivities, setSeenActivities] = useState();

    useEffect(() => {
        setLikeActivities(activities.filter(activity => activity.liked === true));
        setSeenActivities(activities.filter(activity => activity.seenAt !== null));
    }, [activities])

    const displayUserProfile = (userId) => {
        const user = users.find((user) => {
            return user.id === userId;
        });
        return (
            <ProfileItem
                name={user.name}
                image={user.image}
                isOnline={user.online}
            />
        )
    }

    return (
        <React.Fragment>
            <div
                className="ps-3"
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <CustomModal
                show={show}
                title={'Message details'}
                handleOnHide={handleClose}
            >

                <Tabs
                    defaultActiveKey="Seen"
                    id="message-details"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="Seen" title="Seen">
                        {seenActivities && seenActivities.map((activity) => (
                            <div
                                className="d-flex justify-content-between p-2" 
                                key={activity.userId}>
                                {displayUserProfile(activity.userId)} {new Date(activity.seenAt).toLocaleString()}
                            </div>
                        ))}

                    </Tab>
                    <Tab eventKey="Liked" title="Liked">
                        {likeActivities && likeActivities.map((activity) => (
                            <div 
                                key={activity.userId}
                                className="p-2"
                            >
                                {displayUserProfile(activity.userId)}
                            </div>
                        ))}
                    </Tab>
                </Tabs>
            </CustomModal>
        </React.Fragment>
    )
}

export default MessageActivityDetails;