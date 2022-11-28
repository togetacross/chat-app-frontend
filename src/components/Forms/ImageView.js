import { Button, Image } from "react-bootstrap";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImageView = ({ image, onHandleImageRemove }) => {

    return (
        <div className="d-flex bg-dark mx-auto rounded" style={{ maxWidth: 300 }}>
            {image && (
                <div className="position-relative d-flex mx-auto">
                    <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-60 end-0 fw-bold rounded-circle"
                        onClick={onHandleImageRemove}
                    >
                        <FontAwesomeIcon size="lg" icon={faXmark} />
                    </Button>
                    <Image
                        style={{ maxWidth: 300, maxHeight: 300 }}
                        src={URL.createObjectURL(image)}
                        rounded
                    />
                </div>
            )}
        </div>
    );
};

export default ImageView;