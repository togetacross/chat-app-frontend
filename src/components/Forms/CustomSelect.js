import { FloatingLabel, Form } from "react-bootstrap";
import React from 'react';

const CustomSelect = (props) => {

    return (
        <Form.Group>
            <FloatingLabel
                controlId={"floating" + props.floatingLabel} 
                label={props.floatingLabel}
            >
                <Form.Select
                    style={{minWidth: "300px"}}
                    name={props.name}
                    value={props.value}
                    onChange={(e) => props.onChange(e)}
                    disabled={props.isDisabled}
                >
                    {props.children}
                </Form.Select>
            </FloatingLabel>
        </Form.Group>
    );
};

export default CustomSelect;