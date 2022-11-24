import React, { createContext, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { receiveMessage } from "../store/actions/chat";
import store from './../store/index';
import SockJsClient from "react-stomp";
import { authHeader } from "../services/base.service";
import { setWsStatus } from './../store/actions/chat';
import { loadConversations } from './../services/chatroom.service';
import { clearCurrentUser } from "../store/actions/user";
import { history } from "../utils/history";
import { useSelector } from 'react-redux';

const WebSocketContext = createContext(null);

export { WebSocketContext }

export default ({ children }) => {

    const clientRef = useRef(null);
    //const SOCKET_URL = "http://localhost:8080/ws-chat";
    const SOCKET_URL = "http://172.17.0.7:5000/ws-chat";
    const currentUser = store.getState().user;
    const { room, messages } = useSelector(state => state.chat);
    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const processType = (isTyping) => {
        const payload = {
            roomId: room.id,
            type: isTyping
        }
        clientRef.current.sendMessage("/app/type", JSON.stringify(payload));
    }

    const processLike = (messageId) => {

        const selectedMessage = messages.find(message => {
            return message.id === messageId;
        })

        const selectedUserActivity = selectedMessage.userActivitys.find(activity => {
            return activity.userId === currentUser.id;
        })

        let hasLike;

        if (typeof (selectedUserActivity) === 'undefined') {
            hasLike = true;
        } else {
            hasLike = !selectedUserActivity.liked;
        }

        console.log(hasLike);
        const payload = {
            roomId: room.id,
            userId: currentUser.id,
            messageId: messageId,
            liked: hasLike
        }

        clientRef.current.sendMessage("/app/like", JSON.stringify(payload));
    }

    const processSeen = () => {
        const messageIds = [];
        messages.map(message => {

            if (message.userActivitys.length === 0) {
                messageIds.push(message.id);
            } else {
                const hasActivity = message.userActivitys && message.userActivitys.find(item => {
                    return item.userId === currentUser.id;
                })

                if (typeof (hasActivity) === 'undefined') {
                    messageIds.push(message.id);
                }
            }
        });

        if (messageIds.length !== 0) {
            const payload = {
                messageIds: messageIds,
                chatroomId: room.id
            }

            clientRef.current.sendMessage("/app/seen", JSON.stringify(payload));
        }
    }

    const handleReceiveMessage = (msg) => {
        dispatch(receiveMessage(msg));
    };

    const handleConnect = () => {
        console.log("Connected!");
        if (currentUser?.token !== null) {
            setIsAuthenticated(true);
        } else {
            console.error('Token missing!')
            setIsAuthenticated(false)
        }
        dispatch(setWsStatus(true));
        dispatch(loadConversations());
    }

    // retrieve error.stack
    const handleConnectError = (error) => {
        console.log(error);
        if (error?.headers?.message.includes('403' || '401')) {
            console.log(error?.headers?.message);
            setIsAuthenticated(false)
            store.dispatch(clearCurrentUser());
            history.push('/login');
        }
    }

    const handleDisconnect = () => {
        console.log("Disconnected!");
        dispatch(setWsStatus(false));
    }

    return (
        <WebSocketContext.Provider
            value={{
               // sendMessage: processNewMessage,
                sendType: processType,
                sendSeen: processSeen,
                sendLike: processLike
            }}
        >

            <SockJsClient
                options={{}}
                url={SOCKET_URL}
                headers={authHeader()}
                topics={[
                    room && `/conversation/${room.id}`,
                    '/public', `/user/private`
                ]}
                onConnect={handleConnect}
                onClose={handleDisconnect}
                onConnectFailure={(error) => handleConnectError(error)}
                onMessage={(msg) => { handleReceiveMessage(msg) }}
                ref={(client) => { clientRef.current = client }}
                autoReconnect={isAuthenticated}
            />

            {children}

        </WebSocketContext.Provider>
    )
}