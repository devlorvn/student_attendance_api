import { IToken } from "src/common/utils/generateJwt.ulti";
import Admin from "../admin/entities/admin.entity";

export interface ITokenPayload extends IToken {
  key: Admin["id"];
}

export interface RequestWithAdmin extends Request {
  user: Admin;
}
