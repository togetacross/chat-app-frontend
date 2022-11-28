import {
    JOIN_ROOM,
    SET_CHAT_ROOMS,
    PAGINATE_MESSAGES,
    WS_SERVER_STATUS,
    ACCESS_DENIED
} from '../ChatActionTypes';

export const setWsStatus = (isConnected) => {
    return {
        type: WS_SERVER_STATUS,
        payload: { isConnect: isConnected }
    }
}

export const setRoom = (roomId, messageSlice, users) => {
    return {
        type: JOIN_ROOM,
        payload: {
            roomId: roomId,
            messageSlice: messageSlice,
            users: users
        }
    }
}

export const loadMoreMessages = (messageSlice) => {
    return {
        type: PAGINATE_MESSAGES,
        payload: {
            messageSlice: messageSlice
        }
    }
}

export const accessDenied = (roomId) => {
    return {
        type: ACCESS_DENIED,
        payload: {
            roomId: roomId
        }
    }
}

export const setChatRooms = (rooms) => {
    return {
        type: SET_CHAT_ROOMS,
        payload: rooms
    }
}

export const receiveMessage = (notification) => {
    //console.log(notification)
    return {
        type: notification.notificationType,
        payload: notification
    }
}