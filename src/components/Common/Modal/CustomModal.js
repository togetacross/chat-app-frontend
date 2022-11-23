import { Modal } from "react-bootstrap";

const CustomModal = (props) => {

    return (
        <Modal
            show={props.show}
            onHide={props.handleOnHide}
        >
            <Modal.Header
                closeButton
                className='px-3 py-1'
            >
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className='p-0'
            >
                {props.children}
            </Modal.Body>
        </Modal>
    )
};

export default CustomModal;