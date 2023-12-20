import Admin from "../admin/entities/admin.entity";

export interface ITokenPayload {
  email: Admin["email"];
  createdAt: Date;
  expireIn: Date;
}

export interface IRefreshTokenPayload {
  token: string;
  createdAt: Date;
  expireIn: Date;
}

export interface RequestWithAdmin extends Request {
  admin: Admin;
}
