import React, { useState } from 'react';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
const axios = require('axios');

const Register = ({ onMount }) => {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleRegistration = (data) => {
    console.log(data);

    const apiUrl = 'http://localhost:3000/marvel/registration';
    axios.post(apiUrl, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 409) {
          const data = error.response;
          console.log('DATA', data);
          if (data.status === 409) {
            setErrorMessage(data.data.error);
          } else {
            setErrorMessage('An error occurred while fetching data. Please try again later.');
          }
        } else {
          setErrorMessage('An error occurred while fetching data. Please try again later.');
        }

      });
  };

  onMount();

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>REGISTER</h1>
      <div className='basis-full' />
      {errorMessage && <h1 className='text-red-700 bold'>{errorMessage}</h1>}
      <div className='basis-full' />
      <form className='text-center text-black' onSubmit={handleSubmit(handleRegistration)}>
        <input
          type="text"
          name='username'
          {...register('username', { required: true, maxLength: { value: 20, message: 'username cannot be more than 20 characters' } })}
          placeholder='Username'
          className='w-72 h-9 rounded px-3 mt-3'
        />
        <div className='basis-full' />
        <input
          type="email"
          name='email'
          {...register('email', {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          })}
          placeholder='Email'
          className='w-72 h-9 rounded px-3 mt-3'
        />
        <div className='basis-full' />
        <input
          type="email"
          name='emailVerification'
          {...register('emailVerification', {
            required: true,
            validate: (value) => value === watch('email') || 'emails do not match'
          })}
          placeholder='Verify Email'
          className='w-72 h-9 rounded px-3 mt-3'
        />
        <ErrorMessage
          errors={errors}
          name="emailVerification"
          render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
        />
        <div className='basis-full' />
        <input
          type="password"
          name='password'
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'must be at least 8 characters long'
            },
            maxLength: {
              value: 25,
              message: 'cannot be more than 25 characters long'
            },
            validate: {
              uppercase: (value) => /(?=.*[A-Z])/.test(value) || 'must contain at least one uppercase letter',
              lowercase: (value) => /(?=.*[a-z])/.test(value) || 'must contain at least one lowercase letter',
              number: (value) => /(?=.*\d)/.test(value) || 'must contain at least one number',
              special: (value) => /(?=.*[@#$%^&+=!])/.test(value) || 'must contain at least one special character'
            }
          })}
          placeholder='Password'
          className='w-72 h-9 rounded px-3 mt-3'
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
        />
        <div className='basis-full' />
        <input
          type="password"
          name='passwordVerification'
          {...register('passwordVerification', {
            required: true,
            validate: (value) => value === watch('password') || 'passwords do not match'
          })}
          placeholder='Verify Password'
          className='w-72 h-9 rounded px-3 mt-3'
        />
        <ErrorMessage
          errors={errors}
          name="passwordVerification"
          render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
        />
        <div className='basis-full' />
        <input
          type="file"
          name='file'
          className='w-72 h-9 px-3 mt-3 text-white'
          accept=".png, .jpg, .jpeg, .gif"
        />
        <div className='basis-full' />
        <Button text='Sign Up' />
      </form>
      <div className='basis-full' />
      <p className='text-white text-sm'>
        By creating an account, you agree to our <a href="" className='text-blue-500 underline'>Terms of Use</a> and our <a href="" className='text-blue-500 underline'> Privacy Policy</a>
      </p>
    </div>
  );
};

export default Register;
