import React from 'react';
import CustomModal from './../Common/Modal/CustomModal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const FilesView = ({ files, onHandleFileRemove }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => { setShow(!show) }

    return (
        <React.Fragment>

            {files.length > 0 &&
                <Button
                    variant="outline-success m-1"
                    type='button'
                    size="sm"
                    onClick={handleShow}
                    className="rounded-pill"
                >
                    {files.length} files
                </Button>
            }

            <CustomModal
                show={show}
                title={'Files'}
                handleOnHide={handleShow}
            >
                <div
                    className='bg-dark p-2'
                    style={{ overflowY: "scroll", maxHeight: "500px" }}
                >
                    {files && files.map((file) => (
                        <div
                            key={file.name}
                            className='d-flex align-items-center mb-1'
                        >
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className='rounded-circle'
                                onClick={() => onHandleFileRemove(file.name)}>
                                <FontAwesomeIcon
                                    size="xl" 
                                    icon={faXmark}
                                />
                            </Button>
                            <p key={file.name} className='text-success m-0 ps-2'>{file.name}</p>
                        </div>
                    ))}
                </div>
            </CustomModal>

        </React.Fragment>
    )
}

export default FilesView;