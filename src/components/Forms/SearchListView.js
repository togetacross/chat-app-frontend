import React from 'react';
import { Nav } from 'react-bootstrap';
import ProfileItem from '../Common/ProfileItem';
const SearchListView = ({ items, onHandleSelect, error }) => {

    return (
        <div style={{ overflowY: "scroll", maxHeight: "100vh" }}>
            {error &&<span className='d-flex justify-content-center text-white bg-secondary'>{error}</span>}
            {items && items.map((item) =>
                    <Nav.Link
                        key={item.id}
                        className='d-flex my-3'
                        onClick={() => onHandleSelect(item)}
                    >
                        <ProfileItem
                            name={item.name}
                            image={item.image}
                        />
                    </Nav.Link>
                ) 
            }
        </div>
    );

};

export default SearchListView;