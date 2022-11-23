import ProfileItem from "../Common/ProfileItem";

const ActivityMessage = ({ item, text, bg, user }) => {

    const createdAt = new Date(item.createdAt).toLocaleString();

    return (
        <div className="text-center">
            <div
                className="bg-secondary text-white d-inline-flex justify-content-center align-items-center rounded-pill py-1 px-2"
            >
                <ProfileItem
                    name={user.name}
                    image={user.image}
                    isOnline={user.online}
                />
                <small className="ps-1">
                    {text} {createdAt}
                </small>
            </div>
        </div>
    );
}

export default ActivityMessage;