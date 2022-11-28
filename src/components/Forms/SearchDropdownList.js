import React from "react"
import { Spinner } from "react-bootstrap"
import ProfileItem from "../Common/ProfileItem"

const SearchDropdownList = ({ items, onHandleSelect, loading, error }) => {

    return (
        <React.Fragment>
            <div
                className="position-absolute top-100 start-0 w-100 bg-light rounded"
                style={{ maxHeight: 300, overflowY: 'auto' }}
            >
                {items && items.map((item) =>
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
                {loading &&
                    <Spinner
                        size='sm'
                        animation="border"
                        variant="success"
                        className='m-1 mx-auto d-flex justify-content-center'
                    />
                }
                {error &&
                    <p className='text-secondary text-center mt-1 mb-0'>
                        {error?.data?.message || 'Not found!'}
                    </p>
                }
            </div>

        </React.Fragment>
    )
}

export default SearchDropdownList
