import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import FormButton from '../UI/FormButton';
import CustomModal from './../Common/Modal/CustomModal';
import ImageView from './../Forms/ImageView';
import { updateUserProfileImage } from "../../services/chatroom.service";
import useHttp from '../../hooks/useHttp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const UpdateProfileImage = () => {

    const { data, error, loading, sendRequest } = useHttp();
    const [image, setImage] = useState('');
    const fileInputRef = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (data && !error && !loading) {
            handleShow();
        }
    }, [data, error, loading])

    const handleShow = () => {
        setShow(!show);
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleUpload = async () => {
        const multipart = new FormData();
        multipart.append('image', image);
        sendRequest(updateUserProfileImage(multipart));
    }

    const handleImageRemove = () => {
        fileInputRef.current.value = "";
        setImage('');
    }

    return (
        <React.Fragment>
            <div
                className="text-secondary"
                onClick={handleShow}
            >
                Profile
            </div>

            <CustomModal
                show={show}
                title={'Update image'}
                handleOnHide={handleShow}
            >
                <Form.Group className="mb-3">
                    <Form.Control
                        className="d-none"
                        ref={fileInputRef}
                        type="file"
                        size="sm"
                        accept="image/jpg"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                {!image &&
                    <FontAwesomeIcon
                        onClick={handleUploadClick}
                        className='text-primary d-flex me-auto ms-auto my-3'
                        icon={faUpload}
                        size="xl"
                    />
                }

                <ImageView
                    onHandleImageRemove={handleImageRemove}
                    image={image}
                />

                {error &&
                    <p className='text-danger text-center mx-auto'>
                        {error?.data?.message || 'Something went wrong!'}
                    </p>
                }
                <div
                    className='d-grid p-1'
                    onClick={handleUpload}
                >
                    <FormButton
                        isLoading={loading}
                        btnText='Update'
                    />
                </div>

            </CustomModal>
        </React.Fragment>
    )

}

export default UpdateProfileImage;