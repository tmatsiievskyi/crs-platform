type TUserPayload = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isEmaiConfirmed?: boolean;
  role: string;
  image?: string;
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
