import React from "react";

const UserSelectOption = (props) => {
    return (
        <React.Fragment>
            {props.data.map((item) =>
                <option key={item.id}>{item.name} - {item.address}</option>
            )}
        </React.Fragment>
    );
};

export default UserSelectOption;