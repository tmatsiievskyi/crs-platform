export enum EMiddlewareKey {
  AUTH = 'AuthMiddleware',
  ERROR = 'ErrorMiddleware',
  INIT = 'InitMiddleware',
  LOGGER = 'LoggerMiddleware',
  VALIDATE = 'ValidateMiddleware',
  USER_SESSION = '',
}

export enum EAuthKey {
  CONTROLLER = 'AuthController',
  SCHEMA = 'AuthSchema',
  SERVICE = 'AuthService',
  TOKEN_SERVICE = 'AuthTokenService',
}

export enum EUsersKey {
  CONTROLLER = 'UsersController',
  SERVICE = 'UsersService',
  DAO = 'UsersDao',
  SCHEMA = 'UsersSchema',
}

export enum EUsersRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'super_admin',
}
