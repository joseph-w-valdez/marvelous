import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import InputField from '../components/InputField';
import FileInput from '../components/FileInput';
import handleRegistration from '../components/handleRegistration';
import { usernameValidation, emailValidation, passwordValidation } from '../components/validation';

const Register = ({ onMount }) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  onMount();

  const onSubmit = async (data) => {
    try {
      await handleRegistration(data, setErrorMessage);
      navigate('/sign-in', { state: { message: 'Account created successfully. Please sign in.' } });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>REGISTER</h1>
      <div className='basis-full' />
      {errorMessage && <h1 className='text-red-700 bold'>{errorMessage}</h1>}
      <div className='basis-full' />
      <form className='text-center text-black' onSubmit={handleSubmit(onSubmit)}>
        <InputField name="username" register={register} errors={errors} options={{ placeholder: 'Username', validation: usernameValidation }} />
        <div className='basis-full' />
        <InputField name="email" register={register} errors={errors} options={{ placeholder: 'Email', validation: emailValidation }} />
        <div className='basis-full' />
        <InputField name="emailVerification" register={register} control={control} errors={errors} options={{ type: 'email', placeholder: 'Verify Email', validation: { required: true, validate: (value) => value === watch('email') || 'emails do not match' } }} />
        <div className='basis-full' />
        <InputField name="password" register={register} control={control} errors={errors} options={{ type: 'password', placeholder: 'Password', validation: passwordValidation }} />
        <div className='basis-full' />
        <InputField name="passwordVerification" register={register} control={control} errors={errors} options={{ type: 'password', placeholder: 'Verify Password', validation: { required: true, validate: (value) => value === watch('password') || 'passwords do not match' } }} />
        <div className='basis-full mb-3' />
        <Controller name="file" control={control} rules={{ required: false }} render={({ field: { onChange } }) => (<FileInput onChange={(e) => onChange(e.target.files[0])} />)} />
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
