import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../components/Button';
import InputField from '../components/InputField';
import FileInput from '../components/FileInput';
import handleRegistration from '../components/handleRegistration';
import { usernameValidation, emailValidation, passwordValidation } from '../components/validation';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';
import { useUser } from '../contexts/UserContext';

const Register = ({ onMount }) => {
  const { setLoading } = useUser();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  ScrollToTopOnPageChange();
  onMount(); // Call the onMount function passed as a prop, which sets the subnavbar text

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await handleRegistration(data, setErrorMessage);
      setSuccessMessage('Account created successfully. Please wait 5 seconds before navigating to the sign-in page. If you are not redirected, click ');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect hook to handle redirect after successful registration
  useEffect(() => {
    let timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        navigate('/sign-in', { state: { message: 'Account created successfully. Please sign in.' } }); // Navigate to sign-in page after 5 seconds
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [successMessage, navigate]);

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>REGISTER</h1>
      <div className='basis-full' />
      {/* if there is an error, the error is shown; if the form has been submitted successfully, show the success message and hide the form */}
      {errorMessage && <h1 className='text-red-700 bold'>{errorMessage}</h1>}
      {successMessage && <h1 className='text-blue-300 bold'>{successMessage} <a href="/sign-in" className='text-blue-500 underline'>here</a></h1>}
      <div className='basis-full' />
      {!successMessage && (
      <>
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
          By creating an account, you agree to our <Link to="/terms" className='text-blue-500 underline'>Terms of Use</Link> and our <Link to="/policy" className='text-blue-500 underline'>Privacy Policy</Link>
        </p>
      </>)
      }
    </div>
  );
};

export default Register;
