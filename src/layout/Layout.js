import React from "react";
import { Container, Col } from "react-bootstrap";
import SideBar from "../components/Nav/SideBar";
import ChatPage from './../pages/ChatPage';

const Layout = () => {
            
    return (
        <Container fluid className="p-0">
            <div className="min-vh-100 d-flex">
                <Col md={5} lg={5} xxl={5} style={{ backgroundColor: 'rgb(48, 60, 66)' }}>
                    <SideBar />
                </Col>
                <Col xs={12} md={7} lg={7} xxl={7} className="bg-dark">
                    <ChatPage />
                </Col>
            </div>
        </Container >
    );

}

export default Layout;