import { Button, Spinner } from "react-bootstrap";

const FormButton = ({isLoading, btnText}) => {

    return (
        <div className="d-grid gap-2">
            <Button variant="success" size="lg" type="submit" disabled={isLoading}>
                {!isLoading ? btnText :
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
            </Button>
        </div>
    );
}

export default FormButton;