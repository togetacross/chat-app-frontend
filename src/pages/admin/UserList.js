import { Table } from 'react-bootstrap';
import ProfileItem from '../../components/Common/ProfileItem';
import React from 'react';

const UserList = ({ users }) => {

    return (
        <React.Fragment>

            {users && users.map((user) =>
                <div key={user.id}>
                    <ProfileItem
                        name={user?.name}
                        image={user?.image}
                    />
                </div>

            )}
        </React.Fragment>
    )
}

export default UserList;