import React from "react";
import { useSelector } from "react-redux";
import MessagePanelToolBar from "../components/Message/MessagePanelToolBar";
import UserTypingPanel from "../components/Message/UserTypingPanel";
import MessagesPanel from './../components/Message/MessagesPanel';
import NewMessage from './../components/Message/NewMessage';
import { useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import store from './../store/index';

const ChatPage = () => {
  const { room, users } = useSelector(state => state.chat);
  const { id } = store.getState().user;
  const { toggleSidebar } = useProSidebar();

  return (
    <div
      className="h-100 d-flex align-items-stretch flex-column"
      style={{ overflowY: "auto", maxHeight: "100vh" }}
    >
      <Button
        className="d-md-none"
        onClick={() => toggleSidebar()}
        variant='dark'
      >
        <FontAwesomeIcon
          className='text-warning me-3'
          icon={faBars}
          size="xl"
        />
        Menu
      </Button>
      {room &&
        <React.Fragment>
          <MessagePanelToolBar />
          <MessagesPanel currentUserId={id}/>
          <UserTypingPanel users={users} currentUserId={id} />
          <NewMessage />
        </React.Fragment>
      }

      {!room && <h1 className="text-center text-white my-auto">Chat Application Demo</h1>}
    </div>
  );
};

export default ChatPage;
