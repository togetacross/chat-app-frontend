import { Nav } from "react-bootstrap";

const ToggleButton = ({handleOnShow}) => {

    return (
        <Nav.Link className="text-secondary fw-bold" onClick={handleOnShow}>
            {props.children}
        </Nav.Link>
    );
}

export default ToggleButton;