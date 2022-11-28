import { Modal } from "react-bootstrap";

const CustomModal = (props) => {

    return (
        <Modal
            size={props.size || ''}
            show={props.show}
            onHide={props.handleOnHide}
           // centered
            className='p-0'
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