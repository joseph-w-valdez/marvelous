import React, { useState, useEffect, useContext } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
const axios = require('axios');

const SignIn = ({ onMount }) => {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputvalue, setPasswordInputValue] = useState('');
  const [successMessage, setSuccessMessage] = useState(undefined);
  onMount();

  const navigate = useNavigate();
  const { setUsername, setProfilePictureUrl } = useContext(UserContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:3000/marvel/sign-in';
    const data = {
      username: usernameInputValue,
      password: passwordInputvalue
    };
    axios.post(apiUrl, data)
      .then((res) => {
        setUsername(data.username);
        setProfilePictureUrl(res.data.profilePictureUrl);
        localStorage.setItem('authToken', res.data.token);
        setSuccessMessage('Signed-in successfully. Please wait 5 seconds before navigating to the sign-in page. If you are not redirected, click ');
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        navigate('/', { state: { message: successMessage } });
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [successMessage, navigate]);

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>SIGN IN</h1>
      <div className='basis-full' />
      {successMessage && (
        <h1 className='text-blue-300 bold'>
          {successMessage}
          <span
            className='text-blue-500 underline cursor-pointer'
            onClick={() => navigate('/')}
          >
            here
          </span>
        </h1>
      )}
      {!successMessage && (
        <>
          <form className='text-center text-black' onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder='Username'
              className='w-72 h-9 rounded px-3 mt-3'
              value={usernameInputValue}
              onChange={(e) => setUsernameInputValue(e.target.value)}
              required
            />
            <div className='basis-full' />
            <input
              type="password"
              placeholder='Password'
              className='w-72 h-9 rounded px-3 mt-3'
              value={passwordInputvalue}
              onChange={(e) => setPasswordInputValue(e.target.value)}
              required
            />
            <div className='basis-full' />
            <Button text='SIGN IN' type="submit" />
          </form>
          <div className='basis-full' />
          <Link to='/register'><p className='text-blue-500 underline text-sm'>Don&apos;t have an account? click here!</p></Link>
        </>
      )}
    </div>
  );
};

export default SignIn;
