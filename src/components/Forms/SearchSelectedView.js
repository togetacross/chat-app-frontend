import { Row, Col, Nav } from "react-bootstrap";
import ProfileItem from "../Common/ProfileItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchSelectedView = ({ items, onHandleRemove }) => {

    return (
        <Row className="mt-2">
            {items.length > 0 && items.map((item) =>
                <Col
                    key={item.id}
                    className="d-flex align-items-center mb-1"
                >
                    <ProfileItem
                        name={item.name}
                        image={item.image}
                    />
                    <Nav.Link
                        className="text-secondary fw-bold text-danger"
                        onClick={() => onHandleRemove(item.id)}
                    >
                        <FontAwesomeIcon
                            className="px-2"
                            icon={faXmark} size="lg" />
                    </Nav.Link>
                </Col>
            )}
        </Row>
    )
}

export default SearchSelectedView;