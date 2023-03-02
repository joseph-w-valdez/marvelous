export const usernameValidation = {
  required: true,
  maxLength: { value: 20, message: 'username cannot be more than 20 characters' }
};

export const emailValidation = {
  required: true,
  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'must be a valid email address' }
};

export const passwordValidation = {
  required: true,
  minLength: { value: 8, message: 'must be at least 8 characters long' },
  maxLength: { value: 25, message: 'cannot be more than 25 characters long' },
  validate: {
    uppercase: (value) => /(?=.*[A-Z])/.test(value) || 'must contain at least one uppercase letter',
    lowercase: (value) => /(?=.*[a-z])/.test(value) || 'must contain at least one lowercase letter',
    number: (value) => /(?=.*\d)/.test(value) || 'must contain at least one number',
    special: (value) => /(?=.*[@#$%^&+=!])/.test(value) || 'must contain at least one special character'
  }
};
