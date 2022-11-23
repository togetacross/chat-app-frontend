import { useEffect, useState} from 'react';

const UserTypingPanel = ({users, currentUserId}) => {

    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        if (users) {
            setTypingUsers(users.filter(user => user.typing === true && user.id !== currentUserId));
        }
    }, [users])

    return (
        <div>
            {typingUsers && typingUsers.map(user => (<span className='text-white' key={user.id}>{'-' + user.name + ' '}</span>))}
            {typingUsers.length !== 0 && <span className='text-white'>typing...</span>}
        </div>
    )
}

export default UserTypingPanel;