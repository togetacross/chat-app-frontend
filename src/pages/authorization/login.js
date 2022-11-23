import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from '../../store/actions/user';
import User from "../../models/user";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/authentication.service";
import './login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {

    const [user, setUser] = useState(new User("", "", ""));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const currentUser = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser?.id) {
            navigate("/");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState => {
            return {
                ...prevState,
                [name]: value,
            };
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!user.email || !user.password) {
            return;
        }
        setLoading(true);

        AuthenticationService.login(user).then(response => {
            dispatch(setCurrentUser(response.data));
            navigate('/');
        }).catch(error => {
            console.log(error);
            setErrorMessage("Email or password is not valid.");
            setLoading(false);
        });
    };

    return (
        <div className="container-fluid bg-dark d-flex align-items-center justify-content-center vh-100">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className="ms-auto me-auto user-icon"
                />
                {errorMessage && (
                    <div className="alert alert-danger text-center">{errorMessage}</div>
                )}
                <form
                    onSubmit={(e) => handleLogin(e)}
                    noValidate
                    className={submitted ? "was-validated" : ""}
                >
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="email"
                            value={user.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Email is required.
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            value={user.password}
                            autoComplete="on"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Password is required.
                        </div>
                    </div>
                    <button className="btn btn-secondary w-100 mt-3" disabled={loading}>
                        Login
                    </button>
                </form>
                <Link to="/registration" className="btn btn-link" style={{ color: 'darkgray' }}>
                    Create New Account!
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;