import { useEffect, useState } from "react";
import User from "../../models/user";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { registration } from '../../services/authentication.service';
import CustomInput from "../../components/Forms/CustomInput";
import { Form } from "react-bootstrap";
import FormButton from "../../components/UI/FormButton";
import useHttp from "../../hooks/useHttp";

const RegistrationPage = () => {
  const [user, setUser] = useState(new User('', '', ''));
  const { data, error, loading, sendRequest } = useHttp();
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      navigate('/login');
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

  const handleRegister = (e) => {
    e.preventDefault();
    sendRequest(registration(user));
  };

  return (
    <div className="container-fluid bg-dark d-flex align-items-center justify-content-center vh-100">

      <div className="mx-auto p-sm-5 p-4 custom-card">
        <h1 className='text-white text-center mb-5'>Chat App</h1>
        {error &&
          <p className='text-warning text-center fw-bold small'>
            {error?.status === 403 ? 'Access denied!' : error?.data?.message || 'Something went wrong!'}
          </p>
        }
        <Form
          onSubmit={handleRegister}
          className='d-grid gap-3'
        >
          <CustomInput
            type='Text'
            typeAs='input'
            name='name'
            label='Name'
            value={user.name}
            onHandleInputChange={handleChange}
            error={error?.data?.details?.name}
          />
          <CustomInput
            type='email'
            typeAs='input'
            name='email'
            label='Email'
            value={user.email}
            onHandleInputChange={handleChange}
            error={error?.data?.details?.email}
          />
          <CustomInput
            type='password'
            typeAs='input'
            name='password'
            label='Password'
            value={user.password}
            autoComplete="off"
            onHandleInputChange={handleChange}
            error={error?.data?.details?.password}
          />
          <FormButton
            isLoading={loading}
            btnText='Sign Up'
          />
        </Form>
        <Link to="/login" className="btn btn-link d-flex justify-content-center mt-2" style={{ color: 'darkgray' }}>
          I have an Account!
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
