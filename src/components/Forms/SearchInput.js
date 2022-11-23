import { Form } from "react-bootstrap";

const SearchInput = (props) => {
    return (
        <Form.Control
            type="search"
            placeholder="Search User"
            aria-label="Search"
            onChange={props.onHandleChange}
        />
    );
};

export default SearchInput;