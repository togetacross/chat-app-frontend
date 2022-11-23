import React from "react"
import ProfileItem from "../Common/ProfileItem"

const SearchDropdownList = ({items, onHandleSelect}) => {

    return (
        <React.Fragment>
            {items &&
                <div className="mt-1 position-absolute top-100 start-0 w-100 bg-light rounded">
                    {items.map((item) =>
                        <div
                            key={item.id}
                            className="p-1"
                            onClick={() => onHandleSelect(item)}>

                            <ProfileItem
                                name={item.name}
                                image={item.image}
                            />
                        </div>
                    )}
                </div>
            }
        </React.Fragment>
    )
}

export default SearchDropdownList
