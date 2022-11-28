import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const CustomInput = ({
    value,
    onHandleInputChange,
    error,
    type,
    name,
    label,
    typeAs,
    style,
    autoComplete
}) => {

    return (
        <Form.Group>
            <FloatingLabel
                controlId={`floating${label}`}
                label={label}
            >
                <Form.Control
                    as={typeAs}
                    type={type}
                    name={name}
                    placeholder={label}
                    value={value || ""}
                    isInvalid={error}
                    onChange={onHandleInputChange}
                    style={style}
                    autoComplete={autoComplete ? autoComplete : 'on'}
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
};

export default CustomInput;