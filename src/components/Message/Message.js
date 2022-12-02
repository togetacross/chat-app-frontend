import { faCheck, faCheckDouble, faHeart, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Image } from 'react-bootstrap';
import ProfileItem from '../Common/ProfileItem';
import { useEffect } from 'react';
import { useState } from 'react';
import MessageActivityDetails from './MessageActivityDetails';
import ImageViewer from './ImageViewer';
import useHttp from '../../hooks/useHttp';
import { download } from '../../services/chatroom.service';

const Message = ({ item, isMyMessage, user, roomUsers, onSendLike, currentUserId }) => {

    const { sendRequest, data, error, loading } = useHttp();
    const createdAt = new Date(item.createdAt).toLocaleString();
    const [likeActivities, setLikeActivities] = useState();
    const [hasSelfLike, setHasSelfLike] = useState();
    const [seenActivities, setSeenActivities] = useState();
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();

    useEffect(() => {
        setHasSelfLike(item.userActivitys.filter(activity => activity.userId === currentUserId && activity.liked === true).length)
        setLikeActivities(item.userActivitys.filter(activity => activity.liked === true).length);
        setSeenActivities(item.userActivitys.filter(activity => activity.seenAt !== null).length);
    }, [item])

    useEffect(() => {
        if (data) {
            const header =  data.headers['content-disposition'];
            const filenameRegex = /filename=\"(.*)\"/;
            const matches = filenameRegex.exec(header);
            const fileName = matches[1] || 'file';
            const blobUrl = URL.createObjectURL(data.data);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
    
            link.dispatchEvent(
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                })
            );
            document.body.removeChild(link);
        }
    }, [data])

    const handleShowImageViewer = (index) => {
        setCurrentIndex(index);
        setShowImageViewer(!showImageViewer);
    }

    const handleCloseImageViewer = () => {
        setCurrentIndex();
        setShowImageViewer(!showImageViewer);
    }

    const handleDownload = (name) => {
        sendRequest(download(item.roomId, name));
    };

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
                    className={`${likeActivities ? 'text-danger' : 'text-white'}`}
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
                    <Card.Title className='d-flex justify-content-between fs-6'>
                        <ProfileItem
                            name={user.name}
                            image={user.image}
                            isOnline={user.online}
                        />
                        <MessageActivityDetails
                            users={roomUsers}
                            activities={item.userActivitys}
                        />
                    </Card.Title>

                    {item.files &&
                        <ImageViewer
                            show={showImageViewer}
                            onHandleClose={handleCloseImageViewer}
                            images={item.files}
                            selectedIndex={currentIndex}
                            onHandleDownload={handleDownload}
                        />
                    }

                    <Card.Text>
                        {item.files && item.files.map((attachment, index) => (
                            /// IF DOCUMENT, VIDEO DISPLAY FLEX

                            <div
                                key={attachment.name}
                                className={`${attachment.attachmentType === 'IMAGE' ? 'd-inline-flex me-1' : 'd-flex'}`}
                            >
                                {attachment.attachmentType === 'IMAGE' ?
                                    <Image
                                        src={`data:image/jpeg;base64,${attachment.file}`}
                                        thumbnail
                                        style={{ maxHeight: '60px' }}
                                        onClick={() => handleShowImageViewer(index)}
                                    />
                                    :
                                    <div className='py-2' onClick={() => handleDownload(attachment.name)}>
                                        <FontAwesomeIcon icon={faFile} />
                                        <span className='text-warning'>
                                            {attachment.name}
                                        </span>
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