import useHttp from '../../hooks/useHttp';
import { useEffect } from 'react';
import { getAllUser } from '../../services/admin.service';
import { Button } from 'react-bootstrap';
import UserSearch from '../../components/Chatroom/UserSearch';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import UserList from './UserList';

// Just some basic..
const Admin = () => {
    const { data, error, loading, sendRequest } = useHttp();

    useEffect(() => {
        sendRequest(getAllUser());
    }, [])

    return (
        <Container>
            <div>
                <h1 className='text-center p-2'>Admin</h1>
                <h2 className='text-center text-success p-2'>{"reg. users - " + data?.data?.length }</h2>
                <UserList users={data?.data} />
            </div>
        </Container>
    )
}

export default Admin;