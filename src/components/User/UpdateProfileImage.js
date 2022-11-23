import React, { useState, useRef } from 'react';
import { Button, Form, Image, Dropdown } from 'react-bootstrap';
import FormButton from '../UI/FormButton';
import CustomModal from './../Common/Modal/CustomModal';
import ImageView from './../Forms/ImageView';
import { updateUserProfileImage } from "../../services/chatroom.service";

const UpdateProfileImage = () => {

    const [image, setImage] = useState('');
    const fileInputRef = useRef(null);
    const [show, setShow] = useState(false);
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
        try{
            const data = await updateUserProfileImage(multipart);
            console.log(data);
        }catch(err) {
            console.log(err);
        }

    }

    const handleImageRemove = () => {
        setImage('');
    }

    return (
        <React.Fragment>
            <div className='text-secondary' onClick={handleShow}>Profile</div>

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

                <div
                    className='my-1'
                    onClick={handleUploadClick}
                >
                    <ImageView
                        onHandleImageRemove={handleImageRemove}
                        image={image}
                    />
                </div>

                <div
                    onClick={handleUpload}
                >
                    <FormButton
                        isLoading={false}
                        btnText='Save'
                    />
                </div>

            </CustomModal>
        </React.Fragment>
    )

}

export default UpdateProfileImage;