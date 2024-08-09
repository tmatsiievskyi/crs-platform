export enum EMiddlewareKey {
  AUTH = 'AuthMiddleware',
  ERROR = 'ErrorMiddleware',
  INIT = 'InitMiddleware',
  LOGGER = 'LoggerMiddleware',
  VALIDATE = 'ValidateMiddleware',
  USER_SESSION = '',
}

export enum EAuthModule {
  CONTROLLER = 'AuthController',
  SCHEMA = 'AuthSchema',
  SERVICE = 'AuthService',
  TOKEN_SERVICE = 'AuthTokenService',
}

export enum EUsersModule {
  CONTROLLER = 'UsersController',
  SERVICE = 'UsersService',
  REPOSITORY = 'UsersRepository',
  SCHEMA = 'UsersSchema',
  VALIDATION_SERVICE = 'ValidationService',
}

export enum ERefreshTokenModule {
  SERVICE = 'RefreshTokenService',
  REPOSITORY = 'RefreshTokenRepository',
}

export enum EUsersRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'super_admin',
}

export enum ETokenTypes {
  BEARER = 'Bearer',
}
