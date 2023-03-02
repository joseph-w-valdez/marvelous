import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

const InputField = ({ name, register, errors, options }) => {
  return (
    <>
      <input
        type={options.type || 'text'}
        name={name}
        {...register(name, options.validation)}
        placeholder={options.placeholder}
        className='w-72 h-9 rounded px-3 mt-3'
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
      />
    </>
  );
};

export default InputField;
