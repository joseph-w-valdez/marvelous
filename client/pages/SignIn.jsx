import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';
import { setAuthToken } from '../utils/AuthToken';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';

const SignIn = ({ onMount }) => {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  onMount();
  ScrollToTopOnPageChange();

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSignIn = (e) => {
    e.preventDefault();
    const apiUrl = '/marvel/sign-in';
    const data = {
      username: usernameInputValue,
      password: passwordInputValue
    };
    axiosPost(apiUrl, data)
      .then((res) => {
        setUser({ username: data.username, pictureUrl: res.data.profilePictureUrl, favorites: res.data.favoritesList });
        setAuthToken(res.data.token);
        setSuccessMessage('Signed-in successfully. Please wait 5 seconds before navigating to the sign-in page. If you are not redirected, click ');
        const fetchFavorites = async () => {
          const apiUrl = '/marvel/getFavorites';
          console.log('FETCH FAVORITES FRONT-END', user);
          try {
            setLoading(true);
            if (!user.favorites) {
              const response = await axiosPost(apiUrl, { favorites: [] });
              setCharacters(response.data);
              console.log('res', response.data, 'chars', characters);
            } else {
              const response = await axiosPost(apiUrl, { favorites: user.favorites });
              setCharacters(response.data);
              console.log('res', response.data, 'chars', characters);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchFavorites();
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

  const handleDemo = () => {
    const apiUrl = '/marvel/demo';
    axiosPost(apiUrl)
      .then((res) => {
        console.log(res);
        setUser({ username: res.data.username, pictureUrl: res.data.profilePictureUrl });
        setAuthToken(res.data.token);
        setSuccessMessage('Signed-in successfully. Please wait 5 seconds before navigating to the sign-in page. If you are not redirected, click ');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>SIGN IN</h1>
      <div className='basis-full' />
      {successMessage
        ? (
          <h1 className='text-blue-300 bold'>
            {successMessage}
            <span
            className='text-blue-500 underline cursor-pointer'
            onClick={() => navigate('/')}
          >
              here
            </span>
          </h1>
          )
        : (
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
              value={passwordInputValue}
              onChange={(e) => setPasswordInputValue(e.target.value)}
              required
            />
              <div className='basis-full' />
              <Button text='SIGN IN' type="submit" />
            </form>
            <div className='basis-full' />
            <Link to='/register'><p className='text-blue-500 underline text-sm'>Don&apos;t have an account? click here!</p></Link>
            <div className='basis-full' />
            <Button text='DEMO BUTTON' type="button" onClick={handleDemo} />
          </>
          )}
    </div>
  );
};

export default SignIn;
