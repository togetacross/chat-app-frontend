import React, { useState } from "react";
import { Image } from "react-bootstrap";
import profileIcon from "../../assets/profile.png"
import CustomModal from "./Modal/CustomModal";

const ProfileItem = ({ name, image, isOnline }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div className="d-flex align-items-center">

            <CustomModal
                show={show}
                title={'Profile'}
                handleOnHide={handleShow}
                size="lg"
            >
                <Image
                    src={`data:image/jpeg;base64,${image}`}
                    className="img-fluid rounded m-auto user-select-none"
                    style={{ maxHeight: '100vh' }}
                />
            </CustomModal>

            {image &&
                <div
                    className="rounded-circle position-relative"
                    onClick={handleShow}
                    style={{
                        background: `url("data:image/png;base64, ${image}")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '32px',
                        width: '32px',
                    }}
                >
                    {isOnline &&
                        <div className="position-absolute top-100 end-0 translate-middle-y p-1 me-3 bg-success rounded-circle border">
                            <span className="visually-hidden">status</span>
                        </div>
                    }
                </div>
            }
            {!image &&
                <div className="position-relative">
                    <Image src={profileIcon} />
                    {isOnline &&
                        <div className="position-absolute top-100 end-0 translate-middle-y p-1 bg-success rounded-circle">
                            <span className="visually-hidden">status</span>
                        </div>
                    }
                </div>
            }
            <small className="m-0 ps-2 fw-bold">{name}</small>
        </div>
    );
}

export default ProfileItem;