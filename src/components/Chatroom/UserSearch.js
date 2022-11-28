import React, { useEffect, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import { getUsersByNameContain, getUsersByNameContainAndNotInGroup } from '../../services/chatroom.service';
import SearchDropdownList from '../Forms/SearchDropdownList';
import SearchInput from '../Forms/SearchInput';

const UserSearch = ({ onHandleSelectUser, roomId }) => {

    const { data, error, loading, sendRequest } = useHttp();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (data && !error && !loading) {
            console.log(data)
            setUsers(data.data);
        } else {
            setUsers([]);
        }
    }, [data, error])

    const handleUserNameChange = async (e) => {
        const namePart = e.target.value;
        if (namePart.length > 2) {
            if(roomId) {
                sendRequest(getUsersByNameContainAndNotInGroup(namePart, roomId));
            } else {
                sendRequest(getUsersByNameContain(namePart));
            }
        }
    }

    const handleSelectUser = (user) => {
        onHandleSelectUser(user);
        setUsers([]);
    }

    return (
        <React.Fragment>
            <SearchInput
                onHandleChange={handleUserNameChange}
            />
            <SearchDropdownList
                items={users}
                onHandleSelect={handleSelectUser}
                loading={loading}
                error={error}
            />
        </React.Fragment>
    )
}

export default UserSearch;