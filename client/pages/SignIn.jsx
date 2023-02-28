import React, { useState } from 'react';
import Button from '../components/Button';

const SignIn = ({ onMount }) => {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputvalue, setPasswordInputValue] = useState('');
  onMount();

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>SIGN IN</h1>
      <div className='basis-full' />
      <form className='text-center'>
        <input
          type="text"
          placeholder='Username'
          className='w-72 h-9 rounded px-3 mt-3'
          value={usernameInputValue}
          onChange={(e) => setUsernameInputValue(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder='Password'
          className='w-72 h-9 rounded px-3 mt-3'
          value={passwordInputvalue}
          onChange={(e) => setPasswordInputValue(e.target.value)}
          required
        />
        <div className='basis-full' />
        <Button text='SIGN IN' type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
