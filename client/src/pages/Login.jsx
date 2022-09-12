import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // For warning
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';
import Logo from '../assets/chat-logo.svg';
import { loginRoute } from '../utils/APIRoutes';


const defaultValues = {
  username: '',
  password: '',
}

const toastOptions = {
  // position: 'upper-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
}


const Login = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState(defaultValues);
  const { username, password } = credentials;

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  const handleFormValidation = () => {
    const { username, password } = credentials;

    if (!username.length) {
      toast.error("Username must not be empty!", toastOptions);
      return false;
    }
    else if (!password.length) {
      toast.error("Password must not be empty!", toastOptions);
      return false;
    }

    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleFormValidation()) {
      const { username, password } = credentials;

      const { data } = await axios.post(loginRoute, { username, password });

      if (!data.status) {
        toast.error(data.msg, toastOptions);
      }
      else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) navigate('/');
  }, []);


  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Hommies Chat</h1>
          </div>

          <input
            type="text"
            name='username'
            value={username}
            placeholder='User Name'
            onChange={(e) => handleChange(e)}
            min={1}
          />

          <input
            name='password'
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => handleChange(e)}
          />


          <button type='submit'>Log In</button>

          <span> Don't have an account ?  <Link to='/register'> Register </Link></span>

        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color:#2D4059;

  .brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
      height: 5rem;
    }
    h1{
      color: white;
      text-transform: uppercase;
    }
  }

  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #FF5722;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
      /* background-color: transparent; */
      padding: 1rem;
      border: 0.2rem solid #222831;
      border-radius: 0.4rem;
      font-size: 1rem;
      width: 100%;
      &:focus{
        border: 0.2rem solid #F8CB2E;
        outline: none;
      }
    }

    button{
      padding: 1rem 2rem;
      background:#035397;
      color: white;
      border: none;
      border-radius: 0.4rem;
      font-size:1rem;
      font-weight: bold;
      text-transform:uppercase;
      cursor:pointer;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color:#001E6C;
      }
    }

    span{
      color: white;
      text-transform: uppercase;
      a{
        color:#2155CD;
        font-weight: bold;
        text-decoration: none;
      }
    }

  }


`

export default Login;