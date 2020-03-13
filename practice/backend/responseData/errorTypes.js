const ErrorTypes = {
  SERVER_ERROR: 'Something is wrong, try again',
  EMAIL_INVALID: 'Incorrect email address',
  USER_EXIST: 'User already exists',
  SHORT_PASSWORD: number => `Must be at least ${number} chars long`,
  PASSWORD_INVALID: 'Incorrect password',
  UNAUTHORIZED: 'You are not authorized'
};

module.exports = ErrorTypes;
