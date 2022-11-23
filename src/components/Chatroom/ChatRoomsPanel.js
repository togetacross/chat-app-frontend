import React from "react";
import { ListGroup } from "react-bootstrap";
import ChatRoomItem from "./ChatRoomItem";
import { useDispatch } from 'react-redux';
import { joinRoom } from './../../services/chatroom.service';

const ChatRoomsPanel = ({ conversations }) => {
    const dispatch = useDispatch();

    const handleRoomSelect = (roomId) => {
        dispatch(joinRoom(roomId));
    }

    return (
        <ListGroup className="pe-1" style={{ overflowY: "auto", height: 480}}
        >
            {
                conversations?.length > 0 && conversations.map((room) =>
                    <ChatRoomItem
                        key={room.id}
                        onHandleRoomSelect={handleRoomSelect}
                        room={room} />
                )
            }
        </ListGroup>
    )
}

export default ChatRoomsPanel;