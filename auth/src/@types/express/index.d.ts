type TUserPayload = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  role: string;
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

declare namespace Express {
  export interface Request {
    params: any;
    raw: any;
    user: TUserPayload;
    userSession?: TUserSession;
  }
}
