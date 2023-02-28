import React from 'react';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Register = ({ onMount }) => {

  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  onMount();

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>REGISTER</h1>
      <div className='basis-full' />
      <form className='text-center text-black' onSubmit={handleSubmit(onSubmit)}>
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
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/,
              message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
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
