import { authHeader } from './base.service';
import { BASE_API_URL } from '../utils/constants';
import axios from 'axios';
import { setChatRooms, setRoom, loadMoreMessages } from './../store/actions/chat';

export async function getUsersByNameContainAndNotInGroup(namePart, roomId) {
    return await axios.get(BASE_API_URL + '/users/search',
        {
            params: { namePart: namePart, roomId: roomId },
            headers: authHeader()
        });
};

export async function getUsersByNameContain(namePart) {
    return await axios.get(BASE_API_URL + '/users/search/all',
        {
            params: { namePart: namePart},
            headers: authHeader()
        });
};

export const loadConversations = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(BASE_API_URL + "/conversation/all", { headers: authHeader() });
            dispatch(setChatRooms(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const joinRoom = (roomId) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(BASE_API_URL + `/conversation/load?chatRoomId=${roomId}`, { headers: authHeader() });
            dispatch(setRoom(roomId, response.data.messageSlice, response.data.users));
        } catch (error) {
            console.log(error);
        }
    }
}

export const paginateMessages = (id, dateTime) => {
    return async function (dispatch) {
        try {
            const responseMessages = await axios.get(
                BASE_API_URL + `/conversation/messages/paginate?chatRoomId=${id}&dateTime=${dateTime}`,
                { headers: authHeader() }
            );
            dispatch(loadMoreMessages(responseMessages.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export async function savePrivateConversation(data) {
    return await axios.post(BASE_API_URL + "/conversation/private", data, { headers: authHeader() });
};

export async function saveGroupConversation(room) {
    return await axios.post(BASE_API_URL + "/conversation/group", room, { headers: authHeader() });
};

export async function addUsersToChatroom(data) {
    return await axios.post(BASE_API_URL + "/conversation/add", data, { headers: authHeader() });
};

export async function leaveFromConversation(roomId) {
    return await axios.post(BASE_API_URL + "/conversation/leave", roomId, { headers: authHeader() });
};

export async function sendMessage(msg) {
    return await axios.post(BASE_API_URL + "/conversation/message", msg, { headers: authHeader() });
};

export async function sendSeenReport(data) {
    return await axios.post(BASE_API_URL + "/chatroom/seen", data, { headers: authHeader() });
};
////USER
export async function updateUserProfileImage(data) {
    return await axios.put(BASE_API_URL + "/users/profile/update", data, { headers: authHeader() });
};

/*
export async function getPaginateUserRooms(userId, page, size) {
    return await axios.get(BASE_API_URL + `/chatroom/sort?userId=${userId}&page=${page}&size=${size}`, { headers: authHeader() });
};
*/