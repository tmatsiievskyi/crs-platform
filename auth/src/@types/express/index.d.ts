type TUserPayload = {
  userId: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean;
  image?: string | null;
};

type TUserSession = {
  browser?: string;
  domain?: string;
  engine?: string;
  ip?: string | null;
  os?: string;
  userAgent?: string;
};

type PayloadContext = {
  user: TUserPayload;
  userSession?: TUserSession;
};

type TJwtPayload = {
  jti: string;
  sub: number;
  typ: string;
};

type TAccessTokenPayload = TUserPayload & TJwtPayload;

declare namespace Express {
  export interface Request {
    params: any;
    raw: any;
    user: TUserPayload;
    userSession?: TUserSession;
  }
}
