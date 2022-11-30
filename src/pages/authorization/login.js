import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from '../../store/actions/user';
import User from "../../models/user";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { login } from '../../services/authentication.service';
import CustomInput from '../../components/Forms/CustomInput';
import { Form } from 'react-bootstrap';
import FormButton from '../../components/UI/FormButton';
import useHttp from '../../hooks/useHttp';

const LoginPage = () => {

    const { data, error, loading, sendRequest } = useHttp();
    const [user, setUser] = useState(new User("", "", ""));
    const currentUser = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser?.id) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(setCurrentUser(data.data));
            navigate('/');
        }
    }, [data])

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
        sendRequest(login(user));
    };

    return (
        <div className="container-fluid bg-dark d-flex align-items-center justify-content-center vh-100">

            <div className="p-sm-5 mx-auto p-4 custom-card">
                <h1 className='text-white text-center mb-4'>Chat App</h1>
                {error &&
                    <p className='text-warning text-center fw-bold small'>
                        {error?.status === 403 ? 'Access denied!' : error?.data?.message || 'Something went wrong!'}
                    </p>
                }
                <Form
                    onSubmit={handleLogin}
                    className='d-grid gap-3'
                >
                    <CustomInput
                        type='email'
                        typeAs='input'
                        name='email'
                        label='Email'
                        value={user.email}
                        onHandleInputChange={handleChange}
                    />
                    <CustomInput
                        type='password'
                        typeAs='input'
                        name='password'
                        label='Password'
                        autoComplete='off'
                        value={user.password}
                        onHandleInputChange={handleChange}
                    />
                    <FormButton
                        isLoading={loading}
                        btnText='Login'
                    />
                </Form>
                <Link to="/registration" className="btn btn-link d-flex justify-content-center mt-2" style={{ color: 'darkgray' }}>
                    Create New Account!
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;