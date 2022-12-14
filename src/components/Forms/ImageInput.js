import { Form } from "react-bootstrap";

const ImageInput = ({ onFileInputRef, onHandleImageChange }) => {

    return (
        <Form.Group>
            <Form.Control
                className="d-none"
                ref={onFileInputRef}
                type="file"
                size="sm"
                accept="image/jpg"
                multiple
                onChange={onHandleImageChange}
            />
        </Form.Group>
    );
};

export default ImageInput;