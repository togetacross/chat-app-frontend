import { Button, Spinner } from "react-bootstrap";

const FormButton = ({ isLoading, btnText, size }) => {

    return (
        <Button
            variant="success"
            size={size}
            type="submit"
            disabled={isLoading}
            style={{minWidth: 100}}
        >
            {!isLoading ? btnText :         
                <Spinner
                    as="span"
                    animation="grow"
                    size='sm'
                    role="status"
                    aria-hidden="true"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </Spinner>
            }
        </Button>
    );
}

export default FormButton;