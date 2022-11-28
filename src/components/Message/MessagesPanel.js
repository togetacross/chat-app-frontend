import React, { useRef, useEffect, useState, useContext, useLayoutEffect } from 'react';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import ActivityMessage from './ActivityMessage';
import { paginateMessages } from '../../services/chatroom.service';
import { WebSocketContext } from '../../context/WebSocket';

const MessagesPanel = ({ currentUserId }) => {

    const { room, users, messages, hasMore } = useSelector(state => state.chat);
    const scrollRef = useRef(null);
    const ws = useContext(WebSocketContext);
    const [firstMessage, setFirstMessage] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (messages) {
            setFirstMessage(messages[0]);
            // need fix seen request
            ws.sendSeen();
        }
    }, [messages])

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages])

    const handleLike = (messageId) => {
        ws.sendLike(messageId);
    }

    const scrollToBottom = () => {
        const element = scrollRef.current;
        /*const { height, bottom, top } = element.getBoundingClientRect();
        console.log(element.getBoundingClientRect());
        console.log(element.lastChild.scrollHeight);*/
        scrollRef.current?.scrollIntoView({ block: 'end', inline: "nearest", behavior: "smooth", alignToTop: false })
    }

    const handleScrollUp = () => {
        if (firstMessage && hasMore) {
            const createdAt = firstMessage.createdAt.replace(/\+/g, '%2B');
            dispatch(paginateMessages(room.id, createdAt));
        }
    }

    const displayMessageByType = (message) => {
        const user = users.find((user) => {
            return user.id === message.userId;
        });
        if (message.type === 'MESSAGE') {
            return (
                < Message
                    key={message.id}
                    item={message}
                    currentUserId={currentUserId}
                    user={user}
                    roomUsers={users}
                    isMyMessage={message.userId === currentUserId}
                    onSendLike={handleLike}
                />
            )
        } else {
            let text = '';
            switch (message.type) {

                case 'JOIN':
                    text = 'joined at ';
                    break;
                case 'CREATED':
                    text = 'created at ';
                    break;
                case 'LEAVE':
                    text = 'left at ';
                    break;
                default:
                    break;
            }
            return (
                <ActivityMessage
                    key={message.id}
                    item={message}
                    user={user}
                    isMyMessage={message.userId === currentUserId}
                    text={text}
                />
            )
        }
    }

    return (
        <div
            className="h-100 w-100 p-3"
            style={{ overflowY: "auto" }}
        >

            <div
                className='mx-auto'
                style={{ maxWidth: '800px' }}
            >
                {hasMore &&
                    <FontAwesomeIcon
                        onClick={handleScrollUp}
                        className='d-flex mx-auto mb-3 text-white'
                        icon={faChevronUp}
                        size="xl"
                    />
                }

                <div
                    className='d-grid gap-3'
                    ref={scrollRef}
                >
                    {
                        messages && messages.map((message) =>
                            displayMessageByType(message)
                        )
                    }
                </div>
            </div>
        </div>
    )

}

export default MessagesPanel;