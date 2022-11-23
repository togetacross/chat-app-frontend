import { faCheck, faCheckDouble, faHeart, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Image } from 'react-bootstrap';
import ProfileItem from '../Common/ProfileItem';
import { useEffect } from 'react';
import { useState } from 'react';

const Message = ({ item, isMyMessage, user, roomUsers, onSendLike, currentUserId }) => {

    const createdAt = new Date(item.createdAt).toLocaleString();
    const [likeActivities, setLikeActivities] = useState();
    const [hasSelfLike, setHasSelfLike] = useState();
    const [seenActivities, setSeenActivities] = useState();

    useEffect(() => {
        setHasSelfLike(item.userActivitys.filter(activity => activity.userId === currentUserId && activity.liked === true).length)
        setLikeActivities(item.userActivitys.filter(activity => activity.liked === true).length);
        setSeenActivities(item.userActivitys.filter(activity => activity.seenAt !== null).length);
    }, [item])

    return (
        <div
            className={`border-0 d-flex justify-content-${isMyMessage ? 'end me-md-4 ms-5' : 'start ms-md-4 me-5'} `}
        >
            <div className='my-auto mx-2 text-white text-center'>
                <FontAwesomeIcon
                    className={`${hasSelfLike && 'text-danger'}`}
                    icon={faHeart}
                    size='lg'
                    onClick={() => onSendLike(item.id)}
                />
                <p
                    className={`${likeActivities && 'text-danger'}`}
                >
                    {likeActivities}
                </p>
            </div>

            <Card
                className='border-0'
                style={{ maxWidth: '500px' }}
                border="light"
                bg={isMyMessage ? 'primary' : 'light'}
                text={isMyMessage ? 'white' : 'dark'}
            >
                <Card.Body >
                    <Card.Title
                        as='div'
                    >
                        <ProfileItem
                            name={user.name}
                            image={user.image}
                            isOnline={user.online}
                        />
                    </Card.Title>

                    <Card.Text className="" >
                        {item.files && item.files.map((item) => (
                            /// IF DOCUMENT, VIDEO DISPLAY FLEX

                            <div
                                key={item.name}
                                className={`${item.attachmentType === 'IMAGE' ? 'd-inline-flex' : 'd-flex'}`}
                            >
                                {item.attachmentType === 'IMAGE' ?
                                    <Image
                                        src={`data:image/jpeg;base64,${item.file}`}
                                        thumbnail
                                        style={{ maxHeight: '60px' }}
                                    />
                                    :
                                    <div className='py-2' >
                                        <p>
                                            <FontAwesomeIcon icon={faFile} />
                                            <span className='text-warning'>
                                                {item.name}
                                            </span>
                                        </p>
                                    </div>
                                }
                            </div>

                        ))
                        }
                    </Card.Text>

                    {item.content &&
                        <Card.Text>
                            {item.content}
                        </Card.Text>
                    }
                </Card.Body>
                <Card.Footer className='small'>
                    {createdAt}
                    <div className='text-end text-warning'>
                        {roomUsers.length === seenActivities ?
                            <div>
                                All seen <FontAwesomeIcon icon={faCheckDouble} />
                            </div>
                            : <div>
                                {seenActivities + ' seen '} <FontAwesomeIcon icon={faCheck} />
                            </div>
                        }
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Message;