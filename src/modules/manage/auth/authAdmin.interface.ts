import Admin from "../admin/entities/admin.entity";

export interface ITokenPayload {
  id: Admin["id"];
  createdAt: Date;
  expireIn: Date;
}

export interface RequestWithAdmin extends Request {
  user: Admin;
}
