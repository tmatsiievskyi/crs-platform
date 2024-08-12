export const validationMessages = {
  minLength: 'Value must have a length greater than or equal to {size}',
  maxLength: 'Value must have a length smaller than or equal to {size}',
  invalidCredentials: 'No user found with provided email or password',
  emptyEmail: 'Email has not been added for this user',
  emailAlreadyConfirmed: 'This email has already beed confirmed',
  tokenNotProvided:
    'Auth token is not provided. Please add token to your request',
  samePassword: 'New password should not be the same as old password',
  oldPasswordWrong: 'Provided old password is not correct',
};
