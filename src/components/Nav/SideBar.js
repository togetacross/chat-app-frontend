import store from '../../store';
import ProfileItem from '../Common/ProfileItem';
import NewChatRoom from './../Chatroom/NewChatRoom';
import ChatRoomsPanel from '../Chatroom/ChatRoomsPanel';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import NewPrivateRoom from './../Chatroom/NewPrivateRoom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faCircle, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Nav } from 'react-bootstrap';
import './SideBar.css'
import UpdateProfileImage from '../User/UpdateProfileImage';
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import SignOut from '../User/SignOut';

const SideBar = () => {

    const { name, image } = store.getState().user;
    const { connected, chatRooms } = useSelector(state => state.chat);
    const { toggleSidebar } = useProSidebar();

    return (
        <Sidebar
            breakPoint='md'
            width='100%'
            backgroundColor='rgb(48, 60, 66)'
        >


            <Nav.Link className='text-end p-1 d-md-none'>
                <FontAwesomeIcon
                    onClick={() => toggleSidebar()}
                    className='text-warning me-3'
                    icon={faAnglesLeft}
                    size="lg"
                />
            </Nav.Link>

            <Menu>

                <div className='text-center mt-1'>
                    <FontAwesomeIcon
                        className={connected ? 'text-success' : 'text-danger'}
                        icon={faCircle}
                        size="lg"
                    />
                    <span className='ms-2 small text-white'>
                        {connected ? 'Connected' : 'Disconnected'}
                    </span>
                </div>
                <SubMenu prefix={<ProfileItem name={name} image={image} />}>
                    <UpdateProfileImage />
                    <SignOut/>
                </SubMenu>

                <SubMenu label="Conversation">
                    <NewChatRoom />
                    <NewPrivateRoom />
                </SubMenu>
                <ChatRoomsPanel conversations={chatRooms} />
            </Menu>
        </Sidebar >
    )
}

export default SideBar;
/*
        <Navbar.Offcanvas show={true} id="navbar-nav" backdrop={false}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title >My Chat</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
                style={{ maxHeight: "100vh" }}
            >
                <CustomModal
                    show={show}
                    title={"Search User"}
                    handleOnHide={handleClose}>
                    <SearchInput
                        onHandleChange={handleUserNameChange}
                    />
                    <SearchListView
                        items={usersFound}
                        onHandleSelect={handleInvitation} />
                </CustomModal>
                <Nav className="w-100">
                    <div className="d-grid gap-3 w-100">
                        <ProfileItem
                            name={name}
                            image={image}
                        />
                        <div>
                            <NewChatRoom />
                            <Nav.Link
                                className="text-secondary fw-bold"
                                onClick={handleShow}
                            >
                                <FontAwesomeIcon
                                    className="px-2"
                                    icon={faSearch}
                                    size="lg"
                                />
                                User
                            </Nav.Link>
                        </div>

                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search Conversation"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <ChatRoomsPanel />
                    </div>
                </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>*/