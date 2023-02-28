import React, { useState } from 'react';
import Button from '../components/Button';

const Register = ({ onMount }) => {

  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailVerifyInput, setEmailVerifyInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordVerifyInput, setPasswordVerifyInput] = useState('');

  onMount();

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>REGISTER</h1>
      <div className='basis-full' />
      <form className='text-center text-black'>
        <input
          type="text"
          placeholder='Username'
          className='w-72 h-9 rounded px-3 mt-3'
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          required
        />
        <div className='basis-full' />
        <input
          type="email"
          placeholder='Email'
          className='w-72 h-9 rounded px-3 mt-3'
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
        <div className='basis-full' />
        <input
          type="text"
          placeholder='Confirm Email'
          className='w-72 h-9 rounded px-3 mt-3'
          value={emailVerifyInput}
          onChange={(e) => setEmailVerifyInput(e.target.value)}
          required
        />
        <div className='basis-full' />
        <input
          type="text"
          placeholder='Password'
          className='w-72 h-9 rounded px-3 mt-3'
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />
        <div className='basis-full' />
        <input
          type="text"
          placeholder='Confirm Password'
          className='w-72 h-9 rounded px-3 mt-3'
          value={passwordVerifyInput}
          onChange={(e) => setPasswordVerifyInput(e.target.value)}
          required
        />
        <div className='basis-full' />
        <input
          type="file"
          className='w-72 h-9 px-3 mt-3 text-white'
          accept=".png, .jpg, .jpeg, .gif"
        />
        <div className='basis-full' />
        <Button text='Sign Up' type="submit" />
      </form>
      <div className='basis-full' />
      <p className='text-white text-sm'>
        By creating an account, you agree to our <a href="" className='text-blue-500 underline'>Terms of Use</a> and our <a href="" className='text-blue-500 underline'> Privacy Policy</a>
      </p>
    </div>
  );
};

export default Register;
