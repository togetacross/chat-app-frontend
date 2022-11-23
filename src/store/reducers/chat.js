import { MESSAGE, JOIN_ROOM, SET_CHAT_ROOMS, PAGINATE_MESSAGES, CONNECT, NEW_CONVERSATION, LEAVE, USER_TYPING, WS_SERVER_STATUS, SEEN, ACCESS_DENIED } from '../ChatActionTypes';
import { DISCONNECT, JOIN_USER, CONVERSATION_REMOVED, LIKE } from './../ChatActionTypes';
import { findById, updateItem, updateArrayWhereId } from './reducerUtil';

const chat = {
    connected: false,
    room: null,
    users: [],
    chatRooms: [],
    messages: [],
    hasMoreMessage: false,
    notifications: [],
    error: false,
}

const chatReducer = (state = chat, action) => {
    switch (action?.type) {

        case WS_SERVER_STATUS:

            return {
                ...state,
                connected: action.payload.isConnect
            }

        case CONNECT:

            if (findById(action.payload.response, state.users) !== null) {
                return {
                    ...state,
                    users: updateArrayWhereId(action.payload.response, state.users, { online: true })
                }
            } else {
                return { ...state }
            }

        case DISCONNECT:

            if (findById(action.payload.response, state.users) !== null) {
                return {
                    ...state,
                    users: updateArrayWhereId(action.payload.response, state.users, { online: false })
                }
            } else {
                return { ...state }
            }

        case PAGINATE_MESSAGES:
            return {
                ...state,
                messages: [...action.payload.messageSlice.messages, ...state.messages],
                hasMore: action.payload.messageSlice.hasMore
            }

        case MESSAGE:
            const { roomId, createdAt } = action.payload.response;
            if (state.room && state.room.id === roomId) {
                return {
                    ...state,
                    chatRooms: updateArrayWhereId(roomId, state.chatRooms, { createdAt: createdAt })
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
                    messages: [...state.messages, action.payload.response]
                }
            } else {
                return {
                    ...state,
                    notifications: [...state.notifications, action.payload],
                    chatRooms: updateArrayWhereId(roomId, state.chatRooms, { hasNewMessage: true, createdAt: createdAt })
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
                };
            }

        case LIKE:

            return {
                ...state,
                messages: state.messages.map(message => {
                    if (message.id === action.payload.response.messageId) {
                        const newUserActivitys = message.userActivitys.map(activity => {
                            if (activity.userId === action.payload.response.userId) {
                                return { ...activity, liked: action.payload.response.liked };
                            } else {
                                return activity;
                            }
                        })
                        return { ...message, userActivitys: newUserActivitys }
                    }
                    return message;
                })
            }

        case SEEN:

            return {
                ...state,
                messages: state.messages.map(message => {
                    if (action.payload.response.messageIds.some(id => id === message.id)) {

                        const userActivity = message.userActivitys.find(activity => {
                            return activity.userId === action.payload.response.userId;
                        });

                        if (typeof (userActivity) === 'undefined') {
                            const newUserActivity = { userId: action.payload.response.userId, liked: false, seenAt: action.payload.response.seenAt }
                            const newUserActivitys = [...message.userActivitys, newUserActivity];
                            return { ...message, userActivitys: newUserActivitys };
                        } else {
                            return message;
                        }
                    } else {
                        return message;
                    }
                }
                )
            }

        case SET_CHAT_ROOMS:

            return {
                ...state,
                chatRooms: action.payload
            };

        case USER_TYPING:

            if (state.room && state.room.id === action.payload.response.roomId) {
                return {
                    ...state,
                    users: updateArrayWhereId(action.payload.response.userId, state.users, { typing: action.payload.response.typing })
                };
            } else {
                break;
            }

        case NEW_CONVERSATION:

            const newChatroom = action.payload.response;
            return {
                ...state,
                chatRooms: [newChatroom, ...state.chatRooms]
            };

        case CONVERSATION_REMOVED:

            if (state.room && state.room.id === action.payload.response) {
                return {
                    ...state,
                    room: null,
                    chatRooms: state.chatRooms.filter(chatroom => {
                        return chatroom.id !== action.payload.response;
                    })
                };
            } else {
                return {
                    ...state,
                    chatRooms: state.chatRooms.filter(chatroom => {
                        return chatroom.id !== action.payload.response;
                    })
                }
            }

        case LEAVE:

            if (state.room && state.room.id === action.payload.response.roomId) {
                return {
                    ...state,
                    users: updateArrayWhereId(action.payload.response.userId, state.users, { role: 'NONE' }),
                    messages: [...state.messages, action.payload.response]
                };
            } else {
                return {
                    ...state,
                    chatRooms: updateArrayWhereId(action.payload.response.roomId, state.chatRooms, { hasNewMessage: true, createdAt: action.payload.response.createdAt })
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                }
            }

        case JOIN_ROOM:
            return {
                ...state,
                room: findById(action.payload.roomId, state.chatRooms),
                users: action.payload.users,
                messages: action.payload.messageSlice.messages,
                hasMore: action.payload.messageSlice.hasMore
            };

        case JOIN_USER:

            if (state.room && state.room.id === action.payload.response.message.roomId) {
                const user = action.payload.response.user;
                const newUsers = state.users.filter((u) => u.id !== user.id);
                return {
                    ...state,
                    users: [...newUsers, user],
                    messages: [...state.messages, action.payload.response.message],
                    chatRooms: updateArrayWhereId(action.payload.response.message.roomId, state.chatRooms, { createdAt: action.payload.response.message.createdAt })
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                }
            } else {
                return {
                    ...state,
                    chatRooms: updateArrayWhereId(action.payload.response.message.roomId, state.chatRooms, { hasNewMessage: true, createdAt: action.payload.response.message.createdAt })
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                }
            }
        case ACCESS_DENIED:
            return {
                ...state,
                users: [],
                room: null,
                messages: [],
                hasMoreMessage: null,
                error: "Access denied for this conversation!"
            }
        default:
            console.log('Reducer Exception, default type!');
            return state;
    }
};

export default chatReducer;


/* Change list item, mutable problem redux 
const data = state.chatRooms;
               const index = data.findIndex(room => roomId === room.id);
               const item = data[index];
   
               data.splice(index, 1);
               data.splice(0, 0, item);
               data.map((room) => {
                   if (room.id === roomId) {
                       return { ...room, createdAt: createdAt }
                   }
                   return room;
               });*/