export enum EAuthPaths {
  SIGNIN = '/sign-in',
  SIGNUP = '/sign-up',
  SIGNOUT = '/sign-out',

  EMAIL_VERIFY = '/email/verify',
  EMAIL_VERIFY_CODE = '/email/verify/:code',

  FORGOT_PASSWORD_EMAIL = '/forgot-password/email',
  FORGOT_PASSWORD_EMAIL_RESET = '/forgot-password/email/rest',

  REFRESH_TOKEN = '/refresh-token',
}

export enum EUsersPaths {
  ALL = '/',
  FIND_BY_ID = '/:id',
  CREATE = '/',
  USER_CURRENT = '/current/data',
  USER_CURRENT_PASSWORD = '/current/change-password',
}
