import { Badge, ListGroupItem } from "react-bootstrap";
import { useState, useEffect } from 'react';
import ProfileItem from "../Common/ProfileItem";

const ChatRoomItem = ({ room, onHandleRoomSelect }) => {

    const [sended, setSended] = useState([]);
    const { createdAt } = room;

    useEffect(() => {
        const interval = setInterval(() => {
            const lastMessageDateTime = Date.parse(createdAt);
            const currentDateTime = new Date();
            const milliSecondDifferent = Math.abs(currentDateTime.getTime() - lastMessageDateTime) / 1000;
            const days = Math.floor(milliSecondDifferent / 86400);

            if (days > 0) {
                setSended(days + "d ");
            } else {
                const hours = Math.floor(milliSecondDifferent / 3600) % 24;
                const minutes = Math.floor(milliSecondDifferent / 60) % 60;
                if (hours > 0) {
                    setSended(hours + "h " + minutes + "min");
                } else if (minutes > 0) {
                    setSended(minutes + "min");
                } else {
                    const sec = Math.ceil(milliSecondDifferent);
                    setSended(sec + "sec");
                }
            }
        }, 3000) //increase needed 1000 -- 1 sec

        return () => {
            clearInterval(interval);
        }
    }, [createdAt]);

    return (
        <ListGroupItem
            action
            onClick={() => onHandleRoomSelect(room.id)}
           // variant="light"
            style={{ borderBottomLeftRadius: "30px", borderTopLeftRadius: "30px" }}
            className="position-relative mb-1 p-2 border border-white bg-dark text-white"
        >
            <ProfileItem
                name={room.name}
                image={room.image}
            />
            {room.hasNewMessage &&
                <Badge
                    bg="danger"
                    className="p-2 position-absolute top-0 end-0"
                >
                    New message
                </Badge>
            }
            <Badge
                bg="secondary"
                className="m-1 position-absolute bottom-0 end-0"
            >
                {sended}
            </Badge>
        </ListGroupItem>
    );

};

export default ChatRoomItem;