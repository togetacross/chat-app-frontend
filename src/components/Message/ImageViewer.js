import React, { useState, useEffect, useRef } from "react";
import { faAngleLeft, faAngleRight, faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Modal, Row, Image } from "react-bootstrap";

const ImageViewer = ({ show, onHandleClose, images, selectedIndex }) => {

    const [index, setIndex] = useState();
    //const [downloadUrl, setDownloadUrl] = useState();
    // const [downloadRef, setDownloadRef] = useRef();

    useEffect(() => {
        setIndex(selectedIndex);
    }, [selectedIndex]);

    const handlePreImage = () => {
        const nextIndex = index - 1;
        nextIndex < 0 ? setIndex(images.length - 1) : setIndex(nextIndex);
    }

    const handleNextImage = () => {
        index + 1 < images.length ? setIndex(index + 1) : setIndex(0);
    }

    const handleClose = () => {
        setIndex();
        onHandleClose();
    }

    const downloadFile = () => {

    }

    const downloadImage = (item) => {
        let blob = new Blob([item.file]);
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = item.name;
        document.body.appendChild(link);

        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );

        document.body.removeChild(link);
    }

    return (

        <Modal
            show={show}
            onHide={handleClose}
            fullscreen
        >
            <div className="position-relative bg-dark">

                <Row className="position-absolute vw-100 m-0">

                    <div>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="position-absolute top-0 end-0 p-4 text-light"
                            size='3x'
                            style={{ cursor: "pointer" }}
                            onClick={handleClose}
                        />
                    </div>

                    <Col
                        onClick={handlePreImage}
                        className="vh-100 text-light d-flex align-items-center justify-content-start p-0"
                    >
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            size='4x'
                            style={{ cursor: "pointer" }}
                        />
                    </Col>

                    <Col
                        onClick={handleNextImage}
                        className="vh-100 text-light d-flex align-items-center justify-content-end p-0"
                    >
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            size='4x'
                            style={{ cursor: "pointer" }}
                        />
                    </Col>

                </Row>

                {images.length > 0 &&
                    <div className="d-flex vh-100">
                        <div className="d-flex flex-column m-auto">

                            <div className="text-center fs-5 mb-3 text-light user-select-none">
                                {images[index]?.name || 'N/A'}
                            </div>

                            <div className="d-flex">
                                {images[index]?.attachmentType === 'IMAGE' ?

                                    <Image
                                        src={`data:image/jpeg;base64,${images[index]?.file}`}
                                        className="img-fluid rounded m-auto user-select-none"
                                        style={{ maxHeight: '90vh' }}
                                    />

                                    :
                                    <div className="my-5">
                                        <FontAwesomeIcon
                                            className="text-warning position-absolute top-50 start-50"
                                            icon={faDownload}
                                            size="xl"
                                            onClick={() => downloadFile(images[index])}
                                        />
                                    </div>
                                }

                            </div>
                            <div className="text-light ps-3 mt-3 border-start">
                                <span className="ms-2">
                                    {images[index]?.description || 'No description'}
                                </span>
                            </div>

                        </div>
                    </div>

                }
            </div>
        </Modal>
    );
}

export default ImageViewer;